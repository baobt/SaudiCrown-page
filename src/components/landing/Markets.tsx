import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { useLanguage } from "@/i18n/LanguageContext";

const VIETNAM: [number, number] = [14.0583, 108.2772];

// labelOffset: [dx, dy] in px — push labels away from each other since GCC is geographically clustered
const markets: {
  name: string;
  location: [number, number];
  id: string;
  labelOffset: [number, number];
  anchor?: "top" | "bottom" | "left" | "right";
}[] = [
  { name: "Vietnam",      location: VIETNAM,             id: "vn", labelOffset: [0, -14],   anchor: "top" },
  { name: "Saudi Arabia", location: [23.8859, 45.0792],  id: "sa", labelOffset: [-70, -10], anchor: "left" },
  { name: "UAE",          location: [23.4241, 53.8478],  id: "ae", labelOffset: [55, 18],   anchor: "right" },
  { name: "Qatar",        location: [25.3548, 51.1839],  id: "qa", labelOffset: [50, -22],  anchor: "right" },
  { name: "Kuwait",       location: [29.3117, 47.4818],  id: "kw", labelOffset: [-10, -32], anchor: "top" },
  { name: "Bahrain",      location: [25.9304, 50.6378],  id: "bh", labelOffset: [-65, 8],   anchor: "left" },
  { name: "Oman",         location: [21.4735, 55.9754],  id: "om", labelOffset: [60, 36],   anchor: "right" },
];

// Project lat/lng to 2D screen coords on the globe.
// Matches cobe's projection: phi rotates around Y, theta tilts around X.
const project = (
  [lat, lng]: [number, number],
  phi: number,
  theta: number,
  size: number
) => {
  const phiRad = (90 - lat) * (Math.PI / 180);
  const thetaRad = (lng + 180) * (Math.PI / 180);
  const x = -Math.sin(phiRad) * Math.cos(thetaRad);
  const y = Math.cos(phiRad);
  const z = Math.sin(phiRad) * Math.sin(thetaRad);

  const cosP = Math.cos(phi);
  const sinP = Math.sin(phi);
  const x1 = x * cosP + z * sinP;
  const z1 = -x * sinP + z * cosP;

  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  const y2 = y * cosT - z1 * sinT;
  const z2 = y * sinT + z1 * cosT;

  const r = size / 2;
  return {
    sx: r + x1 * r,
    sy: r - y2 * r,
    visible: z2 > 0,
  };
};

const Markets = () => {
  const { t } = useLanguage();
  const localizedMarkets = markets.map((m) => ({ ...m, name: t(`mkt.country.${m.id}` as any) }));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [labels, setLabels] = useState(
    markets.map((m) => ({ ...m, sx: 0, sy: 0, visible: false }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let size = canvas.offsetWidth || 600;
    let phi = 4.6;
    let theta = 0.25;
    let rafId = 0;

    // Drag state
    let pointerInteracting: number | null = null;
    let pointerStartX = 0;
    let pointerStartPhi = 0;
    let pointerStartY = 0;
    let pointerStartTheta = 0;
    let autoRotate = true;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi,
      theta,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.95, 0.92, 0.85],
      markerColor: [212 / 255, 175 / 255, 55 / 255],
      glowColor: [0.85, 0.7, 0.35],
      markers: markets.map((m) => ({
        location: m.location,
        size: m.id === "vn" ? 0.08 : 0.05,
        id: m.id,
      })),
      arcs: markets
        .filter((m) => m.id !== "vn")
        .map((m) => ({
          from: VIETNAM,
          to: m.location,
          id: `arc-${m.id}`,
        })),
      arcColor: [212 / 255, 175 / 255, 55 / 255],
      arcWidth: 0.8,
      arcHeight: 0.4,
    });

    const animate = () => {
      if (autoRotate && pointerInteracting === null) phi += 0.003;
      globe.update({ phi, theta });

      // Update label positions
      setLabels(
        markets.map((m) => {
          const p = project(m.location, phi, theta, size);
          return { ...m, sx: p.sx, sy: p.sy, visible: p.visible };
        })
      );

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    setTimeout(() => {
      canvas.style.opacity = "1";
    }, 100);

    // Drag handlers
    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting = e.clientX;
      pointerStartX = e.clientX;
      pointerStartPhi = phi;
      pointerStartY = e.clientY;
      pointerStartTheta = theta;
      canvas.style.cursor = "grabbing";
      autoRotate = false;
    };
    const onPointerUp = () => {
      pointerInteracting = null;
      canvas.style.cursor = "grab";
      // Resume auto-rotate after a brief pause
      setTimeout(() => {
        autoRotate = true;
      }, 1500);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteracting === null) return;
      const dx = e.clientX - pointerStartX;
      const dy = e.clientY - pointerStartY;
      phi = pointerStartPhi + dx / 150;
      theta = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, pointerStartTheta - dy / 150));
    };

    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    const onResize = () => {
      size = canvas.offsetWidth || 600;
      globe.update({ width: size * 2, height: size * 2 });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="markets" className="relative py-8 md:py-28 bg-secondary overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">{t("mkt.eyebrow")}</span>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
            {t("mkt.title.1")} <span className="italic text-gradient-gold">{t("mkt.title.2")}</span>.
          </h2>
          <p className="mt-6 text-muted-foreground">
            {t("mkt.subtitle")}
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl mx-auto aspect-square"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,hsl(var(--gold)/0.3),transparent_60%)] blur-3xl pointer-events-none" />
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: 1,
              contain: "layout paint size",
              opacity: 0,
              transition: "opacity 1s ease",
              touchAction: "none",
            }}
          />

          {/* Labels overlay with offset positioning + leader lines */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
              {labels.map((l) => {
                const w = canvasRef.current?.offsetWidth || 1;
                const x1 = (l.sx / w) * 100;
                const y1 = (l.sy / w) * 100;
                const x2 = ((l.sx + l.labelOffset[0]) / w) * 100;
                const y2 = ((l.sy + l.labelOffset[1]) / w) * 100;
                return (
                  <line
                    key={`line-${l.id}`}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="hsl(var(--gold))"
                    strokeWidth="1"
                    strokeOpacity={l.visible ? 0.6 : 0}
                    style={{ transition: "stroke-opacity 0.3s ease" }}
                  />
                );
              })}
            </svg>
            {labels.map((l) => {
              const w = canvasRef.current?.offsetWidth || 1;
              const left = ((l.sx + l.labelOffset[0]) / w) * 100;
              const top = ((l.sy + l.labelOffset[1]) / w) * 100;
              const translate =
                l.anchor === "left"
                  ? "-100%, -50%"
                  : l.anchor === "right"
                  ? "0%, -50%"
                  : l.anchor === "bottom"
                  ? "-50%, 0%"
                  : "-50%, -100%";
              return (
                <div
                  key={l.id}
                  className="absolute"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: `translate(${translate})`,
                    opacity: l.visible ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <div className="px-2.5 py-1 rounded-md bg-foreground/95 text-background text-[11px] font-semibold whitespace-nowrap shadow-lg">
                    {t(`mkt.country.${l.id}` as any)}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {localizedMarkets.map((m, i) => (
            <motion.span
              key={m.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="px-5 py-2 rounded-full glass-light text-sm font-medium border border-border"
            >
              {m.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Markets;
