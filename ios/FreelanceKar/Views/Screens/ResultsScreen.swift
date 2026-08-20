import SwiftUI

struct ResultsScreen: View {
    @EnvironmentObject var store: AppStore
    private let sorts: [(String, Sort)] = [("Best match", .match), ("Nearest", .near), ("Under ₹15k", .price), ("4.8★+", .rating)]

    var body: some View {
        let s = store.state
        let city = Selectors.cityOf(s)
        let results = s.searching ? [] : Selectors.selectResults(s)
        let active = Selectors.filterCount(s)
        let countLabel = s.searching ? "Searching…" : (results.count == 1 ? "1 person" : "\(results.count) people")
        let emptyNote = active > 0
            ? "Your filters are narrow for \(Selectors.placeLabel(s)). Widen the budget or distance and try again."
            : "Nobody in \(Selectors.placeLabel(s)) matches “\(s.searchLabel.isEmpty ? "this" : s.searchLabel)” right now. Post the job and freelancers come to you."

        ScreenShell {
            VStack(alignment: .leading, spacing: 0) {
                HStack(spacing: 11) {
                    BackButton { store.go(.explore) }
                    HStack(spacing: 9) {
                        Image(systemName: "magnifyingglass").font(.system(size: 13)).foregroundStyle(FK.text45)
                        Text(s.searchLabel.isEmpty ? "Reel editor" : s.searchLabel)
                            .font(.system(size: 12.5))
                            .foregroundStyle(Color(hex: 0xF2F2F0, opacity: 0.8))
                            .lineLimit(1)
                        Spacer()
                    }
                    .padding(.horizontal, 13).padding(.vertical, 11)
                    .background(FK.card)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 12).stroke(FK.line09, lineWidth: 1))

                    Button { store.openFilters() } label: {
                        ZStack(alignment: .topTrailing) {
                            Image(systemName: "slider.horizontal.3")
                                .font(.system(size: 15))
                                .foregroundStyle(active > 0 ? FK.lime : FK.text60)
                            if active > 0 {
                                Text("\(active)")
                                    .font(.system(size: 8.5, weight: .semibold, design: .monospaced))
                                    .foregroundStyle(FK.onLime)
                                    .padding(.horizontal, 3).padding(.vertical, 1)
                                    .background(FK.lime)
                                    .clipShape(Capsule())
                                    .offset(x: 8, y: -6)
                            }
                        }
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 16)

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        ForEach(sorts, id: \.1) { name, key in
                            Chip(title: name, on: s.sort == key) { store.setSort(key) }
                        }
                    }.padding(.horizontal, 20)
                }
                .padding(.top, 14)

                HStack(alignment: .lastTextBaseline) {
                    Text("\(countLabel) in \(city)").font(.fkH4)
                    Spacer()
                    Text(s.sort == .match ? "MATCH SCORED" : "FILTERED")
                        .font(.system(size: 11, design: .monospaced))
                        .foregroundStyle(FK.text40)
                }
                .padding(.horizontal, 20)
                .padding(.top, 16)

                if s.searching {
                    VStack(spacing: 11) {
                        ForEach(0..<3, id: \.self) { _ in
                            HStack(spacing: 12) {
                                RoundedRectangle(cornerRadius: 14).fill(FK.skeletonLg).frame(width: 48, height: 48)
                                VStack(alignment: .leading, spacing: 9) {
                                    RoundedRectangle(cornerRadius: 4).fill(FK.skeletonLg).frame(width: 140, height: 11)
                                    RoundedRectangle(cornerRadius: 4).fill(FK.skeletonSm).frame(width: 200, height: 9)
                                    RoundedRectangle(cornerRadius: 4).fill(FK.skeletonSm).frame(width: 100, height: 9)
                                }
                            }
                            .padding(14)
                            .background(FK.card)
                            .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                            .opacity(0.7)
                        }
                    }
                    .padding(.horizontal, 20).padding(.top, 14)
                } else if results.isEmpty {
                    VStack(spacing: 0) {
                        Text("⌕").font(.system(size: 24)).foregroundStyle(FK.text28)
                        Text("Nobody matches this yet").font(.fkScreenTitle).padding(.top, 14)
                        Text(emptyNote).font(.fkBodySm).foregroundStyle(FK.text50).multilineTextAlignment(.center).padding(.top, 8)
                        VStack(spacing: 9) {
                            PrimaryButton(title: "Clear filters") { store.clearAll() }
                            OutlineButton(title: "Post the job instead") { store.go(.explore) }
                        }.padding(.top, 20)
                    }
                    .padding(.horizontal, 30).padding(.vertical, 30)
                } else {
                    VStack(spacing: 11) {
                        ForEach(Array(results.enumerated()), id: \.element.id) { i, p in
                            ResultCard(pro: p, highlighted: i == 0)
                        }
                    }
                    .padding(.horizontal, 20).padding(.top, 14).padding(.bottom, 26)
                }
            }
        }
    }
}

private struct ResultCard: View {
    @EnvironmentObject var store: AppStore
    var pro: Pro
    var highlighted: Bool

    var body: some View {
        VStack(spacing: 0) {
            Button { store.openPro(pro.id) } label: {
                HStack(spacing: 12) {
                    Stripe(cornerRadius: 14).frame(width: 48, height: 48)
                        .overlay(RoundedRectangle(cornerRadius: 14).stroke(FK.line09, lineWidth: 1))
                    VStack(alignment: .leading, spacing: 4) {
                        HStack(spacing: 6) {
                            Text(pro.name).font(.system(size: 14.5, weight: .semibold))
                            if pro.verified {
                                Text("✔").font(.system(size: 11)).foregroundStyle(FK.lime)
                            }
                            Spacer()
                            Text("\(pro.match)%")
                                .font(.system(size: 11, weight: .semibold, design: .monospaced))
                                .foregroundStyle(highlighted ? FK.lime : FK.text55)
                        }
                        Text(pro.services).font(.fkMeta).foregroundStyle(FK.text55)
                        HStack(spacing: 9) {
                            Text("★ \(pro.rating, specifier: "%.1f")").foregroundStyle(FK.amber)
                            Text("\(pro.jobs) jobs").foregroundStyle(FK.text40)
                            Text(pro.distance).foregroundStyle(FK.text40)
                        }.font(.system(size: 11, weight: .medium))
                    }
                }
            }
            .foregroundStyle(FK.text)

            HStack {
                VStack(alignment: .leading, spacing: 0) {
                    Text(pro.price).font(.fkCardTitle)
                    Text(pro.note).font(.system(size: 10.5)).foregroundStyle(FK.text45)
                }
                Spacer()
                HStack(spacing: 8) {
                    InlineOutlineButton(title: "Message") { store.messageFromResults(pro) }
                    InlineButton(title: "Hire") { store.openHire(pro.id) }
                }
            }
            .padding(.top, 11)
            .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.line07), alignment: .top)
            .padding(.top, 12)
        }
        .padding(14)
        .background(FK.card)
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 18).stroke(highlighted ? FK.lime : FK.line08, lineWidth: 1))
    }
}
