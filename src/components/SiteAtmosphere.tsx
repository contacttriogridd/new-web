import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMotion';

type Pointer = { x: number; y: number };

function Motes({ count, pointer, reduced }: { count: number; pointer: MutableRefObject<Pointer>; reduced: boolean }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      data[i * 3] = (Math.random() - 0.5) * 16;
      data[i * 3 + 1] = (Math.random() - 0.5) * 18;
      data[i * 3 + 2] = -2 + Math.random() * 5;
    }
    return data;
  }, [count]);

  useFrame(({ clock }, delta) => {
    if (!points.current || reduced) return;
    points.current.rotation.y = THREE.MathUtils.damp(points.current.rotation.y, pointer.current.x * 0.04, 1, delta);
    points.current.rotation.x = THREE.MathUtils.damp(points.current.rotation.x, pointer.current.y * 0.025, 1, delta);
    points.current.position.y = Math.sin(clock.elapsedTime * 0.08) * 0.12;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f6f2ff" size={0.035} transparent opacity={0.3} depthWrite={false} sizeAttenuation />
    </points>
  );
}

function AtmosphericRibbon({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8, -5, -0.7),
      new THREE.Vector3(-4, -1, 0.2),
      new THREE.Vector3(-1, -4, 0.7),
      new THREE.Vector3(3, -1, 0.2),
      new THREE.Vector3(8, -5, -0.7),
    ]);
    return new THREE.TubeGeometry(curve, 120, 0.035, 8, false);
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.z = Math.sin(clock.elapsedTime * 0.09) * 0.025;
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshPhysicalMaterial color="#bad7ce" transparent opacity={0.22} roughness={0.2} metalness={0.05} emissive="#a7cbbb" emissiveIntensity={0.3} />
    </mesh>
  );
}

function AtmosphereScene({ reduced, compact }: { reduced: boolean; compact: boolean }) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const world = useRef<THREE.Group>(null);
  const scroll = useRef(0);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scroll.current = Math.min(1, Math.max(0, window.scrollY / max));
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useFrame((state, delta) => {
    if (!world.current) return;
    const progress = reduced ? 0 : scroll.current;
    world.current.position.y = THREE.MathUtils.damp(world.current.position.y, progress * 1.3, 0.55, delta);
    world.current.rotation.y = THREE.MathUtils.damp(world.current.rotation.y, pointer.current.x * 0.025, 0.8, delta);
    world.current.rotation.x = THREE.MathUtils.damp(world.current.rotation.x, -pointer.current.y * 0.018, 0.8, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 10 - progress * 0.5, 0.45, delta);
  });

  return (
    <group ref={world}>
      <ambientLight intensity={1.05} color="#eef1ff" />
      <hemisphereLight args={['#f7fbff', '#7886aa', 1.15]} />
      <pointLight position={[-4, 4, 3]} intensity={7} distance={14} color="#d8e6ff" />
      <pointLight position={[4, -3, 2]} intensity={5} distance={12} color="#d8f0dc" />

      <Motes count={compact ? 55 : 110} pointer={pointer} reduced={reduced} />
      <AtmosphericRibbon reduced={reduced} />

      <Float speed={reduced ? 0 : 0.14} floatIntensity={0.1} rotationIntensity={0.03}>
        <mesh position={[-4.8, 2.3, -1.3]} scale={1.8}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial color="#cfdbec" transparent opacity={0.13} roughness={0.2} transmission={0.55} thickness={1.2} distort={0.12} speed={0.35} />
        </mesh>
      </Float>
      <Float speed={reduced ? 0 : 0.18} floatIntensity={0.13} rotationIntensity={0.04}>
        <mesh position={[4.8, -1.3, -1.1]} scale={2.2}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial color="#b8d2c5" transparent opacity={0.11} roughness={0.2} transmission={0.6} thickness={1.5} distort={0.16} speed={0.4} />
        </mesh>
      </Float>

      <mesh position={[0, 4.8, -3.2]}>
        <sphereGeometry args={[1.3, 48, 48]} />
        <meshBasicMaterial color="#fff0d6" transparent opacity={0.16} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function SiteAtmosphere() {
  const reduced = usePrefersReducedMotion();
  const compact = useMediaQuery('(max-width: 900px)');

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-80">
      <Canvas dpr={[1, compact ? 1.15 : 1.5]} camera={{ position: [0, 0, 10], fov: 42 }} frameloop="always" gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <AtmosphereScene reduced={reduced} compact={compact} />
      </Canvas>
    </div>
  );
}
