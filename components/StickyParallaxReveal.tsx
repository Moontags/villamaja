"use client";
import React, { useEffect, useRef, useState } from "react";

type Section = {
  id: string;
  title?: string;
  content?: React.ReactNode;
  backgroundImageUrl?: string;
  backgroundColor?: string;
};

type Props = {
  sections: Section[];
  height?: number; // viewport heights per section
  parallaxSpeed?: number; // 0.2..0.8 typical
  revealOffset?: number; // 0..1, when the section starts to reveal
};

export default function StickyParallaxReveal({
  sections,
  height = 100,
  parallaxSpeed = 0.4,
  revealOffset = 0.25,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0..sections.length

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const totalH = viewportH * sections.length;
      const start = viewportH; // start when sticky pins
      const scrolled = Math.min(Math.max(start - rect.top, 0), totalH);
      const p = scrolled / viewportH; // section-based progress
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections.length]);

  return (
    <div className="spr-wrapper" ref={containerRef}>
      {/* Spacer before sticky to allow pinning */}
      <div style={{ height: "100vh" }} />

      {/* Sticky stage */}
      <div className="spr-sticky" style={{ height: "100vh" }}>
        {sections.map((s, i) => {
          const sectionStart = i + revealOffset; // when this section begins to appear
          const local = Math.min(Math.max(progress - sectionStart, 0), 1);
          const opacity = local; // fade in
          const translateY = (1 - local) * 40; // slide up
          const parallaxY = -progress * parallaxSpeed * 60; // slow background move

          const bgStyle: React.CSSProperties = s.backgroundImageUrl
            ? {
                backgroundImage: `url(${s.backgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translate3d(0, ${parallaxY}px, 0)`,
              }
            : {
                backgroundColor: s.backgroundColor || "transparent",
                transform: `translate3d(0, ${parallaxY}px, 0)`,
              };

          return (
            <div className="spr-layer" aria-hidden={false} key={s.id}>
              <div className="spr-bg" style={bgStyle} />
              <div
                className="spr-content"
                style={{
                  opacity,
                  transform: `translate3d(0, ${translateY}px, 0)`,
                }}
              >
                {s.title && <h2 className="spr-title">{s.title}</h2>}
                {s.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Spacer after to allow full scroll-through */}
      <div style={{ height: `${height * sections.length}vh` }} />
    </div>
  );
}
