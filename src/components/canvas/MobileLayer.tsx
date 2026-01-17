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
                                    localhost:3000/dev
                                </div>
                            </div>
                            
                            {/* Developer Workspace */}
                            <div className="flex-1 flex">
                                {/* Sidebar */}
                                <div className="w-48 bg-[#1a1a2e] border-r border-white/5 p-3">
                                    <div className="text-[10px] text-cyan-400 font-mono mb-3 uppercase tracking-wider">Explorer</div>
                                    <div className="space-y-1 text-[9px] font-mono text-white/60">
                                        <div className="flex items-center gap-1 hover:bg-white/5 px-1 py-0.5 rounded">
                                            <span>📁</span> src
                                        </div>
                                        <div className="flex items-center gap-1 hover:bg-white/5 px-1 py-0.5 rounded ml-3">
                                            <span>📁</span> components
                                        </div>
                                        <div className="flex items-center gap-1 hover:bg-white/5 px-1 py-0.5 rounded ml-6 bg-white/10">
                                            <span>⚛️</span> Portfolio.tsx
                                        </div>
                                        <div className="flex items-center gap-1 hover:bg-white/5 px-1 py-0.5 rounded ml-6">
                                            <span>⚛️</span> Header.tsx
                                        </div>
                                        <div className="flex items-center gap-1 hover:bg-white/5 px-1 py-0.5 rounded ml-3">
                                            <span>📁</span> pages
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Main Content */}
                                <div className="flex-1 flex flex-col">
                                    {/* Code Editor */}
                                    <div className="flex-1 bg-[#0d0d0f] p-4 font-mono text-[9px] leading-relaxed">
                                        <div className="text-purple-400">import <span className="text-cyan-300">React</span> from <span className="text-green-400">'react'</span>;</div>
                                        <div className="text-purple-400 mt-2">export default function <span className="text-yellow-300">Portfolio</span>() {'{'}</div>
                                        <div className="ml-4 text-gray-400">return (</div>
                                        <div className="ml-8 text-cyan-300">&lt;div <span className="text-purple-400">className</span>=<span className="text-green-400">"portfolio"</span>&gt;</div>
                                        <div className="ml-12 text-cyan-300">&lt;h1&gt;<span className="text-white">Aswin Andro</span>&lt;/h1&gt;</div>
                                        <div className="ml-12 text-cyan-300">&lt;p&gt;<span className="text-white">System Architect</span>&lt;/p&gt;</div>
                                        <div className="ml-8 text-cyan-300">&lt;/div&gt;</div>
                                        <div className="ml-4 text-gray-400">);</div>
                                        <div className="text-purple-400">{'}'}</div>
                                    </div>
                                    
                                    {/* Console */}
                                    <div className="h-24 bg-[#0a0a0c] border-t border-white/5 p-2 font-mono text-[8px]">
                                        <div className="text-green-400">✓ Compiled successfully in 1.2s</div>
                                        <div className="text-cyan-400 mt-1">✓ React components: 24 optimized</div>
                                        <div className="text-white/40 mt-1">✓ Performance score: 98/100</div>
                                        <div className="text-white/20 mt-1">Ready on http://localhost:3000</div>
                                    </div>
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
                        <div className="w-[300px] h-[600px] bg-gradient-to-b from-purple-900/30 to-black rounded-[42px] overflow-hidden border-[6px] border-[#1a1a1e] relative shadow-[0_0_80px_rgba(139,92,246,0.25)] flex flex-col">
                            {/* Status Bar */}
                            <div className="h-11 pt-2 px-6 flex justify-between items-center z-20">
                                <span className="text-[11px] text-white font-semibold">9:41</span>
                                <div className="flex gap-1 items-center">
                                    <div className="flex gap-[2px]">
                                        <div className="w-[3px] h-2 bg-white rounded-sm opacity-40" />
                                        <div className="w-[3px] h-2.5 bg-white rounded-sm opacity-60" />
                                        <div className="w-[3px] h-3 bg-white rounded-sm" />
                                    </div>
                                    <svg className="w-3 h-3 ml-1" viewBox="0 0 12 12" fill="white">
                                        <path d="M6 0L7 4H12L8 7L9 12L6 9L3 12L4 7L0 4H5L6 0Z"/>
                                    </svg>
                                    <div className="w-5 h-2.5 border-2 border-white/60 rounded-sm relative ml-1">
                                        <div className="absolute inset-0.5 bg-white rounded-[1px]"/>
                                        <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1 bg-white/60 rounded-r"/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-[#0a0a0a] rounded-b-3xl z-30" />
                            
                            {/* App Content */}
                            <div className="flex-1 p-5 pt-8 flex flex-col">
                                {/* Header */}
                                <div className="mb-6">
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">My Portfolio</h1>
                                    <p className="text-purple-300/60 text-xs mt-1">Full Stack Developer</p>
                                </div>
                                
                                {/* Profile Card */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                            AA
                                        </div>
                                        <div>
                                            <div className="text-white font-semibold text-sm">Aswin Andro</div>
                                            <div className="text-purple-300/60 text-[10px] font-mono">System Architect</div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-5">
                                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20 rounded-2xl p-4">
                                        <div className="text-purple-300/60 text-[10px] mb-1">Projects</div>
                                        <div className="text-white text-2xl font-bold">25+</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/20 rounded-2xl p-4">
                                        <div className="text-cyan-300/60 text-[10px] mb-1">Skills</div>
                                        <div className="text-white text-2xl font-bold">40+</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-500/20 rounded-2xl p-4">
                                        <div className="text-pink-300/60 text-[10px] mb-1">Experience</div>
                                        <div className="text-white text-xl font-bold">5+ Yrs</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20 rounded-2xl p-4">
                                        <div className="text-green-300/60 text-[10px] mb-1">Clients</div>
                                        <div className="text-white text-2xl font-bold">15+</div>
                                    </div>
                                </div>
                                
                                {/* Bottom Nav */}
                                <div className="mt-auto bg-[#1a1a1e] border border-white/5 rounded-2xl p-3 flex justify-around items-center">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                                        <div className="w-5 h-5 rounded bg-white/20" />
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                        <div className="w-5 h-5 rounded-full bg-white/20" />
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                        <div className="w-5 h-5 rounded bg-white/20" />
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                        <div className="w-5 h-5 rounded-full bg-white/20" />
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
