import React, { useMemo } from "react";
import { Heart } from "lucide-react";

export default function BurstParticles({ burstKey, count = 18 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const dist = 120 + Math.random() * 160;
        return {
          id: i,
          bx: Math.cos(angle) * dist,
          by: Math.sin(angle) * dist - 60,
          size: 14 + Math.random() * 12,
          delay: Math.random() * 0.15,
        };
      }),
    // regenerate a fresh random burst each time burstKey changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burstKey, count]
  );

  return (
    <div className="burst-particles">
      {particles.map((p) => (
        <span
          key={p.id}
          className="burst-particle"
          style={{
            left: "50%",
            bottom: "18%",
            "--bx": `${p.bx}px`,
            "--by": `${p.by}px`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <Heart size={p.size} fill="currentColor" strokeWidth={0} />
        </span>
      ))}
    </div>
  );
}
