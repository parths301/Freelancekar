"use client";

/**
 * Line icons: 24×24 viewBox, no fill, currentColor stroke at 1.7, round caps.
 * The glyph characters elsewhere in the UI are placeholders from the prototype
 * and should be swapped for icons from this set as they are drawn.
 */

type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const HomeIcon = ({ size = 25, className }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M3.4 10.6 12 4l8.6 6.6V19a1 1 0 0 1-1 1h-4.8v-5.6H9.2V20H4.4a1 1 0 0 1-1-1z" />
  </svg>
);

export const ExploreIcon = ({ size = 25, className }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M11 4.2a6.8 6.8 0 1 0 0 13.6 6.8 6.8 0 0 0 0-13.6M20.2 20l-4.4-4.4" />
  </svg>
);

export const ChatsIcon = ({ size = 25, className }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M4 5.4h16v10.2H9.6L4 19.8z" />
  </svg>
);

export const PersonIcon = ({ size = 25, className }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M12 4.2a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4M4.8 20c1-3.4 3.8-5.2 7.2-5.2s6.2 1.8 7.2 5.2" />
  </svg>
);

export const DashboardIcon = ({ size = 25, className }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M4 4.6h6.4V11H4zM13.6 4.6H20V11h-6.4zM4 13h6.4v6.4H4zM13.6 13H20v6.4h-6.4z" />
  </svg>
);

export const GigsIcon = ({ size = 25, className }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M3.4 8.2h17.2v11H3.4zM9 8.2V6a1.4 1.4 0 0 1 1.4-1.4h3.2A1.4 1.4 0 0 1 15 6v2.2" />
  </svg>
);

export const BellIcon = ({ size = 19, className }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M18.5 16.5H5.5l1.6-2.6V10a4.9 4.9 0 0 1 9.8 0v3.9zM10 19.4a2.2 2.2 0 0 0 4 0" />
  </svg>
);
