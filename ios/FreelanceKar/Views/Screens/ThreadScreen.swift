import SwiftUI

private struct QuoteStatusInfo { var client: String; var freelancer: String; var color: Color; var border: Color }

private let quoteStatusMap: [QuoteStatus: QuoteStatusInfo] = [
    .pending: QuoteStatusInfo(client: "AWAITING YOUR REPLY", freelancer: "SENT · AWAITING REPLY", color: FK.amber, border: Color(hex: 0xF5B851, opacity: 0.45)),
    .accepted: QuoteStatusInfo(client: "ACCEPTED · BOOKED", freelancer: "ACCEPTED · BOOKED", color: FK.lime, border: FK.lime),
    .declined: QuoteStatusInfo(client: "DECLINED", freelancer: "DECLINED", color: FK.text40, border: FK.line08),
]

struct ThreadScreen: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let t = Selectors.currentThread(s)
        let q = t?.quote
        let status = q.flatMap { quoteStatusMap[$0.status] }

        VStack(spacing: 0) {
            HStack(spacing: 12) {
                BackButton { store.go(.chats) }
                Stripe(cornerRadius: 11).frame(width: 34, height: 34)
                VStack(alignment: .leading, spacing: 2) {
                    Text(t?.name ?? "").font(.system(size: 14, weight: .semibold))
                    Text("Usually replies in 15 min").font(.system(size: 10.5)).foregroundStyle(FK.text45)
                }
                Spacer()
            }
            .padding(.horizontal, 18).padding(.vertical, 14)
            .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.line08), alignment: .bottom)

            ScrollViewReader { proxy in
                ScrollView {
                    VStack(alignment: .leading, spacing: 10) {
                        ForEach(t?.msgs ?? []) { m in
                            HStack {
                                if m.from == .me { Spacer(minLength: 40) }
                                VStack(alignment: .trailing, spacing: 5) {
                                    Text(m.text).font(.system(size: 13)).foregroundStyle(FK.text)
                                    Text(m.ts).font(.system(size: 9.5, weight: .medium, design: .monospaced)).opacity(0.5)
                                }
                                .padding(.horizontal, 13).padding(.vertical, 10)
                                .background(m.from == .me ? FK.limeBadge : FK.card)
                                .overlay(RoundedCorner(radius: 15, corners: m.from == .me ? [.topLeft, .topRight, .bottomLeft] : [.topLeft, .topRight, .bottomRight])
                                    .stroke(m.from == .me ? FK.limeBd35 : FK.line08, lineWidth: 1))
                                .clipShape(RoundedCorner(radius: 15, corners: m.from == .me ? [.topLeft, .topRight, .bottomLeft] : [.topLeft, .topRight, .bottomRight]))
                                if m.from == .them { Spacer(minLength: 40) }
                            }
                            .id(m.id)
                        }

                        if let q, let status {
                            VStack(alignment: .leading, spacing: 0) {
                                HStack {
                                    MonoLabel(text: "QUOTE")
                                    Spacer()
                                    Text(s.freelancerMode ? status.freelancer : status.client).font(.fkMonoSm).foregroundStyle(status.color)
                                }
                                Text(money(q.amount)).font(.fkQuote).padding(.top, 8)
                                Text("\(q.service) · delivery in \(q.days)").font(.system(size: 11.5)).foregroundStyle(FK.text50).padding(.top, 3)
                                Text(q.msg).font(.fkBodySm).foregroundStyle(Color(hex: 0xF2F2F0, opacity: 0.62)).padding(.top, 11)

                                if q.status == .pending && !s.freelancerMode {
                                    HStack(spacing: 8) {
                                        Button { store.declineQuote() } label: {
                                            Text("Decline").font(.system(size: 12.5, weight: .medium)).foregroundStyle(Color(hex: 0xF2F2F0, opacity: 0.7))
                                                .frame(maxWidth: .infinity).padding(.vertical, 11)
                                        }
                                        .overlay(RoundedRectangle(cornerRadius: 11).stroke(FK.line14, lineWidth: 1))
                                        Button { store.acceptQuote() } label: {
                                            Text("Accept quote").font(.system(size: 12.5, weight: .semibold)).foregroundStyle(FK.onLime)
                                                .frame(maxWidth: .infinity).padding(.vertical, 11)
                                        }
                                        .background(FK.lime)
                                        .clipShape(RoundedRectangle(cornerRadius: 11, style: .continuous))
                                    }
                                    .padding(.top, 14)
                                    .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.line07), alignment: .top)
                                }

                                if q.status == .accepted {
                                    Button { store.openOrderFromThread() } label: {
                                        Text("View order").font(.system(size: 12, weight: .semibold)).foregroundStyle(FK.lime)
                                            .frame(maxWidth: .infinity).padding(.vertical, 11)
                                    }
                                    .overlay(RoundedRectangle(cornerRadius: 11).stroke(FK.line14, lineWidth: 1))
                                    .padding(.top, 13)
                                }
                            }
                            .padding(15)
                            .background(FK.card)
                            .clipShape(RoundedRectangle(cornerRadius: 17, style: .continuous))
                            .overlay(RoundedRectangle(cornerRadius: 17).stroke(status.border, lineWidth: 1))
                        }

                        if s.typing {
                            HStack {
                                Text("typing…").font(.system(size: 13)).foregroundStyle(FK.text45)
                                    .padding(.horizontal, 14).padding(.vertical, 11)
                                    .background(FK.card)
                                    .overlay(RoundedCorner(radius: 15, corners: [.topLeft, .topRight, .bottomRight]).stroke(FK.line08, lineWidth: 1))
                                Spacer()
                            }
                        }
                    }
                    .padding(.horizontal, 18).padding(.top, 16)
                }
                .onChange(of: t?.msgs.count) { _, _ in
                    if let last = t?.msgs.last?.id {
                        withAnimation { proxy.scrollTo(last, anchor: .bottom) }
                    }
                }
            }
        }
        .transition(.opacity)
    }
}

/// Replaces the tab bar while a thread is open.
struct ThreadComposer: View {
    @EnvironmentObject var store: AppStore
    var body: some View {
        let s = store.state
        HStack(spacing: 9) {
            TextField("", text: Binding(get: { s.draft }, set: { store.setDraft($0) }),
                      prompt: Text("Write a message").foregroundStyle(FK.text42))
                .font(.system(size: 13.5))
                .foregroundStyle(FK.text)
                .padding(.horizontal, 13).padding(.vertical, 12)
                .background(FK.card)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(FK.line09, lineWidth: 1))
                .onSubmit { store.sendMsg() }
            Button { store.sendMsg() } label: {
                Text("Send").font(.system(size: 12.5, weight: .semibold)).foregroundStyle(FK.onLime)
                    .padding(.horizontal, 15).padding(.vertical, 12)
            }
            .background(FK.lime)
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        }
        .padding(.horizontal, 18).padding(.top, 12).padding(.bottom, 20)
        .background(FK.bar)
        .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.line08), alignment: .top)
    }
}
