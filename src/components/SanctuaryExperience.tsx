import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMotion';

type Point = [number, number, number];

// One shared breathing rhythm (~15s cycle) drives the meditators, the rings and the on-screen breath guide.
const BREATH_RATE = 0.42;
const breathAt = (seconds: number) => (Math.sin(seconds * BREATH_RATE) + 1) * 0.5;
const nowSeconds = () => performance.now() / 1000;

const STAGES = ['Arriving in stillness', 'Entering the landscape', 'The sacred lake', 'The meditation sanctuary', 'Inner stillness'];
const stageFor = (progress: number) => (progress < 0.2 ? 0 : progress < 0.42 ? 1 : progress < 0.64 ? 2 : progress < 0.84 ? 3 : 4);

function useJourneyProgress(section: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const node = section.current;
      if (!node) return;
      const range = Math.max(node.offsetHeight - window.innerHeight, 1);
      setProgress(THREE.MathUtils.clamp(-node.getBoundingClientRect().top / range, 0, 1));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [section]);
  return progress;
}

function Sun({ progress }: { progress: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const breath = (Math.sin(clock.elapsedTime * 0.24) + 1) * 0.5;
    ref.current.scale.setScalar(1 + breath * 0.025 + progress * 0.12);
  });
  return <mesh ref={ref} position={[2.4, 3.4, -5]}><sphereGeometry args={[1.1, 48, 48]} /><meshBasicMaterial color="#ffe5ae" toneMapped={false} transparent opacity={0.8} /></mesh>;
}

function MountainLayer({ depth, color, points, progress }: { depth: number; color: string; points: number[]; progress: number }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-7, -3.2);
    points.forEach((y, index) => shape.lineTo(-7 + index * (14 / (points.length - 1)), y));
    shape.lineTo(7, -3.2);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, [points]);
  return <mesh geometry={geometry} position={[depth * progress * 0.45, depth * 0.05, depth]}><meshStandardMaterial color={color} transparent opacity={0.82 - depth * -0.03} roughness={1} /></mesh>;
}

function Mist({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, Math.sin(clock.elapsedTime * 0.11) * 0.55 + progress * 0.35, 0.5, Math.min(delta, 0.1));
  });
  return <group ref={group} position={[-0.2, -0.8, -1.7]}>
    {[[-3.2, 0, 0, 2.6], [-1, 0.2, 0.2, 2], [1.3, 0, 0, 2.8], [3.5, 0.2, 0.1, 2.2]].map(([x, y, z, scale], i) => <mesh key={i} position={[x, y, z]} scale={scale}><sphereGeometry args={[1, 32, 16]} /><meshBasicMaterial color="#eef3e7" transparent opacity={0.1} depthWrite={false} /></mesh>)}
  </group>;
}

function Tree({ position, scale = 1 }: { position: Point; scale?: number }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, 0.9, 0]} rotation={[0, 0, -0.05]} castShadow><cylinderGeometry args={[0.08, 0.16, 1.8, 10]} /><meshStandardMaterial color="#51493d" roughness={0.92} /></mesh>
    <mesh position={[-0.24, 1.8, 0]} rotation={[0, 0, -0.65]} castShadow><cylinderGeometry args={[0.035, 0.07, 0.95, 8]} /><meshStandardMaterial color="#5c5142" roughness={0.9} /></mesh>
    <mesh position={[0.28, 2.05, 0.02]} rotation={[0, 0, 0.55]} castShadow><cylinderGeometry args={[0.035, 0.07, 1.05, 8]} /><meshStandardMaterial color="#5c5142" roughness={0.9} /></mesh>
    <mesh position={[0, 2.18, 0]} scale={[1.05, 0.78, 0.86]} castShadow><icosahedronGeometry args={[1, 2]} /><meshStandardMaterial color="#2e5544" roughness={0.88} flatShading /></mesh>
    <mesh position={[-0.38, 2.65, 0.08]} scale={[0.74, 0.62, 0.68]} castShadow><icosahedronGeometry args={[1, 2]} /><meshStandardMaterial color="#466e54" roughness={0.84} flatShading /></mesh>
    <mesh position={[0.32, 2.72, -0.03]} scale={[0.76, 0.68, 0.7]} castShadow><icosahedronGeometry args={[1, 2]} /><meshStandardMaterial color="#5d835f" roughness={0.82} flatShading /></mesh>
    <mesh position={[-0.04, 3.18, 0.04]} scale={[0.52, 0.55, 0.5]} castShadow><icosahedronGeometry args={[1, 2]} /><meshStandardMaterial color="#76956d" roughness={0.8} flatShading /></mesh>
  </group>;
}

