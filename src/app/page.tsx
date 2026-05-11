"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, Facebook, Instagram, MessageCircle, Phone, Menu, X, ArrowUpRight } from "lucide-react";

import { CustomCursor } from "@/components/custom-cursor";
import { TiltCard } from "@/components/tilt-card";
import { TypingText } from "@/components/typing-text";
import { DragonMascot } from "@/components/dragon-mascot";

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const socialLinks = [
    { icon: <Instagram size={18} />, label: "Instagram", url: "https://instagram.com/giii_rahadian" },
    { icon: <Twitter size={18} />, label: "X", url: "https://twitter.com/jugg3rknot" },
    { icon: <Facebook size={18} />, label: "Facebook", url: "https://facebook.com/rahadian1899/" },
    { icon: <MessageCircle size={18} />, label: "TikTok", url: "https://tiktok.com/@giii_rahadian" },
    { icon: <Phone size={18} />, label: "WhatsApp", url: "https://wa.me/6287777099842" },
    { icon: <Github size={18} />, label: "GitHub", url: "https://github.com/ju99erknot" },
  ];

  const navLinks = [
    { label: "HOME", href: "#" },
    { label: "ABOUT", href: "#", onClick: () => setActiveModal("about") },
    { label: "SOCIAL", href: "#" },
    { label: "CONTACT", href: "#", onClick: () => setActiveModal("contact") },
  ];

  const typingWords = [
    "Developer & Creator",
    "UI/UX Enthusiast",
    "Tech Explorer",
    "Digital Creator",
    "Code Artisan",
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Full Screen Background Photo */}
      <motion.img
        src="https://brdryojuevgafzhvspdv.supabase.co/storage/v1/object/public/avatars/8c365643-d06d-4c48-be66-333c8ab51177/8c365643-d06d-4c48-be66-333c8ab51177_1777898805022.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Subtle dark overlay - very light so photo stays clear */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Left dark panel with diagonal right edge - only covers left portion */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(135deg, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.95) 30%, rgba(5,5,5,0.80) 45%, rgba(5,5,5,0.40) 55%, transparent 65%)",
        }}
      />

      {/* Red glow accent on the diagonal edge */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.12) 0%, transparent 50%)",
        }}
      />

      {/* Right edge red accent bar */}
      <div className="absolute top-0 right-0 w-1 h-full bg-primary/80 z-20" />

      <div className="relative z-20 flex flex-col h-full">
        {/* Navbar */}
        <nav className="flex items-start justify-between px-6 md:px-12 py-5 z-30">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            {/* Dragon Mascot */}
            <DragonMascot />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                href={link.href}
                onClick={link.onClick}
                className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.a>
            ))}
          </div>

          {/* Desktop Social */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { icon: <Github size={16} />, url: "https://github.com/ju99erknot" },
              { icon: <Twitter size={16} />, url: "https://twitter.com/jugg3rknot" },
              { icon: <Instagram size={16} />, url: "https://instagram.com/giii_rahadian" },
            ].map((social, index) => (
              <motion.a
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/5 z-30 p-8"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={() => {
                      link.onClick?.();
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20">
          <div className="max-w-lg">
            {/* Role Tag with Typing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-10 bg-primary" />
              <TypingText
                words={typingWords}
                typingSpeed={70}
                deletingSpeed={40}
                pauseDuration={2500}
                className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary"
                cursorClassName="text-primary/60 ml-0.5"
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-2"
            >
              ANGGI
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8"
            >
              <span className="bg-gradient-to-r from-primary via-red-400 to-primary bg-clip-text text-transparent">
                RAHADIAN
              </span>
            </motion.h2>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/40 text-sm md:text-base leading-relaxed max-w-md mb-10"
            >
              Digital creator & developer yang suka bikin hal-hal keren di internet. Explore teknologi baru dan bikin project yang bermanfaat.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <button
                onClick={() => setActiveModal("contact")}
                className="group px-6 py-3 bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-[0.15em] rounded-sm transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
              >
                Get In Touch
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => setActiveModal("about")}
                className="px-6 py-3 border border-white/15 hover:border-white/30 text-white/60 hover:text-white text-xs font-bold uppercase tracking-[0.15em] rounded-sm transition-all duration-300"
              >
                About Me
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-2"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/[0.02] text-white/35 hover:border-primary/50 hover:bg-primary/10 hover:text-primary text-[11px] font-medium tracking-wider transition-all duration-300"
                >
                  {social.icon}
                  <span className="hidden sm:inline">{social.label}</span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-6 md:px-12 py-4 flex items-center justify-between border-t border-white/5 z-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-[10px] text-white/20 tracking-wider uppercase"
          >
            &copy; 2025 Anggi Rahadian
          </motion.span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-4"
          >
            <span className="text-[10px] text-white/20 tracking-wider">BASED IN INDONESIA</span>
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <span className="text-[10px] text-white/20 tracking-wider">OPEN TO WORK</span>
          </motion.div>
        </div>
      </div>

      {/* Side Panels Overlay */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* About Panel (Slide from Left) */}
      <AnimatePresence>
        {activeModal === "about" && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 bottom-0 left-0 w-full md:w-[450px] z-50 bg-black/80 backdrop-blur-2xl border-r border-white/10 p-8 md:p-12 overflow-y-auto flex flex-col"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-white tracking-wider">ABOUT ME</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Profile section */}
            <div className="flex items-center gap-5 mb-8 pb-8 border-b border-white/10">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 shadow-glow-red-soft shrink-0">
                <img src="/logo.png" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Anggi Rahadian</h3>
                <p className="text-primary text-sm font-semibold tracking-wider">@ju99erknot</p>
              </div>
            </div>

            <div className="space-y-6 text-white/70 leading-relaxed text-sm">
              <p>
                Halo! Saya Anggi Rahadian (ju99erknot), seorang digital creator dan developer yang suka bikin hal-hal keren di internet.
              </p>
              <p>
                Saya suka explore teknologi baru dan bikin project untuk iseng tapi tetep keren!
              </p>
            </div>

            <div className="mt-10">
              <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest text-white/50">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "React", "TypeScript", "Tailwind", "Supabase", "Node.js"].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-sm text-[11px] font-bold uppercase tracking-wider border border-primary/20 bg-primary/5 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-auto pt-10">
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Keep pushing forward.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Panel (Slide from Right) */}
      <AnimatePresence>
        {activeModal === "contact" && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 bottom-0 right-0 w-full md:w-[450px] z-50 bg-black/80 backdrop-blur-2xl border-l border-white/10 p-8 md:p-12 overflow-y-auto flex flex-col"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-white tracking-wider">CONTACT</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <p className="mb-8 text-white/60 leading-relaxed">
              Untuk collaborate, diskusi project, atau sekadar ngobrol santai, feel free to reach out di bawah ini:
            </p>

            <ul className="space-y-4 flex-1">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      {social.icon}
                    </div>
                    <span className="text-white/80 font-bold tracking-wide group-hover:text-primary transition-colors">
                      {social.label}
                    </span>
                    <ArrowUpRight size={16} className="ml-auto text-white/20 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-10 pt-10 border-t border-white/10">
               <p className="text-[10px] text-white/30 uppercase tracking-widest text-center">Based in Indonesia</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
