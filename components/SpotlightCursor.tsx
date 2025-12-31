'use client'

import { useEffect, useRef } from 'react'

export default function SpotlightCursor() {
    const spotlightRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const spotlight = spotlightRef.current
        if (!spotlight) return

        let mouseX = 0
        let mouseY = 0
        let spotX = 0
        let spotY = 0

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const animate = () => {
            // Smooth following
            const speed = 0.1
            spotX += (mouseX - spotX) * speed
            spotY += (mouseY - spotY) * speed

            spotlight.style.background = `radial-gradient(600px circle at ${spotX}px ${spotY}px, rgba(0, 245, 255, 0.15), transparent 40%)`

            requestAnimationFrame(animate)
        }

        document.addEventListener('mousemove', handleMouseMove)
        const animationFrame = requestAnimationFrame(animate)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrame)
        }
    }, [])

    return (
        <div
            ref={spotlightRef}
            className="spotlight-cursor"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 1,
                transition: 'opacity 0.3s ease',
            }}
        />
    )
}
