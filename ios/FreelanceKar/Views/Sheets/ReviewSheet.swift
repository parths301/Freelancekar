import SwiftUI

struct ReviewSheetView: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let b = Selectors.currentBooking(s)

        FKSheet(isOpen: s.reviewOpen && b != nil, onClose: { store.closeReview() }) {
            if let b {
                VStack(alignment: .leading, spacing: 0) {
                    HStack {
                        Text("Close out the job").font(.fkSheetTitle)
                        Spacer()
                        Button { store.closeReview() } label: { Image(systemName: "xmark").font(.system(size: 14)).foregroundStyle(FK.text50) }
                    }
                    Text("Confirm you’ve paid \(b.first) \(b.amount) directly. How was the work?")
                        .font(.fkBodySm).foregroundStyle(FK.text55).padding(.top, 9)

                    HStack(spacing: 8) {
                        ForEach(1...5, id: \.self) { n in
                            Button { store.setReviewStars(n) } label: {
                                Text("★").font(.system(size: 28)).foregroundStyle(n <= s.reviewStars ? FK.amber : FK.text22)
                            }
                        }
                    }.padding(.top, 16)

                    FKTextArea(placeholder: "What went well? This shows on their profile.",
                               text: Binding(get: { s.reviewText }, set: { store.setReviewText($0) }), minHeight: 70)
                        .padding(.top, 14)

                    if s.reviewError {
                        Text("Pick a star rating first.").font(.system(size: 11.5, weight: .medium)).foregroundStyle(FK.alert).padding(.top, 9)
                    }

                    PrimaryButton(title: "Mark paid & post review") { store.submitReview(b) }.padding(.top, 16)
                }
                .padding(.horizontal, 20).padding(.top, 20).padding(.bottom, 22)
            }
        }
    }
}
