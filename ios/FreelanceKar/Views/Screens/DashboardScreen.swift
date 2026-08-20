import SwiftUI

struct DashboardScreen: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let city = Seed.cities[s.fCityIdx]
        let first = s.fName.trimmingCharacters(in: .whitespaces).components(separatedBy: " ").first.flatMap { $0.isEmpty ? nil : $0 } ?? "there"
        let totals = Selectors.paymentTotals(s)
        let strength = Selectors.profileStrength(s)

        ScreenShell {
            VStack(alignment: .leading, spacing: 0) {
                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Good morning,").font(.system(size: 12)).foregroundStyle(FK.text50)
                        Text(first).font(.system(size: 19, weight: .semibold))
                    }
                    Spacer()
                    HStack(spacing: 9) {
                        BellButton(size: 34)
                        Button { store.toggleAvailable() } label: {
                            HStack(spacing: 8) {
                                Circle().fill(s.available ? FK.lime : FK.text35).frame(width: 7, height: 7)
                                Text(s.available ? "Available" : "Not taking work").font(.system(size: 12, weight: .medium))
                            }
                            .padding(.horizontal, 12).padding(.vertical, 7)
                        }
                        .foregroundStyle(FK.text)
                        .background(FK.card)
                        .clipShape(Capsule())
                        .overlay(Capsule().stroke(FK.line09, lineWidth: 1))
                    }
                }
                .padding(.horizontal, 20).padding(.top, 18)

                if s.kycRejected && s.onboarded {
                    HStack(alignment: .top, spacing: 11) {
                        Text("!").font(.system(size: 13)).foregroundStyle(FK.alert)
                        VStack(alignment: .leading, spacing: 3) {
                            Text("Verification incomplete").font(.system(size: 13, weight: .semibold)).foregroundStyle(FK.alert)
                            Text("Your selfie is missing, so your profile shows as unverified. Verified freelancers get ~3× more enquiries.")
                                .font(.fkMeta).foregroundStyle(FK.text60)
                            Button { store.fixKyc() } label: {
                                Text("Finish verification").font(.system(size: 11.5, weight: .semibold)).foregroundStyle(FK.onAlert)
                                    .padding(.horizontal, 12).padding(.vertical, 8)
                            }
                            .background(FK.alert)
                            .clipShape(RoundedRectangle(cornerRadius: 9, style: .continuous))
                            .padding(.top, 7)
                        }
                    }
                    .padding(14)
                    .background(FK.alert10)
                    .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 16).stroke(FK.alertBd40, lineWidth: 1))
                    .padding(.horizontal, 20).padding(.top, 18)
                }

                Button { store.go(.fearn) } label: {
                    VStack(alignment: .leading, spacing: 0) {
                        HStack(alignment: .lastTextBaseline) {
                            Text("EARNINGS · AUGUST").font(.system(size: 11, weight: .medium, design: .monospaced)).opacity(0.65)
                            Spacer()
                            Text("All payments →").font(.system(size: 11, weight: .semibold)).opacity(0.7)
                        }
                        Text(money(totals.payTotal)).font(.fkBig).padding(.top, 8)
                        HStack(spacing: 16) {
                            Figure(value: money(totals.payDue), label: "pending pay")
                            Figure(value: money(totals.payGot), label: "received")
                            Figure(value: "+22%", label: "vs July")
                        }
                        .padding(.top, 12)
                        .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.onLimeDivider), alignment: .top)
                        .padding(.top, 12)
                    }
                    .padding(18)
                }
                .foregroundStyle(FK.onLime)
                .background(FK.lime)
                .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
                .padding(.horizontal, 20).padding(.top, 20)

                VStack(alignment: .leading, spacing: 0) {
                    HStack {
                        Text("Profile strength").font(.fkCardTitle)
                        Spacer()
                        Text("\(strength)%").font(.system(size: 12, weight: .semibold, design: .monospaced)).foregroundStyle(FK.lime)
                    }
                    GeometryReader { geo in
                        ZStack(alignment: .leading) {
                            Capsule().fill(FK.track)
                            Capsule().fill(FK.lime).frame(width: geo.size.width * CGFloat(strength) / 100)
                        }
                    }.frame(height: 5).padding(.vertical, 10)
                    Text(Selectors.strengthNote(s)).font(.fkMeta).foregroundStyle(FK.text50)
                }
                .padding(14)
                .background(FK.card)
                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 16).stroke(FK.line08, lineWidth: 1))
                .padding(.horizontal, 20).padding(.top, 18)

                VStack(alignment: .leading, spacing: 11) {
                    SectionTitle(title: "New requests") {
                        Text("\(s.reqs.count) NEW").font(.system(size: 10, weight: .semibold, design: .monospaced)).foregroundStyle(FK.onLime)
                            .padding(.horizontal, 7).padding(.vertical, 3)
                            .background(FK.lime).clipShape(RoundedRectangle(cornerRadius: 6, style: .continuous))
                    }
                    if s.reqs.isEmpty {
                        Text("All caught up. New jobs matching your services in \(city) land here.")
                            .font(.fkBodySm).foregroundStyle(FK.text45).multilineTextAlignment(.center)
                            .frame(maxWidth: .infinity)
                            .padding(22)
                            .background(FK.card)
                            .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                            .overlay(RoundedRectangle(cornerRadius: 15).stroke(style: StrokeStyle(lineWidth: 1, dash: [5, 4])).foregroundStyle(FK.line14))
                    } else {
                        ForEach(s.reqs) { r in
                            VStack(alignment: .leading, spacing: 0) {
                                HStack {
                                    Text(r.title).font(.fkCardTitle)
                                    Spacer()
                                    Text(r.budget).font(.system(size: 13, weight: .semibold))
                                }
                                Text(r.meta).font(.system(size: 11.5)).foregroundStyle(FK.text50).padding(.top, 4)
                                HStack(spacing: 8) {
                                    InlineOutlineButton(title: "Pass", expand: true) { store.passRequest(r.id) }
                                    InlineButton(title: "Send quote", expand: true) { store.openQuote(r.id) }
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
                    Text("Your services").font(.fkH3)
                    VStack(spacing: 0) {
                        ForEach(Selectors.myServices(s), id: \.name) { svc in
                            HStack(spacing: 11) {
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(svc.name).font(.system(size: 13, weight: .semibold))
                                    Text(svc.terms).font(.system(size: 11)).foregroundStyle(FK.text50)
                                }
                                Spacer()
                                Text(svc.price).font(.system(size: 12.5, weight: .semibold))
                            }
                            .padding(.horizontal, 14).padding(.vertical, 13)
                            .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.line07), alignment: .bottom)
                        }
                        Button { store.addMoreServices() } label: {
                            Text("+ Add a service").font(.system(size: 12.5, weight: .semibold)).foregroundStyle(FK.lime)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.horizontal, 14).padding(.vertical, 13)
                        }
                    }
                    .background(FK.card)
                    .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.line08, lineWidth: 1))
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
