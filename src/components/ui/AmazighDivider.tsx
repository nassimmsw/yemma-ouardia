import React from 'react';

interface AmazighDividerProps {
  color?: string;
  className?: string;
}

export const AmazighDivider: React.FC<AmazighDividerProps> = ({
  color = '#C4622D',
  className = '',
}) => (
  <div className={`flex items-center justify-center gap-4 py-2 ${className}`} aria-hidden="true">
    {/* Left line */}
    <div
      className="flex-1 h-px"
      style={{
        background: `linear-gradient(90deg, transparent, ${color}60)`,
      }}
    />
    {/* Central Amazigh diamond motif */}
    <svg
      width="60"
      height="24"
      viewBox="0 0 60 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left small diamond */}
      <polygon
        points="6,12 12,6 18,12 12,18"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Center large diamond */}
      <polygon
        points="30,2 42,12 30,22 18,12"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.8"
      />
      {/* Center dot */}
      <circle cx="30" cy="12" r="2" fill={color} opacity="0.9" />
      {/* Right small diamond */}
      <polygon
        points="42,12 48,6 54,12 48,18"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
    {/* Right line */}
    <div
      className="flex-1 h-px"
      style={{
        background: `linear-gradient(90deg, ${color}60, transparent)`,
      }}
    />
  </div>
);

// Tifinagh-inspired decorative row
export const TifinaghRow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
    {['⵰', 'ⵣ', '⵰', 'ⵢ', '⵰', 'ⵎ', '⵰', 'ⵎ', '⵰', 'ⵢ', '⵰', 'ⵣ', '⵰'].map((char, i) => (
      <span
        key={i}
        className="text-terracotta/40 text-xs font-light"
        style={{ fontFamily: 'serif' }}
      >
        {char}
      </span>
    ))}
  </div>
);
