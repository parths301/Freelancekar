import SwiftUI

struct HireSheetView: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let pro = Selectors.activePro(s)
        let pkg = Selectors.selectedPackage(s)

        FKSheet(isOpen: s.hire > 0, onClose: { store.closeHire() }, maxHeightFraction: 0.88) {
            switch s.hire {
            case 1: detailsStep(s, pro, pkg)
            case 2: payStep(s, pro, pkg)
            case 3: successStep(s, pro, pkg)
            case 4: failureStep(pro, pkg)
            default: EmptyView()
            }
        }
    }

    @ViewBuilder private func detailsStep(_ s: AppState, _ pro: Pro, _ pkg: Package) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text("Hire \(pro.first)").font(.system(size: 18, weight: .semibold))
                Spacer()
                Button { store.closeHire() } label: { Image(systemName: "xmark").font(.system(size: 14)).foregroundStyle(FK.text50) }
            }

            Group2(label: "SERVICE") {
                ForEach(Array(pro.packages.enumerated()), id: \.element.id) { i, p in
                    Button { store.pickService(i) } label: {
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text(p.name).font(.system(size: 13, weight: .semibold))
                                Text(p.terms).font(.system(size: 10.5)).foregroundStyle(FK.text50)
                            }
                            Spacer()
                            Text(p.price).font(.system(size: 12.5, weight: .semibold))
                        }
                        .padding(.horizontal, 13).padding(.vertical, 12)
                    }
                    .foregroundStyle(FK.text)
                    .background(FK.nested)
                    .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 13).stroke(i == s.svcIdx ? FK.lime : FK.line08, lineWidth: 1))
                }
            }

            Group2(label: "START DATE") {
                HStack(spacing: 7) {
                    ForEach(Array(Seed.dateLabels.enumerated()), id: \.offset) { i, d in
                        Chip(title: d, on: s.hireDateIdx == i) { store.setHireDate(i) }
                    }
                }
            }

            Group2(label: "BRIEF") {
                FKTextArea(placeholder: "What exactly do you need? Add links or references.",
                           text: Binding(get: { s.hireNote }, set: { store.setHireNote($0) }), minHeight: 64)
                if s.hireError {
                    Text("Add a line about the work so \(pro.first) can confirm.").font(.system(size: 11.5, weight: .medium)).foregroundStyle(FK.alert)
                }
            }

            PrimaryButton(title: "Continue · \(pkg.price)") { store.toPay() }.padding(.top, 18)
        }
        .padding(.horizontal, 20).padding(.top, 18).padding(.bottom, 22)
    }

    @ViewBuilder private func payStep(_ s: AppState, _ pro: Pro, _ pkg: Package) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Button { store.toDetails() } label: { Image(systemName: "chevron.left").font(.system(size: 15)).foregroundStyle(FK.text60) }
                Spacer()
                Text("Secure payment").font(.fkScreenTitle)
                Spacer()
                Button { store.closeHire() } label: { Image(systemName: "xmark").font(.system(size: 14)).foregroundStyle(FK.text50) }
            }

            VStack(spacing: 0) {
                HStack(spacing: 11) {
                    Stripe(cornerRadius: 11).frame(width: 38, height: 38)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(pro.name).font(.system(size: 13, weight: .semibold))
                        Text(pkg.name).font(.system(size: 11)).foregroundStyle(FK.text50)
                    }
                    Spacer()
                }
                .padding(.bottom, 12)
                .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.line07), alignment: .bottom)

                HStack {
                    Text("Service").foregroundStyle(FK.text60)
                    Spacer()
                    Text(pkg.price).foregroundStyle(FK.text)
                }.font(.system(size: 12.5)).padding(.top, 12)

                HStack {
                    Text("Total to pay \(pro.first)")
                    Spacer()
                    Text(money(pkg.amount))
                }
                .font(.system(size: 14, weight: .semibold))
                .padding(.top, 11)
                .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.line07), alignment: .top)
                .padding(.top, 11)
            }
            .padding(14)
            .background(FK.nested)
            .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.line09, lineWidth: 1))
            .padding(.top, 16)

            Group2(label: "PAY WITH") {
                ForEach(Array(Seed.payMethods.enumerated()), id: \.offset) { i, m in
                    Button { store.setMethod(i) } label: {
                        HStack(spacing: 11) {
                            Text(m.0).font(.system(size: 14))
                            VStack(alignment: .leading, spacing: 2) {
                                Text(m.1).font(.system(size: 12.5, weight: .semibold))
                                Text(m.2).font(.system(size: 10.5)).foregroundStyle(FK.text50)
                            }
                            Spacer()
                            Text(i == s.methodIdx ? "●" : "○").font(.system(size: 12)).foregroundStyle(i == s.methodIdx ? FK.lime : FK.text35)
                        }
                        .padding(.horizontal, 13).padding(.vertical, 12)
                    }
                    .foregroundStyle(FK.text)
                    .background(FK.nested)
                    .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 13).stroke(i == s.methodIdx ? FK.lime : FK.line09, lineWidth: 1))
                }
            }

            Text("You pay \(pro.first) directly — no platform fee. This confirms the booking and shares your contact details.")
                .font(.system(size: 11.5)).foregroundStyle(FK.text45).lineSpacing(3).padding(.top, 14)

            PrimaryButton(title: s.paying ? "Confirming…" : "Confirm booking", disabled: s.paying) {
                store.payNow(pro, pkg.name, pkg.amount)
            }.padding(.top, 16)
        }
        .padding(.horizontal, 20).padding(.top, 18).padding(.bottom, 22)
    }

    @ViewBuilder private func successStep(_ s: AppState, _ pro: Pro, _ pkg: Package) -> some View {
        VStack(spacing: 0) {
            Circle().fill(FK.lime).frame(width: 52, height: 52)
                .overlay(Text("✓").font(.system(size: 22)).foregroundStyle(FK.onLime))
            Text("Booked with \(pro.first)").font(.system(size: 19, weight: .semibold)).padding(.top, 16)
            Text("Pay \(pro.first) \(money(pkg.amount)) directly on delivery. Usually confirms within \(pro.replyIn) — you’ll get a notification.")
                .font(.system(size: 13)).foregroundStyle(FK.text55).multilineTextAlignment(.center).lineSpacing(4).padding(.top, 8)

            VStack(alignment: .leading, spacing: 9) {
                DetailRow(label: "Service", value: pkg.name)
                DetailRow(label: "Starts", value: Seed.dateLabels[s.hireDateIdx])
                DetailRow(label: "Order", value: s.bookings.first?.id ?? "")
            }
            .padding(14)
            .background(FK.nested)
            .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.line09, lineWidth: 1))
            .padding(.top, 18)

            HStack(spacing: 9) {
                Button { store.afterBookChat() } label: {
                    Text("Open chat").font(.system(size: 13, weight: .medium)).foregroundStyle(FK.text)
                        .frame(maxWidth: .infinity).padding(13)
                }
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(FK.line16, lineWidth: 1))
                Button { store.afterBookHome() } label: {
                    Text("Done").font(.system(size: 13, weight: .semibold)).foregroundStyle(FK.onLime)
                        .frame(maxWidth: .infinity).padding(13)
                }
                .background(FK.lime)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            }.padding(.top, 16)
        }
        .padding(.horizontal, 22).padding(.top, 34).padding(.bottom, 26)
    }

    @ViewBuilder private func failureStep(_ pro: Pro, _ pkg: Package) -> some View {
        VStack(spacing: 0) {
            Circle().fill(FK.alert14).frame(width: 52, height: 52)
                .overlay(Circle().stroke(FK.alertBd50, lineWidth: 1))
                .overlay(Text("!").font(.system(size: 22)).foregroundStyle(FK.alert))
            Text("Payment didn’t go through").font(.system(size: 19, weight: .semibold)).padding(.top, 16)
            Text("Your bank declined the card. Nothing was charged and \(pro.first) hasn’t been booked yet.")
                .font(.system(size: 13)).foregroundStyle(FK.text55).multilineTextAlignment(.center).lineSpacing(4).padding(.top, 8)

            VStack(alignment: .leading, spacing: 7) {
                DetailRow(label: "Attempted", value: money(pkg.amount))
                DetailRow(label: "Reason", value: "DECLINED_BY_ISSUER")
            }
            .padding(.horizontal, 14).padding(.vertical, 13)
            .background(FK.nested)
            .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.line09, lineWidth: 1))
            .padding(.top, 18)

            VStack(spacing: 9) {
                Button { store.payWithUpi() } label: {
                    Text("Pay with UPI instead").font(.system(size: 13.5, weight: .semibold)).foregroundStyle(FK.onLime)
                        .frame(maxWidth: .infinity).padding(14)
                }
                .background(FK.lime)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                Button { store.retryPay() } label: {
                    Text("Try the card again").font(.system(size: 13, weight: .medium)).foregroundStyle(FK.text)
                        .frame(maxWidth: .infinity).padding(13)
                }
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(FK.line16, lineWidth: 1))
            }.padding(.top, 16)
        }
        .padding(.horizontal, 22).padding(.top, 32).padding(.bottom, 26)
    }
}

private struct Group2<Content: View>: View {
    var label: String
    @ViewBuilder var content: Content
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            MonoLabel(text: label)
            content
        }.padding(.top, 16)
    }
}

private struct DetailRow: View {
    var label: String
    var value: String
    var body: some View {
        HStack {
            Text(label).foregroundStyle(FK.text55)
            Spacer()
            Text(value).fontWeight(.medium).foregroundStyle(FK.text)
        }.font(.system(size: 12))
    }
}
