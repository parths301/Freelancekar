package com.freelancekar.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.AppState
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.EmptyState
import com.freelancekar.app.ui.components.Stripe
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@Composable
fun ChatsScreen(state: AppState, vm: AppViewModel) {
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(horizontal = 20.dp).padding(top = 18.dp, bottom = 26.dp)) {
        Text("Chats", style = FkType.h1)
        Spacer(Modifier.height(16.dp))

        if (state.threads.isEmpty()) {
            EmptyState(glyph = "💬", body = "No enquiries yet. Message a freelancer from Explore and the thread shows up here.")
        } else {
            Column(verticalArrangement = Arrangement.spacedBy(9.dp)) {
                state.threads.forEach { t ->
                    Row(
                        Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(15.dp))
                            .background(FkColor.card)
                            .border(1.dp, FkColor.line08, RoundedCornerShape(15.dp))
                            .clickable { vm.openThreadPublic(t.id) }
                            .padding(horizontal = 14.dp, vertical = 13.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Stripe(Modifier.size(40.dp).clip(RoundedCornerShape(12.dp)))
                        Spacer(Modifier.width(12.dp))
                        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(3.dp)) {
                            Text(t.name, style = FkType.cardTitle)
                            Text(t.last, style = FkType.meta.copy(color = FkColor.text50), maxLines = 1)
                        }
                        Text(t.ts, style = FkType.monoSm.copy(color = if (t.ts == "now") FkColor.lime else FkColor.text40))
                    }
                }
            }
        }
    }
}
