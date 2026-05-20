"use client";

import { useEffect, useState } from "react";
import { NeuroNoise } from "@paper-design/shaders-react";

export default function HeroShader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: -1 }}
    >
      <NeuroNoise
        colorFront="#8B5CF6"
        colorBack="#030303"
        speed={0.25}
        style={{ width: "100%", height: "100%" }}
      />
      {/* Dark overlay to tone down intensity */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(3,3,3,0.60)" }}
      />
    </div>
  );
}
