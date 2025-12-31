'use client'

import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Suspense } from 'react'
import Firework from './Firework'

export default function ExperienceCanvas() {
    return (
        <div className="fixed inset-0 z-[1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
                <Suspense fallback={null}>
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />

                    <Firework position={[-2, 1, -2]} color="#ff007f" />
                    <Firework position={[2, 0, -3]} color="#00f5ff" />
                    <Firework position={[0, 2, -5]} color="#ffd700" />
                    <Firework position={[-3, -1, -4]} color="#ff4500" />
                </Suspense>
            </Canvas>
        </div>
    )
}
