'use client'

import { useEffect, useRef, useState } from 'react'

interface CursorTrailDot {
    x: number
    y: number
    id: number
}

export default function CursorTrail() {
    const [dots, setDots] = useState<CursorTrailDot[]>([])
    const dotsRef = useRef<CursorTrailDot[]>([])
    const counterRef = useRef(0)

    useEffect(() => {
        let animationFrameId: number

        const handleMouseMove = (e: MouseEvent) => {
            const newDot: CursorTrailDot = {
                x: e.clientX,
                y: e.clientY,
                id: counterRef.current++,
            }

            dotsRef.current = [...dotsRef.current, newDot].slice(-15) // Keep last 15 dots
            setDots(dotsRef.current)
        }

        // Fade out effect
        const fadeOut = () => {
            if (dotsRef.current.length > 0) {
                dotsRef.current = dotsRef.current.slice(1)
                setDots([...dotsRef.current])
            }
            animationFrameId = requestAnimationFrame(fadeOut)
        }

        document.addEventListener('mousemove', handleMouseMove)
        animationFrameId = requestAnimationFrame(fadeOut)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <div className="cursor-trail-container" style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9998 }}>
            {dots.map((dot, index) => {
                const opacity = (index + 1) / dots.length
                const scale = opacity * 0.8

                return (
                    <div
                        key={dot.id}
                        style={{
                            position: 'absolute',
                            left: dot.x,
                            top: dot.y,
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: `rgba(255, 215, 0, ${opacity * 0.6})`,
                            transform: `translate(-50%, -50%) scale(${scale})`,
                            transition: 'opacity 0.3s ease, transform 0.2s ease',
                            boxShadow: `0 0 ${10 * opacity}px rgba(255, 215, 0, ${opacity * 0.8})`,
                        }}
                    />
                )
            })}
        </div>
    )
}
