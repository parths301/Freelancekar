import SwiftUI

struct YouScreen: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        ScreenShell {
            VStack(alignment: .leading, spacing: 0) {
                Text("You").font(.fkH1).padding(.bottom, 18)

                HStack(spacing: 13) {
                    Stripe(cornerRadius: 16).frame(width: 56, height: 56)
                        .overlay(RoundedRectangle(cornerRadius: 16).stroke(FK.line09, lineWidth: 1))
                    VStack(alignment: .leading, spacing: 3) {
                        Text("Café Mitti").font(.fkScreenTitle)
                        Text("Client · \(Selectors.cityOf(s))").font(.system(size: 12)).foregroundStyle(FK.text50)
                    }
                }

                HStack(spacing: 8) {
                    StatBox(value: String(s.bookings.count), label: "bookings")
                    StatBox(value: String(s.saved.count), label: "saved")
                    StatBox(value: Selectors.toPayTotal(s), label: "to pay")
                }
                .padding(.top, 20)

                VStack(spacing: 9) {
                    if s.bookings.isEmpty {
                        VStack(spacing: 14) {
                            Text("No bookings yet. Hire someone and the order lives here.")
                                .font(.fkBodySm).foregroundStyle(FK.text45).multilineTextAlignment(.center)
                            Button { store.go(.explore) } label: {
                                Text("Find a freelancer").font(.system(size: 12.5, weight: .semibold)).foregroundStyle(FK.onLime)
                                    .padding(.horizontal, 15).padding(.vertical, 11)
                            }
                            .background(FK.lime)
                            .clipShape(RoundedRectangle(cornerRadius: 11, style: .continuous))
                        }
                        .padding(22)
                        .frame(maxWidth: .infinity)
                        .background(FK.card)
                        .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 15).stroke(style: StrokeStyle(lineWidth: 1, dash: [5, 4])).foregroundStyle(FK.line14))
                    } else {
                        ForEach(s.bookings) { b in
                            Button { store.openOrder(b.id) } label: {
                                VStack(alignment: .leading, spacing: 0) {
                                    HStack {
                                        Text(b.name).font(.fkCardTitle)
                                        Spacer()
                                        Text(b.amount).font(.system(size: 13, weight: .semibold))
                                    }
                                    Text(b.service).font(.system(size: 11.5)).foregroundStyle(FK.text50).padding(.top, 1)
                                    HStack {
                                        Text(Selectors.bookingStatusLabel[b.status] ?? "")
                                            .font(.fkMonoSm)
                                            .foregroundStyle(b.status == .approved ? FK.text45 : FK.lime)
                                        Spacer()
                                        Text(b.status == .delivered ? "Approve →" : "View →")
                                            .font(.system(size: 11, weight: .medium)).foregroundStyle(FK.lime)
                                    }
                                    .padding(.top, 10)
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
                .padding(.top, 20)

                VStack(spacing: 0) {
                    Button { store.startFreelancer() } label: {
                        HStack {
                            Text("Switch to freelancer mode").font(.system(size: 13, weight: .medium)).foregroundStyle(FK.text)
                            Spacer()
                            Text("→").font(.system(size: 12)).foregroundStyle(FK.lime)
                        }
                        .padding(14)
                    }
                    Divider().overlay(FK.line07)
                    HStack {
                        Text("Payment methods").font(.system(size: 13, weight: .medium)).foregroundStyle(Color(hex: 0xF2F2F0, opacity: 0.75))
                        Spacer()
                    }.padding(14)
                    Divider().overlay(FK.line07)
                    Button { store.openHelp() } label: {
                        HStack {
                            Text("Help & disputes").font(.system(size: 13, weight: .medium)).foregroundStyle(FK.text)
                            Spacer()
                            Text("→").font(.system(size: 12)).foregroundStyle(FK.lime)
                        }
                        .padding(14)
                    }
                }
                .background(FK.card)
                .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.line08, lineWidth: 1))
                .padding(.top, 20)
            }
            .padding(.horizontal, 20).padding(.top, 18).padding(.bottom, 26)
        }
    }
}

struct StatBox: View {
    var value: String
    var label: String
    var body: some View {
        VStack(alignment: .center, spacing: 3) {
            Text(value).font(.system(size: 16, weight: .semibold))
            Text(label).font(.system(size: 10)).foregroundStyle(FK.text45)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 13)
        .background(FK.card)
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 14).stroke(FK.line08, lineWidth: 1))
    }
}
