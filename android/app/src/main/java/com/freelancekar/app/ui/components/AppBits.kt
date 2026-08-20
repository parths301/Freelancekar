package com.freelancekar.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.AppState
import com.freelancekar.app.data.placeLabel
import com.freelancekar.app.data.unreadCount
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@Composable
fun LocationPill(state: AppState, onClick: () -> Unit, compact: Boolean = false) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .clip(CircleShape)
            .background(FkColor.card)
            .border(1.dp, FkColor.line09, CircleShape)
            .clickable(onClick = onClick)
            .padding(horizontal = if (compact) 12.dp else 13.dp, vertical = if (compact) 7.dp else 9.dp),
    ) {
        Text("◉", color = FkColor.lime, style = FkType.metaXs)
        Spacer(Modifier.width(6.dp))
        Text(placeLabel(state), style = if (compact) FkType.meta else FkType.cardTitle)
        Spacer(Modifier.width(6.dp))
        Text("▾", color = FkColor.text45, style = FkType.metaXs)
    }
}

@Composable
fun BellButton(state: AppState, onClick: () -> Unit, size: Int = 38) {
    val count = unreadCount(state)
    Box(
        modifier = Modifier
            .size(size.dp)
            .clip(CircleShape)
            .background(FkColor.card)
            .border(1.dp, FkColor.line09, CircleShape)
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center,
    ) {
        Text("🔔", fontSize = androidx.compose.ui.unit.TextUnit(14f, androidx.compose.ui.unit.TextUnitType.Sp))
        if (count > 0) {
            Box(
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .offset(x = 2.dp, y = (-2).dp)
                    .clip(CircleShape)
                    .background(FkColor.lime)
                    .padding(horizontal = 4.dp, vertical = 1.dp),
            ) {
                Text(count.toString(), style = FkType.monoSm.copy(color = FkColor.onLime))
            }
        }
    }
}