function Water({ progress }: { progress: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const material = ref.current.material as THREE.MeshStandardMaterial;
    material.opacity = 0.72 + Math.sin(clock.elapsedTime * 0.3) * 0.04;
  });
  return <group position={[0, -2.65, 0.2]}>
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} scale={[1 + progress * 0.2, 1, 1]}><planeGeometry args={[14, 6, 1, 1]} /><MeshReflectorMaterial blur={[350, 80]} resolution={256} mixBlur={0.72} mixStrength={0.68} mirror={0} depthScale={1.5} minDepthThreshold={0.35} maxDepthThreshold={1.4} color="#719894" metalness={0.18} roughness={0.32} /></mesh>
    {[0, 1, 2, 3].map((i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.59 + i * 0.012, -0.8 - i * 0.45]} scale={[1 - i * 0.13, 1 - i * 0.1, 1]}><ringGeometry args={[0.8 + i * 0.28, 0.82 + i * 0.28, 64]} /><meshBasicMaterial color="#d9e7d8" transparent opacity={0.14 - i * 0.025} /></mesh>)}
  </group>;
}

/** A tapered capsule between two joints — the building block for limbs. */
function Segment({ from, to, r1, r2 = r1, material }: { from: Point; to: Point; r1: number; r2?: number; material: THREE.Material }) {
  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    return {
      position: a.clone().add(b).multiplyScalar(0.5),
      quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize()),
      length: dir.length(),
    };
  }, [from, to]);
  return <group position={position} quaternion={quaternion}>
    <mesh material={material} castShadow><cylinderGeometry args={[r2, r1, length, 22, 1, true]} /></mesh>
    <mesh material={material} position={[0, length / 2, 0]} castShadow><sphereGeometry args={[r2, 22, 16]} /></mesh>
    <mesh material={material} position={[0, -length / 2, 0]} castShadow><sphereGeometry args={[r1, 22, 16]} /></mesh>
  </group>;
}

const lerpPoint = (a: Point, b: Point, t: number): Point => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

type PersonLook = { skin: string; hair: string; top: string; bottom: string; cushion: string; feminine?: boolean };

function Hand({ wrist, side, skin }: { wrist: Point; side: 1 | -1; skin: THREE.Material }) {
  // Chin mudra: palm up on the knee, thumb and index finger touching.
  const palm: Point = [wrist[0] + side * 0.015, wrist[1] - 0.008, wrist[2] + 0.045];
  return <group>
    <mesh material={skin} position={palm} scale={[0.036, 0.016, 0.048]} castShadow><sphereGeometry args={[1, 20, 14]} /></mesh>
    <mesh material={skin} position={[palm[0] - side * 0.022, palm[1] + 0.008, palm[2] + 0.045]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.014, 0.0065, 8, 18]} /></mesh>
    {[0, 1, 2].map((i) => <Segment key={i} material={skin} r1={0.0075} r2={0.0062}
      from={[palm[0] + side * i * 0.013, palm[1] + 0.002, palm[2] + 0.035]}
      to={[palm[0] + side * (0.012 + i * 0.016), palm[1] - 0.006, palm[2] + 0.08 - i * 0.006]} />)}
  </group>;
}

