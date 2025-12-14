import React from "react";

export default function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden>
      <svg className="divider-wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0 60 C 240 120 480 0 720 60 C 960 120 1200 0 1440 60 L1440 120 L0 120 Z"
          className="wave-path"
        />
      </svg>
    </div>
  );
}
