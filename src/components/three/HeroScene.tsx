"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import SwitchPanel from "./SwitchPanel";

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        {/* lighting rig tuned for a glossy dark screen on a light background */}
        <ambientLight intensity={0.72} />
        <hemisphereLight intensity={0.55} groundColor="#d7dae2" />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        <directionalLight
          position={[-6, 2, -2]}
          intensity={1.3}
          color="#6366f1"
        />
        <pointLight position={[3, -3, 4]} intensity={26} color="#06b6d4" />
        <pointLight position={[-3, 3, 3]} intensity={20} color="#2dd4bf" />
        <spotLight
          position={[0, 5, 6]}
          angle={0.5}
          penumbra={1}
          intensity={1.6}
        />

        <SwitchPanel />

        <ContactShadows
          position={[0, -2.7, 0]}
          opacity={0.32}
          scale={11}
          blur={2.8}
          far={4.5}
          color="#0e1117"
        />
      </Suspense>
    </Canvas>
  );
}
