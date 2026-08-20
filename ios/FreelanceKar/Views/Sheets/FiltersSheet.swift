import SwiftUI

struct FiltersSheetView: View {
    @EnvironmentObject var store: AppStore

    private let groups: [(label: String, key: WritableKeyPath<FilterSet, String>, opts: [(String, String)])] = [
        ("MAX BUDGET", \FilterSet.budget, [("Any", "any"), ("Under ₹2k", "2000"), ("Under ₹10k", "10000"), ("Under ₹25k", "25000")]),
        ("DISTANCE", \FilterSet.dist, [("Any", "any"), ("Within 3 km", "3"), ("Within 5 km", "5"), ("Within 10 km", "10")]),
        ("WORK MODE", \FilterSet.mode, [("Any", "any"), ("On-site", "onsite"), ("Remote ok", "remote")]),
        ("LANGUAGE", \FilterSet.lang, [("Any", "any"), ("Hindi", "Hindi"), ("Marathi", "Marathi"), ("English", "English")]),
    ]

    var body: some View {
        let s = store.state

        FKSheet(isOpen: s.filtersOpen, onClose: { store.closeFilters() }, maxHeightFraction: 0.88) {
            VStack(alignment: .leading, spacing: 0) {
                HStack {
                    Text("Filters").font(.fkSheetTitle)
                    Spacer()
                    Button { store.closeFilters() } label: {
                        Image(systemName: "xmark").font(.system(size: 14)).foregroundStyle(FK.text50)
                    }
                }

                ForEach(groups, id: \.label) { g in
                    VStack(alignment: .leading, spacing: 9) {
                        MonoLabel(text: g.label)
                        FKFlowLayout(spacing: 7, lineSpacing: 7) {
                            ForEach(g.opts, id: \.1) { name, value in
                                Chip(title: name, on: s.filters[keyPath: g.key] == value) { store.setFilter(g.key, value) }
                            }
                        }
                    }.padding(.top, 18)
                }

                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Available this week").font(.system(size: 13, weight: .semibold))
                        Text("Only show open calendars").font(.system(size: 11)).foregroundStyle(FK.text50)
                    }
                    Spacer()
                    Toggle("", isOn: Binding(get: { s.filters.availNow }, set: { _ in store.toggleAvailNow() }))
                        .labelsHidden().tint(FK.lime)
                }
                .padding(.horizontal, 14).padding(.vertical, 13)
                .background(FK.nested)
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 14).stroke(FK.line09, lineWidth: 1))
                .padding(.top, 18)

                HStack(spacing: 9) {
                    Button { store.resetFilters() } label: {
                        Text("Reset").font(.system(size: 13, weight: .medium)).foregroundStyle(Color(hex: 0xF2F2F0, opacity: 0.7))
                            .frame(maxWidth: .infinity).padding(14)
                    }
                    .overlay(RoundedRectangle(cornerRadius: 12).stroke(FK.line14, lineWidth: 1))

                    Button { store.applyFilters() } label: {
                        Text("Show results").font(.system(size: 13.5, weight: .semibold)).foregroundStyle(FK.onLime)
                            .frame(maxWidth: .infinity).padding(14)
                    }
                    .background(FK.lime)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                }
                .padding(.top, 20)
            }
            .padding(.horizontal, 20).padding(.top, 18).padding(.bottom, 22)
        }
    }
}
