"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float, Box, Text } from "@react-three/drei";
import * as THREE from "three";
import { techStackIcons, skillsData } from "@/constants";

const BrowserStack = () => {
    return (
        <group position={[-8, 0, 0]}>
            <mesh>
                <boxGeometry args={[10, 6, 0.2]} />
                <meshStandardMaterial color="#111" />
                <Html transform position={[0, 0, 0.11]} distanceFactor={6}>
                    <div className="w-[800px] h-[480px] bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
                        <div className="h-8 bg-slate-800 flex items-center px-4 gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <div className="ml-4 bg-slate-700/50 px-4 py-1 rounded text-[10px] text-slate-400 w-1/2">localhost:3000</div>
                        </div>
                        <div className="p-8 grid grid-cols-3 gap-6">
                            {skillsData[2].skills.map(skill => (
                                <div key={skill} className="p-4 bg-slate-800/50 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-colors">
                                    <div className="text-cyan-400 font-bold mb-1">{skill}</div>
                                    <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-500 w-3/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Html>
            </mesh>
        </group>
    )
}

const PhoneFrame = () => {
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        const width = 4.5;
        const height = 9;
        const radius = 0.5;
        
        s.moveTo(-width/2 + radius, -height/2);
        s.lineTo(width/2 - radius, -height/2);
        s.quadraticCurveTo(width/2, -height/2, width/2, -height/2 + radius);
        s.lineTo(width/2, height/2 - radius);
        s.quadraticCurveTo(width/2, height/2, width/2 - radius, height/2);
        s.lineTo(-width/2 + radius, height/2);
        s.quadraticCurveTo(-width/2, height/2, -width/2, height/2 - radius);
        s.lineTo(-width/2, -height/2 + radius);
        s.quadraticCurveTo(-width/2, -height/2, -width/2 + radius, -height/2);
        return s;
    }, []);

    const extrudeSettings = { depth: 0.4, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 3 };

    return (
        <group position={[8, 0, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group>
                    <mesh position={[0, 0, -0.2]}>
                        <extrudeGeometry args={[shape, extrudeSettings]} />
                        <meshStandardMaterial color="#1a1a1a" roughness={0.05} metalness={0.9} />
                    </mesh>

                    {/* Side Buttons */}
                    <mesh position={[-2.3, 1, 0]}>
                        <boxGeometry args={[0.1, 0.8, 0.1]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                    <mesh position={[-2.3, 2, 0]}>
                        <boxGeometry args={[0.1, 0.4, 0.1]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>

                    <Html transform position={[0, 0, 0.21]} distanceFactor={4.5}>
                        <div className="w-[300px] h-[600px] bg-black rounded-[40px] overflow-hidden border-[6px] border-slate-800 relative shadow-[0_0_50px_rgba(139,92,246,0.3)]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-800 rounded-b-2xl z-10" />
                            <div className="p-6 pt-12 text-white h-full flex flex-col">
                                <div className="text-xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                    Native Experience
                                </div>
                                <div className="space-y-4 flex-1">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                                    ))}
                                </div>
                                <div className="mt-auto grid grid-cols-4 gap-2">
                                    {Array.from({length: 4}).map((_, i) => (
                                        <div key={i} className="aspect-square bg-purple-500/20 rounded-full flex items-center justify-center">
                                            <div className="w-1/2 h-1/2 bg-purple-500 rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Html>
                </group>
            </Float>
        </group>
    )
}

export const MobileLayer = () => {
  return (
    <group position={[0, -25, 0]}>
        <BrowserStack />
        <PhoneFrame />
        <Text
            position={[0, 8, -5]}
            fontSize={2}
            color="#fff"
            anchorX="center"
            anchorY="middle"
        >
            Frontend & Mobile
        </Text>
    </group>
  );
};
