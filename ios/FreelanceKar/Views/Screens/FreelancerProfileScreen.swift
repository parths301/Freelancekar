import SwiftUI

struct FreelancerProfileScreen: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let kyc = s.kycCount
        let name = s.fName.trimmingCharacters(in: .whitespaces).isEmpty ? "Your name" : s.fName

        ScreenShell {
            VStack(alignment: .leading, spacing: 0) {
                Text("Profile").font(.fkH1).padding(.bottom, 18)

                HStack(spacing: 13) {
                    Stripe(cornerRadius: 16).frame(width: 56, height: 56)
                        .overlay(RoundedRectangle(cornerRadius: 16).stroke(FK.line09, lineWidth: 1))
                    VStack(alignment: .leading, spacing: 3) {
                        HStack(spacing: 6) {
                            Text(name).font(.fkScreenTitle)
                            Text(kyc == 3 ? "KYC ✔" : "KYC \(kyc)/3")
                                .font(.system(size: 9.5, weight: .semibold, design: .monospaced))
                                .foregroundStyle(FK.lime)
                                .padding(.horizontal, 6).padding(.vertical, 3)
                                .background(FK.limeBadge)
                                .clipShape(RoundedRectangle(cornerRadius: 5, style: .continuous))
                        }
                        Text("Freelancer · \(Seed.cities[s.fCityIdx])").font(.system(size: 12)).foregroundStyle(FK.text50)
                    }
                }

                HStack(spacing: 8) {
                    StatBox(value: String(Selectors.validSvcRows(s).count), label: "services")
                    StatBox(value: String(s.quotesSent), label: "quotes sent")
                    StatBox(value: String(s.fGigs.count), label: "active gigs")
                }
                .padding(.top, 20)

                Text(s.fBio.trimmingCharacters(in: .whitespaces).isEmpty ? "Add a line about your work so clients know what you do." : s.fBio)
                    .font(.system(size: 13)).foregroundStyle(FK.text60).lineSpacing(5)
                    .padding(.top, 18)

                VStack(spacing: 0) {
                    Button { store.addMoreServices() } label: {
                        Text("Edit services & pricing").font(.system(size: 13, weight: .medium)).foregroundStyle(FK.text)
                            .frame(maxWidth: .infinity, alignment: .leading).padding(14)
                    }
                    Divider().overlay(FK.line07)
                    Button { store.go(.fearn) } label: {
                        HStack {
                            Text("Payments & bank details").font(.system(size: 13, weight: .medium)).foregroundStyle(FK.text)
                            Spacer()
                            Text("→").font(.system(size: 12)).foregroundStyle(FK.lime)
                        }.padding(14)
                    }
                    Divider().overlay(FK.line07)
                    Button { store.backToClient() } label: {
                        HStack {
                            Text("Switch to client mode").font(.system(size: 13, weight: .semibold)).foregroundStyle(FK.lime)
                            Spacer()
                            Text("→").font(.system(size: 12)).foregroundStyle(FK.lime)
                        }.padding(14)
                    }
                }
                .background(FK.card)
                .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.line08, lineWidth: 1))
                .padding(.top, 20)
            }
            .padding(.horizontal, 20).padding(.top, 18).padding(.bottom, 26)
        }
    }
}
