import SwiftUI

struct IssueSheetView: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let b = Selectors.currentBooking(s)

        FKSheet(isOpen: s.issueOpen && b != nil, onClose: { store.closeIssue() }, maxHeightFraction: 0.88) {
            if let b {
                VStack(alignment: .leading, spacing: 0) {
                    HStack {
                        Text("Raise an issue").font(.fkSheetTitle)
                        Spacer()
                        Button { store.closeIssue() } label: { Image(systemName: "xmark").font(.system(size: 14)).foregroundStyle(FK.text50) }
                    }
                    Text("Order \(b.id) with \(b.name). Support in \(Selectors.cityOf(s)) picks this up within 24 hours.")
                        .font(.fkBodySm).foregroundStyle(FK.text55).padding(.top, 9)

                    FKFlowLayout(spacing: 7, lineSpacing: 7) {
                        ForEach(Array(Seed.issueReasons.enumerated()), id: \.offset) { i, name in
                            Chip(title: name, on: s.issueReason == i) { store.setIssueReason(i) }
                        }
                    }.padding(.top, 16)

                    FKTextArea(placeholder: "What happened? Dates, what was promised, what you got.",
                               text: Binding(get: { s.issueText }, set: { store.setIssueText($0) }), minHeight: 80)
                        .padding(.top, 14)

                    if s.issueError {
                        Text("Add a couple of lines so support can act on it.").font(.system(size: 11.5, weight: .medium)).foregroundStyle(FK.alert).padding(.top, 9)
                    }

                    PrimaryButton(title: "Send to support") { store.submitIssue(b) }.padding(.top, 16)

                    Text("FreelanceKar never holds your money, so nothing is frozen — support mediates and can pause the freelancer’s listing while the case is open.")
                        .font(.system(size: 11.5)).foregroundStyle(FK.text40).lineSpacing(3).padding(.top, 13)
                }
                .padding(.horizontal, 20).padding(.top, 20).padding(.bottom, 22)
            }
        }
    }
}
