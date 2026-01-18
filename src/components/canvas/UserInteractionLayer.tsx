"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

const Cursor = ({ x, y, z, color, type, delay }: any) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
        const t = state.clock.elapsedTime + delay;
        // Organic movement pattern
        ref.current.position.x = x + Math.sin(t * 0.5) * 3;
        ref.current.position.y = y + Math.cos(t * 0.3) * 2;
        
        // Click effect pulse
        const scale = 1 + (Math.sin(t * 2) > 0.8 ? 0.3 : 0);
        ref.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={ref} position={[x, y, z]}>
        {/* Cursor Shape */}
        <mesh rotation={[0, 0, -0.5]}>
            <coneGeometry args={[0.2, 0.6, 4]} />
            <meshBasicMaterial color={color} />
        </mesh>
        
        {/* Label */}
        <Text
            position={[0.5, -0.5, 0]}
            fontSize={0.2}
            color={color}
            anchorX="left"
            fillOpacity={0.8}
        >
            User_{Math.floor(Math.random() * 999)}
        </Text>
    </group>
  );
};

const GestureTrail = ({ index }: { index: number }) => {
    const points = useMemo(() => {
        return new Float32Array(50 * 3);
    }, []);
    
    // Explicitly type ref as any to avoid conflict between @types/react (SVG) and @types/three
    const ref = useRef<any>(null);
    const speed = 0.5 + Math.random() * 0.5;
    
    useFrame((state) => {
        if (ref.current) {
            const time = state.clock.elapsedTime * speed + index;
            // Use type assertion for THREE.Line
            const line = ref.current as THREE.Line;
            const geom = line.geometry;
            const positions = geom.attributes.position.array as Float32Array;
            
            // Snake movement
            const headX = Math.sin(time) * 10;
            const headY = Math.cos(time * 1.5) * 5;
            
            // Shift points
            for (let i = points.length - 1; i >= 3; i--) {
                positions[i] = positions[i - 3];
            }
            
            positions[0] = headX;
            positions[1] = headY;
            positions[2] = 0;
            
            geom.attributes.position.needsUpdate = true;
        }
    });

    return (
        <line ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={50}
                    array={points}
                    itemSize={3}
                    args={[points, 3]} 
                />
            </bufferGeometry>
            <lineBasicMaterial color={index % 2 === 0 ? "#f472b6" : "#c084fc"} transparent opacity={0.5} />
        </line>
    );
}

export const UserInteractionLayer = () => {
  return (
    <group position={[0, -28, 0]}>
         {/* Title or Concept Text */}
         <Text
            position={[0, 5, -5]}
            fontSize={1.5}
            color="#fff"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.1}
        >
            USER INTERACTION & ANALYTICS
        </Text>

        {/* Floating Cursors */}
        {[...Array(8)].map((_, i) => (
            <Cursor 
                key={i}
                x={(Math.random() - 0.5) * 20}
                y={(Math.random() - 0.5) * 10}
                z={(Math.random() - 0.5) * 5}
                color={["#61affe", "#49cc90", "#fca130"][i % 3]}
                delay={i * 2}
            />
        ))}

        {/* Gesture Trails */}
        {[...Array(3)].map((_, i) => (
            <GestureTrail key={`trail-${i}`} index={i} />
        ))}
    </group>
  );
};
