import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import faqData from '@/content/faq.json';
import { HelpCircle } from 'lucide-react';

export const WhyChooseUsFAQ: React.FC = () => {
  return (
    <section
      id="faq"
      className="relative w-full max-w-full bg-[#0A0A0A] text-white border-none isolate py-[clamp(3.5rem,5.5vw,6.5rem)] overflow-hidden"
    >
      {/* Balanced Orange-Red Ambient Atmospheric Glow matching Hero & Redesign Archive */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1100px] lg:w-[1400px] h-[500px] sm:h-[700px] lg:h-[850px] bg-gradient-to-r from-[#FF4500]/10 via-[#FF3E1D]/06 to-[#FF4500]/08 blur-[180px] pointer-events-none -z-10 rounded-full"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-3xl sm:max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Clean Centered Header */}
        <div className="mb-10 sm:mb-14 text-center space-y-3 sm:space-y-4">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 p-1 pr-3.5 ring-1 ring-white/15 backdrop-blur-md shadow-sm">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-950 bg-white rounded-full py-1 px-3 shrink-0 shadow-sm leading-none">
              <HelpCircle className="w-3 h-3 text-neutral-950" />
              FAQ
            </span>
            <span className="text-xs sm:text-sm font-medium text-white/90 leading-none">
              Common Questions
            </span>
          </div>

          <h2 className="font-haas font-bold text-3xl sm:text-5xl lg:text-[clamp(2.5rem,3.8vw,3.75rem)] text-white tracking-tight leading-[0.96]">
            Frequently Asked Questions.
          </h2>

          <p className="mx-auto max-w-xl text-[15px] sm:text-[17px] text-white/70 leading-relaxed font-normal">
            Everything you need to know about the design engineering process, turnaround times, and working together.
          </p>
        </div>

        {/* Clean Accordion List */}
        <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
          {faqData.faqs.map((faq, index) => (
            <AccordionItem key={faq.id || index} value={`item-${index}`} className="border-b border-white/10">
              <AccordionTrigger className="text-left text-[16px] sm:text-[18px] font-haas font-medium text-white/90 hover:text-white py-5 sm:py-6 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/70 text-[15px] sm:text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
};

export default WhyChooseUsFAQ;
