"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { skillsData } from "@/constants";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  
  void main() {
    float strength = distance(vUv, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);
    
    vec3 color = mix(vec3(0.0, 0.05, 0.1), uColor, strength);
    gl_FragColor = vec4(color, strength * 0.8);
  }
`;

const LowPolyCloud = ({ position }: { position: [number, number, number] }) => {
  const cloudRef = useRef<THREE.Group>(null);
  
  const spheres = useMemo(() => {
    // Create more organic cloud shape with varying sphere sizes
    return [
      // Core large spheres
      { pos: [0, 0, 0], scale: 1.2 },
      { pos: [0.8, 0.1, 0], scale: 1 },
      { pos: [-0.7, 0.15, 0.1], scale: 0.9 },
      { pos: [0.3, 0.5, 0.2], scale: 0.8 },
      { pos: [-0.4, 0.4, -0.1], scale: 0.85 },
      // Medium detail spheres
      { pos: [1.2, -0.2, 0.3], scale: 0.7 },
      { pos: [-1.1, -0.1, 0.2], scale: 0.75 },
      { pos: [0.5, -0.3, 0.4], scale: 0.6 },
      { pos: [-0.3, -0.25, -0.3], scale: 0.65 },
      // Small accent spheres for volume
      { pos: [0.9, 0.6, -0.2], scale: 0.5 },
      { pos: [-0.8, 0.5, 0.3], scale: 0.55 },
      { pos: [0.2, 0.7, 0], scale: 0.45 },
    ];
  }, []);

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      cloudRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={cloudRef} position={position}>
      {spheres.map((sphere, i) => (
        <mesh key={i} position={sphere.pos as [number, number, number]} scale={sphere.scale}>
          <sphereGeometry args={[0.5, 12, 12]} />
          <meshStandardMaterial 
            color="#00d9ff" 
            emissive="#00d9ff" 
            emissiveIntensity={3}
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
};

export const CloudLayer = () => {
  const cloudPositions = useMemo(() => {
    return skillsData[4].skills.map((_, i) => {
      const angle = (i / skillsData[4].skills.length) * Math.PI * 2;
      const radius = 12 + Math.random() * 4;
      return {
        x: Math.cos(angle) * radius,
        y: Math.random() * 4 - 2,
        z: Math.sin(angle) * radius,
      };
    });
  }, []);

  return (
    <group position={[0, 10, 0]}>
      {/* Volumetric glow background */}
      <mesh position={[0, 0, -15]}>
        <planeGeometry args={[60, 40]} />
        <shaderMaterial
          transparent
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: new THREE.Color("#00d9ff") },
          }}
        />
      </mesh>

      {/* Cloud nodes with labels */}
      {skillsData[4].skills.map((skill, i) => (
        <Float key={skill} speed={1 + Math.random()} rotationIntensity={0.3} floatIntensity={0.8}>
          <group position={[cloudPositions[i].x, cloudPositions[i].y, cloudPositions[i].z]}>
            <LowPolyCloud position={[0, 0, 0]} />
            <Html distanceFactor={15} position={[0, 1.2, 0]} center>
              <div className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-400/50 backdrop-blur-xl rounded-full text-[11px] text-cyan-300 font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(0,217,255,0.3)] whitespace-nowrap">
                {skill}
              </div>
            </Html>
          </group>
        </Float>
      ))}
    </group>
  );
};
