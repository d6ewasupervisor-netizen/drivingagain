import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export default function DrivingScene({ onMileageUpdate, weather, currentMileage }: any) {
  const carRef = useRef<THREE.Group>(null);
  const [steer, setSteer] = useState(0);
  const [brake, setBrake] = useState(false);
  const [mileage, setMileage] = useState(currentMileage);

  useFrame((_, delta) => {
    const speed = brake ? 30 : 68;
    const move = speed * delta * 18;
    const newMileage = mileage + move * 0.035;
    setMileage(newMileage);
    onMileageUpdate(newMileage);

    if (carRef.current) {
      carRef.current.position.x = THREE.MathUtils.lerp(carRef.current.position.x, steer * 0.65, 0.25);
    }
  });

  // Touch controls
  const handlePointer = (e: any) => {
    const dx = (e.clientX - window.innerWidth / 2) / 12;
    setSteer(Math.max(-30, Math.min(30, dx)));
    setBrake(e.clientY > window.innerHeight * 0.6);
  };

  return (
    <Canvas
      id="three-canvas"
      camera={{ position: [0, 28, 85] }}
      onPointerMove={handlePointer}
      onPointerUp={() => { setSteer(0); setBrake(false); }}
      style={{ background: weather === 'fog' ? '#334155' : '#111827' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[40, 100, 40]} intensity={1.4} color={weather === 'snow' ? '#fff' : '#ffddaa'} />

      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -300]}>
        <planeGeometry args={[140, 2000]} />
        <meshLambertMaterial color="#1f2937" />
      </mesh>

      {/* Pink Bug Beast (procedural) */}
      <group ref={carRef}>
        {/* Body */}
        <mesh position={[0, 10, 0]}>
          <boxGeometry args={[22, 14, 42]} />
          <meshLambertMaterial color="#ffb6c1" />
        </mesh>
        {/* Wheels */}
        {[ -14, 14, -14, 14 ].map((x, i) => (
          <mesh key={i} position={[x, 5, i < 2 ? 14 : -14]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[7, 7, 6, 32]} />
            <meshLambertMaterial color="#111827" />
          </mesh>
        ))}
        {/* Spikes */}
        <mesh position={[0, 22, 0]}>
          <coneGeometry args={[6, 18, 4]} />
          <meshLambertMaterial color="#111827" />
        </mesh>
      </group>

      {/* Scrolling road lines */}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 1, -900 + (i * 110) % 2000]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <boxGeometry args={[8, 1, 40]} />
          <meshLambertMaterial color="#ffb6c1" />
        </mesh>
      ))}
    </Canvas>
  );
}
