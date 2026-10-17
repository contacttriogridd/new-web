import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/useMotion';

type Pointer = { x: number; y: number };

function GlassOrb({ position, scale, color, speed }: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  return (
    <Float speed={speed} floatIntensity={0.45} rotationIntensity={0.2}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.44}
          roughness={0.12}
          metalness={0.08}
          transmission={0.35}
          thickness={1.2}
          distort={0.16}
          speed={0.5}
        />
      </mesh>
    </Float>
  );
}

function Halo({ position, size, color }: { position: [number, number, number]; size: number; color: string }) {
  const material = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (!material.current) return;
    material.current.opacity = 0.13 + (Math.sin(clock.elapsedTime * 0.35) + 1) * 0.035;
  });

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }, [color]);

  return (
    <mesh position={position} scale={size}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial ref={material} map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function ParticleField({ pointer }: { pointer: MutableRefObject<Pointer> }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      values[i * 3] = (Math.random() - 0.5) * 13;
      values[i * 3 + 1] = (Math.random() - 0.5) * 8;
      values[i * 3 + 2] = -1 + Math.random() * 4;
    }
    return values;
  }, []);

  useFrame(({ clock }, delta) => {
    if (!points.current) return;
    points.current.rotation.y = THREE.MathUtils.damp(points.current.rotation.y, pointer.current.x * 0.045, 1.4, delta);
    points.current.rotation.x = THREE.MathUtils.damp(points.current.rotation.x, -pointer.current.y * 0.025, 1.4, delta);
    points.current.position.y = Math.sin(clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fffaf7" size={0.035} transparent opacity={0.48} depthWrite={false} sizeAttenuation />
    </points>
  );
}

function Portal({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, 0.15, 0.7, delta);
    group.current.rotation.y += delta * 0.035;
  });

  return (
    <group ref={group} position={[0.2, 0.55, -0.3]} rotation={[0.15, -0.18, -0.15]} scale={1.35}>
      <mesh>
        <torusGeometry args={[1.45, 0.035, 24, 128]} />
        <meshPhysicalMaterial color="#f1ecff" emissive="#c9bbf3" emissiveIntensity={0.8} roughness={0.18} metalness={0.12} clearcoat={1} />
      </mesh>
      <mesh rotation={[0.06, 0.1, 0.5]} scale={0.86}>
        <torusGeometry args={[1.45, 0.012, 12, 96]} />
        <meshBasicMaterial color="#dce9e7" transparent opacity={0.65} />
      </mesh>
      <mesh scale={0.9}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial color="#b9d9d7" transparent opacity={0.08} transmission={0.8} thickness={1.4} roughness={0.12} />
      </mesh>
    </group>
  );
}

function FlowRibbon({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.7, -1.25, 1.2),
      new THREE.Vector3(-2.8, -0.35, 1.0),
      new THREE.Vector3(-0.7, -1.15, 0.8),
      new THREE.Vector3(1.5, -0.5, 0.95),
      new THREE.Vector3(4.8, -1.15, 1.1),
    ]);
    return new THREE.TubeGeometry(curve, 96, 0.022, 8, false);
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current || reduced) return;
    mesh.current.position.y = Math.sin(clock.elapsedTime * 0.22) * 0.035;
    mesh.current.rotation.z = Math.sin(clock.elapsedTime * 0.16) * 0.012;
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshPhysicalMaterial color="#e3f0e6" transparent opacity={0.46} roughness={0.2} metalness={0.05} emissive="#a7cbbb" emissiveIntensity={0.2} />
    </mesh>
  );
}

function Clouds({ reduced }: { reduced: boolean }) {
  return (
    <group position={[0, 2.55, -2.35]}>
      <Float speed={reduced ? 0 : 0.15} floatIntensity={0.12} rotationIntensity={0.02}>
        <group position={[-3.7, 0.05, 0]} scale={0.85}>
          <mesh position={[-0.55, 0, 0]}><sphereGeometry args={[0.5, 24, 24]} /><meshStandardMaterial color="#f5f2ff" transparent opacity={0.18} /></mesh>
          <mesh position={[0, 0.16, 0]}><sphereGeometry args={[0.65, 24, 24]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.2} /></mesh>
          <mesh position={[0.6, 0, 0]}><sphereGeometry args={[0.46, 24, 24]} /><meshStandardMaterial color="#f0edfb" transparent opacity={0.17} /></mesh>
        </group>
      </Float>
      <Float speed={reduced ? 0 : 0.12} floatIntensity={0.1} rotationIntensity={0.02}>
        <group position={[3.2, 0.3, 0]} scale={0.65}>
          <mesh position={[-0.55, 0, 0]}><sphereGeometry args={[0.44, 24, 24]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.15} /></mesh>
          <mesh position={[0, 0.14, 0]}><sphereGeometry args={[0.58, 24, 24]} /><meshStandardMaterial color="#f5f2ff" transparent opacity={0.18} /></mesh>
          <mesh position={[0.55, 0, 0]}><sphereGeometry args={[0.4, 24, 24]} /><meshStandardMaterial color="#f0edfb" transparent opacity={0.15} /></mesh>
        </group>
      </Float>
    </group>
  );
}

