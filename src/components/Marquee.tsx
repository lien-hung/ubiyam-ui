import { type PropsWithChildren } from "react";

import "../styles/Marquee.css";

interface MarqueeProps extends PropsWithChildren {
  gap?: string;
  className?: string;
  repeat?: number;
}

export function Marquee({ children, gap = "2rem", className = "" }: MarqueeProps) {
  return (
    <div className={`marquee-container ${className}`}>
      <div className="marquee">
        <div className="marquee-track" style={{ paddingLeft: gap, gap }}>
          {children}
        </div>
      </div>
    </div>
  )
}