"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float, Box, Text } from "@react-three/drei";
import * as THREE from "three";
import { techStackIcons, skillsData } from "@/constants";

const BrowserStack = () => {
    return (
        <group position={[-6, 0, 0]}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh>
                    <boxGeometry args={[11, 6.5, 0.2]} />
                    <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} />
                    <Html transform position={[0, 0, 0.11]} distanceFactor={6}>
                        <div className="w-[850px] h-[500px] bg-[#0a0a0c] rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,242,255,0.15)] flex flex-col">
                            {/* Browser Header */}
                            <div className="h-10 bg-[#16161a] flex items-center px-4 gap-2 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                                </div>
                                <div className="ml-4 bg-[#050505] px-4 py-1.5 rounded-md text-[10px] text-cyan-400/80 font-mono flex-1 max-w-[400px] border border-white/5">
                                    https://aswinandro.dev/portfolio
                                </div>
                            </div>
                            
                            {/* Browser Content */}
                            <div className="flex-1 p-8 grid grid-cols-12 gap-6 bg-[radial-gradient(circle_at_top_right,rgba(0,242,255,0.05),transparent)]">
                                <div className="col-span-12 mb-2">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Creative Frontend Engineering</div>
                                    <div className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest mt-1">Responsive • Interactive • High Performance</div>
                                </div>
                                
                                {skillsData[2].skills.slice(0, 6).map((skill, i) => (
                                    <div key={skill} className="col-span-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/[0.08] hover:border-cyan-500/50 transition-all group/item">
                                        <div className="text-cyan-400 font-bold mb-1 text-sm">{skill}</div>
                                        <div className="text-[9px] text-white/40 leading-tight">Implementing pixel-perfect components with modern frameworks.</div>
                                        <div className="mt-3 h-[2px] bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-cyan-500" style={{ width: `${85 - i * 5}%` }} />
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="col-span-12 mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                                    <div className="flex gap-2">
                                        {['Next.js', 'Tailwind', 'GSAP'].map(tag => (
                                            <span key={tag} className="text-[8px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="text-[9px] text-white/20 font-mono">RENDER_LATENCY: 14ms</div>
                                </div>
                            </div>
                        </div>
                    </Html>
                </mesh>
            </Float>
        </group>
    )
}

const PhoneFrame = () => {
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        const width = 4.5;
        const height = 9;
        const radius = 0.6;
        
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
        <group position={[6, 0, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group>
                    <mesh position={[0, 0, -0.2]}>
                        <extrudeGeometry args={[shape, extrudeSettings]} />
                        <meshStandardMaterial color="#0a0a0a" roughness={0.02} metalness={0.9} />
                    </mesh>

                    {/* Side Buttons */}
                    <mesh position={[-2.3, 1, 0]}>
                        <boxGeometry args={[0.1, 0.8, 0.1]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                    <mesh position={[-2.3, 2, 0]}>
                        <boxGeometry args={[0.1, 0.4, 0.1]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>

                    <Html transform position={[0, 0, 0.21]} distanceFactor={4.5}>
                        <div className="w-[300px] h-[600px] bg-black rounded-[42px] overflow-hidden border-[6px] border-[#1a1a1e] relative shadow-[0_0_80px_rgba(139,92,246,0.25)] flex flex-col">
                            {/* Status Bar */}
                            <div className="h-7 pt-1 px-8 flex justify-between items-center z-20">
                                <span className="text-[10px] text-white font-medium">9:41</span>
                                <div className="flex gap-1.5 items-center">
                                    <div className="w-3 h-2 border border-white/40 rounded-[2px]" />
                                    <div className="w-3 h-3 bg-white/20 rounded-full" />
                                </div>
                            </div>
                            
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-[#1a1a1e] rounded-b-2xl z-20" />
                            
                            {/* App Content */}
                            <div className="flex-1 p-6 pt-10 flex flex-col bg-gradient-to-b from-purple-900/20 to-black">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">Mobile Experience</h3>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                                            <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse" />
                                        </div>
                                        <div className="text-sm font-bold text-white">React Native Architecture</div>
                                        <div className="text-[10px] text-white/50 mt-1">Building modular, native-speed applications for iOS and Android.</div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { label: 'Fluid Motion', color: 'bg-blue-500' },
                                            { label: 'Offline First', color: 'bg-green-500' },
                                            { label: 'Push Sync', color: 'bg-orange-500' },
                                            { label: 'Custom UI', color: 'bg-pink-500' }
                                        ].map(item => (
                                            <div key={item.label} className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                                                <div className="text-[9px] font-bold text-white whitespace-nowrap">{item.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <div className="h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-xs font-bold text-white">
                                        Launch Environment
                                    </div>
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
            position={[0, 7.5, -8]}
            fontSize={2.5}
            color="#fff"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.08}
        >
            FRONTEND & MOBILE
        </Text>
    </group>
  );
};
