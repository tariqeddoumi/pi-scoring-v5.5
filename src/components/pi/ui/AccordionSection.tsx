"use client";

import { useState } from "react";

type AccordionSectionProps = {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  status?: "complete" | "partial" | "missing";
  children: React.ReactNode;
};

export function AccordionSection({
  title,
  subtitle,
  defaultOpen = false,
  status = "partial",
  children,
}: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="pi-accordion-card">
      <button
        type="button"
        className="pi-accordion-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <div>
          <div className="pi-accordion-title-row">
            <span className="pi-accordion-title">{title}</span>
            <span className={`pi-status-pill pi-status-${status}`}>{status}</span>
          </div>
          {subtitle ? <p className="pi-accordion-subtitle">{subtitle}</p> : null}
        </div>
        <span className={`pi-accordion-chevron ${open ? "open" : ""}`}>⌄</span>
      </button>

      {open ? <div className="pi-accordion-content">{children}</div> : null}
    </section>
  );
}
