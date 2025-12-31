'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface GlobeProps {
    config?: {
        pointSize?: number
        atmosphereColor?: string
        atmosphereAltitude?: number
        glowCoefficient?: number
        pointColor?: string
    }
}

export default function Globe({ config = {} }: GlobeProps) {
    const {
        pointSize = 1,
        atmosphereColor = '#00f5ff',
        atmosphereAltitude = 0.15,
        glowCoefficient = 0.15,
        pointColor = '#ffffff',
    } = config

    const globeRef = useRef<THREE.Group>(null)
    const pointsRef = useRef<THREE.Points>(null)
    const arcGroupRef = useRef<THREE.Group>(null)

    // Globe parameters
    const GLOBE_RADIUS = 2
    const NUM_POINTS = 3000
    const NUM_ARCS = 20

    // Create points on the globe surface (representing cities/locations)
    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(NUM_POINTS * 3)
        const colors = new Float32Array(NUM_POINTS * 3)
        const color = new THREE.Color(pointColor)
        const glowColor = new THREE.Color(atmosphereColor)

        for (let i = 0; i < NUM_POINTS; i++) {
            // Fibonacci sphere distribution for even point spacing
            const phi = Math.acos(-1 + (2 * i) / NUM_POINTS)
            const theta = Math.sqrt(NUM_POINTS * Math.PI) * phi

            const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta)
            const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta)
            const z = GLOBE_RADIUS * Math.cos(phi)

            positions[i * 3] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z

            // Random color variation between white and glow color
            const mixFactor = Math.random() * 0.5 + 0.5
            colors[i * 3] = color.r * mixFactor + glowColor.r * (1 - mixFactor)
            colors[i * 3 + 1] = color.g * mixFactor + glowColor.g * (1 - mixFactor)
            colors[i * 3 + 2] = color.b * mixFactor + glowColor.b * (1 - mixFactor)
        }

        return { positions, colors }
    }, [pointColor, atmosphereColor])

    // Create arcs connecting random points (representing connections)
    const arcs = useMemo(() => {
        const arcsList = []

        for (let i = 0; i < NUM_ARCS; i++) {
            const startPhi = Math.random() * Math.PI
            const startTheta = Math.random() * Math.PI * 2

            const endPhi = Math.random() * Math.PI
            const endTheta = Math.random() * Math.PI * 2

            const start = new THREE.Vector3(
                GLOBE_RADIUS * Math.sin(startPhi) * Math.cos(startTheta),
                GLOBE_RADIUS * Math.sin(startPhi) * Math.sin(startTheta),
                GLOBE_RADIUS * Math.cos(startPhi)
            )

            const end = new THREE.Vector3(
                GLOBE_RADIUS * Math.sin(endPhi) * Math.cos(endTheta),
                GLOBE_RADIUS * Math.sin(endPhi) * Math.sin(endTheta),
                GLOBE_RADIUS * Math.cos(endPhi)
            )

            // Create arc curve
            const curve = new THREE.QuadraticBezierCurve3(
                start,
                new THREE.Vector3().addVectors(start, end).multiplyScalar(0.7),
                end
            )

            arcsList.push(curve)
        }

        return arcsList
    }, [])

    // Animation
    useFrame((state) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.002
        }

        if (pointsRef.current) {
            // Subtle pulsing effect
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
            pointsRef.current.scale.setScalar(scale)
        }

        if (arcGroupRef.current) {
            arcGroupRef.current.rotation.y += 0.001
        }
    })

    return (
        <group ref={globeRef}>
            {/* Base sphere wireframe */}
            <mesh>
                <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
                <meshBasicMaterial
                    color={atmosphereColor}
                    wireframe
                    transparent
                    opacity={0.05}
                />
            </mesh>

            {/* Points representing locations */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[colors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={pointSize * 0.015}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Arcs connecting points */}
            <group ref={arcGroupRef}>
                {arcs.map((curve, index) => (
                    <Arc key={index} curve={curve} color={atmosphereColor} />
                ))}
            </group>

            {/* Atmosphere glow */}
            <mesh>
                <sphereGeometry args={[GLOBE_RADIUS * (1 + atmosphereAltitude), 64, 64]} />
                <meshBasicMaterial
                    color={atmosphereColor}
                    transparent
                    opacity={glowCoefficient}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Inner glow */}
            <mesh>
                <sphereGeometry args={[GLOBE_RADIUS * 0.99, 64, 64]} />
                <meshBasicMaterial
                    color={atmosphereColor}
                    transparent
                    opacity={0.1}
                    side={THREE.FrontSide}
                />
            </mesh>

            {/* Lighting */}
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={atmosphereColor} />
            <ambientLight intensity={0.2} />
        </group>
    )
}

// Arc component for animated connections
function Arc({ curve, color }: { curve: THREE.QuadraticBezierCurve3; color: string }) {
    const lineRef = useRef<THREE.Line>(null)

    const lineObject = useMemo(() => {
        const points = curve.getPoints(50)
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
            color: new THREE.Color(color),
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
        })
        const line = new THREE.Line(geometry, material)
        return line
    }, [curve, color])

    useFrame((state) => {
        if (lineRef.current) {
            // Animate arc opacity
            const material = lineRef.current.material as THREE.LineBasicMaterial
            material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + Math.random() * 10) * 0.2
        }
    })

    return <primitive object={lineObject} ref={lineRef} />
}


