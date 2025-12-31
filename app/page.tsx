'use client'

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import HeroSection from "@/components/HeroSection";
import ExperienceCanvas from "@/components/ExperienceCanvas";
import Countdown from "@/components/Countdown";
import GlobeScene from "@/components/GlobeScene";
import CreatorCredit from "@/components/CreatorCredit";
import CustomCursor from "@/components/CustomCursor";
import SpotlightCursor from "@/components/SpotlightCursor";
import CursorTrail from "@/components/CursorTrail";
import VelocityText from "@/components/VelocityText";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Deployment fix: force update
  const containerRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Confetti Trigger
      ScrollTrigger.create({
        trigger: countdownRef.current,
        start: "top center",
        onEnter: () => {
          const duration = 3000;
          const end = Date.now() + duration;

          const frame = () => {
            confetti({
              particleCount: 5,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: ['#ff007f', '#00f5ff', '#ffd700']
            });
            confetti({
              particleCount: 5,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: ['#ff007f', '#00f5ff', '#ffd700']
            });

            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          };
          frame();
        },
        once: true
      });

      // Floating animation for countdown
      gsap.fromTo(countdownRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: countdownRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-brand-purple text-white overflow-hidden">
      <CursorTrail />
      <CustomCursor />
      <SpotlightCursor />
      <ExperienceCanvas />

      <div className="flex flex-col relative z-10">
        <HeroSection />

        {/* Section 2: Celebration & Countdown */}
        <section ref={countdownRef} className="min-h-screen flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm relative py-20">
          <div className="text-center max-w-5xl px-6">
            <h2 className="text-5xl md:text-8xl font-black bg-gradient-to-r from-brand-pink via-brand-purple to-brand-orange bg-clip-text text-transparent mb-12 animate-pulse tracking-tighter">
              TIME REMAINING
            </h2>
            <Countdown />
            <p className="mt-12 text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              The future is closer than you think. <br />
              Prepare for the <span className="text-brand-teal font-bold">NEXT EVOLUTION</span>.
            </p>
          </div>
        </section>

        {/* Velocity Text Transition */}
        <section className="py-20 bg-black/40 overflow-hidden">
          <VelocityText />
        </section>

        {/* Section 3: Interactive Globe & Creator */}
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black/50 to-brand-purple/30 backdrop-blur-md py-20">
          <div className="max-w-6xl w-full px-6">
            <h2 className="text-5xl md:text-7xl font-black text-center bg-gradient-to-r from-brand-teal via-white to-brand-pink bg-clip-text text-transparent mb-8 tracking-tighter">
              ENTER THE NEW WORLD
            </h2>

            <GlobeScene />

            <div className="mt-12">
              <CreatorCredit />
            </div>
          </div>
        </section>

        {/* Section 4: Final Message */}
        <section className="min-h-screen flex items-center justify-center bg-black/70 backdrop-blur-lg relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple via-black to-brand-pink opacity-30 animate-pulse"></div>

          <div className="text-center relative z-10 transform scale-110">
            <h2 className="text-6xl md:text-9xl font-black text-brand-teal mb-4 tracking-tighter drop-shadow-[0_0_50px_rgba(0,245,255,0.5)]">
              2026
            </h2>
            <p className="text-brand-gold uppercase tracking-[0.5em] text-sm md:text-lg font-bold">
              Welcome to the New Era
            </p>
            <div className="mt-8 text-gray-400 text-xs md:text-sm tracking-wider">
              The future starts now
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
