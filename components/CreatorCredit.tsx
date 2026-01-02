'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CreatorCredit() {
    const containerRef = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLAnchorElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(nameRef.current, {
                opacity: 0,
                y: 30,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                }
            })

            // Pulsing glow effect
            gsap.to(nameRef.current, {
                textShadow: '0 0 20px rgba(0,245,255,0.8), 0 0 40px rgba(255,0,127,0.6)',
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="relative text-center py-12">
            <div className="inline-block relative">
                {/* Decorative lines */}
                <div className="absolute -left-20 top-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent to-brand-pink"></div>
                <div className="absolute -right-20 top-1/2 w-16 h-[2px] bg-gradient-to-l from-transparent to-brand-pink"></div>

                <p className="text-sm md:text-base text-gray-400 uppercase tracking-[0.3em] mb-3">
                    Crafted by
                </p>
                <a
                    ref={nameRef}
                    href="https://cjblack-dev-minimalistic-portfolio.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl md:text-4xl font-black bg-gradient-to-r from-brand-teal via-brand-pink to-brand-gold bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 inline-block cursor-pointer"
                    style={{ textShadow: '0 0 20px rgba(0,245,255,0.5)' }}
                >
                    cjblack.dev
                </a>
                <div className="mt-3 text-xs md:text-sm text-brand-orange/70 tracking-wider">
                    Vibe Coder
                </div>
            </div>
        </div>
    )
}