function MeditatingPerson({ position, rotation = 0, look }: { position: Point; rotation?: number; look: PersonLook }) {
  const upper = useRef<THREE.Group>(null);
  const chest = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Group>(null);
  const mats = useMemo(() => ({
    skin: new THREE.MeshPhysicalMaterial({ color: look.skin, roughness: 0.52, sheen: 0.45, sheenColor: new THREE.Color('#ffd6c2'), sheenRoughness: 0.55, clearcoat: 0.06 }),
    hair: new THREE.MeshPhysicalMaterial({ color: look.hair, roughness: 0.46, sheen: 0.8, sheenColor: new THREE.Color('#6b5248'), sheenRoughness: 0.35 }),
    top: new THREE.MeshPhysicalMaterial({ color: look.top, roughness: 0.82, sheen: 0.6, sheenColor: new THREE.Color('#fff4ea'), sheenRoughness: 0.7, side: THREE.DoubleSide }),
    bottom: new THREE.MeshPhysicalMaterial({ color: look.bottom, roughness: 0.86, sheen: 0.5, sheenColor: new THREE.Color('#f4efe6'), sheenRoughness: 0.75 }),
    cushion: new THREE.MeshPhysicalMaterial({ color: look.cushion, roughness: 0.9, sheen: 0.7, sheenColor: new THREE.Color('#ffe9c9') }),
    feature: new THREE.MeshStandardMaterial({ color: '#3b2620', roughness: 0.8 }),
    lips: new THREE.MeshStandardMaterial({ color: look.feminine ? '#9a5550' : '#8c5a4c', roughness: 0.6 }),
  }), [look]);
  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  const f = look.feminine;
  const sw = f ? 0.168 : 0.19; // chest half-width
  const shoulderX = f ? 0.175 : 0.2;
  const hipX = f ? 0.13 : 0.12;
  const H: Point = [0, 0.79, 0.02];
  const at = (dx: number, dy: number, dz: number): Point => [H[0] + dx, H[1] + dy, H[2] + dz];

  useFrame(() => {
    const b = breathAt(nowSeconds());
    if (chest.current) chest.current.scale.set(sw * (1 + b * 0.035), 0.15 * (1 + b * 0.02), 0.12 * (1 + b * 0.06));
    if (upper.current) upper.current.position.y = b * 0.006;
    if (head.current) head.current.rotation.x = 0.1 - b * 0.03;
  });

  const arm = (side: 1 | -1) => {
    const S: Point = [side * shoulderX, 0.57, 0];
    const E: Point = [side * (shoulderX + 0.09), 0.35, 0.09];
    const W: Point = [side * 0.38, 0.19, 0.25];
    return <group key={side}>
      <Segment from={S} to={E} r1={0.056} r2={0.047} material={mats.top} />
      <Segment from={E} to={W} r1={0.04} r2={0.029} material={mats.skin} />
      <Segment from={E} to={lerpPoint(E, W, 0.42)} r1={0.05} r2={0.046} material={mats.top} />
      <Hand wrist={W} side={side} skin={mats.skin} />
    </group>;
  };

  const hipL: Point = [-hipX, 0.15, 0.03], hipR: Point = [hipX, 0.15, 0.03];
  const kneeL: Point = [-0.43, 0.11, 0.25], kneeR: Point = [0.43, 0.11, 0.25];
  const ankleL: Point = [0.17, 0.13, 0.38], ankleR: Point = [-0.16, 0.08, 0.3];

  return <group position={position} rotation={[0, rotation, 0]} scale={1.42}>
    {/* zafu cushion */}
    <mesh material={mats.cushion} position={[0, 0.045, 0.02]} receiveShadow castShadow><cylinderGeometry args={[0.3, 0.31, 0.08, 40]} /></mesh>
    <mesh material={mats.cushion} position={[0, 0.045, 0.02]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.295, 0.042, 14, 48]} /></mesh>

    {/* crossed legs (sukhasana) */}
    <Segment from={hipL} to={kneeL} r1={0.088} r2={0.066} material={mats.bottom} />
    <Segment from={hipR} to={kneeR} r1={0.088} r2={0.066} material={mats.bottom} />
    <Segment from={kneeL} to={ankleL} r1={0.06} r2={0.042} material={mats.bottom} />
    <Segment from={kneeR} to={ankleR} r1={0.06} r2={0.042} material={mats.bottom} />
    <mesh material={mats.skin} position={[ankleL[0] + 0.07, ankleL[1] - 0.012, ankleL[2] + 0.015]} rotation={[0, -0.25, 0.15]} scale={[0.1, 0.03, 0.044]} castShadow><sphereGeometry args={[1, 20, 14]} /></mesh>
    <mesh material={mats.skin} position={[ankleR[0] - 0.07, ankleR[1] - 0.012, ankleR[2] + 0.015]} rotation={[0, 0.25, -0.15]} scale={[0.1, 0.03, 0.044]} castShadow><sphereGeometry args={[1, 20, 14]} /></mesh>

    <group ref={upper}>
      {/* pelvis, kurta drape, abdomen, chest */}
      <mesh material={mats.top} position={[0, 0.19, 0]} scale={[f ? 0.205 : 0.19, 0.1, 0.15]} castShadow><sphereGeometry args={[1, 32, 20]} /></mesh>
      <mesh material={mats.top} position={[0, f ? 0.16 : 0.18, 0.02]} scale={[1, 1, 0.82]} castShadow><cylinderGeometry args={[0.17, f ? 0.31 : 0.26, f ? 0.2 : 0.16, 40, 1, true]} /></mesh>
      <mesh material={mats.top} position={[0, 0.34, 0.005]} scale={[f ? 0.15 : 0.165, 0.14, 0.115]} castShadow><sphereGeometry args={[1, 32, 20]} /></mesh>
      <mesh ref={chest} material={mats.top} position={[0, 0.48, 0]} scale={[sw, 0.15, 0.12]} castShadow><sphereGeometry args={[1, 36, 24]} /></mesh>
      <Segment from={[-shoulderX, 0.565, -0.005]} to={[shoulderX, 0.565, -0.005]} r1={0.064} material={mats.top} />
      <mesh material={mats.skin} position={[0, 0.6, 0.06]} rotation={[0.35, 0, 0]} scale={[0.05, 0.035, 0.02]}><sphereGeometry args={[1, 16, 12]} /></mesh>
      <Segment from={[0, 0.6, 0]} to={[0, 0.72, 0.012]} r1={f ? 0.038 : 0.045} r2={f ? 0.035 : 0.042} material={mats.skin} />
      {arm(-1)}{arm(1)}

      <group ref={head} position={H} rotation={[0.1, 0, 0]}>
        <group position={[-H[0], -H[1], -H[2]]}>
          <mesh material={mats.skin} position={H} scale={[0.092, 0.112, 0.102]} castShadow><sphereGeometry args={[1, 40, 30]} /></mesh>
          <mesh material={mats.skin} position={at(0, -0.06, 0.028)} scale={[f ? 0.062 : 0.07, 0.055, 0.068]}><sphereGeometry args={[1, 24, 18]} /></mesh>
          <mesh material={mats.skin} position={at(0, -0.006, 0.104)} rotation={[-0.25, 0, 0]} scale={[0.015, 0.03, 0.02]}><sphereGeometry args={[1, 16, 12]} /></mesh>
          {([-1, 1] as const).map((s) => <group key={s}>
            <mesh material={mats.skin} position={at(s * 0.092, -0.005, 0)} scale={[0.012, 0.027, 0.018]}><sphereGeometry args={[1, 12, 10]} /></mesh>
            {/* closed eyelids and brows */}
            <mesh material={mats.feature} position={at(s * 0.034, 0.012, 0.093)} rotation={[0, s * 0.3, s * -0.08]} scale={[0.02, 0.0028, 0.006]}><sphereGeometry args={[1, 12, 8]} /></mesh>
            <mesh material={mats.hair} position={at(s * 0.036, 0.038, 0.092)} rotation={[0, s * 0.3, s * 0.12]} scale={[0.024, 0.0045, 0.008]}><sphereGeometry args={[1, 12, 8]} /></mesh>
          </group>)}
          <mesh material={mats.lips} position={at(0, -0.06, 0.093)} scale={[0.021, 0.0055, 0.008]}><sphereGeometry args={[1, 14, 10]} /></mesh>
          <mesh material={mats.hair} position={at(0, 0.008, -0.006)} rotation={[-0.55, 0, 0]} scale={[0.1, 0.12, 0.108]} castShadow><sphereGeometry args={[1, 40, 24, 0, Math.PI * 2, 0, f ? 1.75 : 1.5]} /></mesh>
          {f ? <>
            <mesh material={mats.hair} position={at(0, 0.02, -0.112)} scale={0.055} castShadow><sphereGeometry args={[1, 24, 18]} /></mesh>
            <Segment from={at(0, -0.02, -0.11)} to={[0, 0.42, -0.11]} r1={0.03} r2={0.016} material={mats.hair} />
            <mesh material={mats.hair} position={at(0, 0.075, 0.07)} rotation={[0.6, 0, 0]} scale={[0.085, 0.03, 0.04]}><sphereGeometry args={[1, 20, 12]} /></mesh>
          </> : <mesh material={mats.hair} position={at(0, -0.072, 0.045)} scale={[0.07, 0.042, 0.062]}><sphereGeometry args={[1, 24, 16, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55]} /></mesh>}
        </group>
      </group>
    </group>
  </group>;
}

