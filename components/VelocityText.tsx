"use client";

import {
    ScrollVelocityContainer,
    ScrollVelocityRow,
} from "@/components/ScrollBasedVelocity"

export default function VelocityText() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10">
            <ScrollVelocityContainer className="font-black uppercase tracking-[-0.02em]">

                {/* Row 1: Scrolling Right */}
                <ScrollVelocityRow
                    baseVelocity={-2}
                    className="text-[15vw] leading-[0.85] font-black bg-gradient-to-r from-brand-pink via-brand-teal to-brand-gold bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,245,255,0.3)]"
                    direction={1}
                >
                    HAPPY NEW YEAR 2026&nbsp;•&nbsp;
                </ScrollVelocityRow>

                {/* Row 2: Stroke Text Effect */}
                <ScrollVelocityRow
                    baseVelocity={2}
                    className="text-[15vw] leading-[0.85] font-black"
                    direction={-1}
                >
                    <span className="stroke-text">HAPPY NEW YEAR 2026&nbsp;•&nbsp;</span>
                </ScrollVelocityRow>

            </ScrollVelocityContainer>

            {/* Side gradients for fade effect */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-brand-purple to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-brand-purple to-transparent"></div>

            <style jsx global>{`
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
          color: transparent;
        }
      `}</style>
        </div>
    )
}
