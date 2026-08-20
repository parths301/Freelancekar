import SwiftUI

private struct TabDef { var icon: String; var label: String; var screen: Screen }

private let clientTabs: [TabDef] = [
    TabDef(icon: "house", label: "Home", screen: .home),
    TabDef(icon: "safari", label: "Explore", screen: .explore),
    TabDef(icon: "bubble.left", label: "Chats", screen: .chats),
    TabDef(icon: "person", label: "You", screen: .you),
]

private let freelancerTabs: [TabDef] = [
    TabDef(icon: "square.grid.2x2", label: "Dashboard", screen: .fdash),
    TabDef(icon: "briefcase", label: "Gigs", screen: .fgigs),
    TabDef(icon: "bubble.left", label: "Chats", screen: .chats),
    TabDef(icon: "person", label: "Profile", screen: .fme),
]

private let hiddenTabScreens: Set<Screen> = [.profile, .fonb, .thread, .order, .notifs]

struct FKTabBar: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        let s = store.state
        if !hiddenTabScreens.contains(s.screen) {
            let isFreelancer = [Screen.fdash, .fgigs, .fme, .fearn].contains(s.screen) || (s.screen == .chats && s.freelancerMode)
            let tabs = isFreelancer ? freelancerTabs : clientTabs

            HStack(spacing: 0) {
                ForEach(tabs.indices, id: \.self) { i in
                    let tab = tabs[i]
                    let active = s.screen == tab.screen
                    Button {
                        store.go(tab.screen)
                    } label: {
                        VStack(spacing: 4) {
                            Image(systemName: tab.icon).font(.system(size: 19))
                            Text(tab.label).font(.fkTab)
                        }
                        .foregroundStyle(active ? FK.lime : FK.text45)
                        .frame(maxWidth: .infinity)
                    }
                }
            }
            .padding(.horizontal, 18)
            .padding(.top, 10)
            .padding(.bottom, 20)
            .background(FK.bar)
            .overlay(Rectangle().frame(height: 1).foregroundStyle(FK.line07), alignment: .top)
        }
    }
}
