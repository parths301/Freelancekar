package com.freelancekar.app.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.freelancekar.app.data.AppState
import com.freelancekar.app.data.Screen
import com.freelancekar.app.ui.screens.*
import com.freelancekar.app.ui.sheets.*
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType
import com.freelancekar.app.ui.theme.FreelanceKarTheme

private val CLIENT_TABS: List<Triple<String, String, Screen>> = listOf(
    Triple("⌂", "Home", Screen.HOME),
    Triple("⌕", "Explore", Screen.EXPLORE),
    Triple("💬", "Chats", Screen.CHATS),
    Triple("◉", "You", Screen.YOU),
)

private val FREELANCER_TABS: List<Triple<String, String, Screen>> = listOf(
    Triple("▦", "Dashboard", Screen.FDASH),
    Triple("◫", "Gigs", Screen.FGIGS),
    Triple("💬", "Chats", Screen.CHATS),
    Triple("◉", "Profile", Screen.FME),
)

private val HIDDEN_TAB_SCREENS = setOf(Screen.PROFILE, Screen.FONB, Screen.THREAD, Screen.ORDER, Screen.NOTIFS)

@Composable
fun FreelanceKarApp() {
    val vm: AppViewModel = viewModel()
    val state by vm.state.collectAsStateWithLifecycle()

    FreelanceKarTheme {
        Box(Modifier.fillMaxSize().background(FkColor.bg)) {
            Column(Modifier.fillMaxSize()) {
                Box(Modifier.weight(1f)) {
                    CurrentScreen(state, vm)
                }
                BottomBar(state, vm)
            }

            HireSheet(state, vm)
            CitySheet(state, vm)
            FiltersSheet(state, vm)
            ReviewSheet(state, vm)
            IssueSheet(state, vm)
            QuoteSheet(state, vm)

            ToastHost(state)
        }
    }
}

@Composable
private fun CurrentScreen(state: AppState, vm: AppViewModel) {
    when (state.screen) {
        Screen.HOME -> HomeScreen(state, vm)
        Screen.EXPLORE -> ExploreScreen(state, vm)
        Screen.RESULTS -> ResultsScreen(state, vm)
        Screen.PROFILE -> ProfileScreen(state, vm)
        Screen.CHATS -> ChatsScreen(state, vm)
        Screen.THREAD -> ThreadScreen(state, vm)
        Screen.ORDER -> OrderScreen(state, vm)
        Screen.NOTIFS -> NotificationsScreen(state, vm)
        Screen.YOU -> YouScreen(state, vm)
        Screen.FONB -> OnboardingScreen(state, vm)
        Screen.FDASH -> DashboardScreen(state, vm)
        Screen.FEARN -> PaymentsScreen(state, vm)
        Screen.FGIGS -> GigsScreen(state, vm)
        Screen.FME -> FreelancerProfileScreen(state, vm)
    }
}

/** The bottom bar swaps by screen: composer in a thread, action bar on a profile. */
@Composable
private fun BottomBar(state: AppState, vm: AppViewModel) {
    when (state.screen) {
        Screen.THREAD -> ThreadComposer(state, vm)
        Screen.PROFILE -> ProfileActionBar(state, vm)
        else -> TabBar(state, vm)
    }
}

@Composable
private fun TabBar(state: AppState, vm: AppViewModel) {
    if (state.screen in HIDDEN_TAB_SCREENS) return

    val freelancer = state.screen in setOf(Screen.FDASH, Screen.FGIGS, Screen.FME, Screen.FEARN) ||
        (state.screen == Screen.CHATS && state.freelancerMode)
    val tabs = if (freelancer) FREELANCER_TABS else CLIENT_TABS

    Row(
        Modifier
            .fillMaxWidth()
            .background(FkColor.bar)
            .border(1.dp, FkColor.line07)
            .padding(horizontal = 18.dp)
            .padding(top = 10.dp, bottom = 20.dp),
        horizontalArrangement = Arrangement.SpaceEvenly,
    ) {
        tabs.forEach { (icon, label, screen) ->
            val active = state.screen == screen
            Column(
                Modifier.weight(1f).clickable { vm.go(screen) },
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(4.dp),
            ) {
                Text(icon, style = FkType.body.copy(color = if (active) FkColor.lime else FkColor.text45))
                Text(label, style = FkType.tab.copy(color = if (active) FkColor.lime else FkColor.text45))
            }
        }
    }
}

@Composable
private fun BoxScope.ToastHost(state: AppState) {
    if (state.toast.isEmpty()) return
    Box(
        Modifier
            .align(Alignment.BottomCenter)
            .padding(bottom = 96.dp, start = 20.dp, end = 20.dp)
            .fillMaxWidth()
            .clip(RoundedCornerShape(13.dp))
            .background(FkColor.toast)
            .padding(horizontal = 14.dp, vertical = 12.dp),
    ) {
        Text(state.toast, style = FkType.bodySm.copy(color = FkColor.text, fontWeight = androidx.compose.ui.text.font.FontWeight.Medium))
    }
}
