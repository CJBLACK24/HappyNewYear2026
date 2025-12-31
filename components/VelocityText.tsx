'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion, useSpring } from 'framer-motion'

interface VelocityTextProps {
    text?: string
    defaultVelocity?: number
    className?: string
}

export default function VelocityText({
    text = 'HAPPY NEW YEAR 2026',
    defaultVelocity = 5,
    className = '',
}: VelocityTextProps) {
    const targetRef = useRef<HTMLDivElement>(null)
    const [velocity, setVelocity] = useState(0)

    const { scrollY } = useScroll()
    const scrollVelocity = useSpring(0, {
        damping: 50,
        stiffness: 400,
    })

    useEffect(() => {
        const updateVelocity = () => {
            const newVelocity = scrollVelocity.get()
            setVelocity(newVelocity)
        }

        const unsubscribe = scrollVelocity.on('change', updateVelocity)

        return () => unsubscribe()
    }, [scrollVelocity])

    useEffect(() => {
        return scrollY.on('change', (latest) => {
            const previous = scrollY.getPrevious() ?? 0
            const diff = latest - previous
            scrollVelocity.set(diff)
        })
    }, [scrollY, scrollVelocity])

    const velocityFactor = useTransform(
        scrollVelocity,
        [0, 1000],
        [0, 5],
        { clamp: false }
    )

    const x = useTransform(velocityFactor, (latest) => {
        return `${latest * -1}%`
    })

    // Create the repeating text
    const repeatedText = Array(20)
        .fill(text)
        .join(' • ')

    return (
        <div
            ref={targetRef}
            className={`velocity-text-container overflow-hidden whitespace-nowrap ${className}`}
        >
            <motion.div
                className="velocity-text-wrapper flex gap-8"
                style={{ x }}
                animate={{
                    x: [0, -2000],
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 40,
                    ease: 'linear',
                }}
            >
                <span className="velocity-text-span inline-block text-[15vw] font-black uppercase tracking-tight bg-gradient-to-r from-brand-pink via-brand-teal to-brand-gold bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(0,245,255,0.5)]">
                    {repeatedText}
                </span>
                <span className="velocity-text-span inline-block text-[15vw] font-black uppercase tracking-tight bg-gradient-to-r from-brand-pink via-brand-teal to-brand-gold bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(0,245,255,0.5)]">
                    {repeatedText}
                </span>
            </motion.div>
        </div>
    )
}
