'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import Globe from './Globe'

export default function GlobeScene() {
    return (
        <div className="w-full h-[500px] md:h-[600px] relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.3} />
                    <Globe />
                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        enablePan={false}
                    />
                    <Environment preset="night" />
                </Suspense>
            </Canvas>

            {/* Interactive hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-brand-teal/50 text-xs uppercase tracking-widest animate-pulse">
                Drag to Rotate
            </div>
        </div>
    )
}
