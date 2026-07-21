import React from "react";
import { Mail, ChevronDown } from "lucide-react";
import { CONFIG } from "../config.js";
import { useTilt } from "../hooks/useTilt.js";

export default function Hero({ opened, onOpen }) {
  const tilt = useTilt({ max: 16, scale: 1.08, perspective: 700 });

  return (
    <section className="hero section">
      <div className="eyebrow">happy anniversary</div>
      <h1 className="hero-title">
        {CONFIG.yourName} <span className="amp">&amp;</span> {CONFIG.partnerName}
      </h1>
      <p className="hero-sub">One year of little inside jokes, quiet Sundays, and choosing each other.</p>

      <div className="seal-wrap">
        <button
          ref={tilt.ref}
          className="seal"
          onClick={onOpen}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          aria-label="Open your letter"
        >
          <Mail size={30} strokeWidth={1.8} />
        </button>
        <span className="seal-hint">{opened ? "letter opened" : "tap to open your letter"}</span>
      </div>

      <div className="scroll-cue">
        <ChevronDown size={26} />
      </div>
    </section>
  );
}
