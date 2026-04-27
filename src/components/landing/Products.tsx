import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import dairy from "@/assets/product-dairy.jpg";
import fruits from "@/assets/product-fruits.jpg";
import processed from "@/assets/product-processed.jpg";
import beverages from "@/assets/product-beverages.jpg";
import organic from "@/assets/product-organic.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const Products = () => {
  const { t } = useLanguage();
  const products = [
    { title: t("prod.1.title"), category: t("prod.1.cat"), tag: "01", img: dairy, desc: t("prod.1.desc") },
    { title: t("prod.2.title"), category: t("prod.2.cat"), tag: "02", img: fruits, desc: t("prod.2.desc") },
    { title: t("prod.3.title"), category: t("prod.3.cat"), tag: "03", img: processed, desc: t("prod.3.desc") },
    { title: t("prod.4.title"), category: t("prod.4.cat"), tag: "04", img: beverages, desc: t("prod.4.desc") },
    { title: t("prod.5.title"), category: t("prod.5.cat"), tag: "05", img: organic, desc: t("prod.5.desc") },
  ];
  const [active, setActive] = useState(2); // center card index
  const trackRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const next = () => setActive((p) => (p + 1) % products.length);
  const prev = () => setActive((p) => (p - 1 + products.length) % products.length);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="products" className="relative py-8 md:py-28 bg-[hsl(0_0%_4%)] text-white overflow-hidden">
      {/* Ambient warm glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,hsl(var(--gold)/0.18),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,hsl(var(--gold-deep)/0.2),transparent_60%)] blur-3xl" />
      </div>

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">{t("prod.eyebrow")}</span>
            <h2 className="mt-4 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              {t("prod.title.1")} <span className="italic text-gradient-gold">{t("prod.title.2")}</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md md:text-right">
            {t("prod.subtitle")}
          </p>
        </motion.div>

        {/* Big background headline */}
        <div className="relative">
          <motion.h3
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="pointer-events-none select-none absolute inset-x-0 -top-2 md:-top-6 text-center font-serif italic text-[18vw] md:text-[14vw] leading-none tracking-tight text-white/[0.04]"
          >
            {t("prod.bg")}
          </motion.h3>

          {/* Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mouseX.set((e.clientX - r.left) / r.width - 0.5);
              mouseY.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onMouseLeave={() => {
              animate(mouseX, 0, { duration: 0.6 });
              animate(mouseY, 0, { duration: 0.6 });
            }}
            className="relative h-[520px] md:h-[600px] flex items-center justify-center [perspective:1800px]"
          >
            <div ref={trackRef} className="relative w-full h-full flex items-center justify-center">
              {products.map((p, i) => {
                const offset = i - active;
                const abs = Math.abs(offset);
                return (
                  <Card
                    key={p.tag}
                    product={p}
                    offset={offset}
                    abs={abs}
                    isActive={offset === 0}
                    onClick={() => setActive(i)}
                    mouseX={mouseX}
                    mouseY={mouseY}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Active product info */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={products[active].tag}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center md:text-left"
            >
              <span className="text-xs tracking-[0.3em] text-gold/80">/ {products[active].tag} — {products[active].category}</span>
              <h4 className="font-serif text-3xl md:text-4xl mt-2">{products[active].title}</h4>
              <p className="text-white/60 text-sm mt-2 max-w-md">{products[active].desc}</p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous"
              className="group relative h-12 w-12 rounded-full border border-white/20 hover:border-gold transition-colors duration-500 flex items-center justify-center overflow-hidden"
            >
              <span className="absolute inset-0 bg-gold scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 ease-cinematic" />
              <ArrowLeft className="relative h-4 w-4 text-white group-hover:text-black transition-colors duration-500" />
            </button>
            <span className="font-serif text-lg tabular-nums text-white/70">
              <span className="text-gold">{String(active + 1).padStart(2, "0")}</span> / {String(products.length).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              aria-label="Next"
              className="group relative h-12 w-12 rounded-full border border-white/20 hover:border-gold transition-colors duration-500 flex items-center justify-center overflow-hidden"
            >
              <span className="absolute inset-0 bg-gold scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 ease-cinematic" />
              <ArrowRight className="relative h-4 w-4 text-white group-hover:text-black transition-colors duration-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Card ---------------- */
type ProductItem = { title: string; category: string; tag: string; img: string; desc: string };
interface CardProps {
  product: ProductItem;
  offset: number;
  abs: number;
  isActive: boolean;
  onClick: () => void;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}

const Card = ({ product, offset, abs, isActive, onClick, mouseX, mouseY }: CardProps) => {
  // Parallax tilt driven by mouse — strongest on the active card
  const rotY = useTransform(mouseX, (v) => v * (isActive ? 14 : 6));
  const rotX = useTransform(mouseY, (v) => -v * (isActive ? 10 : 4));

  // Layout: spread cards along a slight arc
  const spread = 220; // px between card centers
  const x = offset * spread;
  const z = -abs * 120;
  const baseRot = offset * 6; // fan rotation
  const scale = isActive ? 1 : 0.85 - abs * 0.04;
  const opacity = abs > 2 ? 0 : 1;
  const zIndex = 10 - abs;

  return (
    <motion.button
      onClick={onClick}
      initial={false}
      animate={{
        x,
        z,
        rotateZ: baseRot,
        scale,
        opacity,
      }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{
        rotateY: rotY,
        rotateX: rotX,
        zIndex,
        transformStyle: "preserve-3d",
      }}
      whileHover={!isActive ? { scale: scale + 0.04, y: -8 } : {}}
      className="absolute h-[420px] w-[260px] md:h-[480px] md:w-[300px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer focus:outline-none"
    >
      {/* Image */}
      <img
        src={product.img}
        alt={product.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "translateZ(0)" }}
      />
      {/* Warm filter on inactive */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90"
        animate={{ opacity: isActive ? 0.55 : 0.85 }}
        transition={{ duration: 0.7, ease: EASE }}
      />
      {/* Gold border ring on active */}
      <motion.div
        className="absolute inset-0 rounded-2xl ring-1 ring-inset"
        animate={{
          boxShadow: isActive
            ? "0 0 0 1px hsl(var(--gold) / 0.6) inset, 0 30px 80px -20px hsl(var(--gold) / 0.4)"
            : "0 0 0 1px hsl(0 0% 100% / 0.08) inset",
        }}
        transition={{ duration: 0.7 }}
      />

      {/* Top tag pill */}
      <div className="absolute top-4 left-4 z-10">
        <motion.span
          animate={{
            backgroundColor: isActive ? "hsl(var(--gold))" : "hsl(0 0% 100% / 0.15)",
            color: isActive ? "hsl(0 0% 6%)" : "hsl(0 0% 100%)",
          }}
          transition={{ duration: 0.5 }}
          className="inline-block px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase font-semibold backdrop-blur-md"
        >
          {product.category.split(" ")[0]}
        </motion.span>
      </div>

      {/* Bottom title */}
      <div className="absolute inset-x-0 bottom-0 p-5 z-10" style={{ transform: "translateZ(40px)" }}>
        <motion.div
          animate={{ y: isActive ? 0 : 8, opacity: isActive ? 1 : 0.7 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="text-[10px] tracking-[0.3em] text-gold/90">/ {product.tag}</span>
          <h3 className="font-serif text-xl md:text-2xl text-white mt-1 leading-tight">
            {product.title}
          </h3>
        </motion.div>
      </div>

      {/* Shimmer sweep on active */}
      {isActive && (
        <motion.div
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-12deg] pointer-events-none"
        />
      )}
    </motion.button>
  );
};

export default Products;
