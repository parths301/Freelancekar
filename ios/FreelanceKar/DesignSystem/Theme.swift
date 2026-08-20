import SwiftUI

/// FreelanceKar design tokens, pulled 1:1 from src/app/globals.css.
/// Do not substitute stock iOS system colors — every color here maps to a
/// `--fk-*` CSS custom property in the web reference.
enum FK {

    // MARK: Colors

    static let bg = Color(hex: 0x0B0B0C)
    static let bar = Color(hex: 0x0F0F11)
    static let sheet = Color(hex: 0x111113)
    static let card = Color(hex: 0x141416)
    static let nested = Color(hex: 0x18181B)
    static let notifUnread = Color(hex: 0x17181B)
    static let notifRead = Color(hex: 0x131315)
    static let toastBg = Color(hex: 0x1E1F23)
    static let track = Color(hex: 0x1B1C1F)
    static let skeletonLg = Color(hex: 0x1D1E22)
    static let skeletonSm = Color(hex: 0x191A1E)

    static let lime = Color(hex: 0xCDF564)
    static let limeHover = Color(hex: 0xB9E442)
    static let limeFill = Color(hex: 0xCDF564, opacity: 0.16)
    static let limeBadge = Color(hex: 0xCDF564, opacity: 0.14)
    static let limeBd = Color(hex: 0xCDF564, opacity: 0.5)
    static let limeBd45 = Color(hex: 0xCDF564, opacity: 0.45)
    static let limeBd40 = Color(hex: 0xCDF564, opacity: 0.4)
    static let limeBd35 = Color(hex: 0xCDF564, opacity: 0.35)
    static let limeBd28 = Color(hex: 0xCDF564, opacity: 0.28)

    static let amber = Color(hex: 0xF5B851)
    static let alert = Color(hex: 0xF5865B)
    static let onAlert = Color(hex: 0x160D09)
    static let alert08 = Color(hex: 0xF5865B, opacity: 0.08)
    static let alert10 = Color(hex: 0xF5865B, opacity: 0.10)
    static let alert14 = Color(hex: 0xF5865B, opacity: 0.14)
    static let alertBd35 = Color(hex: 0xF5865B, opacity: 0.35)
    static let alertBd40 = Color(hex: 0xF5865B, opacity: 0.40)
    static let alertBd50 = Color(hex: 0xF5865B, opacity: 0.50)

    static let text = Color(hex: 0xF2F2F0)
    static let text60 = Color(hex: 0xF2F2F0, opacity: 0.6)
    static let text55 = Color(hex: 0xF2F2F0, opacity: 0.55)
    static let text50 = Color(hex: 0xF2F2F0, opacity: 0.5)
    static let text45 = Color(hex: 0xF2F2F0, opacity: 0.45)
    static let text42 = Color(hex: 0xF2F2F0, opacity: 0.42)
    static let text40 = Color(hex: 0xF2F2F0, opacity: 0.4)
    static let text35 = Color(hex: 0xF2F2F0, opacity: 0.35)
    static let text28 = Color(hex: 0xF2F2F0, opacity: 0.28)
    static let text22 = Color(hex: 0xF2F2F0, opacity: 0.22)
    static let text20 = Color(hex: 0xF2F2F0, opacity: 0.2)
    static let onLime = Color(hex: 0x0B0B0C)
    static let onLimeDivider = Color(hex: 0x0B0B0C, opacity: 0.16)

    static let line07 = Color.white.opacity(0.07)
    static let line08 = Color.white.opacity(0.08)
    static let line09 = Color.white.opacity(0.09)
    static let line10 = Color.white.opacity(0.10)
    static let line12 = Color.white.opacity(0.12)
    static let line14 = Color.white.opacity(0.14)
    static let line16 = Color.white.opacity(0.16)
    static let line18 = Color.white.opacity(0.18)

    static let scrim = Color(hex: 0x040405, opacity: 0.62)

    // MARK: Radii

    static let rSheet: CGFloat = 26
    static let rCard: CGFloat = 15
    static let rCardLg: CGFloat = 18
    static let rButton: CGFloat = 13
    static let rInline: CGFloat = 10
    static let rChip: CGFloat = 999

    // MARK: Motion

    static let motionFast: Double = 0.22
    static let motion: Double = 0.28
    static let motionSheet: Double = 0.30
}

extension Color {
    init(hex: UInt32, opacity: Double = 1) {
        let r = Double((hex >> 16) & 0xFF) / 255
        let g = Double((hex >> 8) & 0xFF) / 255
        let b = Double(hex & 0xFF) / 255
        self.init(.sRGB, red: r, green: g, blue: b, opacity: opacity)
    }
}

/// Type scale named after the role in the handoff's typography table
/// (t-h1, t-body, t-mono-label, etc. in globals.css).
extension Font {
    static let fkOnbH1 = Font.system(size: 26, weight: .semibold)
    static let fkH1 = Font.system(size: 24, weight: .semibold)
    static let fkHero = Font.system(size: 25, weight: .semibold)
    static let fkH2 = Font.system(size: 22, weight: .semibold)
    static let fkH1Sm = Font.system(size: 21, weight: .semibold)
    static let fkSheetTitle = Font.system(size: 17, weight: .semibold)
    static let fkScreenTitle = Font.system(size: 16, weight: .semibold)
    static let fkH3 = Font.system(size: 15, weight: .semibold)
    static let fkH4 = Font.system(size: 14, weight: .semibold)
    static let fkCardTitle = Font.system(size: 13.5, weight: .semibold)
    static let fkBody = Font.system(size: 13, weight: .regular)
    static let fkBodySm = Font.system(size: 12.5, weight: .regular)
    static let fkMeta = Font.system(size: 11.5, weight: .regular)
    static let fkMetaXs = Font.system(size: 10.5, weight: .regular)
    static let fkTab = Font.system(size: 10.5, weight: .medium)
    static let fkBig = Font.system(size: 34, weight: .semibold)
    static let fkQuote = Font.system(size: 24, weight: .semibold)
    static let fkMonoLabel = Font.system(size: 10, weight: .medium, design: .monospaced)
    static let fkMono = Font.system(size: 11, weight: .medium, design: .monospaced)
    static let fkMonoSm = Font.system(size: 10, weight: .medium, design: .monospaced)
    static let fkOtp = Font.system(size: 18, weight: .semibold, design: .monospaced)
}
