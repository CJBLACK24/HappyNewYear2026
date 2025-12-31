'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const cursorDotRef = useRef<HTMLDivElement>(null)
    const [isPointer, setIsPointer] = useState(false)
    const [isHidden, setIsHidden] = useState(false)

    useEffect(() => {
        const cursor = cursorRef.current
        const cursorDot = cursorDotRef.current
        if (!cursor || !cursorDot) return

        let mouseX = 0
        let mouseY = 0
        let cursorX = 0
        let cursorY = 0
        let dotX = 0
        let dotY = 0

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            // Check if hovering over interactive elements
            const target = e.target as HTMLElement
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') !== null ||
                target.closest('a') !== null ||
                window.getComputedStyle(target).cursor === 'pointer'

            setIsPointer(isInteractive)
        }

        const handleMouseEnter = () => setIsHidden(false)
        const handleMouseLeave = () => setIsHidden(true)

        // Smooth animation loop
        const animate = () => {
            // Smooth following for main cursor (slower)
            const speed = 0.15
            cursorX += (mouseX - cursorX) * speed
            cursorY += (mouseY - cursorY) * speed

            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`

            // Faster following for dot (instant)
            const dotSpeed = 0.8
            dotX += (mouseX - dotX) * dotSpeed
            dotY += (mouseY - dotY) * dotSpeed

            cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`

            requestAnimationFrame(animate)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mouseleave', handleMouseLeave)

        const animationFrame = requestAnimationFrame(animate)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseenter', handleMouseEnter)
            document.removeEventListener('mouseleave', handleMouseLeave)
            cancelAnimationFrame(animationFrame)
        }
    }, [])

    return (
        <>
            {/* Main cursor ring */}
            <div
                ref={cursorRef}
                className={`custom-cursor ${isPointer ? 'pointer' : ''} ${isHidden ? 'hidden' : ''}`}
                style={{
                    position: 'fixed',
                    left: '-20px',
                    top: '-20px',
                    width: '40px',
                    height: '40px',
                    border: '2px solid rgba(0, 245, 255, 0.5)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
                    mixBlendMode: 'difference',
                }}
            />

            {/* Cursor dot */}
            <div
                ref={cursorDotRef}
                className={`cursor-dot ${isHidden ? 'hidden' : ''}`}
                style={{
                    position: 'fixed',
                    left: '-4px',
                    top: '-4px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#ff007f',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    boxShadow: '0 0 10px rgba(255, 0, 127, 0.8)',
                    transition: 'opacity 0.3s ease',
                }}
            />

            <style jsx>{`
        .custom-cursor.pointer {
          width: 60px;
          height: 60px;
          left: -30px;
          top: -30px;
          border-color: rgba(255, 0, 127, 0.8);
          background-color: rgba(255, 0, 127, 0.1);
        }

        .custom-cursor.hidden,
        .cursor-dot.hidden {
          opacity: 0;
        }

        @media (pointer: coarse) {
          .custom-cursor,
          .cursor-dot {
            display: none;
          }
        }
      `}</style>
        </>
    )
}
