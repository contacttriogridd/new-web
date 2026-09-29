import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from '@/hooks/useMotion';
import { HERO_PORTRAIT } from '@/components/hero/heroAssets';

type Pointer = { x: number; y: number };
type PointerRef = MutableRefObject<Pointer>;
export type SceneQuality = 'high' | 'low';

/* Arch proportions (world units) — the portrait sits inside the frame's opening. */
const ARCH_W = 3.0;
const ARCH_H = 4.5;
const OPENING_W = 2.5;
const OPENING_H = 4.0;

/** One breath in and out every 10s (~6 breaths a minute — a calming pace). */
const BREATH = (Math.PI * 2) / 10;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function archShape(width: number, height: number) {
  const r = width / 2;
  const bottom = -height / 2;
  const spring = height / 2 - r;
  const shape = new THREE.Shape();
  shape.moveTo(-r, bottom);
  shape.lineTo(r, bottom);
  shape.lineTo(r, spring);
  shape.absarc(0, spring, r, 0, Math.PI, false);
  shape.lineTo(-r, bottom);
  return shape;
}

function radialTexture(inner: string, outer: string) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ------------------------------------------------------------------ */
/* Motion helpers                                                      */
/* ------------------------------------------------------------------ */

/**
 * Places a child in depth: it eases in after the hero has settled, then drifts
 * toward the cursor by `depth` — nearer objects move more, which reads as parallax.
 */
function Layer({
  pointer,
  position,
  depth = 0.15,
  delay = 0,
  children,
}: {
  pointer: PointerRef;
  position: [number, number, number];
  depth?: number;
  delay?: number;
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const start = useRef<number | null>(null);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    if (start.current === null) start.current = t;
    const appear = easeOut(clamp01((t - start.current - 0.9 - delay) / 1.8));
    g.scale.setScalar(Math.max(appear, 0.0001));
    const d = Math.min(delta, 0.1);
    g.position.x = THREE.MathUtils.damp(g.position.x, position[0] + pointer.current.x * depth, 2, d);
    g.position.y = THREE.MathUtils.damp(g.position.y, position[1] + pointer.current.y * depth * 0.6, 2, d);
  });

  return (
    <group ref={ref} position={position} scale={0.0001}>
      {children}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Scene pieces                                                        */
/* ------------------------------------------------------------------ */

function BreathingHalo() {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const tex = useMemo(() => radialTexture('rgba(255,255,255,0.85)', 'rgba(255,255,255,0)'), []);

  useFrame(({ clock }) => {
    const breath = (Math.sin(clock.elapsedTime * BREATH) + 1) / 2;
    mesh.current?.scale.setScalar(1 + breath * 0.07);
    if (mat.current) mat.current.opacity = 0.45 + breath * 0.3;
  });

  return (
    <mesh ref={mesh} position={[0, 0.15, -1.8]}>
      {/* sized so the glow fades out before the canvas edge, even at full breath */}
      <planeGeometry args={[6, 6]} />
      <meshBasicMaterial ref={mat} map={tex} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function ArchFrame() {
  const geometry = useMemo(() => {
    const outer = archShape(ARCH_W, ARCH_H);
    outer.holes.push(archShape(OPENING_W, OPENING_H));
    const g = new THREE.ExtrudeGeometry(outer, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.08,
      bevelSegments: 6,
      curveSegments: 72,
    });
    g.translate(0, 0, -0.11);
    return g;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        color="#EEE8F7"
        emissive="#F4F0FA"
        emissiveIntensity={0.18}
        roughness={0.38}
        clearcoat={0.8}
        clearcoatRoughness={0.35}
        sheen={0.6}
        sheenColor="#D9CFEC"
      />
    </mesh>
  );
}

function openingGeometry() {
  const g = new THREE.ShapeGeometry(archShape(OPENING_W, OPENING_H), 72);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, pos.getX(i) / OPENING_W + 0.5, pos.getY(i) / OPENING_H + 0.5);
  }
  return g;
}

function Portrait() {
  const texture = useTexture(HERO_PORTRAIT);
  const geometry = useMemo(openingGeometry, []);

  // "object-fit: cover" for the arch opening
  useLayoutEffect(() => {
    const img = texture.image as HTMLImageElement;
    const imgAspect = img.width / img.height;
    const planeAspect = OPENING_W / OPENING_H;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    if (imgAspect > planeAspect) {
      texture.repeat.set(planeAspect / imgAspect, 1);
      texture.offset.set((1 - texture.repeat.x) / 2, 0);
    } else {
      texture.repeat.set(1, imgAspect / planeAspect);
      texture.offset.set(0, (1 - texture.repeat.y) / 2);
    }
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <mesh geometry={geometry} position={[0, 0, -0.04]}>
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

/** Soft lavender wash over the photo so it melts into the palette. */
function PortraitWash() {
  const geometry = useMemo(openingGeometry, []);
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 4;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, 'rgba(244,240,250,0.18)');
    g.addColorStop(0.55, 'rgba(184,167,219,0)');
    g.addColorStop(1, 'rgba(107,90,158,0.38)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 4, 256);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <mesh geometry={geometry} position={[0, 0, -0.03]}>
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function PortraitPlaceholder() {
  const geometry = useMemo(openingGeometry, []);
  return (
    <mesh geometry={geometry} position={[0, 0, -0.04]}>
      <meshBasicMaterial color="#DDD4EE" toneMapped={false} />
    </mesh>
  );
}

function Pearl({ radius, tint = '#F4F0FA' }: { radius: number; tint?: string }) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 40, 40]} />
      <meshPhysicalMaterial
        color={tint}
        transparent
        opacity={0.72}
        roughness={0.12}
        clearcoat={1}
        clearcoatRoughness={0.08}
        iridescence={0.45}
        iridescenceIOR={1.3}
      />
    </mesh>
  );
}

function useLeafGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -0.5);
    s.bezierCurveTo(0.38, -0.26, 0.36, 0.3, 0, 0.56);
    s.bezierCurveTo(-0.36, 0.3, -0.38, -0.26, 0, -0.5);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.012,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 2,
      curveSegments: 28,
    });
    // cup the leaf slightly so light rolls across it
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      pos.setZ(i, pos.getZ(i) + x * x * 0.55);
    }
    g.computeVertexNormals();
    return g;
  }, []);
}

