"use client";

import React from "react";

// ─── Types ───────────────────────────────────────────────────────────
interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
}

interface DockIcon {
  src?: string;
  alt: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  label?: string;
  href?: string;
}

// ─── SVG Filter ───────────────────────────────────────────────────────
export const GlassFilter: React.FC = () => (
  <svg style={{ display: "none" }} aria-hidden="true">
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="200"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

// ─── Glass Effect Wrapper ─────────────────────────────────────────────
export const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
  href,
  target = "_blank",
}) => {
  const glassStyle: React.CSSProperties = {
    boxShadow: "0 6px 6px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.1)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  const content = (
    <div
      className={`relative flex font-semibold overflow-hidden cursor-pointer transition-all duration-700 ${className}`}
      style={glassStyle}
    >
      {/* Blur layer */}
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-3xl"
        style={{
          backdropFilter: "blur(3px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      {/* White tint */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "rgba(255,255,255,0.18)" }}
      />
      {/* Inner highlight */}
      <div
        className="absolute inset-0 z-20 rounded-3xl overflow-hidden"
        style={{
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 1px 1px rgba(255,255,255,0.4)",
        }}
      />
      {/* Content */}
      <div className="relative z-30 w-full">{children}</div>
    </div>
  );

  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
};

// ─── Social Icon Dock ─────────────────────────────────────────────────
export const GlassDock: React.FC<{ icons: DockIcon[] }> = ({ icons }) => (
  <GlassEffect className="rounded-[1.5rem] p-3 hover:p-4 shadow-xl">
    <div className="flex items-center justify-center gap-4 md:gap-5 px-2 py-1 flex-wrap">
      {icons.map((icon, index) =>
        icon.href ? (
          <a
            key={index}
            href={icon.href}
            target="_blank"
            rel="noopener noreferrer"
            title={icon.label || icon.alt}
            className="flex flex-col items-center gap-1.5 transition-all duration-500 hover:scale-112 group"
            style={{
              transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
            }}
          >
            {icon.icon && (
              <span className="w-14 h-14 flex items-center justify-center text-white bg-white/5 group-hover:bg-white/12 border border-white/10 group-hover:border-amber/30 rounded-xl transition-all duration-300">
                {icon.icon}
              </span>
            )}
            {icon.src && (
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-14 h-14 object-contain p-2.5 bg-white/5 group-hover:bg-white/12 border border-white/10 group-hover:border-amber/30 rounded-xl transition-all duration-300"
              />
            )}
            {icon.label && (
              <span className="text-white/70 text-[10px] md:text-xs font-medium tracking-wider group-hover:text-amber transition-colors">
                {icon.label}
              </span>
            )}
          </a>
        ) : (
          <button
            key={index}
            onClick={icon.onClick}
            title={icon.label || icon.alt}
            className="flex flex-col items-center gap-1.5 transition-all duration-500 hover:scale-112 group"
            style={{
              transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
            }}
          >
            {icon.icon && (
              <span className="w-14 h-14 flex items-center justify-center text-white bg-white/5 group-hover:bg-white/12 border border-white/10 group-hover:border-amber/30 rounded-xl transition-all duration-300">
                {icon.icon}
              </span>
            )}
            {icon.label && (
              <span className="text-white/70 text-[10px] md:text-xs font-medium tracking-wider group-hover:text-amber transition-colors">
                {icon.label}
              </span>
            )}
          </button>
        )
      )}
    </div>
  </GlassEffect>
);

// ─── Glass Button ─────────────────────────────────────────────────────
export const GlassButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}> = ({ children, href, onClick }) => (
  <GlassEffect
    href={href}
    className="rounded-3xl px-8 py-4 hover:px-9 hover:py-5 overflow-hidden"
  >
    <div
      className="transition-all duration-700 text-center"
      style={{ transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)" }}
      onClick={onClick}
    >
      {children}
    </div>
  </GlassEffect>
);
