"use client";

import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, Float, Stars, Environment, PerspectiveCamera, Html } from "@react-three/drei";
import { EffectComposer, Noise, Vignette, Scanline, Glitch } from "@react-three/postprocessing";
import * as THREE from "three";
import { CloudLayer } from "./CloudLayer";
import { BackendLayer } from "./BackendLayer";
import { MobileLayer } from "./MobileLayer";

const CameraRig = () => {
  const scroll = useScroll();
  const { camera } = useThree();
  const initialPos = new THREE.Vector3(0, 25, 20);
  const targetPos = new THREE.Vector3(0, -35, 20);

  useFrame(() => {
    const progress = scroll.offset; // 0 to 1
    
    // Smooth camera transition through layers
    camera.position.y = THREE.MathUtils.lerp(initialPos.y, targetPos.y, progress);
    
    // Add some dynamic movement
    camera.position.x = Math.sin(progress * Math.PI) * 2;
    camera.lookAt(0, camera.position.y - 5, 0);
  });

  return null;
};

const PostProcessing = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <EffectComposer>
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
      <Noise opacity={0.05} />
      {isHovered ? (
        <>
          <Scanline density={2} opacity={0.2} />
          <Glitch 
            delay={new THREE.Vector2(0.3, 1)} 
            duration={new THREE.Vector2(0.1, 0.3)} 
            strength={new THREE.Vector2(0.1, 0.3)} 
          />
        </>
      ) : (
        <></>
      )}
    </EffectComposer>
  );
};

export const UnifiedEngine = () => {
  const [isSecurityActive, setIsSecurityActive] = useState(false);
  const [lowPerf, setLowPerf] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="h-screen w-full bg-[#050505] flex items-center justify-center">
        <div className="text-cyan-500 font-mono animate-pulse uppercase tracking-[0.3em]">
            Booting System Architecture...
        </div>
    </div>
  );

  return (
    <div 
        className="h-screen w-full bg-[#050505] fixed top-0 left-0"
        onMouseEnter={() => setIsSecurityActive(true)}
        onMouseLeave={() => setIsSecurityActive(false)}
    >
      <Canvas shadows dpr={lowPerf ? 1 : [1, 2]}>
        <PerspectiveCamera makeDefault fov={45} position={[0, 20, 20]} />
        <color attach="background" args={["#020202"]} />
        
        <ambientLight intensity={1.5} />
        <pointLight position={[20, 30, 20]} intensity={2} color="#00f2ff" />
        <pointLight position={[-20, 0, 10]} intensity={1.5} color="#ff00ff" />
        <pointLight position={[15, -25, 15]} intensity={3} color="#8b5cf6" />
        <pointLight position={[-15, -30, 10]} intensity={2} color="#00ff41" />
        <spotLight position={[0, 50, 0]} angle={0.3} penumbra={1} intensity={5} castShadow />

        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.2}>
            <CameraRig />
            
            <CloudLayer />
            <BackendLayer />
            <MobileLayer />
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Environment preset="studio" />
            
            <PostProcessing isHovered={isSecurityActive && !lowPerf} />
          </ScrollControls>
        </Suspense>
      </Canvas>

      {/* UI Overlay for Security Expertise */}
      {isSecurityActive && (
        <div className="fixed bottom-10 right-10 pointer-events-none z-50 flex flex-col items-end gap-2">
            <div className="bg-red-500/20 border border-red-500/50 text-red-500 px-4 py-2 font-mono text-xs backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                PCI DSS COMPLIANCE PROTOCOL ACTIVE
            </div>
            <div className="bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 px-4 py-2 font-mono text-xs backdrop-blur-md">
                SECURITY OVERLAY: MONITORING API TRAFFIC
            </div>
        </div>
      )}

      {/* Helper text */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white/30 font-mono text-[10px] uppercase tracking-widest animate-bounce">
        Scroll to Descend through the Architecture
      </div>

      {/* Performance Toggle */}
      <button 
        onClick={() => setLowPerf(!lowPerf)}
        className="fixed bottom-10 left-10 z-50 bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] text-white/50 px-3 py-1 rounded font-mono uppercase tracking-widest pointer-events-auto transition-all"
      >
        Performance: {lowPerf ? "Low" : "High"}
      </button>
    </div>
  );
};
