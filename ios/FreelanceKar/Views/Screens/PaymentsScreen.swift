import SwiftUI

struct PaymentsScreen: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let totals = Selectors.paymentTotals(s)

        ScreenShell {
            VStack(alignment: .leading, spacing: 0) {
                HStack(spacing: 12) {
                    BackButton { store.go(.fdash) }
                    Text("Payments").font(.fkScreenTitle)
                }
                .padding(.horizontal, 20).padding(.top, 16)

                VStack(alignment: .leading, spacing: 0) {
                    Text("COLLECTED · AUGUST").font(.system(size: 11, weight: .medium, design: .monospaced)).opacity(0.65)
                    Text(money(totals.payGot)).font(.fkBig).padding(.top, 8)
                    HStack(spacing: 18) {
                        Figure(value: money(totals.payDue), label: "still to collect")
                        Figure(value: money(totals.payTotal), label: "billed this month")
                        Figure(value: "₹0", label: "platform cut")
                    }
                    .padding(.top, 12)
                    .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.onLimeDivider), alignment: .top)
                    .padding(.top, 12)
                }
                .padding(18)
                .foregroundStyle(FK.onLime)
                .background(FK.lime)
                .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
                .padding(.horizontal, 20).padding(.top, 18)

                VStack(alignment: .leading, spacing: 11) {
                    SectionTitle(title: "To collect") {
                        Text("PAID TO YOU DIRECTLY").font(.fkMonoSm).foregroundStyle(FK.text40)
                    }
                    if totals.due.isEmpty {
                        Text("Nothing outstanding. Every client has paid up.")
                            .font(.fkBodySm).foregroundStyle(FK.text45).multilineTextAlignment(.center)
                            .frame(maxWidth: .infinity).padding(20)
                            .background(FK.card)
                            .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                            .overlay(RoundedRectangle(cornerRadius: 15).stroke(style: StrokeStyle(lineWidth: 1, dash: [5, 4])).foregroundStyle(FK.line14))
                    } else {
                        ForEach(totals.due) { p in
                            VStack(alignment: .leading, spacing: 0) {
                                HStack {
                                    Text(p.client).font(.fkCardTitle)
                                    Spacer()
                                    Text(money(p.amount)).font(.system(size: 13, weight: .semibold))
                                }
                                Text("\(p.service) · \(p.when)").font(.system(size: 11.5)).foregroundStyle(FK.text50).padding(.top, 4)
                                HStack(spacing: 8) {
                                    InlineOutlineButton(title: "Remind", expand: true) { store.remindPayment(p.client) }
                                    InlineButton(title: "Mark received", expand: true) { store.markPaymentReceived(p.id) }
                                }.padding(.top, 11)
                            }
                            .padding(14)
                            .background(FK.card)
                            .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                            .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.line08, lineWidth: 1))
                        }
                    }
                }
                .padding(.horizontal, 20).padding(.top, 22)

                VStack(alignment: .leading, spacing: 11) {
                    Text("Received").font(.fkH3)
                    VStack(spacing: 0) {
                        ForEach(Array(totals.got.enumerated()), id: \.element.id) { i, p in
                            HStack(spacing: 11) {
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(p.client).font(.system(size: 13, weight: .semibold))
                                    Text("\(p.service) · \(p.via)").font(.system(size: 11)).foregroundStyle(FK.text50)
                                }
                                Spacer()
                                Text(money(p.amount)).font(.system(size: 12.5, weight: .semibold))
                            }
                            .padding(.horizontal, 14).padding(.vertical, 13)
                            .overlay(i < totals.got.count - 1 ? Rectangle().frame(height: 1).foregroundStyle(FK.line07) : nil, alignment: .bottom)
                        }
                    }
                    .background(FK.card)
                    .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.line08, lineWidth: 1))
                }
                .padding(.horizontal, 20).padding(.top, 22)

                VStack(alignment: .leading, spacing: 11) {
                    Text("Your plan").font(.fkH3)
                    VStack(spacing: 0) {
                        HStack {
                            VStack(alignment: .leading, spacing: 3) {
                                Text("\(Selectors.planName(s)) · \(Selectors.planPrice(s))").font(.fkCardTitle)
                                Text("Renews 1 Sep · Razorpay").font(.system(size: 11)).foregroundStyle(FK.text50)
                            }
                            Spacer()
                            Button { store.managePlan() } label: {
                                Text("Manage").font(.system(size: 11.5, weight: .semibold)).foregroundStyle(Color(hex: 0xF2F2F0, opacity: 0.75))
                                    .padding(.horizontal, 13).padding(.vertical, 9)
                            }
                            .overlay(RoundedRectangle(cornerRadius: 10).stroke(FK.line14, lineWidth: 1))
                        }
                        HStack {
                            VStack(alignment: .leading, spacing: 3) {
                                Text("Where clients pay you").font(.system(size: 13, weight: .semibold))
                                Text(s.bank ? "HDFC ••4471 · verified" : "Add UPI ID or account number").font(.system(size: 11)).foregroundStyle(FK.text50)
                            }
                            Spacer()
                            Button { store.toggleBank() } label: {
                                Text(s.bank ? "Added" : "Add").font(.system(size: 11.5, weight: .semibold))
                                    .foregroundStyle(s.bank ? FK.lime : FK.onLime)
                                    .padding(.horizontal, 13).padding(.vertical, 9)
                            }
                            .background(s.bank ? FK.limeFill : FK.lime)
                            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                        }
                        .padding(.top, 12)
                        .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.line07), alignment: .top)
                        .padding(.top, 12)
                    }
                    .padding(14)
                    .background(FK.card)
                    .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.line08, lineWidth: 1))

                    Text("FreelanceKar never holds your money — clients pay you by UPI or cash and you keep every rupee.")
                        .font(.system(size: 11.5)).foregroundStyle(FK.text40).lineSpacing(3).padding(.top, 13)
                }
                .padding(.horizontal, 20).padding(.top, 22).padding(.bottom, 26)
            }
        }
    }
}

private struct Figure: View {
    var value: String
    var label: String
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(value).font(.system(size: 14, weight: .semibold))
            Text(label).font(.system(size: 10.5)).opacity(0.65)
        }
    }
}
