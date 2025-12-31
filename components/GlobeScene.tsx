"use client"

import GlobeAceternity from './GlobeAceternity'

export default function GlobeScene() {
    return (
        <div className="w-full relative flex flex-col items-center justify-center">

            {/* Wish Text Overlay (Centered over globe) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none w-full px-4 mix-blend-plus-lighter">
                <h3 className="text-2xl md:text-4xl font-black bg-gradient-to-br from-white via-gray-200 to-transparent bg-clip-text text-transparent tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    Wishing everyone
                </h3>
                <p className="text-lg md:text-2xl text-brand-teal mt-2 font-bold tracking-[0.3em] drop-shadow-[0_0_10px_rgba(0,245,255,0.8)]">
                    TO TRAVEL AS FAR AS THEY CAN
                </p>
            </div>

            {/* The Globe */}
            <GlobeAceternity />

            {/* Interactive hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-brand-teal/30 text-[10px] uppercase tracking-widest animate-pulse pointer-events-none">
                Interactive Globe
            </div>
        </div>
    )
}
