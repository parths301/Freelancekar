import SwiftUI

struct OrderScreen: View {
    @EnvironmentObject var store: AppStore
    private let seq: [BookingStatus] = [.awaiting, .in_progress, .delivered, .approved]

    var body: some View {
        let s = store.state
        if let b = Selectors.currentBooking(s) {
            let at = seq.firstIndex(of: b.status) ?? 0
            let complete = b.status == .approved

            ScreenShell {
                VStack(alignment: .leading, spacing: 0) {
                    HStack(spacing: 12) {
                        BackButton { store.go(.you) }
                        Text("Order \(b.id)").font(.fkScreenTitle)
                    }
                    .padding(.horizontal, 20).padding(.top, 16)

                    VStack(spacing: 0) {
                        HStack(spacing: 12) {
                            Stripe(cornerRadius: 13).frame(width: 44, height: 44)
                            VStack(alignment: .leading, spacing: 3) {
                                Text(b.name).font(.fkH4)
                                Text(b.service).font(.system(size: 11.5)).foregroundStyle(FK.text50)
                            }
                            Spacer()
                        }
                        HStack {
                            VStack(alignment: .leading, spacing: 0) {
                                Text(b.amount).font(.system(size: 18, weight: .semibold))
                                Text(complete ? "Paid to \(b.first) directly" : "Pay \(b.first) directly")
                                    .font(.system(size: 11))
                                    .foregroundStyle(complete ? FK.text45 : FK.lime)
                            }
                            Spacer()
                            Text(Selectors.orderStatusLabel[b.status] ?? "")
                                .font(.fkMonoSm)
                                .foregroundStyle(complete ? FK.text45 : FK.lime)
                        }
                        .padding(.top, 14)
                        .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.line07), alignment: .top)
                        .padding(.top, 13)
                    }
                    .padding(16)
                    .background(FK.card)
                    .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 18).stroke(FK.line08, lineWidth: 1))
                    .padding(.horizontal, 20).padding(.top, 20)

                    VStack(alignment: .leading, spacing: 13) {
                        Text("Progress").font(.fkH3)
                        VStack(spacing: 0) {
                            ForEach(Array(Selectors.orderSteps.enumerated()), id: \.offset) { i, step in
                                let reached = i <= at
                                let isLast = i == Selectors.orderSteps.count - 1
                                HStack(alignment: .top, spacing: 13) {
                                    VStack(spacing: 0) {
                                        Circle()
                                            .fill(reached ? FK.lime : FK.bg)
                                            .frame(width: 11, height: 11)
                                            .overlay(Circle().stroke(reached ? FK.lime : FK.line18, lineWidth: 2))
                                        if !isLast {
                                            Rectangle().fill(i < at ? FK.lime : FK.line12).frame(width: 1).frame(minHeight: 26)
                                        }
                                    }
                                    .frame(width: 18)
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(step.0).font(.system(size: 13, weight: .semibold)).foregroundStyle(reached ? FK.text : FK.text40)
                                        Text(reached ? step.1 : "—").font(.system(size: 11)).foregroundStyle(FK.text45)
                                    }
                                    Spacer()
                                }
                                .padding(.bottom, isLast ? 0 : 16)
                            }
                        }
                    }
                    .padding(.horizontal, 20).padding(.top, 22)

                    if let review = b.review {
                        VStack(spacing: 0) {
                            HStack {
                                Text("Your review").font(.system(size: 13, weight: .semibold))
                                Spacer()
                                Text(String(repeating: "★", count: review.stars)).font(.system(size: 12, weight: .medium)).foregroundStyle(FK.amber)
                            }
                            Text(review.text).font(.fkBodySm).foregroundStyle(FK.text60).padding(.top, 9)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        .padding(14)
                        .background(FK.card)
                        .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.line08, lineWidth: 1))
                        .padding(.horizontal, 20).padding(.top, 4)
                    }

                    if let issue = b.issue {
                        VStack(alignment: .leading, spacing: 0) {
                            HStack {
                                Text("Issue · \(issue.ref)").font(.system(size: 13, weight: .semibold)).foregroundStyle(FK.alert)
                                Spacer()
                                Text(issue.status == .open ? "SUPPORT REVIEWING" : "SUPPORT REPLIED")
                                    .font(.fkMonoSm)
                                    .foregroundStyle(issue.status == .open ? FK.amber : FK.lime)
                            }
                            Text(issue.reason).font(.system(size: 11.5)).foregroundStyle(FK.text55).padding(.top, 5)
                            Text(issue.status == .open
                                 ? "Raised with the support team. Keep any files or messages from \(b.first.isEmpty ? "the freelancer" : b.first) — you’ll get a reply within 24 hours."
                                 : "Support has spoken to \(b.first.isEmpty ? "the freelancer" : b.first) and paused their listing while this is open. Add anything else in chat.")
                                .font(.fkBodySm).foregroundStyle(FK.text60).padding(.top, 9)
                        }
                        .padding(14)
                        .background(FK.alert08)
                        .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.alertBd35, lineWidth: 1))
                        .padding(.horizontal, 20).padding(.top, 4)
                    }

                    VStack(spacing: 9) {
                        if b.status == .delivered {
                            PrimaryButton(title: "Mark complete & rate") { store.openReview() }
                        }
                        OutlineButton(title: "Message \(b.first)") { if !b.proId.isEmpty { store.openThread(b.proId) } }
                        if b.issue == nil {
                            Button { store.openIssue() } label: {
                                Text("Raise an issue").font(.system(size: 12, weight: .medium)).foregroundStyle(FK.text55)
                            }
                        }
                    }
                    .padding(.horizontal, 20).padding(.top, 18).padding(.bottom, 26)
                }
            }
        }
    }
}
