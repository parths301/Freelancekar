"use client";

import { useActionsContext, useApp } from "@/lib/store";
import { ChatsIcon } from "../icons";
import { ScreenShell } from "../shell";
import { EmptyState, Stripe } from "../ui";

export function Chats() {
  const s = useApp();
  const a = useActionsContext();

  return (
    <ScreenShell className="px-5 pb-[26px] pt-[18px]">
      <h1 className="t-h1 m-0 mb-4">Chats</h1>

      {s.threads.length === 0 ? (
        <EmptyState
          glyph={<ChatsIcon size={26} />}
          body="No enquiries yet. Message a freelancer from Explore and the thread shows up here."
        />
      ) : (
        <div className="flex flex-col gap-[9px]">
          {s.threads.map((t) => (
            <button
              key={t.id}
              onClick={() => a.openThread(t.id)}
              className="flex cursor-pointer items-center gap-3 rounded-[15px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] px-[14px] py-[13px] text-left text-[var(--fk-text)]"
            >
              <Stripe small className="h-10 w-10 flex-none rounded-[12px]" />
              <div className="flex flex-1 flex-col gap-[3px] overflow-hidden">
                <span className="t-card-title">{t.name}</span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap font-sans text-[11.5px] text-[var(--fk-text-50)]">
                  {t.last}
                </span>
              </div>
              <span
                className="t-mono-sm flex-none"
                style={{ color: t.ts === "now" ? "var(--fk-lime)" : "var(--fk-text-40)" }}
              >
                {t.ts}
              </span>
            </button>
          ))}
        </div>
      )}
    </ScreenShell>
  );
}
