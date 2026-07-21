import React from "react";
import { CONFIG } from "../config.js";
import { useReveal } from "../hooks/useReveal.js";
import { useTilt } from "../hooks/useTilt.js";

const ROTATIONS = [-4, 3, -2, 4, -3, 2];

function Polaroid({ photo, rotation }) {
  const tilt = useTilt({ max: 12, scale: 1.06, perspective: 800 });

  return (
    <div className="polaroid-outer" style={{ "--base-rotate": `${rotation}deg` }}>
      <div className="tape" />
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="polaroid"
      >
        <img src={photo.src} alt={photo.caption} loading="lazy" />
        <div className="cap">{photo.caption}</div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [headRef, headVisible] = useReveal();

  return (
    <section className="gallery-section section">
      <div ref={headRef} className={`gallery-head ${headVisible ? "visible" : ""}`}>
        <h2>Moments we've made</h2>
        <p>a few of my favorites</p>
      </div>

      <div className="polaroid-grid">
        {CONFIG.photos.map((p, i) => (
          <Polaroid key={i} photo={p} rotation={ROTATIONS[i % ROTATIONS.length]} />
        ))}
      </div>
    </section>
  );
}
