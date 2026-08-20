import SwiftUI

struct ChatsScreen: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        ScreenShell {
            VStack(alignment: .leading, spacing: 0) {
                Text("Chats").font(.fkH1).padding(.bottom, 16)

                if s.threads.isEmpty {
                    EmptyState(glyph: "💬", body_: "No enquiries yet. Message a freelancer from Explore and the thread shows up here.")
                        .frame(maxWidth: .infinity)
                } else {
                    VStack(spacing: 9) {
                        ForEach(s.threads) { t in
                            Button { store.openThread(t.id) } label: {
                                HStack(spacing: 12) {
                                    Stripe(cornerRadius: 12).frame(width: 40, height: 40)
                                    VStack(alignment: .leading, spacing: 3) {
                                        Text(t.name).font(.fkCardTitle)
                                        Text(t.last).font(.system(size: 11.5)).foregroundStyle(FK.text50).lineLimit(1)
                                    }
                                    Spacer()
                                    Text(t.ts).font(.fkMonoSm).foregroundStyle(t.ts == "now" ? FK.lime : FK.text40)
                                }
                                .padding(.horizontal, 14).padding(.vertical, 13)
                            }
                            .foregroundStyle(FK.text)
                            .background(FK.card)
                            .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                            .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.line08, lineWidth: 1))
                        }
                    }
                }
            }
            .padding(.horizontal, 20).padding(.top, 18).padding(.bottom, 26)
        }
    }
}
