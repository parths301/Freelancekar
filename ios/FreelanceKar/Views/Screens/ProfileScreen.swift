import SwiftUI

/// Client-facing view of a freelancer profile. Mirrors Profile.tsx.
struct ProfileScreen: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let pro = Selectors.activePro(s)
        let saved = s.saved.contains(pro.id)

        ScreenShell {
            VStack(alignment: .leading, spacing: 0) {
                ZStack(alignment: .topLeading) {
                    Stripe(cornerRadius: 0).frame(height: 104).padding(.top, 12)
                    Button {
                        store.go(s.searchLabel.isEmpty ? .home : .results)
                    } label: {
                        Image(systemName: "chevron.left").font(.system(size: 14)).foregroundStyle(FK.text)
                            .frame(width: 32, height: 32)
                            .background(Color(hex: 0x0B0B0C, opacity: 0.72))
                            .clipShape(Circle())
                            .overlay(Circle().stroke(FK.line12, lineWidth: 1))
                    }
                    .padding(.leading, 16).padding(.top, 24)
                }

                HStack(alignment: .bottom) {
                    Stripe(cornerRadius: 20).frame(width: 72, height: 72)
                        .overlay(RoundedRectangle(cornerRadius: 20).stroke(FK.bg, lineWidth: 3))
                    Spacer()
                    HStack(spacing: 8) {
                        Button {
                            store.toggleSave(pro.id, pro.first)
                        } label: {
                            Text(saved ? "♥" : "♡").font(.system(size: 13))
                                .foregroundStyle(saved ? FK.lime : Color(hex: 0xF2F2F0, opacity: 0.7))
                                .padding(.horizontal, 11).padding(.vertical, 7)
                                .overlay(RoundedRectangle(cornerRadius: 10).stroke(FK.line14, lineWidth: 1))
                        }
                        Text("↗").font(.system(size: 13)).foregroundStyle(Color(hex: 0xF2F2F0, opacity: 0.7))
                            .padding(.horizontal, 11).padding(.vertical, 7)
                            .overlay(RoundedRectangle(cornerRadius: 10).stroke(FK.line14, lineWidth: 1))
                    }
                }
                .padding(.horizontal, 20)
                .offset(y: -30)
                .padding(.bottom, -30)

                VStack(alignment: .leading, spacing: 6) {
                    HStack(spacing: 7) {
                        Text(pro.name).font(.fkH1Sm)
                        Text("KYC ✔").font(.system(size: 10, weight: .semibold, design: .monospaced))
                            .foregroundStyle(FK.lime)
                            .padding(.horizontal, 7).padding(.vertical, 3)
                            .background(FK.limeBadge)
                            .clipShape(RoundedRectangle(cornerRadius: 6, style: .continuous))
                    }
                    Text(pro.tagline).font(.system(size: 13)).foregroundStyle(FK.text55)
                }
                .padding(.horizontal, 20)
                .padding(.top, 12)

                HStack(spacing: 8) {
                    ProfileStatBox(value: String(format: "%.1f", pro.rating), label: "\(pro.jobs) jobs", valueColor: FK.amber)
                    ProfileStatBox(value: "98%", label: "completion")
                    ProfileStatBox(value: pro.replyIn, label: "replies in")
                    ProfileStatBox(value: pro.years, label: "on platform")
                }
                .padding(.horizontal, 20).padding(.top, 16)

                VStack(alignment: .leading, spacing: 11) {
                    SectionTitle(title: "Services offered") {
                        Text("\(pro.packages.count) ACTIVE").font(.system(size: 11, design: .monospaced)).foregroundStyle(FK.text40)
                    }
                    ForEach(Array(pro.packages.enumerated()), id: \.element.id) { i, p in
                        Button { store.pickService(i) } label: {
                            HStack {
                                VStack(alignment: .leading, spacing: 3) {
                                    Text(p.name).font(.fkCardTitle)
                                    Text(p.terms).font(.system(size: 11)).foregroundStyle(FK.text50)
                                }
                                Spacer()
                                Text(p.price).font(.system(size: 13, weight: .semibold))
                            }
                            .padding(.horizontal, 14).padding(.vertical, 13)
                        }
                        .foregroundStyle(FK.text)
                        .background(FK.card)
                        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 14).stroke(i == s.svcIdx ? FK.lime : FK.line08, lineWidth: 1))
                    }
                }
                .padding(.horizontal, 20).padding(.top, 24)

                VStack(alignment: .leading, spacing: 11) {
                    Text("Recent work").font(.fkH3)
                    HStack(spacing: 7) {
                        Stripe(cornerRadius: 11).aspectRatio(3.0/4.0, contentMode: .fit)
                        Stripe(cornerRadius: 11).aspectRatio(3.0/4.0, contentMode: .fit)
                        Stripe(cornerRadius: 11).aspectRatio(3.0/4.0, contentMode: .fit)
                            .overlay(Text("+14").font(.system(size: 12, weight: .medium)).foregroundStyle(FK.text60))
                    }
                }
                .padding(.horizontal, 20).padding(.top, 24)

                VStack(alignment: .leading, spacing: 11) {
                    Text("Reviews").font(.fkH3)
                    VStack(alignment: .leading, spacing: 10) {
                        HStack(spacing: 9) {
                            Circle().fill(FK.nested).frame(width: 28, height: 28)
                            Text(pro.reviewer).font(.system(size: 12.5, weight: .semibold))
                            Spacer()
                            Text("★ 5.0").font(.system(size: 11, weight: .medium)).foregroundStyle(FK.amber)
                        }
                        Text(pro.review).font(.fkBodySm).foregroundStyle(FK.text60)
                    }
                    .padding(14)
                    .background(FK.card)
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 14).stroke(FK.line08, lineWidth: 1))
                }
                .padding(.horizontal, 20).padding(.top, 24).padding(.bottom, 30)
            }
        }
    }
}

private struct ProfileStatBox: View {
    var value: String
    var label: String
    var valueColor: Color = FK.text
    var body: some View {
        VStack(spacing: 2) {
            Text(value).font(.system(size: 14, weight: .semibold)).foregroundStyle(valueColor)
            Text(label).font(.system(size: 9.5)).foregroundStyle(FK.text45)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 10)
        .background(FK.card)
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(FK.line08, lineWidth: 1))
    }
}

/// Replaces the tab bar while a freelancer profile is open.
struct ProfileActionBar: View {
    @EnvironmentObject var store: AppStore
    var body: some View {
        let s = store.state
        let pro = Selectors.activePro(s)
        let pkg = Selectors.selectedPackage(s)

        HStack {
            VStack(alignment: .leading, spacing: 0) {
                Text(pkg.price).font(.system(size: 15, weight: .semibold))
                Text(pkg.terms).font(.system(size: 10.5)).foregroundStyle(FK.text45)
            }
            Spacer()
            HStack(spacing: 8) {
                InlineOutlineButton(title: "Chat") { store.messagePro(pro) }
                InlineButton(title: "Hire") { store.openHire() }
            }
        }
        .padding(.horizontal, 20).padding(.top, 14).padding(.bottom, 20)
        .background(FK.bar)
        .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.line07), alignment: .top)
    }
}
