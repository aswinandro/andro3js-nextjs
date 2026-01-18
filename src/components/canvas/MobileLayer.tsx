"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float, Text } from "@react-three/drei";
import * as THREE from "three";
import { skillsData } from "@/constants";

const BrowserStack = () => {
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
    
    useEffect(() => {
        // Create canvas for browser content
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
            // Background
            ctx.fillStyle = '#0a0a0c';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Browser header
            ctx.fillStyle = '#16161a';
            ctx.fillRect(0, 0, canvas.width, 40);
            
            // Traffic lights
            ctx.fillStyle = '#ff5f57';
            ctx.beginPath();
            ctx.arc(20, 20, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#febc2e';
            ctx.beginPath();
            ctx.arc(40, 20, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#28c840';
            ctx.beginPath();
            ctx.arc(60, 20, 6, 0, Math.PI * 2);
            ctx.fill();
            
            // URL bar
            ctx.fillStyle = '#050505';
            ctx.fillRect(90, 10, 300, 20);
            ctx.fillStyle = '#00d9ff';
            ctx.font = 'bold 12px monospace';
            ctx.fillText('localhost:3000/dev', 100, 25);
            
            // Sidebar
            ctx.fillStyle = '#1a1a2e';
            ctx.fillRect(0, 40, 200, canvas.height - 40);
            
            // Explorer title
            ctx.fillStyle = '#00d9ff';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('EXPLORER', 20, 70);
            
            // File tree
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.7;
            ctx.font = '12px monospace';
            ctx.fillText('📁 src', 20, 100);
            ctx.fillText('📁 components', 40, 125);
            ctx.fillStyle = '#00d9ff';
            ctx.fillText('⚛️ Portfolio.tsx', 60, 150);
            ctx.fillStyle = '#ffffff';
            ctx.fillText('⚛️ Header.tsx', 60, 175);
            ctx.fillText('📁 pages', 40, 200);
            ctx.globalAlpha = 1;
            
            // Code editor area
            ctx.fillStyle = '#0d0d0f';
            ctx.fillRect(200, 40, canvas.width - 200, canvas.height - 140);
            
            // Code content
            ctx.font = 'bold 13px monospace';
            let y = 80;
            
            ctx.fillStyle = '#c586c0';
            ctx.fillText('import ', 220, y);
            ctx.fillStyle = '#4ec9b0';
            ctx.fillText('React', 280, y);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(' from ', 330, y);
            ctx.fillStyle = '#ce9178';
            ctx.fillText("'react'", 380, y);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(';', 440, y);
            
            y += 40;
            ctx.fillStyle = '#c586c0';
            ctx.fillText('export default function ', 220, y);
            ctx.fillStyle = '#dcdcaa';
            ctx.fillText('Portfolio', 420, y);
            ctx.fillStyle = '#ffffff';
            ctx.fillText('() {', 510, y);
            
            y += 30;
            ctx.fillStyle = '#808080';
            ctx.fillText('  return (', 220, y);
            
            y += 25;
            ctx.fillStyle = '#4ec9b0';
            ctx.fillText('    <div ', 220, y);
            ctx.fillStyle = '#9cdcfe';
            ctx.fillText('className', 290, y);
            ctx.fillStyle = '#ffffff';
            ctx.fillText('=', 370, y);
            ctx.fillStyle = '#ce9178';
            ctx.fillText('"portfolio"', 385, y);
            ctx.fillStyle = '#4ec9b0';
            ctx.fillText('>', 480, y);
            
            y += 25;
            ctx.fillStyle = '#4ec9b0';
            ctx.fillText('      <h1>', 220, y);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 15px monospace';
            ctx.fillText('Aswin Andro', 300, y);
            ctx.font = 'bold 13px monospace';
            ctx.fillStyle = '#4ec9b0';
            ctx.fillText('</h1>', 430, y);
            
            y += 25;
            ctx.fillStyle = '#4ec9b0';
            ctx.fillText('      <p>', 220, y);
            ctx.fillStyle = '#ffffff';
            ctx.fillText('System Architect', 280, y);
            ctx.fillStyle = '#4ec9b0';
            ctx.fillText('</p>', 440, y);
            
            y += 25;
            ctx.fillText('    </div>', 220, y);
            
            y += 25;
            ctx.fillStyle = '#808080';
            ctx.fillText('  );', 220, y);
            
            y += 25;
            ctx.fillStyle = '#ffffff';
            ctx.fillText('}', 220, y);
            
            // Console
            ctx.fillStyle = '#0a0a0c';
            ctx.fillRect(200, canvas.height - 100, canvas.width - 200, 100);
            
            ctx.fillStyle = '#00d9ff';
            ctx.strokeStyle = '#00d9ff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(200, canvas.height - 100);
            ctx.lineTo(canvas.width, canvas.height - 100);
            ctx.stroke();
            
            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = '#00ff41';
            ctx.fillText('✓ Compiled successfully in 1.2s', 220, canvas.height - 75);
            
            ctx.fillStyle = '#00d9ff';
            ctx.fillText('✓ React components: 24 optimized', 220, canvas.height - 55);
            
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.5;
            ctx.fillText('✓ Performance score: 98/100', 220, canvas.height - 35);
            
            ctx.fillText('Ready on http://localhost:3000', 220, canvas.height - 15);
            ctx.globalAlpha = 1;
            
            // Create texture
            const newTexture = new THREE.CanvasTexture(canvas);
            newTexture.needsUpdate = true;
            setTexture(newTexture);
        }
    }, []);

    return (
        <group position={[-6, 0, 0]}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <group>
                    {/* Monitor Frame */}
                    <mesh>
                        <boxGeometry args={[11, 6.5, 0.3]} />
                        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
                    </mesh>
                    
                    {/* Screen with content */}
                    {texture && (
                        <mesh position={[0, 0, 0.16]}>
                            <planeGeometry args={[10.5, 6]} />
                            <meshBasicMaterial 
                                map={texture}
                                toneMapped={false}
                            />
                        </mesh>
                    )}
                </group>
            </Float>
        </group>
    )
}

const PhoneFrame = () => {
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
    
    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 800;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
            // Background gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(139, 92, 246, 0.5)');
            gradient.addColorStop(1, '#000000');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Status bar
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 18px sans-serif';
            ctx.fillText('9:41', 30, 35);
            
            // Signal bars
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillRect(310, 22, 6, 12);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fillRect(322, 18, 6, 16);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(334, 14, 6, 20);
            
            // WiFi icon
            ctx.beginPath();
            ctx.arc(350, 24, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Battery
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(360, 20, 28, 14);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(362, 22, 24, 10);
            ctx.fillRect(388, 24, 4, 6);
            
            // Header
            ctx.font = 'bold 36px sans-serif';
            const headerGradient = ctx.createLinearGradient(0, 120, 250, 120);
            headerGradient.addColorStop(0, '#c084fc');
            headerGradient.addColorStop(1, '#f472b6');
            ctx.fillStyle = headerGradient;
            ctx.fillText('My Portfolio', 30, 120);
            
            ctx.font = 'bold 18px sans-serif';
            ctx.fillStyle = '#c084fc';
            ctx.fillText('Full Stack Developer', 30, 150);
            
            // Profile card
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
            ctx.lineWidth = 3;
            ctx.fillRect(30, 180, canvas.width - 60, 90);
            ctx.strokeRect(30, 180, canvas.width - 60, 90);
            
            // Avatar
            const avatarGradient = ctx.createLinearGradient(50, 200, 120, 250);
            avatarGradient.addColorStop(0, '#c084fc');
            avatarGradient.addColorStop(1, '#f472b6');
            ctx.fillStyle = avatarGradient;
            ctx.beginPath();
            ctx.arc(85, 225, 30, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 24px sans-serif';
            ctx.fillText('AA', 70, 235);
            
            ctx.font = 'bold 20px sans-serif';
            ctx.fillText('Aswin Andro', 135, 215);
            ctx.font = 'bold 15px monospace';
            ctx.fillStyle = '#c084fc';
            ctx.fillText('System Architect', 135, 240);
            
            // Stats grid
            const stats = [
                { label: 'Projects', value: '25+', color: '#c084fc', x: 30, y: 300 },
                { label: 'Skills', value: '40+', color: '#06b6d4', x: 215, y: 300 },
                { label: 'Experience', value: '5+ Yrs', color: '#f472b6', x: 30, y: 440 },
                { label: 'Clients', value: '15+', color: '#10b981', x: 215, y: 440 }
            ];
            
            stats.forEach(stat => {
                ctx.fillStyle = `${stat.color}44`;
                ctx.strokeStyle = `${stat.color}88`;
                ctx.lineWidth = 3;
                ctx.fillRect(stat.x, stat.y, 155, 120);
                ctx.strokeRect(stat.x, stat.y, 155, 120);
                
                ctx.fillStyle = stat.color;
                ctx.font = 'bold 14px sans-serif';
                ctx.fillText(stat.label, stat.x + 18, stat.y + 35);
                
                ctx.font = 'bold 36px sans-serif';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(stat.value, stat.x + 18, stat.y + 80);
            });
            
            // Bottom nav
            ctx.fillStyle = '#1a1a1e';
            ctx.strokeStyle = 'rgba(192, 132, 252, 0.3)';
            ctx.lineWidth = 3;
            ctx.fillRect(30, 690, canvas.width - 60, 70);
            ctx.strokeRect(30, 690, canvas.width - 60, 70);
            
            // Nav icons (simplified)
            ctx.fillStyle = '#c084fc';
            ctx.fillRect(65, 715, 30, 30);
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.beginPath();
            ctx.arc(170, 730, 15, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillRect(235, 715, 30, 30);
            
            ctx.beginPath();
            ctx.arc(330, 730, 15, 0, Math.PI * 2);
            ctx.fill();
            
            const newTexture = new THREE.CanvasTexture(canvas);
            newTexture.needsUpdate = true;
            newTexture.flipY = true; // Fix: Flip texture to match 3D plane orientation
            setTexture(newTexture);
            
            console.log('Phone texture created:', newTexture);
            console.log('Canvas data:', canvas.toDataURL().substring(0, 100));
        }
    }, []);

    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    
    useFrame(() => {
        if (materialRef.current && texture) {
            materialRef.current.map = texture;
            materialRef.current.needsUpdate = true;
        }
    });

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
                    {/* Phone Body */}
                    <mesh position={[0, 0, -0.2]}>
                        <extrudeGeometry args={[shape, extrudeSettings]} />
                        <meshStandardMaterial color="#0a0a0a" roughness={0.02} metalness={0.9} />
                    </mesh>
                    
                    {/* Screen with content - Raised to 0.27 to sit ABOVE the phone body (0.25 extent) */}
                    {texture && (
                        <mesh position={[0, 0, 0.27]}>
                            <planeGeometry args={[4, 8.5]} />
                            <meshBasicMaterial 
                                ref={materialRef}
                                map={texture}
                                toneMapped={false}
                                side={THREE.DoubleSide}
                            />
                        </mesh>
                    )}
                    
                    {/* Notch - Raised to 0.32 to sit above screen */}
                    <mesh position={[0, 4, 0.32]}>
                        <boxGeometry args={[1.5, 0.6, 0.1]} />
                        <meshStandardMaterial color="#0a0a0a" />
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
