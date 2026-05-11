"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scale?: number;
  transitionSpeed?: number;
}

export const TiltCard = ({
  children,
  className,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  scale = 1.02,
  transitionSpeed = 300,
  ...props
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [angleX, setAngleX] = useState(0);
  const [angleY, setAngleY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const percentX = (mouseX - centerX) / (rect.width / 2);
      const percentY = (mouseY - centerY) / (rect.height / 2);
      setAngleX(-percentY * tiltMaxAngleX);
      setAngleY(percentX * tiltMaxAngleY);
    },
    [tiltMaxAngleX, tiltMaxAngleY]
  );

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setAngleX(0);
    setAngleY(0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      ref={ref}
      className={cn("transform-gpu", className)}
      style={{
        transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(${isHovering ? scale : 1})`,
        transition: `transform ${transitionSpeed}ms ease-out`,
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </div>
  );
};
