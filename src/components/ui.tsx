"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export const cx = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(" ");

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** One lime primary action per view — full width, radius 13. */
export function PrimaryButton({ className, ...rest }: BtnProps) {
  return (
    <button
      {...rest}
      className={cx(
        "w-full cursor-pointer rounded-[13px] border-0 px-4 py-[14px] font-sans text-[14px] font-semibold",
        "bg-[var(--fk-lime)] text-[var(--fk-on-lime)] disabled:opacity-70",
        className,
      )}
    />
  );
}

export function OutlineButton({ className, ...rest }: BtnProps) {
  return (
    <button
      {...rest}
      className={cx(
        "w-full cursor-pointer rounded-[13px] bg-transparent px-4 py-[13px] font-sans text-[13px] font-medium",
        "border border-[var(--fk-line-14)] text-[var(--fk-text)]",
        className,
      )}
    />
  );
}

/** Small inline lime button (radius 10) used inside cards and rows. */
export function InlineButton({ className, ...rest }: BtnProps) {
  return (
    <button
      {...rest}
      className={cx(
        "cursor-pointer rounded-[10px] border-0 px-[15px] py-[10px] font-sans text-[12px] font-semibold",
        "bg-[var(--fk-lime)] text-[var(--fk-on-lime)]",
        className,
      )}
    />
  );
}

export function InlineOutlineButton({ className, ...rest }: BtnProps) {
  return (
    <button
      {...rest}
      className={cx(
        "cursor-pointer rounded-[10px] bg-transparent px-[13px] py-[9px] font-sans text-[12px] font-medium",
        "border border-[var(--fk-line-14)] text-[var(--fk-text)]",
        className,
      )}
    />
  );
}

export function Card({
  children,
  className,
  border,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { border?: string }) {
  return (
    <div
      {...rest}
      className={cx("rounded-[15px] border bg-[var(--fk-card)] p-[14px]", className)}
      style={{ borderColor: border ?? "var(--fk-line-08)", ...rest.style }}
    >
      {children}
    </div>
  );
}

export function Chip({
  on,
  className,
  ...rest
}: BtnProps & { on: boolean }) {
  return (
    <button
      {...rest}
      aria-pressed={on}
      className={cx(
        "flex-none cursor-pointer rounded-full border px-[13px] py-2 font-sans text-[12px] font-semibold",
        className,
      )}
      style={{
        background: on ? "var(--fk-lime)" : "var(--fk-card)",
        color: on ? "var(--fk-on-lime)" : "rgba(242,242,240,.75)",
        borderColor: on ? "var(--fk-lime)" : "var(--fk-line-09)",
        ...rest.style,
      }}
    />
  );
}

export function MonoLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx("t-mono-label text-[var(--fk-text-40)]", className)}>{children}</span>;
}

export function SectionTitle({
  title,
  right,
  className,
}: {
  title: string;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex items-baseline justify-between", className)}>
      <h3 className="t-h3 m-0">{title}</h3>
      {right}
    </div>
  );
}

/** Diagonal-stripe stand-in for photography. Swap for real imagery. */
export function Stripe({
  className,
  small,
  style,
  children,
}: {
  className?: string;
  small?: boolean;
  style?: React.CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div className={cx(small ? "fk-stripe-sm" : "fk-stripe", className)} style={style}>
      {children}
    </div>
  );
}

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <p className="t-meta m-0 mt-[10px] text-[var(--fk-alert)]" role="alert">
      {children}
    </p>
  );
}

export function EmptyState({
  glyph,
  title,
  body,
  children,
}: {
  glyph: ReactNode;
  title?: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <div className="px-[26px] pt-[60px] text-center">
      <div className="flex justify-center text-[22px] text-[var(--fk-text-28)]">{glyph}</div>
      {title ? <h3 className="t-screen-title m-0 mt-[14px]">{title}</h3> : null}
      <p className="t-body t-pretty m-0 mt-3 text-[var(--fk-text-45)]">{body}</p>
      {children ? <div className="mt-5 flex flex-col gap-[9px] text-left">{children}</div> : null}
    </div>
  );
}

/** Dashed-border prompt used for the empty booking / requests / gigs slots. */
export function DashedEmpty({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[15px] border border-dashed border-[var(--fk-lime-bd-40)] bg-[var(--fk-card)] p-[16px]">
      {children}
    </div>
  );
}

export function TextField({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...rest}
      className={cx(
        "w-full rounded-[13px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] px-[13px] py-[12px]",
        "font-sans text-[14px] text-[var(--fk-text)] outline-none",
        className,
      )}
    />
  );
}

export function TextArea({
  className,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...rest}
      className={cx(
        "w-full resize-none rounded-[13px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] px-[13px] py-[12px]",
        "font-sans text-[13.5px] leading-[1.5] text-[var(--fk-text)] outline-none",
        className,
      )}
    />
  );
}

/** Grouped list card with hairline dividers between rows. */
export function GroupedList({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[15px] border border-[var(--fk-line-08)] bg-[var(--fk-card)]">
      {children}
    </div>
  );
}

export function GroupedRow({
  className,
  first,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { first?: boolean }) {
  return (
    <div
      {...rest}
      className={cx(
        "flex items-center justify-between gap-3 px-[14px] py-[13px]",
        !first && "border-t border-[var(--fk-line-07)]",
        className,
      )}
    />
  );
}
