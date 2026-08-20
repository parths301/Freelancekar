import SwiftUI

struct FKCard<Content: View>: View {
    var borderColor: Color = FK.line08
    @ViewBuilder var content: Content

    var body: some View {
        content
            .padding(14)
            .background(FK.card)
            .clipShape(RoundedRectangle(cornerRadius: FK.rCard, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: FK.rCard).stroke(borderColor, lineWidth: 1))
    }
}

struct MonoLabel: View {
    var text: String
    var body: some View {
        Text(text)
            .font(.fkMonoLabel)
            .tracking(0.7)
            .foregroundStyle(FK.text40)
    }
}

struct SectionTitle<Right: View>: View {
    var title: String
    @ViewBuilder var right: Right

    var body: some View {
        HStack(alignment: .lastTextBaseline) {
            Text(title).font(.fkH3).foregroundStyle(FK.text)
            Spacer()
            right
        }
    }
}
extension SectionTitle where Right == EmptyView {
    init(title: String) { self.title = title; self.right = EmptyView() }
}

/// Diagonal-stripe stand-in for photography. Swap for real imagery.
struct Stripe: View {
    var cornerRadius: CGFloat = 0
    var body: some View {
        StripePattern()
            .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
    }
}

private struct StripePattern: View {
    var body: some View {
        GeometryReader { geo in
            Canvas { ctx, size in
                let stripeWidth: CGFloat = 6
                let bg = Color(hex: 0x17181B)
                let fg = Color(hex: 0x232529)
                ctx.fill(Path(CGRect(origin: .zero, size: size)), with: .color(bg))
                let diag = size.width + size.height
                var x: CGFloat = -diag
                while x < diag {
                    var path = Path()
                    path.move(to: CGPoint(x: x, y: size.height))
                    path.addLine(to: CGPoint(x: x + size.height, y: 0))
                    path.addLine(to: CGPoint(x: x + size.height + stripeWidth, y: 0))
                    path.addLine(to: CGPoint(x: x + stripeWidth, y: size.height))
                    path.closeSubpath()
                    ctx.fill(path, with: .color(fg))
                    x += stripeWidth * 2
                }
            }
        }
    }
}

struct ErrorNote: View {
    var text: String
    var body: some View {
        Text(text)
            .font(.fkMeta)
            .foregroundStyle(FK.alert)
            .padding(.top, 10)
    }
}

struct EmptyState<Extra: View>: View {
    var glyph: String
    var title: String? = nil
    var body_: String
    @ViewBuilder var extra: Extra

    var body: some View {
        VStack(spacing: 0) {
            Text(glyph).font(.system(size: 22)).foregroundStyle(FK.text28)
            if let title {
                Text(title).font(.fkScreenTitle).foregroundStyle(FK.text).padding(.top, 14)
            }
            Text(body_)
                .font(.fkBody)
                .foregroundStyle(FK.text45)
                .multilineTextAlignment(.center)
                .padding(.top, 12)
            extra.padding(.top, 20)
        }
        .padding(.horizontal, 26)
        .padding(.top, 60)
    }
}
extension EmptyState where Extra == EmptyView {
    init(glyph: String, title: String? = nil, body_: String) {
        self.glyph = glyph; self.title = title; self.body_ = body_; self.extra = EmptyView()
    }
}

struct DashedEmpty<Content: View>: View {
    @ViewBuilder var content: Content
    var body: some View {
        content
            .padding(16)
            .background(FK.card)
            .clipShape(RoundedRectangle(cornerRadius: FK.rCard, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: FK.rCard).stroke(FK.limeBd40, style: StrokeStyle(lineWidth: 1, dash: [5, 4])))
    }
}

struct GroupedList<Content: View>: View {
    @ViewBuilder var content: Content
    var body: some View {
        VStack(spacing: 0) { content }
            .background(FK.card)
            .clipShape(RoundedRectangle(cornerRadius: FK.rCard, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: FK.rCard).stroke(FK.line08, lineWidth: 1))
    }
}

struct GroupedRow<Content: View>: View {
    var first: Bool = false
    @ViewBuilder var content: Content
    var body: some View {
        VStack(spacing: 0) {
            if !first { Divider().overlay(FK.line07) }
            HStack { content }
                .padding(.horizontal, 14)
                .padding(.vertical, 13)
        }
    }
}

/// Styled text field matching the web reference's nested-background inputs.
struct FKTextField: View {
    var placeholder: String
    @Binding var text: String
    var keyboard: UIKeyboardType = .default

    var body: some View {
        TextField("", text: $text, prompt: Text(placeholder).foregroundStyle(FK.text42))
            .keyboardType(keyboard)
            .font(.system(size: 14))
            .foregroundStyle(FK.text)
            .padding(.horizontal, 13)
            .padding(.vertical, 12)
            .background(FK.nested)
            .clipShape(RoundedRectangle(cornerRadius: FK.rButton, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: FK.rButton).stroke(FK.line09, lineWidth: 1))
    }
}

struct FKTextArea: View {
    var placeholder: String
    @Binding var text: String
    var minHeight: CGFloat = 64

    var body: some View {
        ZStack(alignment: .topLeading) {
            if text.isEmpty {
                Text(placeholder)
                    .font(.system(size: 13.5))
                    .foregroundStyle(FK.text42)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 20)
            }
            TextEditor(text: $text)
                .font(.system(size: 13.5))
                .foregroundStyle(FK.text)
                .scrollContentBackground(.hidden)
                .padding(.horizontal, 9)
                .padding(.vertical, 12)
                .frame(minHeight: minHeight)
        }
        .background(FK.nested)
        .clipShape(RoundedRectangle(cornerRadius: FK.rButton, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: FK.rButton).stroke(FK.line09, lineWidth: 1))
    }
}