function MeditationDais() {
  return <group position={[0, -2.12, 0.32]}>
    <mesh receiveShadow rotation={[0, 0.1, 0]}><cylinderGeometry args={[1.72, 1.84, 0.18, 72]} /><meshStandardMaterial color="#b89f78" roughness={0.74} metalness={0.05} /></mesh>
    <mesh receiveShadow position={[0, 0.11, 0]} rotation={[0, 0.1, 0]}><cylinderGeometry args={[1.55, 1.62, 0.045, 72]} /><meshStandardMaterial color="#e7d7b8" roughness={0.58} /></mesh>
    <mesh position={[0, 0.136, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[1.38, 1.42, 72]} /><meshStandardMaterial color="#c6a46b" roughness={0.4} metalness={0.35} /></mesh>
  </group>;
}

function Diya({ position, reduced }: { position: Point; reduced: boolean }) {
  const flame = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const bowl = useMemo(() => new THREE.LatheGeometry([
    new THREE.Vector2(0, 0), new THREE.Vector2(0.07, 0.005), new THREE.Vector2(0.11, 0.035), new THREE.Vector2(0.125, 0.06), new THREE.Vector2(0.115, 0.065), new THREE.Vector2(0.09, 0.04), new THREE.Vector2(0, 0.035),
  ], 40), []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const flicker = reduced ? 1 : 1 + Math.sin(t * 13) * 0.06 + Math.sin(t * 7.3) * 0.08;
    if (flame.current) flame.current.scale.set(0.022, 0.055 * flicker, 0.022);
    if (light.current) light.current.intensity = 1.6 * flicker;
  });
  return <group position={position}>
    <mesh geometry={bowl} castShadow><meshStandardMaterial color="#b98a45" roughness={0.32} metalness={0.75} /></mesh>
    <mesh ref={flame} position={[0, 0.115, 0]} scale={[0.022, 0.055, 0.022]}><sphereGeometry args={[1, 16, 12]} /><meshBasicMaterial color="#ffd27a" toneMapped={false} /></mesh>
    <mesh position={[0, 0.12, 0]} scale={0.09}><sphereGeometry args={[1, 16, 12]} /><meshBasicMaterial color="#ffc46b" transparent opacity={0.14} depthWrite={false} toneMapped={false} /></mesh>
    <pointLight ref={light} position={[0, 0.2, 0]} color="#ffb766" distance={3.2} decay={2} intensity={1.6} />
  </group>;
}

