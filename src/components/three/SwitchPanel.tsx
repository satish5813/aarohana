"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Brand-aligned accent palette (teal/cyan tech tokens)
const VIOLET = "#6366f1"; // indigo pop
const BLUE = "#06b6d4"; // cyan primary
const SKY = "#2dd4bf"; // teal accent
const AMBER = "#f0a13a"; // warm pop (lights)
const GREEN = "#22d3aa";

/* A glowing control tile: dark rounded chip with a pulsing icon node + label bar */
function ControlTile({
  position,
  color,
  index,
  active = false,
}: {
  position: [number, number, number];
  color: string;
  index: number;
  active?: boolean;
}) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (!mat.current) return;
    const target =
      (active ? 2.4 : 0.9) + Math.sin(s.clock.elapsedTime * 1.6 + index) * 0.4;
    mat.current.emissiveIntensity = THREE.MathUtils.lerp(
      mat.current.emissiveIntensity,
      target,
      0.1
    );
  });
  return (
    <group position={position}>
      <RoundedBox args={[0.8, 0.8, 0.05]} radius={0.18} smoothness={4}>
        <meshPhysicalMaterial
          color={active ? "#1b2236" : "#141826"}
          metalness={0.3}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.18}
        />
      </RoundedBox>
      {/* icon node */}
      <mesh position={[0, 0.12, 0.04]}>
        <circleGeometry args={[0.13, 40]} />
        <meshStandardMaterial
          ref={mat}
          color="#ffffff"
          emissive={color}
          emissiveIntensity={1.4}
          roughness={0.3}
        />
      </mesh>
      {/* label bars */}
      <mesh position={[0, -0.16, 0.04]}>
        <planeGeometry args={[0.42, 0.055]} />
        <meshStandardMaterial color="#46506a" />
      </mesh>
      <mesh position={[-0.07, -0.27, 0.04]}>
        <planeGeometry args={[0.28, 0.045]} />
        <meshStandardMaterial color="#2c344a" />
      </mesh>
    </group>
  );
}

/* Animated climate dial — a near-full glowing ring with a temperature readout */
function ClimateDial() {
  const arc = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (arc.current)
      arc.current.emissiveIntensity =
        1.7 + Math.sin(s.clock.elapsedTime * 1.4) * 0.5;
  });
  return (
    <group position={[0, 0.82, 0.04]}>
      {/* track ring */}
      <mesh rotation={[0, 0, Math.PI * 0.75]}>
        <torusGeometry args={[0.4, 0.03, 16, 72, Math.PI * 1.5]} />
        <meshStandardMaterial color="#222a3d" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* active arc */}
      <mesh rotation={[0, 0, Math.PI * 0.75]}>
        <torusGeometry args={[0.4, 0.042, 16, 72, Math.PI * 1.04]} />
        <meshStandardMaterial
          ref={arc}
          color="#ffffff"
          emissive={SKY}
          emissiveIntensity={1.8}
          roughness={0.3}
        />
      </mesh>
      {/* big temp readout (two bars suggesting "23°") */}
      <mesh position={[0, 0.04, 0.02]}>
        <planeGeometry args={[0.34, 0.12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={SKY}
          emissiveIntensity={0.7}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh position={[0, -0.13, 0.02]}>
        <planeGeometry args={[0.2, 0.045]} />
        <meshStandardMaterial color="#46506a" emissive={BLUE} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

/* Brightness slider with a knob that glides and a glowing fill */
function Slider() {
  const knob = useRef<THREE.Group>(null);
  const fill = useRef<THREE.Mesh>(null);
  const W = 1.5; // track width
  useFrame((s) => {
    const p = 0.5 + Math.sin(s.clock.elapsedTime * 0.7) * 0.32; // 0..1 progress
    const x = (p - 0.5) * W;
    if (knob.current) knob.current.position.x = x;
    if (fill.current) {
      fill.current.scale.x = Math.max(0.001, p);
      fill.current.position.x = -W / 2 + (p * W) / 2;
    }
  });
  return (
    <group position={[0, -1.58, 0.04]}>
      {/* track */}
      <mesh>
        <planeGeometry args={[W, 0.06]} />
        <meshStandardMaterial color="#222a3d" />
      </mesh>
      {/* glowing fill (anchored left, scaled by progress) */}
      <mesh ref={fill} position={[0, 0, 0.005]}>
        <planeGeometry args={[W, 0.06]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={AMBER}
          emissiveIntensity={1.4}
        />
      </mesh>
      {/* knob */}
      <group ref={knob}>
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[0.08, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={AMBER}
            emissiveIntensity={1.2}
            roughness={0.25}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function SwitchPanel() {
  const group = useRef<THREE.Group>(null);
  const led = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.elapsedTime;
      group.current.position.y = Math.sin(t * 0.9) * 0.12;
      const baseSpin = Math.sin(t * 0.35) * 0.4;
      const { x, y } = state.pointer;
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        baseSpin + x * 0.32,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -y * 0.18,
        0.05
      );
    }
    if (led.current)
      led.current.emissiveIntensity =
        2 + Math.sin(state.clock.elapsedTime * 2.2) * 0.8;
  });

  return (
    <group ref={group} scale={1.05}>
      {/* light-silver frame */}
      <RoundedBox
        args={[2.62, 3.82, 0.18]}
        radius={0.2}
        smoothness={6}
        position={[0, 0, -0.07]}
      >
        <meshStandardMaterial color="#d4d8e2" metalness={0.9} roughness={0.25} />
      </RoundedBox>

      {/* dark glossy screen */}
      <RoundedBox args={[2.44, 3.64, 0.2]} radius={0.16} smoothness={6}>
        <meshPhysicalMaterial
          color="#0a0c14"
          metalness={0.2}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.06}
          reflectivity={0.6}
        />
      </RoundedBox>

      {/* ── status bar ── */}
      <group position={[0, 1.5, 0.11]}>
        {/* greeting bar (left) */}
        <mesh position={[-0.78, 0, 0]}>
          <planeGeometry args={[0.62, 0.07]} />
          <meshStandardMaterial color="#46506a" />
        </mesh>
        {/* signal dots (right) */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0.74 + i * 0.12, 0, 0]}>
            <circleGeometry args={[0.028, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={SKY}
              emissiveIntensity={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* ── climate dial ── */}
      <ClimateDial />

      {/* ── 2×2 control grid ── */}
      <ControlTile position={[-0.52, -0.2, 0.11]} color={AMBER} index={0} active />
      <ControlTile position={[0.52, -0.2, 0.11]} color={BLUE} index={1} />
      <ControlTile position={[-0.52, -1.05, 0.11]} color={VIOLET} index={2} />
      <ControlTile position={[0.52, -1.05, 0.11]} color={SKY} index={3} active />

      {/* ── brightness slider ── */}
      <Slider />

      {/* status LED at the very bottom */}
      <mesh position={[0, -1.78, 0.11]}>
        <circleGeometry args={[0.022, 20]} />
        <meshStandardMaterial
          ref={led}
          color="#ffffff"
          emissive={GREEN}
          emissiveIntensity={2.4}
        />
      </mesh>
    </group>
  );
}
