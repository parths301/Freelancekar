import SwiftUI

struct OnboardingScreen: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        let cta: String = {
            if s.onbStep == 1 { return s.otpSent ? "Verify & continue" : "Send OTP" }
            if s.onbStep == 4 { return "Continue to plan" }
            return "Continue"
        }()

        ScreenShell {
            VStack(spacing: 0) {
                HStack(spacing: 12) {
                    BackButton { store.onbBack() }
                    ZStack(alignment: .leading) {
                        Capsule().fill(FK.track).frame(height: 3)
                        GeometryReader { geo in
                            Capsule().fill(FK.lime)
                                .frame(width: geo.size.width * CGFloat(s.onbStep) / 5, height: 3)
                                .animation(.linear(duration: 0.3), value: s.onbStep)
                        }.frame(height: 3)
                    }
                    Text("\(s.onbStep)/5").font(.fkMono).foregroundStyle(FK.text50)
                }
                .padding(.horizontal, 20).padding(.top, 16)

                Group {
                    switch s.onbStep {
                    case 1: StepPhone()
                    case 2: StepAbout()
                    case 3: StepVerify()
                    case 4: StepServices()
                    default: StepPlan()
                    }
                }

                if s.onbStep != 5 {
                    PrimaryButton(title: cta) { store.onbNext() }
                        .padding(.horizontal, 20).padding(.top, 22).padding(.bottom, 26)
                }
            }
        }
    }
}

private struct StepHead: View {
    var title: String
    var body_: String
    var body: some View {
        VStack(alignment: .leading, spacing: 9) {
            Text(title).font(.fkOnbH1)
            Text(body_).font(.system(size: 13)).foregroundStyle(FK.text50).lineSpacing(4)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

private let benefits = [
    "List as many services as you do — one profile, many skills",
    "Clients near you see you first",
    "Clients pay you directly — you keep 100% of every job",
]

private struct StepPhone: View {
    @EnvironmentObject var store: AppStore
    var body: some View {
        let s = store.state
        VStack(alignment: .leading, spacing: 0) {
            StepHead(title: "Start earning on FreelanceKar", body_: "7-day free trial, then a simple monthly plan. Zero platform cut on your jobs, ever.")

            VStack(alignment: .leading, spacing: 8) {
                MonoLabel(text: "MOBILE NUMBER")
                HStack(spacing: 10) {
                    Text("+91").font(.system(size: 14, weight: .medium)).foregroundStyle(FK.text50)
                    TextField("", text: Binding(get: { s.phone }, set: { store.setPhone($0) }),
                              prompt: Text("98765 43210").foregroundStyle(FK.text42))
                        .keyboardType(.numberPad)
                        .font(.system(size: 15, weight: .medium))
                        .foregroundStyle(FK.text)
                }
                .padding(.horizontal, 14).padding(.vertical, 13)
                .background(FK.card)
                .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 13).stroke(FK.line09, lineWidth: 1))
            }
            .padding(.top, 24)

            if s.otpSent {
                VStack(alignment: .leading, spacing: 8) {
                    MonoLabel(text: "OTP SENT · USE 1234")
                    TextField("", text: Binding(get: { s.otp }, set: { store.setOtp($0) }),
                              prompt: Text("1234").foregroundStyle(FK.text42))
                        .keyboardType(.numberPad)
                        .font(.fkOtp)
                        .multilineTextAlignment(.center)
                        .foregroundStyle(FK.text)
                        .padding(.horizontal, 14).padding(.vertical, 13)
                        .background(FK.card)
                        .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 13).stroke(FK.line09, lineWidth: 1))
                }.padding(.top, 16)
            }

            if !s.onbErrorMsg.isEmpty { ErrorNote(text: s.onbErrorMsg) }

            VStack(alignment: .leading, spacing: 11) {
                ForEach(benefits, id: \.self) { b in
                    HStack(alignment: .top, spacing: 11) {
                        Text("✔").font(.system(size: 13)).foregroundStyle(FK.lime)
                        Text(b).font(.fkBodySm).foregroundStyle(FK.text60)
                    }
                }
            }.padding(.top, 26)
        }
        .padding(.horizontal, 20).padding(.top, 30)
    }
}

