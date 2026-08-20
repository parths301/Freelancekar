import SwiftUI

struct HomeScreen: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let city = Selectors.cityOf(s)

        ScreenShell {
            VStack(alignment: .leading, spacing: 0) {
                HStack {
                    Text("FreelanceKar")
                        .font(.system(size: 18, weight: .bold))
                        .tracking(-0.4)
                        .foregroundStyle(FK.lime)
                    Spacer()
                    HStack(spacing: 9) {
                        BellButton()
                        LocationPill()
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 16)

                Button {
                    store.go(.explore)
                } label: {
                    HStack(spacing: 10) {
                        Image(systemName: "magnifyingglass").font(.system(size: 14)).foregroundStyle(FK.text45)
                        Text("Search “reel editor”, “GST filing”…")
                            .font(.system(size: 14))
                            .foregroundStyle(FK.text42)
                        Spacer()
                    }
                    .padding(.horizontal, 14)
                    .padding(.vertical, 13)
                    .background(FK.card)
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 14).stroke(FK.line09, lineWidth: 1))
                }
                .padding(.horizontal, 20)
                .padding(.top, 18)

                VStack(alignment: .leading, spacing: 0) {
                    Text("What do you need done?").font(.fkH2).foregroundStyle(FK.text).padding(.bottom, 3)
                    Text("\(Seed.cityCounts[city] ?? "") verified freelancers in \(city)")
                        .font(.system(size: 13))
                        .foregroundStyle(FK.text50)
                        .padding(.bottom, 14)

                    LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 9), count: 3), spacing: 9) {
                        ForEach(Seed.cats, id: \.1) { icon, name, query in
                            Button {
                                store.search(query)
                            } label: {
                                VStack(alignment: .leading, spacing: 9) {
                                    Text(icon).font(.system(size: 17))
                                    Text(name).font(.system(size: 11.5, weight: .medium)).multilineTextAlignment(.leading)
                                    Spacer(minLength: 0)
                                }
                                .frame(minHeight: 78, alignment: .topLeading)
                                .padding(10)
                                .frame(maxWidth: .infinity, alignment: .leading)
                            }
                            .foregroundStyle(FK.text)
                            .background(FK.card)
                            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                            .overlay(RoundedRectangle(cornerRadius: 14).stroke(FK.line08, lineWidth: 1))
                        }
                    }

                    Button {
                        store.go(.explore)
                    } label: {
                        Text("All 24 categories →")
                            .font(.system(size: 12, weight: .medium))
                            .foregroundStyle(FK.lime)
                            .padding(6)
                    }
                    .padding(.top, 10)
                }
                .padding(.horizontal, 20)
                .padding(.top, 24)

                VStack(alignment: .leading, spacing: 0) {
                    SectionTitle(title: "Top rated near you") {
                        Button { store.go(.explore) } label: {
                            Text("See all").font(.system(size: 12)).foregroundStyle(FK.text45)
                        }
                    }
                    .padding(.horizontal, 20)

                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 12) {
                            ForEach(Seed.pros.prefix(3)) { p in
                                Button {
                                    store.openPro(p.id)
                                } label: {
                                    VStack(alignment: .leading, spacing: 5) {
                                        Stripe(cornerRadius: 0).frame(height: 92)
                                        VStack(alignment: .leading, spacing: 5) {
                                            Text(p.name).font(.system(size: 13, weight: .semibold))
                                            Text(p.headline).font(.system(size: 11)).foregroundStyle(FK.text50)
                                            HStack(spacing: 3) {
                                                Text("★ \(p.rating, specifier: "%.1f")").foregroundStyle(FK.amber)
                                                Text("(\(p.jobs))").foregroundStyle(FK.text40)
                                            }.font(.system(size: 11, weight: .medium))
                                            Text(p.price).font(.system(size: 12, weight: .semibold))
                                        }
                                        .padding(.horizontal, 11)
                                        .padding(.bottom, 12)
                                        .padding(.top, 10)
                                    }
                                    .frame(width: 150)
                                }
                                .foregroundStyle(FK.text)
                                .background(FK.card)
                                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                                .overlay(RoundedRectangle(cornerRadius: 16).stroke(FK.line08, lineWidth: 1))
                            }
                        }
                        .padding(.horizontal, 20)
                        .padding(.top, 14)
                    }
                }
                .padding(.top, 22)

                HStack {
                    VStack(alignment: .leading, spacing: 3) {
                        Text("Can’t find it? Post a job").font(.fkH4)
                        Text("Get quotes in under an hour").font(.fkMeta).foregroundStyle(FK.text50)
                    }
                    Spacer()
                    InlineButton(title: "Post") { store.go(.explore) }
                }
                .padding(16)
                .background(FK.card)
                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 16).stroke(FK.line08, lineWidth: 1))
                .padding(.horizontal, 20)
                .padding(.top, 22)
                .padding(.bottom, 26)
            }
        }
    }
}
