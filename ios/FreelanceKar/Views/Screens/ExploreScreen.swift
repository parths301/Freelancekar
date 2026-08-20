import SwiftUI

struct ExploreScreen: View {
    @EnvironmentObject var store: AppStore
    private let howItWorks = ["Describe work", "Compare quotes", "Pay them directly"]

    var body: some View {
        let s = store.state
        let city = Selectors.cityOf(s)
        let recents = [
            (label: "Reel editor under ₹1,500", meta: "\(city) · within 10 km", count: "28"),
            (label: "Product photographer", meta: "\(city) · available this week", count: "64"),
        ]

        ScreenShell {
            VStack(alignment: .leading, spacing: 0) {
                HStack {
                    Text("Explore").font(.fkH1).foregroundStyle(FK.text)
                    Spacer()
                    LocationPill(compact: true)
                }
                .padding(.horizontal, 20)
                .padding(.top, 18)

                HStack(spacing: 10) {
                    Image(systemName: "magnifyingglass").font(.system(size: 14)).foregroundStyle(FK.text45)
                    TextField("", text: Binding(get: { s.query }, set: { store.setQuery($0) }),
                              prompt: Text("Search skills, services or people").foregroundStyle(FK.text42))
                        .font(.system(size: 14))
                        .foregroundStyle(FK.text)
                        .onSubmit { if !s.query.trimmingCharacters(in: .whitespaces).isEmpty { store.search(s.query.trimmingCharacters(in: .whitespaces)) } }
                    if !s.query.trimmingCharacters(in: .whitespaces).isEmpty {
                        Button { store.runSearch() } label: {
                            Text("Go").font(.system(size: 11, weight: .semibold)).foregroundStyle(FK.onLime)
                                .padding(.horizontal, 11).padding(.vertical, 7)
                        }
                        .background(FK.lime)
                        .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                    }
                }
                .padding(.horizontal, 13)
                .padding(.vertical, 11)
                .background(FK.card)
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 14).stroke(FK.line09, lineWidth: 1))
                .padding(.horizontal, 20)
                .padding(.top, 18)

                (Text("Tell us the work.").foregroundStyle(FK.text) + Text(" We’ll find the person.").foregroundStyle(FK.text40))
                    .font(.fkHero)
                    .padding(.horizontal, 20)
                    .padding(.top, 26)

                VStack(alignment: .leading, spacing: 8) {
                    FKTextArea(placeholder: "Need 8 Instagram reels a month for my café in Dharampeth…",
                               text: Binding(get: { s.brief }, set: { store.setBrief($0) }), minHeight: 62)
                    HStack {
                        HStack(spacing: 11) {
                            Text("◉"); Text("▤"); Text("₹")
                        }.font(.system(size: 14)).foregroundStyle(FK.text45)
                        Spacer()
                        InlineButton(title: "Find people") { store.runSearch() }
                    }
                }
                .padding(14)
                .background(FK.card)
                .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 18).stroke(FK.line10, lineWidth: 1))
                .padding(.horizontal, 20)
                .padding(.top, 18)

                FlowChips(items: Seed.suggestionChips) { store.search($0) }
                    .padding(.horizontal, 20)
                    .padding(.top, 16)

                VStack(alignment: .leading, spacing: 11) {
                    Text("Recent searches").font(.fkH4)
                    ForEach(recents, id: \.label) { r in
                        Button { store.search(r.label) } label: {
                            HStack(spacing: 12) {
                                Text("↺").font(.system(size: 13)).foregroundStyle(FK.text40)
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(r.label).font(.system(size: 13, weight: .semibold))
                                    Text(r.meta).font(.system(size: 10.5)).foregroundStyle(FK.text45)
                                }
                                Spacer()
                                Text(r.count).font(.fkMono).foregroundStyle(FK.text40)
                            }
                            .padding(.horizontal, 14)
                            .padding(.vertical, 12)
                        }
                        .foregroundStyle(FK.text)
                        .background(FK.card)
                        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 14).stroke(FK.line08, lineWidth: 1))
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 26)

                VStack(alignment: .leading, spacing: 11) {
                    Text("How hiring works").font(.fkH4)
                    HStack(spacing: 9) {
                        ForEach(Array(howItWorks.enumerated()), id: \.offset) { i, label in
                            VStack(spacing: 4) {
                                Text("\(i + 1)").font(.system(size: 17, weight: .semibold))
                                Text(label).font(.system(size: 10.5)).foregroundStyle(FK.text50).multilineTextAlignment(.center)
                            }
                            .frame(maxWidth: .infinity)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 13)
                            .background(FK.card)
                            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                            .overlay(RoundedRectangle(cornerRadius: 14).stroke(FK.line08, lineWidth: 1))
                        }
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 24)
                .padding(.bottom, 26)
            }
        }
    }
}

/// Wrapping chip row. Uses a flow layout so tag-style chips wrap onto
/// multiple lines instead of a fixed grid.
struct FlowChips: View {
    var items: [String]
    var action: (String) -> Void

    var body: some View {
        FKFlowLayout(spacing: 8, lineSpacing: 8) {
            ForEach(items, id: \.self) { item in
                Button { action(item) } label: {
                    Text(item)
                        .font(.system(size: 12, weight: .medium))
                        .foregroundStyle(Color(hex: 0xF2F2F0, opacity: 0.75))
                        .padding(.horizontal, 12).padding(.vertical, 8)
                }
                .background(FK.card)
                .clipShape(Capsule())
                .overlay(Capsule().stroke(FK.line09, lineWidth: 1))
            }
        }
    }
}

/// Minimal flow layout (iOS 16+ Layout protocol) that wraps children left to
/// right, starting a new line when the row would overflow.
struct FKFlowLayout: Layout {
    var spacing: CGFloat = 8
    var lineSpacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let maxWidth = proposal.width ?? .infinity
        var x: CGFloat = 0
        var y: CGFloat = 0
        var lineHeight: CGFloat = 0
        for view in subviews {
            let size = view.sizeThatFits(.unspecified)
            if x + size.width > maxWidth, x > 0 {
                x = 0
                y += lineHeight + lineSpacing
                lineHeight = 0
            }
            x += size.width + spacing
            lineHeight = max(lineHeight, size.height)
        }
        y += lineHeight
        return CGSize(width: maxWidth.isFinite ? maxWidth : x, height: y)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let maxWidth = bounds.width
        var x: CGFloat = bounds.minX
        var y: CGFloat = bounds.minY
        var lineHeight: CGFloat = 0
        for view in subviews {
            let size = view.sizeThatFits(.unspecified)
            if x + size.width > bounds.minX + maxWidth, x > bounds.minX {
                x = bounds.minX
                y += lineHeight + lineSpacing
                lineHeight = 0
            }
            view.place(at: CGPoint(x: x, y: y), proposal: .unspecified)
            x += size.width + spacing
            lineHeight = max(lineHeight, size.height)
        }
    }
}
