import SwiftUI

@main
struct FreelanceKarApp: App {
    @StateObject private var store = AppStore()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(store)
                .preferredColorScheme(.dark)
        }
    }
}

/// Top-level container: current screen + persistent chrome (tab bar / composer
/// / action bar) + the six overlay sheets + toast. Mirrors components/App.tsx.
struct RootView: View {
    @EnvironmentObject var store: AppStore

    var body: some View {
        ZStack {
            FKBackground()

            VStack(spacing: 0) {
                Group {
                    switch store.state.screen {
                    case .home: HomeScreen()
                    case .explore: ExploreScreen()
                    case .results: ResultsScreen()
                    case .profile: ProfileScreen()
                    case .chats: ChatsScreen()
                    case .thread: ThreadScreen()
                    case .order: OrderScreen()
                    case .notifs: NotificationsScreen()
                    case .you: YouScreen()
                    case .fonb: OnboardingScreen()
                    case .fdash: DashboardScreen()
                    case .fearn: PaymentsScreen()
                    case .fgigs: GigsScreen()
                    case .fme: FreelancerProfileScreen()
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)

                bottomBar
            }

            HireSheetView()
            CitySheetView()
            FiltersSheetView()
            ReviewSheetView()
            IssueSheetView()
            QuoteSheetView()

            VStack {
                Spacer()
                Toast().padding(.bottom, 96)
            }
        }
        .animation(.easeOut(duration: FK.motionFast), value: store.state.toast)
        .foregroundStyle(FK.text)
        .preferredColorScheme(.dark)
    }

    @ViewBuilder private var bottomBar: some View {
        switch store.state.screen {
        case .thread: ThreadComposer()
        case .profile: ProfileActionBar()
        default: FKTabBar()
        }
    }
}
