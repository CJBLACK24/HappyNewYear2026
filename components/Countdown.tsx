'use client'

import { useState, useEffect } from 'react'

const TARGET_DATE = new Date('2026-01-01T00:00:00').getTime()

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
        <div className="flex flex-col items-center mx-2 md:mx-6">
            <div className="bg-black/40 backdrop-blur-md border border-brand-pink/30 rounded-lg p-4 md:p-8 w-24 md:w-40 shadow-[0_0_30px_rgba(255,0,127,0.2)]">
                <span className="text-4xl md:text-7xl font-black text-white tabular-nums tracking-tighter">
                    {value.toString().padStart(2, '0')}
                </span>
            </div>
            <span className="mt-4 text-xs md:text-sm font-bold text-brand-teal uppercase tracking-[0.3em]">
                {label}
            </span>
        </div>
    )

    return (
        <div className="flex flex-wrap justify-center items-center py-10">
            <TimeBox value={timeLeft.days} label="Days" />
            <TimeBox value={timeLeft.hours} label="Hours" />
            <TimeBox value={timeLeft.minutes} label="Minutes" />
            <TimeBox value={timeLeft.seconds} label="Seconds" />
        </div>
    )
}
