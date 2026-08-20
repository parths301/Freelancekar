import SwiftUI

struct QuoteSheetView: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let req = s.reqs.first { $0.id == s.quoteFor }

        FKSheet(isOpen: req != nil, onClose: { store.closeQuote() }, maxHeightFraction: 0.88) {
            if let req {
                VStack(alignment: .leading, spacing: 0) {
                    HStack {
                        Text("Send a quote").font(.fkSheetTitle)
                        Spacer()
                        Button { store.closeQuote() } label: { Image(systemName: "xmark").font(.system(size: 14)).foregroundStyle(FK.text50) }
                    }

                    VStack(alignment: .leading, spacing: 4) {
                        Text(req.title).font(.fkCardTitle)
                        Text(req.meta).font(.system(size: 11.5)).foregroundStyle(FK.text50)
                        Text("Client budget: \(req.budget)").font(.system(size: 11.5, weight: .medium)).foregroundStyle(FK.lime)
                    }
                    .padding(13)
                    .background(FK.nested)
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 14).stroke(FK.line09, lineWidth: 1))
                    .padding(.top, 14)

                    VStack(alignment: .leading, spacing: 8) {
                        MonoLabel(text: "YOUR PRICE")
                        HStack(spacing: 9) {
                            Text("₹").font(.system(size: 14, weight: .medium)).foregroundStyle(FK.text50)
                            TextField("", text: Binding(get: { s.quoteAmount }, set: { store.setQuoteAmount($0) }),
                                      prompt: Text("14000").foregroundStyle(FK.text42))
                                .keyboardType(.numberPad)
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(FK.text)
                        }
                        .padding(13)
                        .background(FK.nested)
                        .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 13).stroke(FK.line09, lineWidth: 1))
                        Text("You keep 100% — client pays you directly, no platform cut.")
                            .font(.system(size: 11)).foregroundStyle(FK.text42)
                    }.padding(.top, 16)

                    VStack(alignment: .leading, spacing: 8) {
                        MonoLabel(text: "DELIVERY IN")
                        HStack(spacing: 7) {
                            ForEach(Array(Seed.dayLabels.enumerated()), id: \.offset) { i, d in
                                Chip(title: d, on: s.quoteDayIdx == i) { store.setQuoteDay(i) }
                            }
                        }
                    }.padding(.top, 16)

                    VStack(alignment: .leading, spacing: 8) {
                        MonoLabel(text: "MESSAGE")
                        FKTextArea(placeholder: "What’s included, how you work, what you need from them.",
                                   text: Binding(get: { s.quoteMsg }, set: { store.setQuoteMsg($0) }), minHeight: 66)
                        if s.quoteError {
                            Text("Add a price and a short message before sending.").font(.system(size: 11.5, weight: .medium)).foregroundStyle(FK.alert)
                        }
                    }.padding(.top, 16)

                    PrimaryButton(title: "Send quote") { store.sendQuote() }.padding(.top, 18)
                }
                .padding(.horizontal, 20).padding(.top, 18).padding(.bottom, 22)
            }
        }
    }
}
