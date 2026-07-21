import { useCallback, useRef } from "react";

/**
 * Gives an element a subtle 3D tilt that follows the pointer, plus a
 * gentle lift/scale on hover. Spread the returned handlers onto the
 * element you want to tilt, and attach `ref` to it.
 *
 *   const tilt = useTilt();
 *   <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} />
 */
export function useTilt({ max = 10, scale = 1.04, perspective = 900 } = {}) {
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * max * 2;
      const rotateX = (0.5 - py) * max * 2;
      el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    },
    [max, scale, perspective]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
  }, [perspective]);

  return { ref, onMouseMove, onMouseLeave };
}
