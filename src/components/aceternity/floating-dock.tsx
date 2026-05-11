"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const FloatingDock = ({
  items,
  className,
}: {
  items: { icon: React.ReactNode; label: string; onClick: () => void }[];
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        setHovered(false);
      }}
      onMouseEnter={() => setHovered(true)}
      className={cn(
        "flex gap-2 items-end rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-lg",
        className
      )}
    >
      {items.map((item, idx) => (
        <IconContainer key={idx} mouseX={mouseX} onClick={item.onClick}>
          {item.icon}
          <span className="absolute -top-10 bg-neutral-900/80 text-white px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {item.label}
          </span>
        </IconContainer>
      ))}
    </div>
  );
};

function IconContainer({
  mouseX,
  children,
  onClick,
}: {
  mouseX: any;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() || { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onClick={onClick}
      className="group relative flex items-center justify-center rounded-full bg-white/10 hover:bg-primary/80 text-white cursor-pointer transition-colors"
    >
      {children}
    </motion.div>
  );
}
