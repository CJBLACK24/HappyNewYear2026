'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Resolution {
    id: string
    text: string
    color: string
}

const COLORS = ['#ff007f', '#00f5ff', '#ffd700', '#ff4500', '#a855f7']

export default function ResolutionWall() {
    const [resolutions, setResolutions] = useState<Resolution[]>([])
    const [inputValue, setInputValue] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('new_year_resolutions')
        if (saved) {
            setResolutions(JSON.parse(saved))
        }
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('new_year_resolutions', JSON.stringify(resolutions))
        }
    }, [resolutions, isLoaded])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const newResolution: Resolution = {
            id: Math.random().toString(36).substr(2, 9),
            text: inputValue.trim(),
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        }

        setResolutions([newResolution, ...resolutions].slice(0, 10))
        setInputValue('')
    }

    const removeResolution = (id: string) => {
        setResolutions(resolutions.filter(r => r.id !== id))
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-16">
            <h3 className="text-3xl md:text-5xl font-black text-center mb-8 bg-gradient-to-r from-brand-pink to-brand-teal bg-clip-text text-transparent uppercase tracking-wider">
                Your 2026 Legacy
            </h3>

            <form onSubmit={handleSubmit} className="relative mb-12">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What's your vision for 2026?"
                    className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-all text-lg md:text-xl"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-brand-pink to-brand-orange text-white font-bold px-6 rounded-full hover:scale-105 active:scale-95 transition-transform"
                >
                    COMMIT
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {resolutions.map((res) => (
                        <motion.div
                            key={res.id}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, x: -50 }}
                            className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
                            style={{ borderColor: `${res.color}40` }}
                        >
                            <div
                                className="absolute top-0 left-0 w-1 h-full"
                                style={{ backgroundColor: res.color }}
                            />
                            <p className="text-white text-lg font-medium leading-relaxed">
                                {res.text}
                            </p>
                            <button
                                onClick={() => removeResolution(res.id)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {resolutions.length === 0 && (
                <div className="text-center text-white/30 italic">
                    Be the first to plant a seed for the future...
                </div>
            )}
        </div>
    )
}