function Lotus({ position, scale = 1, phase = 0, reduced }: { position: Point; scale?: number; phase?: number; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current || reduced) return;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.6 + phase) * 0.012;
    ref.current.rotation.y = phase + Math.sin(clock.elapsedTime * 0.2 + phase) * 0.15;
  });
  return <group ref={ref} position={position} rotation={[0, phase, 0]} scale={scale}>
    <mesh rotation={[-Math.PI / 2, 0, 0.4]}><circleGeometry args={[0.32, 32, 0.3, Math.PI * 1.85]} /><meshStandardMaterial color="#4f7a52" roughness={0.6} side={THREE.DoubleSide} /></mesh>
    {Array.from({ length: 8 }).map((_, i) => <mesh key={i} position={[Math.cos(i / 8 * Math.PI * 2) * 0.06, 0.06, Math.sin(i / 8 * Math.PI * 2) * 0.06]} rotation={[0, -i / 8 * Math.PI * 2, 0.75]} scale={[0.035, 0.1, 0.02]}><sphereGeometry args={[1, 12, 10]} /><meshStandardMaterial color={i % 2 ? '#f2c6d6' : '#e7a8c1'} roughness={0.5} /></mesh>)}
    {Array.from({ length: 5 }).map((_, i) => <mesh key={`inner-${i}`} position={[Math.cos(i / 5 * Math.PI * 2 + 0.3) * 0.025, 0.08, Math.sin(i / 5 * Math.PI * 2 + 0.3) * 0.025]} rotation={[0, -i / 5 * Math.PI * 2 - 0.3, 0.3]} scale={[0.028, 0.08, 0.016]}><sphereGeometry args={[1, 12, 10]} /><meshStandardMaterial color="#fbe0e8" roughness={0.45} /></mesh>)}
    <mesh position={[0, 0.1, 0]} scale={[0.025, 0.012, 0.025]}><sphereGeometry args={[1, 12, 8]} /><meshStandardMaterial color="#f2c45a" roughness={0.5} /></mesh>
  </group>;
}

