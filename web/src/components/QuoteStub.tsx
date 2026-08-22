"use client";

import { useState, type FormEvent } from "react";

/**
 * "Get quotes" / "Request a quote" form UI. This is a stub — there is no
 * backend yet, so submitting just shows a confirmation client-side.
 * Nothing is sent anywhere.
 */
export default function QuoteStub({
  placeholder,
  submitLabel,
  className = "",
}: {
  placeholder: string;
  submitLabel: string;
  className?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [brief, setBrief] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (brief.trim().length < 8) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className={`rounded-xl border border-fk-lime-bd-28 bg-fk-lime-badge px-4 py-4 text-[13px] leading-relaxed text-fk-text-65 ${className}`}
      >
        <span className="block font-semibold text-fk-lime">Got it — thanks.</span>
        This is a preview site, so nothing was sent yet. When the FreelanceKar app
        launches, verified freelancers matching this will quote you directly here.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <textarea
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="w-full resize-none rounded-xl border border-fk-line-10 bg-fk-nested px-4 py-3.5 text-[14px] text-fk-text outline-none focus:border-fk-lime-bd"
      />
      <button
        type="submit"
        className="mt-2.5 w-full rounded-xl bg-fk-lime px-4 py-3.5 text-center text-[14px] font-semibold text-fk-on-lime transition-colors hover:bg-fk-lime-hover"
      >
        {submitLabel}
      </button>
    </form>
  );
}
