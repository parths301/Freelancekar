"use client";

import { useActionsContext, useApp } from "@/lib/store";
import { unreadCount } from "@/lib/selectors";
import { BackButton } from "../common";
import { BellIcon } from "../icons";
import { ScreenShell } from "../shell";
import { EmptyState } from "../ui";

export function Notifications() {
  const s = useApp();
  const a = useActionsContext();
  const unread = unreadCount(s);

  return (
    <ScreenShell className="px-5 pb-[26px] pt-4">
      <div className="flex items-center gap-3">
        <BackButton onClick={a.closeNotifs} />
        <h1 className="t-h1-sm m-0">Notifications</h1>
        {unread > 0 ? (
          <button
            onClick={a.markAllRead}
            className="ml-auto cursor-pointer border-0 bg-transparent p-0 font-sans text-[11.5px] font-medium text-[var(--fk-lime)]"
          >
            Mark all read
          </button>
        ) : null}
      </div>

      {s.notifs.length === 0 ? (
        <EmptyState
          glyph={<BellIcon size={26} />}
          body="Nothing yet. Quotes, payment updates and messages show up here."
        />
      ) : (
        <div className="mt-[18px] flex flex-col gap-[9px]">
          {s.notifs.map((n) => (
            <button
              key={n.id}
              onClick={() => a.openNotif(n.id)}
              className="flex cursor-pointer items-start gap-[11px] rounded-[15px] border px-[14px] py-[13px] text-left text-[var(--fk-text)]"
              style={{
                background: n.unread ? "var(--fk-notif-unread)" : "var(--fk-notif-read)",
                borderColor: n.unread ? "var(--fk-lime-bd-28)" : "var(--fk-line-07)",
              }}
            >
              <span
                className="mt-[5px] h-[7px] w-[7px] flex-none rounded-full"
                style={{ background: n.unread ? "var(--fk-lime)" : "var(--fk-text-20)" }}
                aria-label={n.unread ? "Unread" : "Read"}
              />
              <div className="flex flex-1 flex-col gap-[3px]">
                <span className="font-sans text-[13px] font-semibold">{n.title}</span>
                <span className="t-meta t-pretty text-[var(--fk-text-55)]">{n.body}</span>
                {n.target ? (
                  <span className="font-sans text-[10px] font-medium text-[var(--fk-lime)]">
                    {n.target.type === "order" ? "View order →" : "Open chat →"}
                  </span>
                ) : null}
              </div>
              <span className="t-mono-sm flex-none text-[var(--fk-text-35)]">{n.ts}</span>
            </button>
          ))}
        </div>
      )}
    </ScreenShell>
  );
}