const HIM: PersonLook = { skin: '#a8704f', hair: '#1c1412', top: '#eae3d6', bottom: '#5c6b80', cushion: '#6f7f97' };
const HER: PersonLook = { skin: '#bf8763', hair: '#24170f', top: '#9b6f8f', bottom: '#efe7dc', cushion: '#b98a5c', feminine: true };

function Figure({ reduced }: { reduced: boolean }) {
  return <group>
    <MeditationDais />
    <MeditatingPerson position={[-0.72, -1.985, 0.32]} rotation={0.14} look={HIM} />
    <MeditatingPerson position={[0.72, -1.985, 0.3]} rotation={-0.14} look={HER} />
    <Diya position={[0, -1.985, 1.45]} reduced={reduced} />
  </group>;
}

function BreathField({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!group.current || reduced) return;
    const t = nowSeconds();
    group.current.scale.setScalar(0.96 + breathAt(t) * 0.08);
    group.current.rotation.z = t * 0.012;
  });
  return <group ref={group} position={[0, -0.12, -0.2]}>
    <mesh rotation={[0, 0, 0.08]}><torusGeometry args={[1.8, 0.012, 12, 96]} /><meshBasicMaterial color="#d8c4d9" transparent opacity={0.28} /></mesh>
    <mesh rotation={[0, 0, -0.14]} scale={0.72}><torusGeometry args={[1.8, 0.012, 12, 96]} /><meshBasicMaterial color="#f4d9a6" transparent opacity={0.24} /></mesh>
    <mesh rotation={[0, 0, 0.22]} scale={0.47}><torusGeometry args={[1.8, 0.01, 12, 96]} /><meshBasicMaterial color="#c8dfc8" transparent opacity={0.3} /></mesh>
  </group>;
}

function Petals({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => { const values = new Float32Array(count * 3); for (let i = 0; i < count; i++) { values[i * 3] = (Math.random() - 0.5) * 11; values[i * 3 + 1] = -1.5 + Math.random() * 4.8; values[i * 3 + 2] = -0.4 + Math.random() * 2.3; } return values; }, [count]);
  useFrame(({ clock }) => { if (!ref.current || reduced) return; ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.08; ref.current.position.x = Math.sin(clock.elapsedTime * 0.16) * 0.2; });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#f4d6d0" size={0.09} transparent opacity={0.78} depthWrite={false} /></points>;
}

function Fireflies({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => { const values = new Float32Array(count * 3); for (let i = 0; i < count; i++) { values[i * 3] = (Math.random() - 0.5) * 8; values[i * 3 + 1] = -1.7 + Math.random() * 3.2; values[i * 3 + 2] = 0.4 + Math.random() * 1.1; } return values; }, [count]);
  useFrame(({ clock }) => { if (!ref.current || reduced) return; const material = ref.current.material as THREE.PointsMaterial; material.opacity = 0.25 + (Math.sin(clock.elapsedTime * 0.9) + 1) * 0.16; ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.12; });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#ffe7a6" size={0.055} transparent opacity={0.36} depthWrite={false} toneMapped={false} /></points>;
}

