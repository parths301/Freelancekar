import SwiftUI

struct LocationPill: View {
    var compact: Bool = false
    @EnvironmentObject var store: AppStore

    var body: some View {
        Button {
            store.openCity()
        } label: {
            HStack(spacing: compact ? 6 : 7) {
                Text("◉").font(.system(size: 10)).foregroundStyle(FK.lime)
                Text(Selectors.placeLabel(store.state))
                    .font(.system(size: compact ? 12 : 13, weight: compact ? .medium : .semibold))
                    .foregroundStyle(FK.text)
                Text("▾").font(.system(size: 10)).foregroundStyle(FK.text45)
            }
            .padding(.horizontal, compact ? 12 : 13)
            .padding(.vertical, compact ? 7 : 9)
        }
        .background(FK.card)
        .clipShape(Capsule())
        .overlay(Capsule().stroke(FK.line09, lineWidth: 1))
    }
}

struct BellButton: View {
    var size: CGFloat = 38
    @EnvironmentObject var store: AppStore

    var body: some View {
        let count = Selectors.unreadCount(store.state)
        Button {
            store.openNotifs()
        } label: {
            ZStack(alignment: .topTrailing) {
                Circle().fill(FK.card).overlay(Circle().stroke(FK.line09, lineWidth: 1))
                Image(systemName: "bell")
                    .font(.system(size: size >= 38 ? 15 : 14))
                    .foregroundStyle(FK.text)
                if count > 0 {
                    Text("\(count)")
                        .font(.system(size: 9, weight: .semibold, design: .monospaced))
                        .foregroundStyle(FK.onLime)
                        .padding(.horizontal, 4)
                        .padding(.vertical, 2)
                        .background(FK.lime)
                        .clipShape(Capsule())
                        .overlay(Capsule().stroke(FK.bg, lineWidth: 2))
                        .offset(x: 4, y: -4)
                }
            }
        }
        .frame(width: size, height: size)
    }
}

struct BackButton: View {
    var action: () -> Void
    var body: some View {
        Button(action: action) {
            Image(systemName: "chevron.left")
                .font(.system(size: 15, weight: .medium))
                .foregroundStyle(FK.text60)
        }
    }
}

struct StatusText: View {
    var label: String
    var color: Color
    var body: some View {
        Text(label).font(.fkMonoSm).foregroundStyle(color)
    }
}

/// Ambient status-bar spacer — the real build uses the system status bar, this
/// just reserves the same rhythm as the prototype's chrome.
struct FKStatusBar: View {
    var body: some View {
        HStack {
            Text("9:41")
            Spacer()
            Text("5G ▮")
        }
        .font(.system(size: 11, weight: .medium, design: .monospaced))
        .foregroundStyle(FK.text50)
        .padding(.horizontal, 22)
        .padding(.top, 6)
    }
}

/// Screen enter animation wrapper.
struct ScreenShell<Content: View>: View {
    @ViewBuilder var content: Content
    @State private var appear = false
    var body: some View {
        content
            .opacity(appear ? 1 : 0)
            .offset(y: appear ? 0 : 10)
            .onAppear { withAnimation(.easeOut(duration: FK.motion)) { appear = true } }
    }
}

struct Toast: View {
    @EnvironmentObject var store: AppStore
    var body: some View {
        if !store.state.toast.isEmpty {
            Text(store.state.toast)
                .font(.system(size: 12.5, weight: .medium))
                .foregroundStyle(FK.text)
                .padding(.horizontal, 14)
                .padding(.vertical, 12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(FK.toastBg)
                .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
                .shadow(color: .black.opacity(0.4), radius: 15, y: 10)
                .padding(.horizontal, 20)
                .transition(.opacity.combined(with: .move(edge: .bottom)))
        }
    }
}

/// Bottom sheet: scrim + sheet surface. Mirrors shell.tsx's Sheet.
struct FKSheet<Content: View>: View {
    var isOpen: Bool
    var onClose: () -> Void
    var maxHeightFraction: CGFloat = 0.86
    @ViewBuilder var content: Content

    var body: some View {
        GeometryReader { geo in
            if isOpen {
                ZStack(alignment: .bottom) {
                    FK.scrim
                        .ignoresSafeArea()
                        .onTapGesture { onClose() }
                        .transition(.opacity)

                    ScrollView {
                        content
                    }
                    .frame(maxHeight: geo.size.height * maxHeightFraction)
                    .background(FK.sheet)
                    .clipShape(RoundedCorner(radius: FK.rSheet, corners: [.topLeft, .topRight]))
                    .overlay(
                        RoundedCorner(radius: FK.rSheet, corners: [.topLeft, .topRight])
                            .stroke(FK.line10, lineWidth: 1)
                    )
                    .transition(.move(edge: .bottom))
                }
                .animation(.timingCurve(0.2, 0.8, 0.2, 1, duration: FK.motionSheet), value: isOpen)
            }
        }
    }
}

struct SheetHead: View {
    var title: String
    var onClose: () -> Void
    var onBack: (() -> Void)? = nil

    var body: some View {
        HStack(spacing: 12) {
            if let onBack {
                Button(action: onBack) {
                    Image(systemName: "chevron.left").font(.system(size: 15)).foregroundStyle(FK.text60)
                }
            }
            Text(title).font(.fkSheetTitle).foregroundStyle(FK.text)
            Spacer()
            Button(action: onClose) {
                Image(systemName: "xmark").font(.system(size: 14)).foregroundStyle(FK.text45)
            }
        }
        .padding(.horizontal, 20)
        .padding(.top, 18)
    }
}

struct RoundedCorner: Shape {
    var radius: CGFloat = .infinity
    var corners: UIRectCorner = .allCorners

    func path(in rect: CGRect) -> Path {
        Path(UIBezierPath(roundedRect: rect, byRoundingCorners: corners, cornerRadii: CGSize(width: radius, height: radius)).cgPath)
    }
}

/// Ambient dot grid, behind everything, never interactive. Simplified static
/// version of the web reference's animated Background.
struct FKBackground: View {
    var body: some View {
        FK.bg.ignoresSafeArea()
    }
}
