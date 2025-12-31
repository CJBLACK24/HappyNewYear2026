"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollBasedVelocityProps {
    children: React.ReactNode;
    baseVelocity: number;
    className?: string;
    direction?: number; // 1 or -1
}

export function ScrollVelocityRow({
    children,
    baseVelocity = 5,
    className,
    direction = 1,
}: ScrollBasedVelocityProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const [repetitions, setRepetitions] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const calculateRepetitions = () => {
            if (containerRef.current && textRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const textWidth = textRef.current.offsetWidth;
                const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
                setRepetitions(newRepetitions);
            }
        };

        calculateRepetitions();

        window.addEventListener("resize", calculateRepetitions);
        return () => window.removeEventListener("resize", calculateRepetitions);
    }, [children]);

    const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

    const prevT = useRef<number>(0);

    useAnimationFrame((t) => {
        if (!prevT.current) prevT.current = t;

        const timeDelta = t - prevT.current;
        let moveBy = direction * baseVelocity * (timeDelta / 1000);

        moveBy += direction * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
        prevT.current = t;
    });

    return (
        <div
            className="w-full overflow-hidden whitespace-nowrap"
            ref={containerRef}
        >
            <motion.div className={cn("inline-block", className)} style={{ x }}>
                {Array.from({ length: repetitions }).map((_, i) => (
                    <span key={i} ref={i === 0 ? textRef : null}>
                        {children}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// Utility for wrapping
function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function ScrollVelocityContainer({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("relative flex w-full flex-col items-center justify-center overflow-hidden", className)}>
            {children}
        </div>
    );
}
