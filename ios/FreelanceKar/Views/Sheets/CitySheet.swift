import SwiftUI

struct CitySheetView: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let rows = Selectors.selectCityRows(s)

        FKSheet(isOpen: s.cityOpen, onClose: { store.closeCity() }, maxHeightFraction: 0.82) {
            VStack(alignment: .leading, spacing: 0) {
                HStack {
                    Text("Where do you need work done?").font(.fkSheetTitle)
                    Spacer()
                    Button { store.closeCity() } label: {
                        Image(systemName: "xmark").font(.system(size: 14)).foregroundStyle(FK.text50)
                    }
                }

                HStack(spacing: 10) {
                    Image(systemName: "magnifyingglass").font(.system(size: 13)).foregroundStyle(FK.text45)
                    TextField("", text: Binding(get: { s.citySearch }, set: { store.setCitySearch($0) }),
                              prompt: Text("Locality or city — e.g. Dharampeth").foregroundStyle(FK.text42))
                        .font(.system(size: 13.5)).foregroundStyle(FK.text)
                }
                .padding(.horizontal, 13).padding(.vertical, 11)
                .background(FK.nested)
                .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 13).stroke(FK.line10, lineWidth: 1))
                .padding(.top, 14)

                Button { store.useCurrentLocation() } label: {
                    HStack(spacing: 9) {
                        Text("◉").font(.system(size: 12))
                        Text("Use my current location").font(.system(size: 12.5, weight: .semibold))
                        Spacer()
                    }
                    .foregroundStyle(FK.lime)
                    .padding(.horizontal, 13).padding(.vertical, 11)
                }
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(FK.limeBd35, style: StrokeStyle(lineWidth: 1, dash: [5, 4])))
                .padding(.top, 9)

                VStack(spacing: 7) {
                    ForEach(rows) { r in
                        Button { store.pickPlace(r.city, r.locality) } label: {
                            HStack(spacing: 11) {
                                Text(r.icon).font(.system(size: 12)).foregroundStyle(r.on ? FK.lime : FK.text40)
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(r.name).font(.system(size: 13, weight: .semibold))
                                    Text(r.sub).font(.system(size: 10.5)).foregroundStyle(FK.text45)
                                }
                                Spacer()
                                Text(r.count).font(.fkMonoSm).foregroundStyle(FK.text35)
                            }
                            .padding(.horizontal, 13).padding(.vertical, 12)
                        }
                        .foregroundStyle(FK.text)
                        .background(FK.nested)
                        .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 13).stroke(r.on ? FK.lime : FK.line09, lineWidth: 1))
                    }

                    if rows.isEmpty {
                        VStack(spacing: 14) {
                            Text("No match for “\(s.citySearch)”. FreelanceKar is live in Nagpur, Indore, Jabalpur and Nashik — more cities each month.")
                                .font(.fkBodySm).foregroundStyle(FK.text45).multilineTextAlignment(.center)
                            Button { store.setCitySearch("") } label: {
                                Text("Show all localities").font(.system(size: 12, weight: .semibold)).foregroundStyle(FK.lime)
                                    .padding(.horizontal, 14).padding(.vertical, 10)
                            }
                            .overlay(RoundedRectangle(cornerRadius: 11).stroke(FK.limeBd35, lineWidth: 1))
                        }
                        .padding(.horizontal, 10).padding(.vertical, 26)
                    }
                }
                .padding(.top, 14)
            }
            .padding(.horizontal, 20).padding(.top, 18).padding(.bottom, 22)
        }
    }
}
