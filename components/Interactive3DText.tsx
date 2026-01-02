'use client'

import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, MeshDistortMaterial, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
    scrollProgress: number
}

function Scene({ scrollProgress }: SceneProps) {
    const textGroupRef = useRef<THREE.Group>(null)
    const { mouse, viewport } = useThree()

    useFrame((state) => {
        if (textGroupRef.current) {
            // Direct mouse tracking for tilt
            const targetRotationX = (mouse.y * viewport.height) / 10
            const targetRotationY = (mouse.x * viewport.width) / 10

            textGroupRef.current.rotation.x = THREE.MathUtils.lerp(textGroupRef.current.rotation.x, -targetRotationX * 0.08, 0.1)
            textGroupRef.current.rotation.y = THREE.MathUtils.lerp(textGroupRef.current.rotation.y, targetRotationY * 0.08, 0.1)

            // Zoom effect: scale the group based on scroll
            const zoomScale = 1 + (scrollProgress * 10)
            textGroupRef.current.scale.setScalar(zoomScale)
        }
    })

    // Reactive mobile check based on three's viewport width
    const isMobile = viewport.width < 8

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 10 : 8]} fov={isMobile ? 50 : 35} />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#ff007f" />
            <spotLight position={[-10, 10, 10]} angle={0.25} penumbra={1} intensity={3} color="#00f5ff" />
            <directionalLight position={[0, -5, 5]} intensity={0.5} color="#ffd700" />

            <Suspense fallback={null}>
                <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
                    <group ref={textGroupRef}>
                        {/* Top Line: HAPPY NEW YEAR - Smaller size as requested */}
                        <Text
                            position={[0, 0.7, 0]}
                            fontSize={isMobile ? 0.4 : 0.6}
                            lineHeight={1}
                            textAlign="center"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={viewport.width * 0.8}
                        >
                            HAPPY NEW YEAR
                            <meshStandardMaterial
                                color="white"
                                metalness={0.9}
                                roughness={0.1}
                                emissive="#ff007f"
                                emissiveIntensity={0.4}
                            />
                        </Text>

                        {/* Bottom Line: 2026 - Scaled down to match requested 'decrease' */}
                        <Text
                            position={[0, -0.4, 0]}
                            fontSize={isMobile ? 0.8 : 1.5}
                            lineHeight={1}
                            textAlign="center"
                            anchorX="center"
                            anchorY="middle"
                        >
                            2026
                            <MeshDistortMaterial
                                color="white"
                                speed={3}
                                distort={0.12}
                                metalness={1}
                                roughness={0.05}
                                emissive="#00f5ff"
                                emissiveIntensity={0.4}
                            />
                        </Text>

                        {/* Glowing Aura behind text */}
                        <mesh position={[0, 0, -0.6]}>
                            <planeGeometry args={[10, 5]} />
                            <meshBasicMaterial color="#ff007f" transparent opacity={0.02} />
                        </mesh>
                    </group>
                </Float>

                <ContactShadows
                    position={[0, -2.5, 0]}
                    opacity={0.4}
                    scale={20}
                    blur={2.4}
                    far={4.5}
                />

                <Environment preset="night" />
            </Suspense>
        </>
    )
}

export default function Interactive3DText({ scrollProgress = 0 }: { scrollProgress?: number }) {
    return (
        <div className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing">
            <Canvas dpr={[1, 2]} shadows>
                <Scene scrollProgress={scrollProgress} />
            </Canvas>
        </div>
    )
}
