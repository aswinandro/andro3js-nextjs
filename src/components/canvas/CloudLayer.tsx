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
  uniform float time;
  
  void main() {
    float strength = distance(vUv, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);
    
    vec3 color = mix(vec3(0.0, 0.05, 0.1), vec3(0.0, 0.95, 1.0), strength);
    gl_FragColor = vec4(color, strength * 0.8);
  }
`;

const LowPolyCloud = ({ label }: { label: string }) => {
  const parts = useMemo(() => {
    return Array.from({ length: 4 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.8
      ),
      scale: 0.2 + Math.random() * 0.4
    }));
  }, []);

  return (
    <group>
      {parts.map((part, i) => (
        <mesh key={i} position={part.position} scale={part.scale}>
          <sphereGeometry args={[1, 7, 7]} />
          <meshStandardMaterial color="#e0faff" emissive="#00f2ff" emissiveIntensity={0.5} flatShading />
        </mesh>
      ))}
      <Html distanceFactor={12} position={[0, 0.8, 0]} center>
        <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 backdrop-blur-xl rounded-full text-[10px] text-cyan-400 font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,242,255,0.3)]">
          {label}
        </div>
      </Html>
    </group>
  );
};

export const CloudLayer = () => {
  const cloudData = skillsData.find(d => d.category === "Cloud & DevOps")?.skills || [];

  const points = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        22 + (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 20
      ),
      label: cloudData[i % cloudData.length]
    }));
  }, [cloudData]);

  return (
    <group>
      {/* Background Glow */}
      <mesh position={[0, 20, -15]} scale={[120, 80, 1]}>
        <planeGeometry />
        <shaderMaterial
          transparent
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{ time: { value: 0 } }}
        />
      </mesh>

      {points.map((p, i) => (
        <Float key={i} position={p.position} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={0.5}>
          <LowPolyCloud label={p.label} />
        </Float>
      ))}
    </group>
  );
};