function PeaceParticles({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = 240;
  const positions = useMemo(() => new Float32Array(count * 3), []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = reduced ? 0 : clock.elapsedTime * 0.08;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const ribbon = i % 3;
      const step = Math.floor(i / 3) / (count / 3);
      const angle = step * Math.PI * 2 + time * (ribbon === 1 ? -0.7 : 0.45);
      const radius = 1.52 + ribbon * 0.33 + Math.sin(step * Math.PI * 6 + time * 4) * 0.06;
      attr.setX(i, Math.cos(angle) * radius);
      attr.setY(i, Math.sin(angle) * radius * 0.56 + 0.02);
      attr.setZ(i, -0.02 + Math.sin(angle * 2 + time) * 0.12 + ribbon * 0.04);
    }
    attr.needsUpdate = true;
    const material = ref.current.material as THREE.PointsMaterial;
    material.opacity = 0.12 + (Math.sin(clock.elapsedTime * 0.42) + 1) * 0.08;
  });
  return <points ref={ref} position={[0, -0.05, -0.18]}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#f6dfb8" size={0.035} transparent opacity={0.22} depthWrite={false} toneMapped={false} /></points>;
}

function JourneyScene({ progress, reduced, compact }: { progress: number; reduced: boolean; compact: boolean }) {
  const root = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => { const move = (event: PointerEvent) => { pointer.current.x = event.clientX / window.innerWidth * 2 - 1; pointer.current.y = -(event.clientY / window.innerHeight * 2 - 1); }; window.addEventListener('pointermove', move, { passive: true }); return () => window.removeEventListener('pointermove', move); }, []);
  useFrame((_, delta) => {
    if (!root.current) return;
    const t = reduced ? 0 : progress;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 10 - t * 2.2, 1.4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, t * 0.45 + pointer.current.y * 0.08, 1.2, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.current.x * 0.16, 1.2, delta);
    camera.lookAt(0, 0.1 + t * 0.25, 0);
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.current.x * 0.035, 1.1, delta);
  });
  return <group ref={root}>
    <color attach="background" args={['#cbdcca']} /><fog attach="fog" args={['#cbdcca', 8, 18]} />
    <ambientLight intensity={0.62} color="#eef5e9" /><hemisphereLight args={['#fff4dd', '#345345', 1.15]} /><directionalLight castShadow position={[-4, 6, 4]} intensity={2.3} color="#ffdca5" shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} shadow-normalBias={0.02} />
    <directionalLight position={[3, 2.5, -4]} intensity={0.9} color="#e6d9ff" />
    <Sun progress={progress} />
    <MountainLayer depth={-4.2} color="#a9c0af" points={[-2.1, 0.3, -0.5, 0.8, -0.2, 0.55, -2.1]} progress={progress} />
    <MountainLayer depth={-3.2} color="#77998a" points={[-2.4, -0.3, -1.2, 0.2, -0.9, 0.4, -1.1, -2.4]} progress={progress} />
    <Mist progress={progress} /><Water progress={progress} />
    {/* Left trees sit back and outward so they don't crowd the copy card. */}
    <Tree position={[-5.7, -2.55, 0.2]} scale={1.3} /><Tree position={[4.5, -2.55, 0.4]} scale={1.55} /><Tree position={[-3.1, -2.6, -1.5]} scale={0.7} />
    <Lotus position={[-2.7, -2.6, 1.3]} scale={1.1} phase={0.4} reduced={reduced} />
    <Lotus position={[2.5, -2.6, 1.6]} phase={2.1} reduced={reduced} />
    <Lotus position={[-1.9, -2.6, 2.1]} scale={0.8} phase={3.7} reduced={reduced} />
    <Lotus position={[3.4, -2.6, 0.9]} scale={0.9} phase={5.2} reduced={reduced} />
    <Figure reduced={reduced} /><BreathField reduced={reduced} />
    <Petals count={compact ? 32 : 68} reduced={reduced} /><Fireflies count={compact ? 12 : 24} reduced={reduced} /><PeaceParticles reduced={reduced} />
    <ContactShadows position={[0, -2.62, 0.2]} opacity={0.34} scale={9} blur={2.8} far={4.2} resolution={256} color="#355646" />
  </group>;
}