private struct StepAbout: View {
    @EnvironmentObject var store: AppStore
    var body: some View {
        let s = store.state
        VStack(alignment: .leading, spacing: 0) {
            StepHead(title: "About you", body_: "This is what clients see at the top of your profile.")

            VStack(alignment: .leading, spacing: 18) {
                VStack(alignment: .leading, spacing: 8) {
                    MonoLabel(text: "NAME OR STUDIO NAME")
                    FKTextField(placeholder: "e.g. Rahul Verma / Studio Aarambh", text: Binding(get: { s.fName }, set: { store.setFName($0) }))
                }
                VStack(alignment: .leading, spacing: 8) {
                    MonoLabel(text: "YOUR CITY")
                    FKFlowLayout(spacing: 7, lineSpacing: 7) {
                        ForEach(Array(Seed.cities.enumerated()), id: \.offset) { i, c in
                            Chip(title: c, on: s.fCityIdx == i) { store.setFCity(i) }
                        }
                    }
                }
                VStack(alignment: .leading, spacing: 8) {
                    MonoLabel(text: "HOW FAR YOU’LL TRAVEL")
                    HStack(spacing: 7) {
                        ForEach(Array(Seed.radiusLabels.enumerated()), id: \.offset) { i, r in
                            Chip(title: r, on: s.fRadiusIdx == i) { store.setFRadius(i) }
                        }
                    }
                }
                VStack(alignment: .leading, spacing: 8) {
                    MonoLabel(text: "ONE LINE ABOUT YOUR WORK")
                    FKTextArea(placeholder: "Reels and product shoots for cafés and local brands.",
                               text: Binding(get: { s.fBio }, set: { store.setFBio($0) }), minHeight: 62)
                }
            }.padding(.top, 22)

            if !s.onbErrorMsg.isEmpty { ErrorNote(text: s.onbErrorMsg) }
        }
        .padding(.horizontal, 20).padding(.top, 30)
    }
}

private let kycItems: [(KycKey, String, String)] = [
    (.aadhaar, "Aadhaar", "ID check · never shown to clients"),
    (.pan, "PAN card", "For payouts above ₹20,000"),
    (.selfie, "Live selfie", "Matches your ID photo"),
]

private struct StepVerify: View {
    @EnvironmentObject var store: AppStore
    var body: some View {
        let s = store.state
        VStack(alignment: .leading, spacing: 0) {
            StepHead(title: "Get verified", body_: "Verified profiles get roughly 3× more enquiries. Your documents are never shown to clients.")

            VStack(spacing: 10) {
                ForEach(kycItems, id: \.1) { key, name, note in
                    let on = s.kycAadhaar && key == .aadhaar || s.kycPan && key == .pan || s.kycSelfie && key == .selfie
                    Button { store.toggleKyc(key) } label: {
                        HStack(spacing: 12) {
                            Text(on ? "✔" : "＋").font(.system(size: 15)).foregroundStyle(on ? FK.lime : FK.text45)
                            VStack(alignment: .leading, spacing: 3) {
                                Text(name).font(.fkCardTitle)
                                Text(note).font(.system(size: 11)).foregroundStyle(FK.text50)
                            }
                            Spacer()
                            Text(on ? "DONE" : "UPLOAD").font(.fkMonoSm).foregroundStyle(on ? FK.lime : FK.text45)
                        }
                        .padding(14)
                    }
                    .foregroundStyle(FK.text)
                    .background(FK.card)
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 14).stroke(on ? FK.lime : FK.line08, lineWidth: 1))
                }
            }.padding(.top, 22)

            HStack {
                VStack(alignment: .leading, spacing: 3) {
                    Text("Bank account for payouts").font(.system(size: 13, weight: .semibold))
                    Text(s.bank ? "HDFC ••4471 · verified" : "Add UPI ID or account number").font(.system(size: 11)).foregroundStyle(FK.text50)
                }
                Spacer()
                Button { store.toggleBank() } label: {
                    Text(s.bank ? "Added" : "Add").font(.system(size: 11.5, weight: .semibold))
                        .foregroundStyle(s.bank ? FK.lime : FK.onLime)
                        .padding(.horizontal, 13).padding(.vertical, 9)
                }
                .background(s.bank ? FK.limeFill : FK.lime)
                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
            }
            .padding(14)
            .background(FK.card)
            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 14).stroke(FK.line08, lineWidth: 1))
            .padding(.top, 16)

            if !s.onbErrorMsg.isEmpty { ErrorNote(text: s.onbErrorMsg) }

            Text("Tap each item to simulate an upload.")
                .font(.system(size: 11.5)).foregroundStyle(FK.text40).padding(.top, 14)
        }
        .padding(.horizontal, 20).padding(.top, 30)
    }
}

