"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        return (
          <div key={index} className="faq-item" data-open={isOpen}>
            <h3>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="mono faq-no">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="faq-q">{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            <div id={panelId} className="faq-panel" aria-hidden={!isOpen}>
              <div className="faq-panel-inner">
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
