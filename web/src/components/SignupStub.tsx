"use client";

import { useState, type FormEvent } from "react";

/**
 * Freelancer sign-up form UI. This is a stub — there is no backend yet, so
 * submitting just shows a "we'll be in touch" confirmation client-side.
 * Nothing is sent anywhere.
 */
export default function SignupStub() {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (phone.trim().length < 10) return;
    setSubmitted(true);
  }

  return (
    <div className="rounded-3xl border border-fk-line-09 bg-fk-card p-6">
      <span className="t-mono-label text-fk-text-40">GET STARTED</span>

      {submitted ? (
        <div className="mt-4 flex flex-col items-start gap-2 rounded-xl border border-fk-lime-bd-28 bg-fk-lime-badge px-4 py-5">
          <span className="text-[14px] font-semibold text-fk-lime">Thanks — we&apos;ll be in touch.</span>
          <p className="text-[12.5px] leading-relaxed text-fk-text-65">
            This is a preview site, so nothing was sent yet. When FreelanceKar&apos;s freelancer app
            launches, we&apos;ll text you at the number you entered to finish onboarding.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3.5 flex flex-col gap-2.5">
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 · your phone number"
            className="rounded-xl border border-fk-line-10 bg-fk-nested px-4 py-3.5 text-[14px] text-fk-text outline-none focus:border-fk-lime-bd"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Your city"
            className="rounded-xl border border-fk-line-10 bg-fk-nested px-4 py-3.5 text-[14px] text-fk-text outline-none focus:border-fk-lime-bd"
          />
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="What do you do? e.g. Reel editing"
            className="rounded-xl border border-fk-line-10 bg-fk-nested px-4 py-3.5 text-[14px] text-fk-text outline-none focus:border-fk-lime-bd"
          />
          <button
            type="submit"
            className="mt-1 rounded-xl bg-fk-lime py-3.5 text-center text-[14px] font-semibold text-fk-on-lime transition-colors hover:bg-fk-lime-hover"
          >
            Send OTP →
          </button>
        </form>
      )}

      <p className="mt-3.5 text-[11.5px] leading-relaxed text-fk-text-40">
        By continuing you agree to the freelancer terms. Verification with Aadhaar takes about 5
        minutes.
      </p>
    </div>
  );
}
