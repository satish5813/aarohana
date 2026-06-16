"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Animated({
  children,
  spin = 0.5,
}: {
  children: React.ReactNode;
  spin?: number;
}) {
  const g = useRef<THREE.Group>(null);
  const born = useRef(0);
  useFrame((state, delta) => {
    if (!g.current) return;
    born.current = Math.min(1, born.current + delta * 1.7);
    const e = 1 - Math.pow(1 - born.current, 3);
    g.current.scale.setScalar(e);
    const t = state.clock.elapsedTime;
    g.current.position.y = Math.sin(t * 0.9) * 0.08;
    g.current.rotation.y = t * spin * 0.25 + state.pointer.x * 0.4;
    g.current.rotation.x = THREE.MathUtils.lerp(
      g.current.rotation.x,
      -state.pointer.y * 0.18,
      0.05
    );
  });
  return <group ref={g}>{children}</group>;
}

function GlowKey({
  position,
  color,
  i = 0,
  r = 0.14,
}: {
  position: [number, number, number];
  color: string;
  i?: number;
  r?: number;
}) {
  const m = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (m.current)
      m.current.emissiveIntensity =
        1.3 + Math.sin(s.clock.elapsedTime * 1.8 + i) * 0.5;
  });
  return (
    <mesh position={position}>
      <circleGeometry args={[r, 40]} />
      <meshStandardMaterial
        ref={m}
        color="#ffffff"
        emissive={color}
        emissiveIntensity={1.4}
        roughness={0.35}
      />
    </mesh>
  );
}

type Layout = "quad" | "triple" | "grid6" | "bigsplit";

function Panel({
  glass,
  bezel,
  keyc,
  layout,
  w = 2.4,
  h = 3.5,
  rough = 0.12,
}: {
  glass: string;
  bezel: string;
  keyc: string;
  layout: Layout;
  w?: number;
  h?: number;
  rough?: number;
}) {
  return (
    <Animated spin={0.4}>
      <RoundedBox
        args={[w + 0.18, h + 0.18, 0.16]}
        radius={0.16}
        smoothness={6}
        position={[0, 0, -0.06]}
      >
        <meshStandardMaterial color={bezel} metalness={0.92} roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[w, h, 0.18]} radius={0.13} smoothness={6}>
        <meshPhysicalMaterial
          color={glass}
          metalness={0.3}
          roughness={rough}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </RoundedBox>
      <mesh position={[0, h / 2 - 0.4, 0.1]}>
        <ringGeometry args={[0.05, 0.07, 32]} />
        <meshStandardMaterial color="#9aa0ad" />
      </mesh>

      {layout === "quad" &&
        [
          [-0.46, 0.5],
          [0.46, 0.5],
          [-0.46, -0.35],
          [0.46, -0.35],
        ].map(([x, y], i) => (
          <GlowKey key={i} position={[x, y, 0.1]} color={keyc} i={i} />
        ))}

      {layout === "triple" && (
        <>
          {[0.6, 0, -0.6].map((y, i) => (
            <GlowKey key={i} position={[0, y, 0.1]} color={keyc} i={i} r={0.17} />
          ))}
          <mesh position={[0, -1.2, 0.1]}>
            <planeGeometry args={[w * 0.55, 0.05]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={keyc}
              emissiveIntensity={0.7}
            />
          </mesh>
        </>
      )}

      {layout === "grid6" &&
        [-0.5, 0.5].map((x, c) =>
          [0.7, 0, -0.7].map((y, rI) => (
            <GlowKey
              key={`${c}-${rI}`}
              position={[x, y, 0.1]}
              color={keyc}
              i={c * 3 + rI}
              r={0.12}
            />
          ))
        )}

      {layout === "bigsplit" && (
        <>
          <mesh position={[0, 0.62, 0.1]}>
            <circleGeometry args={[0.42, 48]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={keyc}
              emissiveIntensity={1.5}
              roughness={0.3}
            />
          </mesh>
          {[-0.5, 0, 0.5].map((x, i) => (
            <GlowKey
              key={i}
              position={[x, -0.55, 0.1]}
              color={keyc}
              i={i}
              r={0.16}
            />
          ))}
        </>
      )}
    </Animated>
  );
}

function Sensor() {
  const ring = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (ring.current)
      ring.current.emissiveIntensity =
        1.4 + Math.sin(s.clock.elapsedTime * 2) * 0.7;
  });
  return (
    <Animated spin={1}>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[1.05, 1.15, 0.35, 48]} />
        <meshStandardMaterial color="#e8eaef" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.32, 0]}>
        <torusGeometry args={[1.02, 0.05, 16, 64]} />
        <meshStandardMaterial
          ref={ring}
          color="#ffffff"
          emissive="#00d6e6"
          emissiveIntensity={1.6}
        />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[1, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#0d0f16"
          metalness={0.2}
          roughness={0.08}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial
          color="#1a1d27"
          emissive="#2f6bff"
          emissiveIntensity={0.6}
        />
      </mesh>
    </Animated>
  );
}

