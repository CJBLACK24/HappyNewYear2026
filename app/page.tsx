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
import ResolutionWall from "@/components/ResolutionWall";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Deployment fix: force update
  const containerRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLElement>(null);

  const triggerManualCelebration = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

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
            <h2 className="text-5xl md:text-8xl font-black bg-gradient-to-r from-brand-pink via-brand-purple to-brand-orange bg-clip-text text-transparent mb-4 animate-pulse tracking-tighter">
              TIME REMAINING
            </h2>
            <div className="text-brand-teal font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-12">
              Countdown to 2027
            </div>
            <Countdown />
            <p className="mt-12 text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              The future is closer than you think. <br />
              Prepare for the <span className="text-brand-teal font-bold uppercase tracking-widest">Next Evolution</span>.
            </p>

            <button
              onClick={triggerManualCelebration}
              className="mt-12 px-10 py-4 bg-gradient-to-r from-brand-pink via-brand-orange to-brand-pink bg-[length:200%_auto] animate-gradient text-white font-black rounded-full shadow-[0_0_30px_rgba(255,0,127,0.4)] hover:shadow-[0_0_50px_rgba(255,0,127,0.6)] transition-all transform hover:scale-105 active:scale-95 uppercase tracking-[0.2em] text-sm"
            >
              Celebrate 2026 Now
            </button>
          </div>
        </section>

        {/* Velocity Text Transition */}
        <section className="py-20 bg-black/40 overflow-hidden">
          <VelocityText />
        </section>

        {/* Section 3: Interactive Globe */}
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black/50 to-brand-purple/30 backdrop-blur-md py-20">
          <div className="max-w-6xl w-full px-6">
            <h2 className="text-5xl md:text-7xl font-black text-center bg-gradient-to-r from-brand-teal via-white to-brand-pink bg-clip-text text-transparent mb-8 tracking-tighter">
              EXPLORE THE GLOBE
            </h2>

            <GlobeScene />
          </div>
        </section>

        {/* Section 4: Unique Feature - Resolution Wall */}
        <section className="min-h-screen bg-black/20 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-pink/50 to-transparent"></div>
          <ResolutionWall />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-teal/50 to-transparent"></div>
        </section>

        {/* Section 5: Final Message & Credit */}
        <section className="min-h-screen flex flex-col items-center justify-center bg-black/70 backdrop-blur-lg relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple via-black to-brand-pink opacity-30 animate-pulse"></div>

          <div className="text-center relative z-10 p-8">
            <h2 className="text-7xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-brand-teal to-brand-pink mb-4 tracking-tighter drop-shadow-2xl">
              2026
            </h2>
            <p className="text-brand-gold uppercase tracking-[1em] text-sm md:text-2xl font-black mb-12">
              The Year of Creation
            </p>

            <div className="max-w-4xl mx-auto border-t border-white/10 pt-12">
              <CreatorCredit />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
