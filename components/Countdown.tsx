'use client'

import { useState, useEffect } from 'react'

const TARGET_DATE = new Date('2027-01-01T00:00:00').getTime()

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime()
            const difference = TARGET_DATE - now

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                })
            } else {
                clearInterval(timer)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const TimeBox = ({ value, label }: { value: number, label: string }) => (
        <div className="group flex flex-col items-center mx-2 md:mx-4 lg:mx-6 transition-transform duration-500 hover:scale-105">
            <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-pink to-brand-teal rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-8 w-20 md:w-40 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
                    {/* Animated background pulse */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/5 to-brand-teal/5 animate-pulse"></div>

                    <span className="text-3xl md:text-7xl font-black text-white tabular-nums tracking-tighter z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        {value.toString().padStart(2, '0')}
                    </span>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-pink via-brand-teal to-brand-gold opacity-50"></div>
                </div>
            </div>

            <span className="mt-4 text-[10px] md:text-sm font-bold text-brand-teal uppercase tracking-[0.4em] drop-shadow-sm group-hover:text-brand-pink transition-colors duration-300">
                {label}
            </span>
        </div>
    )

    return (
        <div className="flex flex-wrap justify-center items-center gap-4 py-10 md:py-20">
            <TimeBox value={timeLeft.days} label="Days" />
            <TimeBox value={timeLeft.hours} label="Hours" />
            <TimeBox value={timeLeft.minutes} label="Minutes" />
            <TimeBox value={timeLeft.seconds} label="Seconds" />
        </div>
    )
}
