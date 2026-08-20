import SwiftUI

struct GigsScreen: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        ScreenShell {
            VStack(alignment: .leading, spacing: 0) {
                Text("Gigs").font(.fkH1).padding(.bottom, 6)
                Text("\(s.fGigs.count) active · \(s.quotesSent) quotes awaiting reply")
                    .font(.system(size: 12.5)).foregroundStyle(FK.text50).padding(.bottom, 16)

                if s.fGigs.isEmpty {
                    VStack(spacing: 0) {
                        Text("◫").font(.system(size: 22)).foregroundStyle(FK.text28)
                        Text("No gigs running. Quote on requests from the dashboard — accepted quotes turn into gigs here.")
                            .font(.fkBody).foregroundStyle(FK.text45).multilineTextAlignment(.center).padding(.top, 12)
                        Button { store.go(.fdash) } label: {
                            Text("See new requests").font(.system(size: 12.5, weight: .semibold)).foregroundStyle(FK.onLime)
                                .padding(.horizontal, 16).padding(.vertical, 12)
                        }
                        .background(FK.lime)
                        .clipShape(RoundedRectangle(cornerRadius: 11, style: .continuous))
                        .padding(.top, 16)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.horizontal, 22).padding(.top, 40)
                } else {
                    VStack(spacing: 10) {
                        ForEach(s.fGigs) { g in
                            let done = g.status == .DELIVERED
                            VStack(spacing: 0) {
                                HStack(spacing: 11) {
                                    Stripe(cornerRadius: 11).frame(width: 36, height: 36)
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(g.client).font(.fkCardTitle)
                                        Text(g.service).font(.system(size: 11)).foregroundStyle(FK.text50)
                                    }
                                    Spacer()
                                    Text(g.amount).font(.system(size: 13, weight: .semibold))
                                }
                                HStack {
                                    Text(g.status.rawValue).font(.fkMonoSm).foregroundStyle(done ? FK.text45 : FK.lime)
                                    Spacer()
                                    Button { store.markGigDelivered(g.id) } label: {
                                        Text(done ? "Awaiting approval" : "Mark delivered")
                                            .font(.system(size: 11.5, weight: .semibold))
                                            .foregroundStyle(done ? FK.text60 : FK.onLime)
                                            .padding(.horizontal, 13).padding(.vertical, 9)
                                    }
                                    .background(done ? Color.clear : FK.lime)
                                    .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                                    .overlay(RoundedRectangle(cornerRadius: 10).stroke(done ? FK.line14 : .clear, lineWidth: 1))
                                }
                                .padding(.top, 11)
                                .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.line07), alignment: .top)
                                .padding(.top, 12)
                            }
                            .padding(14)
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
