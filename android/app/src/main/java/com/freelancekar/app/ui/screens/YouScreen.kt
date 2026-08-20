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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.*
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.Stripe
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@Composable
fun YouScreen(state: AppState, vm: AppViewModel) {
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(horizontal = 20.dp).padding(top = 18.dp, bottom = 26.dp)) {
        Text("You", style = FkType.h1)
        Spacer(Modifier.height(18.dp))

        Row(verticalAlignment = Alignment.CenterVertically) {
            Stripe(Modifier.size(56.dp).clip(RoundedCornerShape(16.dp)).border(1.dp, FkColor.line09, RoundedCornerShape(16.dp)))
            Spacer(Modifier.width(13.dp))
            Column(verticalArrangement = Arrangement.spacedBy(3.dp)) {
                Text("Café Mitti", style = FkType.screenTitle)
                Text("Client · ${cityOf(state)}", style = FkType.meta.copy(color = FkColor.text50))
            }
        }

        Spacer(Modifier.height(20.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            YouStat(state.bookings.size.toString(), "bookings", Modifier.weight(1f))
            YouStat(state.saved.size.toString(), "saved", Modifier.weight(1f))
            YouStat(toPayTotal(state), "to pay", Modifier.weight(1f))
        }

        Spacer(Modifier.height(20.dp))
        if (state.bookings.isEmpty()) {
            Column(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(15.dp))
                    .background(FkColor.card)
                    .border(1.dp, FkColor.line14, RoundedCornerShape(15.dp))
                    .padding(22.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                Text("No bookings yet. Hire someone and the order lives here.", style = FkType.bodySm.copy(color = FkColor.text45), textAlign = TextAlign.Center)
                Spacer(Modifier.height(14.dp))
                Box(
                    Modifier
                        .clip(RoundedCornerShape(11.dp))
                        .background(FkColor.lime)
                        .clickable { vm.go(Screen.EXPLORE) }
                        .padding(horizontal = 15.dp, vertical = 11.dp),
                ) {
                    Text("Find a freelancer", style = FkType.meta.copy(color = FkColor.onLime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                }
            }
        } else {
            Column(verticalArrangement = Arrangement.spacedBy(9.dp)) {
                state.bookings.forEach { b ->
                    Column(
                        Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(15.dp))
                            .background(FkColor.card)
                            .border(1.dp, FkColor.line08, RoundedCornerShape(15.dp))
                            .clickable { vm.openOrderPublic(b.id) }
                            .padding(horizontal = 14.dp, vertical = 13.dp),
                    ) {
                        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(b.name, style = FkType.cardTitle)
                            Text(b.amount, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                        }
                        Spacer(Modifier.height(4.dp))
                        Text(b.service, style = FkType.meta.copy(color = FkColor.text50))
                        Spacer(Modifier.height(10.dp))
                        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(
                                BOOKING_STATUS_LABEL[b.status] ?: "",
                                style = FkType.monoSm.copy(color = if (b.status == BookingStatus.APPROVED) FkColor.text45 else FkColor.lime),
                            )
                            Text(
                                if (b.status == BookingStatus.DELIVERED) "Approve →" else "View →",
                                style = FkType.meta.copy(color = FkColor.lime, fontWeight = androidx.compose.ui.text.font.FontWeight.Medium),
                            )
                        }
                    }
                }
            }
        }

        Spacer(Modifier.height(20.dp))
        Column(
            Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(15.dp))
                .background(FkColor.card)
                .border(1.dp, FkColor.line08, RoundedCornerShape(15.dp)),
        ) {
            Row(
                Modifier
                    .fillMaxWidth()
                    .border(0.dp, FkColor.line07)
                    .clickable { vm.startFreelancer() }
                    .padding(14.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text("Switch to freelancer mode", style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.Medium))
                Text("→", style = FkType.meta.copy(color = FkColor.lime))
            }
            Box(Modifier.fillMaxWidth().height(1.dp).background(FkColor.line07))
            Text(
                "Payment methods",
                style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.Medium, color = FkColor.text.copy(alpha = 0.75f)),
                modifier = Modifier.fillMaxWidth().padding(14.dp),
            )
            Box(Modifier.fillMaxWidth().height(1.dp).background(FkColor.line07))
            Row(
                Modifier
                    .fillMaxWidth()
                    .clickable { vm.openHelp() }
                    .padding(14.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text("Help & disputes", style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.Medium))
                Text("→", style = FkType.meta.copy(color = FkColor.lime))
            }
        }
    }
}

@Composable
private fun YouStat(value: String, label: String, modifier: Modifier = Modifier) {
    Column(
        modifier
            .clip(RoundedCornerShape(14.dp))
            .background(FkColor.card)
            .border(1.dp, FkColor.line08, RoundedCornerShape(14.dp))
            .padding(horizontal = 6.dp, vertical = 13.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(value, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, fontSize = androidx.compose.ui.unit.TextUnit(16f, androidx.compose.ui.unit.TextUnitType.Sp)))
        Spacer(Modifier.height(3.dp))
        Text(label, style = FkType.metaXs.copy(color = FkColor.text45))
    }
}
