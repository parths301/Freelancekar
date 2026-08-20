package com.freelancekar.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.AppState
import com.freelancekar.app.data.unreadCount
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.BackButton
import com.freelancekar.app.ui.components.EmptyState
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@Composable
fun NotificationsScreen(state: AppState, vm: AppViewModel) {
    val unread = unreadCount(state)

    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(horizontal = 20.dp).padding(top = 16.dp, bottom = 26.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            BackButton { vm.closeNotifs() }
            Spacer(Modifier.width(8.dp))
            Text("Notifications", style = FkType.h1sm)
            if (unread > 0) {
                Spacer(Modifier.weight(1f))
                Text(
                    "Mark all read",
                    style = FkType.meta.copy(color = FkColor.lime, fontWeight = androidx.compose.ui.text.font.FontWeight.Medium),
                    modifier = Modifier.clickable { vm.markAllRead() },
                )
            }
        }

        if (state.notifs.isEmpty()) {
            EmptyState(glyph = "🔔", body = "Nothing yet. Quotes, payment updates and messages show up here.")
        } else {
            Spacer(Modifier.height(18.dp))
            Column(verticalArrangement = Arrangement.spacedBy(9.dp)) {
                state.notifs.forEach { n ->
                    Row(
                        Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(15.dp))
                            .background(if (n.unread) FkColor.notifUnread else FkColor.notifRead)
                            .border(1.dp, if (n.unread) FkColor.limeBd28 else FkColor.line07, RoundedCornerShape(15.dp))
                            .clickable { vm.openNotif(n.id) }
                            .padding(horizontal = 14.dp, vertical = 13.dp),
                        verticalAlignment = Alignment.Top,
                    ) {
                        Box(
                            Modifier
                                .padding(top = 5.dp)
                                .size(7.dp)
                                .clip(CircleShape)
                                .background(if (n.unread) FkColor.lime else FkColor.text20),
                        )
                        Spacer(Modifier.width(11.dp))
                        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(3.dp)) {
                            Text(n.title, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                            Text(n.body, style = FkType.meta.copy(color = FkColor.text55))
                            if (n.target != null) {
                                Text(
                                    if (n.target.type == "order") "View order →" else "Open chat →",
                                    style = FkType.metaXs.copy(color = FkColor.lime, fontWeight = androidx.compose.ui.text.font.FontWeight.Medium),
                                )
                            }
                        }
                        Text(n.ts, style = FkType.monoSm.copy(color = FkColor.text35))
                    }
                }
            }
        }
    }
}
