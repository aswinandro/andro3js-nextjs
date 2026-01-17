"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float, Box } from "@react-three/drei";
import * as THREE from "three";
import { expCards } from "@/constants";

const API_LINES_COUNT = 30;

const ApiTraffic = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => {
    return Array.from({ length: API_LINES_COUNT }).map(() => ({
      x: (Math.random() - 0.5) * 30,
      z: (Math.random() - 0.5) * 15,
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const matrix = new THREE.Matrix4();
    data.forEach((d, i) => {
      const y = ((time * d.speed + d.offset) % 20) - 10;
      matrix.makeTranslation(d.x, y, d.z);
      meshRef.current!.setMatrixAt(i, matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, API_LINES_COUNT]}>
      <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
      <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={10} transparent opacity={0.6} />
    </instancedMesh>
  );
};

const ServerRack = ({ card, index }: { card: any, index: number }) => {
  const ledRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ledRef.current) {
      ledRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        if (!Array.isArray(mesh.material)) {
            mesh.material = mesh.material.clone();
            const intensity = Math.sin(state.clock.elapsedTime * 2 + i + index) * 0.5 + 0.5;
            (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity * 5;
        }
      });
    }
  });

  return (
    <group position={[(index - 1) * 8, 0, -5]}>
      {/* Main Chassis */}
      <Box args={[4, 6, 2]}>
        <meshStandardMaterial color="#0f0f0f" roughness={0.1} metalness={0.9} />
      </Box>
      
      {/* Side LEDs */}
      <group ref={ledRef} position={[-2.1, 0, 0]}>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[0, (i - 3.5) * 0.6, 0.8]}>
            <boxGeometry args={[0.1, 0.2, 0.2]} />
            <meshStandardMaterial color="#00ff41" emissive="#00ff41" />
          </mesh>
        ))}
      </group>

      {/* Screen Interface */}
      <mesh position={[0, 0, 1.01]}>
        <planeGeometry args={[3.8, 5.8]} />
        <meshStandardMaterial color="#000" />
        <Html transform distanceFactor={4} position={[0, 0, 0.01]}>
          <div className="w-[300px] h-[450px] p-6 text-[#00ff41] font-mono bg-black/90 overflow-hidden border border-[#00ff41]/30 backdrop-blur-sm">
            <div className="text-[10px] mb-2 opacity-50 flex justify-between">
              <span>{card.date}</span>
              <span className="animate-pulse">● LIVE</span>
            </div>
            <div className="text-lg font-bold mb-4 uppercase tracking-tighter border-b border-[#00ff41]/20 pb-2">{card.title}</div>
            <div className="text-[10px] leading-relaxed space-y-2">
              {card.responsibilities.map((r: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                   <span className="opacity-50">0{idx+1}</span>
                   <span>{r}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                <div className="text-[8px] opacity-30">PROCESSED BY CORE_ENGINE_v4</div>
                <div className="w-12 h-12 border border-[#00ff41]/20 p-1">
                    <div className="w-full h-full bg-[#00ff41]/10 flex flex-wrap gap-[1px]">
                        {[...Array(16)].map((_, i) => <div key={i} className="w-[6px] h-[6px] bg-[#00ff41]/30" />)}
                    </div>
                </div>
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
};

export const BackendLayer = () => {
  return (
    <group position={[0, 0, 0]}>
      <ApiTraffic />
      
      {expCards.map((card, i) => (
        <ServerRack key={i} card={card} index={i} />
      ))}

      {/* Grid Floor */}
      <gridHelper args={[100, 40, "#003300", "#001100"]} position={[0, -3, 0]} />
    </group>
  );
};
