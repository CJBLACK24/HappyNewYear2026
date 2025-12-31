'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subRef = useRef<HTMLParagraphElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            tl.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: 'power4.out',
                delay: 0.5
            })
                .from(subRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=1')

            // Parallax effect on scroll
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
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero.png"
                    alt="New Year 2026"
                    fill
                    className="object-cover object-center brightness-75"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/20 to-brand-purple/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-pink via-white to-brand-teal drop-shadow-lg tracking-tighter"
                    style={{ textShadow: '0 0 30px rgba(255,0,127,0.5)' }}
                >
                    HAPPY <br />
                    NEW YEAR
                </h1>
                <p
                    ref={subRef}
                    className="mt-6 text-2xl md:text-4xl text-brand-gold font-bold tracking-widest uppercase opacity-0"
                >
                    Welcome to 2026
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                <p className="text-xs uppercase tracking-[0.3em]">Scroll to Celebrate</p>
            </div>
        </section>
    )
}
