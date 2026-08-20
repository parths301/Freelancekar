import SwiftUI

/// One lime primary action per view — full width, radius 13.
struct PrimaryButton: View {
    var title: String
    var disabled: Bool = false
    var action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.fkH4)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
        }
        .foregroundStyle(FK.onLime)
        .background(FK.lime)
        .clipShape(RoundedRectangle(cornerRadius: FK.rButton, style: .continuous))
        .opacity(disabled ? 0.7 : 1)
        .disabled(disabled)
    }
}

struct OutlineButton: View {
    var title: String
    var action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 13, weight: .medium))
                .frame(maxWidth: .infinity)
                .padding(.vertical, 13)
        }
        .foregroundStyle(FK.text)
        .background(Color.clear)
        .overlay(RoundedRectangle(cornerRadius: FK.rButton).stroke(FK.line14, lineWidth: 1))
    }
}

/// Small inline lime button (radius 10) used inside cards and rows.
struct InlineButton: View {
    var title: String
    var expand: Bool = false
    var action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 12, weight: .semibold))
                .frame(maxWidth: expand ? .infinity : nil)
                .padding(.horizontal, expand ? 0 : 15)
                .padding(.vertical, 10)
        }
        .foregroundStyle(FK.onLime)
        .background(FK.lime)
        .clipShape(RoundedRectangle(cornerRadius: FK.rInline, style: .continuous))
    }
}

struct InlineOutlineButton: View {
    var title: String
    var expand: Bool = false
    var action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 12, weight: .medium))
                .frame(maxWidth: expand ? .infinity : nil)
                .padding(.horizontal, 13)
                .padding(.vertical, 9)
        }
        .foregroundStyle(FK.text)
        .overlay(RoundedRectangle(cornerRadius: FK.rInline).stroke(FK.line14, lineWidth: 1))
    }
}

struct Chip: View {
    var title: String
    var on: Bool
    var action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 12, weight: .semibold))
                .padding(.horizontal, 13)
                .padding(.vertical, 8)
        }
        .foregroundStyle(on ? FK.onLime : Color(hex: 0xF2F2F0, opacity: 0.75))
        .background(on ? FK.lime : FK.card)
        .clipShape(Capsule())
        .overlay(Capsule().stroke(on ? FK.lime : FK.line09, lineWidth: 1))
    }
}
