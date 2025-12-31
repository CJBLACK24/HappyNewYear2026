"use client";

import {
    ScrollVelocityContainer,
    ScrollVelocityRow,
} from "@/components/ScrollBasedVelocity"

export default function VelocityText() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10">
            <ScrollVelocityContainer className="font-bold uppercase tracking-[-0.02em]">

                {/* Row 1: Scrolling Right */}
                <ScrollVelocityRow
                    baseVelocity={-3}
                    className="text-5xl md:text-8xl font-black bg-gradient-to-r from-brand-pink via-brand-teal to-brand-gold bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,245,255,0.3)] py-4"
                    direction={1}
                >
                    Advance Happy New Year 2026&nbsp;•&nbsp;
                </ScrollVelocityRow>

                {/* Row 2: Scrolling Left (Now Right per request) */}
                <ScrollVelocityRow
                    baseVelocity={3}
                    className="text-5xl md:text-8xl font-black text-transparent py-4"
                    direction={1}
                >
                    <span className="stroke-text">Belated Merry Christmas&nbsp;•&nbsp;</span>
                </ScrollVelocityRow>

            </ScrollVelocityContainer>

            {/* Side gradients for fade effect */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-brand-purple to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-brand-purple to-transparent"></div>

            <style jsx global>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
          color: transparent;
        }
      `}</style>
        </div>
    )
}
