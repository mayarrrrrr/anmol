import React, { useMemo } from "react";
import { Heart } from "lucide-react";

export default function FloatingHearts({ count = 16 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 18,
        duration: 14 + Math.random() * 12,
        delay: Math.random() * 16,
        drift: (Math.random() - 0.5) * 60,
        opacity: 0.25 + Math.random() * 0.35,
      })),
    [count]
  );

  return (
    <div className="hearts-layer" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            "--drift": `${h.drift}px`,
            opacity: h.opacity,
          }}
        >
          <Heart size={h.size} fill="currentColor" strokeWidth={0} />
        </span>
      ))}
    </div>
  );
}
