import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/primitives/Button";
import { useSEO } from "@/hooks/useSEO";

export const NotFound: React.FC = () => {
  useSEO({
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
    noIndex: true,
  });

  return (
    <main
      id="main"
      className="min-h-[85svh] flex flex-col items-center justify-center text-center px-6 pt-24"
    >
      <span className="text-meta text-[var(--color-fg-muted)] mb-4">
        404 Error
      </span>
      <h1 className="text-display text-[44px] sm:text-[64px] md:text-[88px] text-[var(--color-fg)] font-semibold mb-6">
        That page doesn&apos;t exist.
      </h1>
      <p className="text-[17px] text-[var(--color-fg-secondary)] max-w-[42ch] mb-10 leading-relaxed">
        The link you followed may be broken or the page may have been removed.
        Head back to the work or get in touch.
      </p>
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="primary">Return home</Button>
        </Link>
        <Link to="/work">
          <Button variant="outline">Browse work</Button>
        </Link>
      </div>
    </main>
  );
};
