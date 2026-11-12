import { Scale } from 'lucide-react';
import { UI_COPY } from '../data/visaData';
import { Language } from '../types/visa';

interface LegalDisclaimerBlockProps {
  language: Language;
}

export function LegalDisclaimerBlock({ language }: LegalDisclaimerBlockProps) {
  const copy = UI_COPY[language].disclaimer;

  return (
    <section
      aria-label={copy.heading}
      className="bg-[#F8FAFC] border border-dashed border-[#CBD5E1] rounded-xl p-6 md:p-8"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] text-[#1E247E] flex items-center justify-center shrink-0 mt-0.5">
          <Scale className="w-4 h-4" />
        </div>
        <div className="space-y-3 text-[13px] leading-[20px] text-[#475569]">
          <h3 className="font-display text-sm font-bold text-[#1E247E]">{copy.heading}</h3>
          <p>{copy.body}</p>
          <ul className="space-y-1.5 list-disc pl-4">
            {copy.bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