function Blaster() {
  return (
    <Animated spin={1.2}>
      <mesh>
        <cylinderGeometry args={[1.1, 1.1, 0.6, 56]} />
        <meshStandardMaterial color="#15171f" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[1.02, 1.1, 0.06, 56]} />
        <meshStandardMaterial color="#2a2d38" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <sphereGeometry args={[0.55, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#0c0d12" roughness={0.1} clearcoat={1} />
      </mesh>
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.78, 0.34, Math.sin(a) * 0.78]}
          >
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ff6b6b"
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}
    </Animated>
  );
}

function Lock() {
  const fp = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (fp.current)
      fp.current.emissiveIntensity =
        1 + Math.sin(s.clock.elapsedTime * 2.4) * 0.8;
  });
  return (
    <Animated spin={0.4}>
      <RoundedBox args={[1.5, 3.3, 0.55]} radius={0.22} smoothness={5}>
        <meshStandardMaterial color="#1c1f27" metalness={0.7} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.95, 0.3]}>
        <circleGeometry args={[0.42, 40]} />
        <meshStandardMaterial
          ref={fp}
          color="#0c0d12"
          emissive="#00d6e6"
          emissiveIntensity={1.2}
        />
      </mesh>
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            -0.32 + (i % 3) * 0.32,
            0.15 - Math.floor(i / 3) * 0.34,
            0.3,
          ]}
        >
          <circleGeometry args={[0.11, 24]} />
          <meshStandardMaterial
            color="#2c303c"
            emissive="#2f6bff"
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
      <mesh position={[0, -1.2, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.7, 8, 16]} />
        <meshStandardMaterial color="#c9ccd6" metalness={0.95} roughness={0.2} />
      </mesh>
    </Animated>
  );
}

function AppHologram() {
  const scr = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (scr.current)
      scr.current.emissiveIntensity =
        0.7 + Math.sin(s.clock.elapsedTime * 1.5) * 0.2;
  });
  return (
    <Animated spin={0.5}>
      <RoundedBox args={[1.7, 3.3, 0.16]} radius={0.22} smoothness={6}>
        <meshStandardMaterial color="#15171f" metalness={0.6} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.15, 0.1]}>
        <planeGeometry args={[1.45, 2.8]} />
        <meshStandardMaterial
          ref={scr}
          color="#0c0d16"
          emissive="#2f6bff"
          emissiveIntensity={0.8}
        />
      </mesh>
      {[0.95, 0.45].map((y, i) => (
        <mesh key={i} position={[0, y, 0.11]}>
          <planeGeometry args={[1.2, 0.34]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00d6e6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
      {[-0.35, -0.05].map((y, r) =>
        [-0.36, 0.0, 0.36].map((x, c) => (
          <mesh key={`${r}-${c}`} position={[x, y - 0.1, 0.11]}>
            <circleGeometry args={[0.14, 24]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={c === 1 ? "#f59e0b" : "#2f6bff"}
              emissiveIntensity={0.9}
            />
          </mesh>
        ))
      )}
    </Animated>
  );
}

function Accessories() {
  return (
    <Animated spin={0.7}>
      {/* gang plate */}
      <RoundedBox args={[2.6, 1.7, 0.16]} radius={0.12} smoothness={5}>
        <meshStandardMaterial color="#1a1d27" metalness={0.7} roughness={0.3} />
      </RoundedBox>
      {[-0.82, 0, 0.82].map((x, i) => (
        <group key={i} position={[x, 0, 0.12]}>
          <RoundedBox args={[0.66, 1.2, 0.16]} radius={0.08} smoothness={4}>
            <meshStandardMaterial
              color="#0e1117"
              metalness={0.4}
              roughness={0.3}
            />
          </RoundedBox>
          <GlowKey
            position={[0, 0.18, 0.1]}
            color={i === 1 ? "#f59e0b" : "#00d6e6"}
            i={i}
            r={0.15}
          />
          <mesh position={[0, -0.3, 0.1]}>
            <planeGeometry args={[0.42, 0.05]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#2f6bff"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      ))}
    </Animated>
  );
}

export type ProductId =
  | "posh"
  | "quartz"
  | "airtouch"
  | "airglass"
  | "airsensor"
  | "airblaster"
  | "airlock"
  | "airhome"
  | "accessories";

export function ProductModel({ id }: { id: ProductId }) {
  switch (id) {
    case "posh":
      return (
        <Panel
          glass="#0d0f16"
          bezel="#34373f"
          keyc="#6d4bff"
          layout="quad"
        />
      );
    case "quartz":
      return (
        <Panel
          glass="#eef0f4"
          bezel="#e3e5ea"
          keyc="#2f6bff"
          layout="triple"
          w={2.1}
          h={3.7}
        />
      );
    case "airtouch":
      return (
        <Panel
          glass="#15171f"
          bezel="#2a2d38"
          keyc="#f59e0b"
          layout="grid6"
          w={2.6}
          h={3.4}
          rough={0.45}
        />
      );
    case "airglass":
      return (
        <Panel
          glass="#101218"
          bezel="#caa86a"
          keyc="#6d4bff"
          layout="bigsplit"
          w={2.5}
          h={3.5}
        />
      );
    case "airsensor":
      return <Sensor />;
    case "airblaster":
      return <Blaster />;
    case "airlock":
      return <Lock />;
    case "airhome":
      return <AppHologram />;
    case "accessories":
      return <Accessories />;
  }
}