/** On-screen breathing guide, synced to the same rhythm as the meditators. */
function BreathCue({ reduced }: { reduced: boolean }) {
  const orb = useRef<HTMLSpanElement>(null);
  const [inhale, setInhale] = useState(true);
  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const tick = () => {
      const t = nowSeconds();
      if (orb.current) orb.current.style.transform = `scale(${0.45 + breathAt(t) * 0.55})`;
      setInhale(Math.cos(t * BREATH_RATE) > 0);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);
  return <div className="absolute bottom-6 left-1/2 z-[4] flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/70 bg-[#f6f9f3]/80 py-2 pl-2 pr-5 shadow-[0_12px_30px_-18px_rgba(24,51,38,.5)] backdrop-blur-md sm:bottom-10" aria-hidden="true">
    <span className="relative grid h-9 w-9 place-items-center rounded-full bg-[#6b5a9e]/10">
      <span ref={orb} className="h-9 w-9 rounded-full bg-[radial-gradient(circle,#b9a8e0_0%,#6b5a9e_70%)] opacity-80" />
    </span>
    <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#2c4a39]">{reduced ? 'Breathe slowly' : inhale ? 'Breathe in…' : 'Breathe out…'}</span>
  </div>;
}

export default function SanctuaryExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useJourneyProgress(sectionRef);
  const reduced = usePrefersReducedMotion();
  const compact = useMediaQuery('(max-width: 900px)');
  const stage = stageFor(progress);
  return <section ref={sectionRef} className="sanctuary-experience relative h-[320vh] bg-[#e9f1e4]" aria-label="A cinematic meditation sanctuary">
    <div className="sticky top-0 h-screen overflow-hidden"><Canvas shadows dpr={[1, compact ? 1.2 : 1.65]} camera={{ position: [0, 0, 10], fov: 38 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}><JourneyScene progress={progress} reduced={reduced} compact={compact} /></Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(46,72,57,.18)_100%)]" />
      <div className="sanctuary-copy absolute left-4 top-1/2 w-[min(25rem,calc(100%-2rem))] -translate-y-1/2 sm:left-8 lg:left-12">
        <div className="rounded-[2rem] border border-white/70 bg-[#f6f9f3]/80 p-7 shadow-[0_30px_60px_-30px_rgba(24,51,38,.5)] backdrop-blur-xl sm:p-9">
          <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#6b5a9e]">01 — A slower way back</p>
          <p key={stage} className="sanctuary-stage-label mt-4 text-xs font-medium uppercase tracking-[0.22em] text-[#365945]">{STAGES[stage]}</p>
          <h2 className="mt-3 font-serif text-5xl font-light leading-[.95] text-[#183326] sm:text-6xl">Come back to <em className="text-[#6b5a9e]">yourself.</em></h2>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[#234634]">A gentle journey through the layers of integrative healing—mind, body, and the quiet wisdom between them.</p>
          <div className="mt-7 flex items-center gap-2" role="progressbar" aria-label="Journey progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
            {STAGES.map((label, i) => <span key={label} title={label} className={`h-1.5 rounded-full transition-all duration-700 ${i === stage ? 'w-8 bg-[#6b5a9e]' : i < stage ? 'w-3 bg-[#6b5a9e]/45' : 'w-3 bg-[#365945]/20'}`} />)}
            <span className="ml-2 text-[10px] font-medium tabular-nums tracking-[0.2em] text-[#365945]/80">{String(Math.round(progress * 100)).padStart(2, '0')}%</span>
          </div>
        </div>
      </div>
      <BreathCue reduced={reduced} />
      <div className="absolute bottom-10 right-5 z-[4] hidden items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#2c4a39] lg:flex lg:right-8"><span className="h-px w-8 bg-[#6b5a9e]/60" /> Scroll to continue</div>
    </div>
  </section>;
}
