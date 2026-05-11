"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TrailDot {
  x: number;
  y: number;
  id: number;
}

export const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Smooth spring for the outer ring
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);
    };
    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add trail dot
      const newId = Date.now() + Math.random();
      setTrail((prev) => [
        ...prev.slice(-12),
        { x: e.clientX, y: e.clientY, id: newId },
      ]);

      // Check if hovering interactive element
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='pointer']");
      setIsPointer(!!interactive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Cleanup old trail dots
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(-8));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Trail particles */}
      {trail.map((dot, index) => (
        <motion.div
          key={dot.id}
          className="fixed pointer-events-none z-[9999]"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            left: dot.x - 3,
            top: dot.y - 3,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(220,38,38,${0.4 + (index / trail.length) * 0.4}) 0%, transparent 70%)`,
          }}
        />
      ))}

      {/* Inner dot - follows cursor exactly */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : isPointer ? 1.5 : 1,
            backgroundColor: isPointer ? "#dc2626" : "#ffffff",
          }}
          transition={{ duration: 0.15 }}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* Outer ring - follows with spring delay */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
            borderColor: isPointer ? "rgba(220,38,38,0.8)" : "rgba(220,38,38,0.3)",
            boxShadow: isPointer
              ? "0 0 20px rgba(220,38,38,0.3), inset 0 0 10px rgba(220,38,38,0.1)"
              : "0 0 10px rgba(220,38,38,0.1)",
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1.5px solid rgba(220,38,38,0.3)",
            backgroundColor: "transparent",
          }}
        />
      </motion.div>

      {/* Glow ring on click */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-[9997]"
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(220,38,38,0.5)",
          }}
        />
      )}
    </>
  );
};
