"use client";
import { Float } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

const W = 2.5;
const H = 3.5;
const D = 0.3;

function FloatingBook({
  position,
  rotation,
  scale,
  coverUrl,
  spineColor,
}: any) {
  const group = React.useRef<THREE.Group>(null);
  const baseRotation = React.useRef(rotation);
  const coverTexture = useLoader(TextureLoader, coverUrl);

  React.useMemo(() => {
    coverTexture.colorSpace = THREE.SRGBColorSpace;
    coverTexture.minFilter = THREE.LinearMipmapLinearFilter;
    coverTexture.magFilter = THREE.LinearFilter;
    coverTexture.generateMipmaps = true;
  }, [coverTexture]);

  useFrame((state) => {
    if (!group.current) return;
    const tiltX = baseRotation.current[0] + state.pointer.y * 0.15;
    const tiltY = baseRotation.current[1] + state.pointer.x * 0.15;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      tiltX,
      0.04,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      tiltY,
      0.04,
    );
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={1.2}
      position={position}
    >
      <group ref={group} rotation={rotation} scale={scale}>
        <mesh position={[0, 0, D / 2 + 0.001]}>
          <planeGeometry args={[W, H]} />
          <meshStandardMaterial
            map={coverTexture}
            roughness={0.25}
            metalness={0.05}
            toneMapped={false}
          />
        </mesh>

        <mesh>
          <boxGeometry args={[W, H, D]} />
          <meshStandardMaterial
            attach="material-0"
            color="#ffffff"
            roughness={0.9}
          />{" "}
          <meshStandardMaterial
            attach="material-1"
            color={spineColor}
            roughness={0.3}
            metalness={0.08}
          />{" "}
          <meshStandardMaterial
            attach="material-2"
            color="#ffffff"
            roughness={0.9}
          />{" "}
          <meshStandardMaterial
            attach="material-3"
            color="#ffffff"
            roughness={0.9}
          />{" "}
          <meshStandardMaterial
            attach="material-4"
            color="#ffffff"
            roughness={0.9}
          />{" "}
          <meshStandardMaterial
            attach="material-5"
            color={spineColor}
            roughness={0.35}
            metalness={0.08}
          />{" "}
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight position={[5, 8, 5]} intensity={3} />
      <directionalLight
        position={[-5, -3, -5]}
        intensity={1.2}
        color="#2cc7e4"
      />
      <pointLight position={[0, 3, 8]} intensity={1.5} color="#ffffff" />

      <FloatingBook
        position={[1.2, 1.8, -1]}
        rotation={[0.1, -0.4, 0.05]}
        scale={1}
        coverUrl="/images/books/cover-1.png"
        spineColor="#8b1a1a"
      />
      <FloatingBook
        position={[4, -0.2, -3]}
        rotation={[-0.1, -0.6, -0.1]}
        scale={0.8}
        coverUrl="/images/books/cover-2.png"
        spineColor="#5c1a6e"
      />
      <FloatingBook
        position={[0.8, -3, -5]}
        rotation={[0.2, -0.3, -0.05]}
        scale={1.3}
        coverUrl="/images/books/cover-3.png"
        spineColor="#0a4a3a"
      />
    </>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-y-10 right-10 w-[55%] z-1 overflow-hidden hidden lg:block" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "auto" }}
        eventSource={typeof document !== "undefined" ? document.documentElement : undefined}
      >
        <React.Suspense fallback={null}>
          <Scene />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
