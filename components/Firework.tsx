'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Firework({ position = [0, 0, 0], color = '#ff007f' }: { position?: [number, number, number], color?: string }) {
    const points = useRef<THREE.Points>(null)

    // Create particles
    const particleCount = 100
    const [positions, userColors] = useMemo(() => {
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)
        const colorObj = new THREE.Color(color)

        for (let i = 0; i < particleCount; i++) {
            // Sphere distribution
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos((Math.random() * 2) - 1)
            const r = Math.random() * 2 // spread

            const x = r * Math.sin(phi) * Math.cos(theta)
            const y = r * Math.sin(phi) * Math.sin(theta)
            const z = r * Math.cos(phi)

            positions[i * 3] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z

            colors[i * 3] = colorObj.r
            colors[i * 3 + 1] = colorObj.g
            colors[i * 3 + 2] = colorObj.b
        }
        return [positions, colors]
    }, [color])

    useFrame((state, delta) => {
        if (points.current) {
            // Rotate for some life
            points.current.rotation.y += delta * 0.2
            // Expand
            points.current.scale.x += delta * 0.5
            points.current.scale.y += delta * 0.5
            points.current.scale.z += delta * 0.5
            // Fade out logic would go here in a real shader
        }
    })

    return (
        <points ref={points} position={position}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[userColors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}
