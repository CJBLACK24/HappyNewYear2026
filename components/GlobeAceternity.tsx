"use client";
import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function GlobeAceternity() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1000 * 2,
            height: 1000 * 2,
            phi: 0,
            theta: 0,
            dark: 1, // 1 for dark mode
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.1, 0.1, 0.2], // Dark Blue/Gray base
            markerColor: [0, 0.96, 1], // Brand Teal
            glowColor: [0.5, 0, 0.5], // Brand Purple Glow
            markers: [
                // Random markers for visual interest
                { location: [37.7595, -122.4367], size: 0.03 },
                { location: [40.7128, -74.006], size: 0.03 },
                { location: [51.5074, -0.1278], size: 0.03 },
                { location: [35.6762, 139.6503], size: 0.03 },
                { location: [-33.8688, 151.2093], size: 0.03 },
                // Add more random points to simulate "travel everywhere"
                { location: [19.0760, 72.8777], size: 0.03 },
                { location: [55.7558, 37.6173], size: 0.03 },
                { location: [-23.5505, -46.6333], size: 0.03 },
                { location: [1.3521, 103.8198], size: 0.03 },
                { location: [25.2048, 55.2708], size: 0.03 },
            ],
            onRender: (state) => {
                // Called on every animation frame.
                // state will be an empty object, return updated params.
                state.phi = phi;
                phi += 0.003; // Rotation speed
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <div className="relative flex w-full max-w-full items-center justify-center overflow-hidden h-[400px] md:h-[600px]">
            <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%", maxWidth: "100%", aspectRatio: 1 }}
            />
        </div>
    );
}