function Landscape() {
  const ranges = useMemo(() => [
    { points: [[-5, -1.3], [-3.8, 0.05], [-2.7, -0.65], [-1.35, 0.35], [0, -0.35], [1.6, 0.55], [3, -0.2], [4.2, 0.35], [5, -1.25]], color: '#7886aa', z: -1.7, opacity: 0.3 },
    { points: [[-5, -1.6], [-4.2, -0.35], [-3.1, -0.95], [-1.8, -0.1], [-0.4, -0.8], [1.1, 0.05], [2.4, -0.6], [3.7, -0.05], [5, -1.5]], color: '#667b91', z: -1.1, opacity: 0.22 },
  ].map((range) => {
    const shape = new THREE.Shape();
    shape.moveTo(range.points[0][0], range.points[0][1]);
    range.points.slice(1).forEach(([x, y]) => shape.lineTo(x, y));
    shape.lineTo(5, -3.5);
    shape.lineTo(-5, -3.5);
    shape.closePath();
    return { ...range, geometry: new THREE.ShapeGeometry(shape) };
  }), []);

  return (
    <group>
      <mesh position={[0, 1.25, -3.5]}>
        <sphereGeometry args={[0.8, 48, 48]} />
        <meshBasicMaterial color="#ffe1c5" transparent opacity={0.68} toneMapped={false} />
      </mesh>
      {ranges.map((range) => (
        <mesh key={range.z} geometry={range.geometry} position={[0, 0, range.z]}>
          <meshBasicMaterial color={range.color} transparent opacity={range.opacity} depthWrite={false} />
        </mesh>
      ))}
      <mesh position={[0, -2.9, -1.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 8, 1, 1]} />
        <meshPhysicalMaterial color="#7d9eb7" transparent opacity={0.18} roughness={0.2} metalness={0.05} transmission={0.28} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, -2.15 - i * 0.2, -1.1]}>
          <boxGeometry args={[8 - i * 0.8, 0.012, 0.018]} />
          <meshBasicMaterial color="#e6e8f1" transparent opacity={0.16 - i * 0.02} />
        </mesh>
      ))}
    </group>
  );
}

function BackdropScene({ reduced }: { reduced: boolean }) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const root = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const cameraTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      const hero = document.getElementById('home');
      if (!hero) return;
      const max = Math.max(hero.clientHeight - window.innerHeight, 1);
      scroll.current = Math.min(1, Math.max(0, window.scrollY / max));
    };
    onScroll();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useFrame((state, delta) => {
    if (!root.current) return;
    const progress = reduced ? 0 : scroll.current;
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 10 - progress * 1.2, 1.1, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, progress * 0.18, 1.1, delta);
    state.camera.lookAt(cameraTarget);
    if (reduced) return;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.current.x * 0.055, 1.2, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -pointer.current.y * 0.035 + progress * 0.018, 1.2, delta);
  });

  return (
    <group ref={root}>
      <ambientLight intensity={1.2} color="#f5efff" />
      <hemisphereLight args={['#fffaf7', '#b8a7db', 1.4]} />
      <pointLight position={[0, 2, 4]} intensity={12} distance={16} color="#fff4e9" />
      <Landscape />
      <Clouds reduced={reduced} />
      <FlowRibbon reduced={reduced} />
      <Portal reduced={reduced} />
      <Halo position={[-3.8, 1.4, -2]} size={4.8} color="rgba(255,255,255,0.65)" />
      <Halo position={[3.8, -1.2, -2]} size={5.5} color="rgba(211,198,241,0.75)" />
      <ParticleField pointer={pointer} />

      <GlassOrb position={[-4.1, 1.9, -0.5]} scale={0.58} color="#f7efff" speed={reduced ? 0 : 0.42} />
      <GlassOrb position={[3.9, 1.35, 0.2]} scale={0.82} color="#d9cfec" speed={reduced ? 0 : 0.34} />
      <GlassOrb position={[4.5, -2.1, 0.6]} scale={0.45} color="#f2e9fa" speed={reduced ? 0 : 0.52} />
      <GlassOrb position={[-3.2, -2.25, 0.4]} scale={0.38} color="#c8dcbf" speed={reduced ? 0 : 0.58} />
      <GlassOrb position={[0.3, 3.05, -0.7]} scale={0.3} color="#eee6f8" speed={reduced ? 0 : 0.48} />

      <Float speed={0.22} floatIntensity={0.08} rotationIntensity={0.05}>
        <mesh rotation={[0.2, 0.4, 0.1]} position={[0, 0.15, -1.2]} scale={[5.2, 3.2, 0.06]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.035} roughness={0.35} transmission={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroBackdrop() {
  const reduced = usePrefersReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-90">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <BackdropScene reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
