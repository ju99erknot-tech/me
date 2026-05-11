"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FireParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
}

export const DragonMascot = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBreathing, setIsBreathing] = useState(false);
  const [fireParticles, setFireParticles] = useState<FireParticle[]>([]);
  const [hoverGlow, setHoverGlow] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const particleId = useRef(0);

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Limit eye movement range
      const maxOffset = 6;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const normalizedDistance = Math.min(distance / 300, 1);

      setEyeOffset({
        x: (deltaX / (distance || 1)) * maxOffset * normalizedDistance,
        y: (deltaY / (distance || 1)) * maxOffset * normalizedDistance,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fire breathing effect
  const breatheFire = useCallback(() => {
    if (isBreathing) return;
    setIsBreathing(true);
    setClickCount((prev) => prev + 1);

    const fireColors = [
      "#ff4500", "#ff6347", "#ff8c00", "#ffd700",
      "#dc2626", "#ef4444", "#f97316", "#eab308",
    ];

    // Generate fire particles in bursts
    let burstCount = 0;
    const maxBursts = 5;

    const burstInterval = setInterval(() => {
      if (burstCount >= maxBursts) {
        clearInterval(burstInterval);
        setTimeout(() => setIsBreathing(false), 600);
        return;
      }

      const newParticles: FireParticle[] = [];
      const particlesPerBurst = 6 + Math.floor(Math.random() * 4);

      for (let i = 0; i < particlesPerBurst; i++) {
        particleId.current += 1;
        newParticles.push({
          id: particleId.current,
          x: 0,
          y: 0,
          angle: 180 + (Math.random() - 0.5) * 50, // Spread leftward from mouth
          speed: 2 + Math.random() * 4,
          size: 4 + Math.random() * 10,
          color: fireColors[Math.floor(Math.random() * fireColors.length)],
        });
      }

      setFireParticles((prev) => [...prev.slice(-30), ...newParticles]);
      burstCount++;
    }, 80);

    // Cleanup particles after animation
    setTimeout(() => {
      setFireParticles([]);
    }, 2000);
  }, [isBreathing]);

  return (
    <motion.div
      ref={containerRef}
      className="relative group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      data-cursor="pointer"
    >
      {/* Fire particles */}
      <AnimatePresence>
        {fireParticles.map((particle) => {
          const rad = (particle.angle * Math.PI) / 180;
          const endX = Math.cos(rad) * particle.speed * 30;
          const endY = Math.sin(rad) * particle.speed * 30;

          return (
            <motion.div
              key={particle.id}
              className="absolute z-30 rounded-full pointer-events-none"
              style={{
                left: "10%",
                top: "35%",
                width: particle.size,
                height: particle.size,
                background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: endX,
                y: endY,
                opacity: 0,
                scale: 0.2,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 + Math.random() * 0.4, ease: "easeOut" }}
            />
          );
        })}
      </AnimatePresence>

      {/* Glow behind dragon */}
      <motion.div
        className="absolute inset-0 rounded-full z-0"
        animate={{
          boxShadow: isBreathing
            ? "0 0 60px rgba(255,69,0,0.6), 0 0 120px rgba(220,38,38,0.3)"
            : hoverGlow
              ? "0 0 40px rgba(220,38,38,0.3), 0 0 80px rgba(220,38,38,0.1)"
              : "0 0 20px rgba(220,38,38,0.1)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Dragon container */}
      <motion.div
        className="relative z-10 cursor-pointer select-none"
        onClick={breatheFire}
        onMouseEnter={() => setHoverGlow(true)}
        onMouseLeave={() => setHoverGlow(false)}
        animate={{
          scale: isBreathing ? 1.1 : 1,
          rotate: isBreathing ? [-2, 2, -1, 1, 0] : 0,
        }}
        transition={{
          scale: { duration: 0.3 },
          rotate: { duration: 0.4, times: [0, 0.25, 0.5, 0.75, 1] },
        }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Dragon image */}
        <div className="relative w-20 h-20 md:w-24 md:h-24">
          <img
            src="/logo.png"
            alt="Juggerknot Dragon"
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]"
            draggable={false}
          />


        </div>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: hoverGlow ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-medium">
          {clickCount === 0
            ? "Click me!"
            : clickCount < 3
              ? "Again! 🔥"
              : clickCount < 6
                ? "More fire! 🐉"
                : "Unstoppable! 💀"}
        </span>
      </motion.div>

      {/* Breathing idle animation - subtle floating */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};
