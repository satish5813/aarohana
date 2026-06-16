"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { ProductModel, type ProductId } from "./ProductModels";

function HaloRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s, d) => {
    if (ref.current) ref.current.rotation.z += d * 0.4;
  });
  return (
    <mesh ref={ref} position={[0, -2.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2.6, 0.02, 16, 96]} />
      <meshStandardMaterial
        color="#6d4bff"
        emissive="#6d4bff"
        emissiveIntensity={2}
      />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 220;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((s, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#9a8cff"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

export default function ProductGalleryScene({ id }: { id: ProductId }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.4, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.85} />
        <hemisphereLight intensity={0.5} groundColor="#cfd2db" />
        <directionalLight position={[5, 6, 5]} intensity={2.2} />
        <directionalLight
          position={[-6, 2, -3]}
          intensity={1.1}
          color="#6d4bff"
        />
        <pointLight position={[3, -2, 4]} intensity={26} color="#2f6bff" />
        <pointLight position={[-3, 3, 3]} intensity={20} color="#f59e0b" />
        <spotLight position={[0, 6, 4]} angle={0.5} penumbra={1} intensity={1.6} />

        <Particles />

        {/* key forces remount + entrance animation on product change */}
        <group key={id} position={[0, 0.35, 0]}>
          <ProductModel id={id} />
        </group>

        <HaloRing />

        {/* glowing pedestal */}
        <mesh position={[0, -2.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.4, 64]} />
          <meshStandardMaterial
            color="#0c0d12"
            emissive="#6d4bff"
            emissiveIntensity={0.18}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>

        <ContactShadows
          position={[0, -2.12, 0]}
          opacity={0.4}
          scale={9}
          blur={3}
          far={4}
          color="#0e1117"
        />
      </Suspense>
    </Canvas>
  );
}