function Leaf({ geometry, color, scale = 1, rotation }: {
  geometry: THREE.BufferGeometry;
  color: string;
  scale?: number;
  rotation: [number, number, number];
}) {
  return (
    <mesh geometry={geometry} scale={scale} rotation={rotation}>
      <meshStandardMaterial color={color} roughness={0.55} side={THREE.DoubleSide} />
    </mesh>
  );
}

function ZenPebbles() {
  return (
    <group>
      <mesh position={[0, 0, 0]} scale={[0.62, 0.24, 0.5]}>
        <sphereGeometry args={[1, 40, 24]} />
        <meshStandardMaterial color="#F3EFF8" roughness={0.6} />
      </mesh>
      <mesh position={[0.04, 0.34, 0]} scale={[0.44, 0.18, 0.36]} rotation={[0, 0, 0.05]}>
        <sphereGeometry args={[1, 40, 24]} />
        <meshStandardMaterial color="#DDD4EE" roughness={0.55} />
      </mesh>
      <mesh position={[-0.02, 0.6, 0]} scale={[0.28, 0.13, 0.24]} rotation={[0, 0, -0.06]}>
        <sphereGeometry args={[1, 32, 20]} />
        <meshStandardMaterial color="#C4B6E1" roughness={0.5} />
      </mesh>
    </group>
  );
}

function OrganicBlob({ segments }: { segments: number }) {
  return (
    <mesh>
      <sphereGeometry args={[1, segments, segments]} />
      <MeshDistortMaterial color="#D9CFEC" distort={0.3} speed={0.8} roughness={0.45} transparent opacity={0.8} />
    </mesh>
  );
}

/** A few slow motes rising like dust in morning light. */
function Motes({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = Math.random() * 2 - 0.5;
      speeds[i] = 0.06 + Math.random() * 0.1;
    }
    return { positions, speeds };
  }, [count]);
  const sprite = useMemo(() => radialTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0)'), []);

  useFrame((_, delta) => {
    const attr = points.current?.geometry.attributes.position as THREE.BufferAttribute | undefined;
    if (!attr) return;
    const d = Math.min(delta, 0.1);
    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) + speeds[i] * d;
      if (y > 3.2) y = -3.2;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.09}
        transparent
        opacity={0.7}
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

