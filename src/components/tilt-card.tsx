"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  tiltDegree?: number;
}

export const TiltCard = ({
  children,
  className,
  glareColor = "rgba(220,38,38,0.15)",
  tiltDegree = 15,
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const percentX = mouseX / (rect.width / 2);
    const percentY = mouseY / (rect.height / 2);

    setRotateX(-percentY * tiltDegree);
    setRotateY(percentX * tiltDegree);

    // Glare position
    setGlareX(((e.clientX - rect.left) / rect.width) * 100);
    setGlareY(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("relative overflow-hidden", className)}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      data-cursor="pointer"
    >
      {children}

      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${glareColor} 0%, transparent 60%)`,
        }}
      />

      {/* Edge light effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `inset 0 0 30px rgba(220,38,38,0.05), 0 0 30px rgba(220,38,38,${isHovered ? 0.15 : 0})`,
        }}
      />
    </motion.div>
  );
};