private struct StepServices: View {
    @EnvironmentObject var store: AppStore
    var body: some View {
        let s = store.state
        VStack(alignment: .leading, spacing: 0) {
            StepHead(title: "What do you offer?", body_: "Add every service you do. Each one gets listed separately, so you show up in more searches.")

            VStack(spacing: 10) {
                ForEach(Array(s.svcRows.enumerated()), id: \.element.id) { i, r in
                    VStack(alignment: .leading, spacing: 0) {
                        HStack {
                            MonoLabel(text: "SERVICE \(i + 1)")
                            Spacer()
                            Button { store.removeSvcRow(i) } label: {
                                Text("✕").font(.system(size: 13)).foregroundStyle(FK.text40)
                            }
                        }

                        Button {
                            store.updRow(i, cat: (r.cat + 1) % Seed.svcCats.count)
                        } label: {
                            HStack {
                                Text(Seed.svcCats[r.cat]).font(.system(size: 13, weight: .semibold))
                                Spacer()
                                Text("▾").font(.system(size: 10)).foregroundStyle(FK.text40)
                            }
                            .padding(.horizontal, 12).padding(.vertical, 11)
                        }
                        .foregroundStyle(FK.text)
                        .background(FK.nested)
                        .clipShape(RoundedRectangle(cornerRadius: 11, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 11).stroke(FK.line09, lineWidth: 1))
                        .padding(.top, 9)

                        HStack(spacing: 7) {
                            ForEach(Array(Seed.svcTypes.enumerated()), id: \.offset) { ti, t in
                                Chip(title: t.0, on: r.type == ti) { store.updRow(i, type: ti) }
                            }
                        }.padding(.top, 8)

                        HStack(spacing: 9) {
                            Text("₹").font(.system(size: 13, weight: .medium)).foregroundStyle(FK.text50)
                            TextField("", text: Binding(
                                get: { r.amount },
                                set: { store.updRow(i, amount: String($0.filter { $0.isNumber }.prefix(7))) }
                            ), prompt: Text("1500").foregroundStyle(FK.text42))
                                .keyboardType(.numberPad)
                                .font(.system(size: 13.5, weight: .semibold))
                                .foregroundStyle(FK.text)
                            Text(Seed.svcTypes[r.type].1).font(.system(size: 11.5)).foregroundStyle(FK.text45)
                        }
                        .padding(.horizontal, 12).padding(.vertical, 11)
                        .background(FK.nested)
                        .clipShape(RoundedRectangle(cornerRadius: 11, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 11).stroke(FK.line09, lineWidth: 1))
                        .padding(.top, 8)
                    }
                    .padding(13)
                    .background(FK.card)
                    .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 15).stroke(FK.line09, lineWidth: 1))
                }
            }.padding(.top, 20)

            Button { store.addSvcRow() } label: {
                Text("+ Add another service").font(.system(size: 12.5, weight: .semibold)).foregroundStyle(FK.lime)
                    .frame(maxWidth: .infinity).padding(13)
            }
            .overlay(RoundedRectangle(cornerRadius: 13).stroke(FK.limeBd40, style: StrokeStyle(lineWidth: 1, dash: [5, 4])))
            .padding(.top, 11)

            if !s.onbErrorMsg.isEmpty { ErrorNote(text: s.onbErrorMsg) }
        }
        .padding(.horizontal, 20).padding(.top, 30)
    }
}

private struct StepPlan: View {
    @EnvironmentObject var store: AppStore
    var body: some View {
        let s = store.state
        VStack(alignment: .leading, spacing: 0) {
            StepHead(title: "Choose your plan", body_: "Clients pay you directly by UPI or cash — FreelanceKar never touches that money. This plan just keeps your profile listed and searchable.")

            VStack(spacing: 10) {
                ForEach(Array(Seed.plans.enumerated()), id: \.offset) { i, p in
                    Button { store.subscribeAndPublish(i) } label: {
                        VStack(alignment: .leading, spacing: 6) {
                            HStack(alignment: .lastTextBaseline) {
                                Text(p.name).font(.system(size: 15, weight: .semibold))
                                Spacer()
                                Text(p.price).font(.system(size: 15, weight: .semibold)).foregroundStyle(i == s.planIdx ? FK.lime : FK.text)
                            }
                            Text(p.note).font(.system(size: 12)).foregroundStyle(FK.text55).lineSpacing(3)
                        }
                        .padding(15)
                    }
                    .foregroundStyle(FK.text)
                    .background(FK.card)
                    .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 15).stroke(i == s.planIdx ? FK.lime : FK.line08, lineWidth: 1))
                }
            }.padding(.top, 22)

            Text("Billed via Razorpay. Cancel anytime — your profile stays live until the period ends.")
                .font(.system(size: 11.5)).foregroundStyle(FK.text40).padding(.top, 16)
        }
        .padding(.horizontal, 20).padding(.top, 30).padding(.bottom, 26)
    }
}
