'use client'

import React, { useRef, useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Interactive3DText from "@/components/Interactive3DText"

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const subRef = useRef<HTMLParagraphElement>(null)
    const [scrollProgress, setScrollProgress] = useState(0)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Initial animation for subtext
            gsap.from(subRef.current, {
                y: 50,
                scale: 0.9,
                opacity: 0,
                duration: 2,
                ease: 'power4.out',
                delay: 1.5
            })

            // ScrollTrigger to capture progress for the zoom effect
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                onUpdate: (self) => {
                    setScrollProgress(self.progress)
                }
            })

            // Parallax effect on scroll for the entire container
            gsap.to(containerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: 200,
                ease: 'none'
            })

            // Fade out subtext on scroll
            gsap.to(subRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'center top',
                    scrub: true
                },
                opacity: 0,
                y: -100,
                scale: 0.8,
                ease: 'none'
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero.png"
                    alt="New Year 2026"
                    fill
                    className="object-cover object-center brightness-[0.4]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/40 via-transparent to-brand-purple/90" />
            </div>

            {/* Interactive 3D Text Content */}
            <div className="absolute inset-0 z-10 transition-opacity duration-300" style={{ opacity: 1 - (scrollProgress * 1.5) }}>
                <Interactive3DText scrollProgress={scrollProgress} />
            </div>

            {/* Subtext Content */}
            <div className="relative z-20 text-center px-4 mt-auto mb-24 pointer-events-none">
                <div ref={subRef}>
                    <p className="text-xl md:text-3xl text-white font-bold tracking-[0.5em] uppercase">
                        <span className="text-brand-gold">Merry Christmas</span> & Happy New Year
                    </p>
                    <div className="mt-4 text-brand-teal font-black tracking-widest uppercase text-xs md:text-sm animate-pulse">
                        The Next Evolution is Here
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50 z-20" style={{ opacity: 1 - (scrollProgress * 4) }}>
                <p className="text-xs uppercase tracking-[0.3em]">Scroll to Celebrate</p>
            </div>
        </section>
    )
}
