import SwiftUI

struct NotificationsScreen: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let unread = Selectors.unreadCount(s)

        ScreenShell {
            VStack(alignment: .leading, spacing: 0) {
                HStack {
                    BackButton { store.closeNotifs() }
                    Text("Notifications").font(.fkH1Sm)
                    Spacer()
                    if unread > 0 {
                        Button { store.markAllRead() } label: {
                            Text("Mark all read").font(.system(size: 11.5, weight: .medium)).foregroundStyle(FK.lime)
                        }
                    }
                }

                if s.notifs.isEmpty {
                    EmptyState(glyph: "🔔", body_: "Nothing yet. Quotes, payment updates and messages show up here.")
                        .frame(maxWidth: .infinity)
                } else {
                    VStack(spacing: 9) {
                        ForEach(s.notifs) { n in
                            Button { store.openNotif(n.id) } label: {
                                HStack(alignment: .top, spacing: 11) {
                                    Circle()
                                        .fill(n.unread ? FK.lime : FK.text20)
                                        .frame(width: 7, height: 7)
                                        .padding(.top, 5)
                                    VStack(alignment: .leading, spacing: 3) {
                                        Text(n.title).font(.system(size: 13, weight: .semibold))
                                        Text(n.body).font(.fkMeta).foregroundStyle(FK.text55)
                                        if let target = n.target {
                                            Text(target.type == .order ? "View order →" : "Open chat →")
                                                .font(.system(size: 10, weight: .medium)).foregroundStyle(FK.lime)
                                        }
                                    }
                                    Spacer()
                                    Text(n.ts).font(.fkMonoSm).foregroundStyle(FK.text35)
                                }
                                .padding(.horizontal, 14).padding(.vertical, 13)
                            }
                            .foregroundStyle(FK.text)
                            .background(n.unread ? FK.notifUnread : FK.notifRead)
                            .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                            .overlay(RoundedRectangle(cornerRadius: 15).stroke(n.unread ? FK.limeBd28 : FK.line07, lineWidth: 1))
                        }
                    }
                    .padding(.top, 18)
                }
            }
            .padding(.horizontal, 20).padding(.top, 16).padding(.bottom, 26)
        }
    }
}