function Composition({ pointer, quality }: { pointer: PointerRef; quality: SceneQuality }) {
  const root = useRef<THREE.Group>(null);
  const leaf = useLeafGeometry();
  const high = quality === 'high';

  useFrame(({ clock }, delta) => {
    const g = root.current;
    if (!g) return;
    const d = Math.min(delta, 0.1);
    // the whole composition leans gently toward the cursor and sways on its own
    const sway = Math.sin(clock.elapsedTime * 0.25) * 0.04;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.2 + sway, 1.6, d);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.current.y * 0.1, 1.6, d);
  });

  return (
    <>
      <ambientLight intensity={0.75} />
      <hemisphereLight args={['#ffffff', '#B8A7DB', 0.7]} />
      <directionalLight position={[3, 5, 6]} intensity={1.5} color="#FFF8F0" />
      <pointLight position={[-3, -1, 3]} intensity={6} color="#CABEE5" distance={12} />

      <BreathingHalo />

      <group ref={root}>
        <Layer pointer={pointer} position={[1.65, 1.55, -1.3]} depth={-0.12} delay={0}>
          <Float speed={0.6} floatIntensity={0.3} rotationIntensity={0.15}>
            <OrganicBlob segments={high ? 64 : 32} />
          </Float>
        </Layer>

        <Float speed={0.7} floatIntensity={0.18} rotationIntensity={0.04}>
          <ArchFrame />
          <Suspense fallback={<PortraitPlaceholder />}>
            <Portrait />
          </Suspense>
          <PortraitWash />
        </Float>

        <Layer pointer={pointer} position={[-1.75, -2.05, 0.9]} depth={0.18} delay={0.1}>
          <Float speed={0.5} floatIntensity={0.12} rotationIntensity={0.05}>
            <ZenPebbles />
          </Float>
        </Layer>

        {/* pearls */}
        <Layer pointer={pointer} position={[1.95, 0.35, 0.7]} depth={0.25} delay={0.2}>
          <Float speed={0.9} floatIntensity={0.5} rotationIntensity={0.2}>
            <Pearl radius={0.3} />
          </Float>
        </Layer>
        <Layer pointer={pointer} position={[-1.55, 1.85, 1.0]} depth={0.3} delay={0.35}>
          <Float speed={1.1} floatIntensity={0.45} rotationIntensity={0.2}>
            <Pearl radius={0.17} tint="#E4DCF1" />
          </Float>
        </Layer>
        <Layer pointer={pointer} position={[1.25, -1.95, 1.3]} depth={0.35} delay={0.5}>
          <Float speed={0.8} floatIntensity={0.4} rotationIntensity={0.2}>
            <Pearl radius={0.21} />
          </Float>
        </Layer>
        {high && (
          <>
            <Layer pointer={pointer} position={[-2.05, -0.55, 0.3]} depth={0.2} delay={0.6}>
              <Float speed={1} floatIntensity={0.4}>
                <Pearl radius={0.12} tint="#D9CFEC" />
              </Float>
            </Layer>
            <Layer pointer={pointer} position={[0.7, 2.55, -0.5]} depth={0.12} delay={0.7}>
              <Float speed={0.7} floatIntensity={0.35}>
                <Pearl radius={0.2} tint="#EEE8F7" />
              </Float>
            </Layer>
          </>
        )}

        {/* sage leaves */}
        <Layer pointer={pointer} position={[1.85, 1.75, 0.9]} depth={0.3} delay={0.4}>
          <Float speed={0.8} floatIntensity={0.5} rotationIntensity={0.45}>
            <Leaf geometry={leaf} color="#A9C89A" scale={0.62} rotation={[0.3, -0.4, -0.7]} />
          </Float>
        </Layer>
        <Layer pointer={pointer} position={[-2.0, 0.55, 1.2]} depth={0.35} delay={0.55}>
          <Float speed={0.7} floatIntensity={0.45} rotationIntensity={0.5}>
            <Leaf geometry={leaf} color="#C7DDBA" scale={0.5} rotation={[-0.2, 0.5, 0.8]} />
          </Float>
        </Layer>
        {high && (
          <>
            <Layer pointer={pointer} position={[1.75, -1.1, 1.4]} depth={0.4} delay={0.75}>
              <Float speed={0.9} floatIntensity={0.4} rotationIntensity={0.5}>
                <Leaf geometry={leaf} color="#97BB85" scale={0.4} rotation={[0.4, 0.2, 2.3]} />
              </Float>
            </Layer>
            <Layer pointer={pointer} position={[-1.2, 2.45, 0.4]} depth={0.2} delay={0.9}>
              <Float speed={0.6} floatIntensity={0.35} rotationIntensity={0.4}>
                <Leaf geometry={leaf} color="#B5D2A6" scale={0.34} rotation={[0.2, -0.3, -1.9]} />
              </Float>
            </Layer>
          </>
        )}
      </group>

      {high && <Motes count={28} />}
    </>
  );
}

export default function HeroScene({ quality, interactive }: { quality: SceneQuality; interactive: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [interactive]);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 -inset-x-[16%] transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
    >
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={quality === 'high' ? [1, 1.75] : [1, 1.25]}
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={() => setReady(true)}
      >
        <Composition pointer={pointer} quality={quality} />
      </Canvas>
    </div>
  );
}
