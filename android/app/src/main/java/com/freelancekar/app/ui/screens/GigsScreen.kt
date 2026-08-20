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
import com.freelancekar.app.data.AppState
import com.freelancekar.app.data.Screen
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.Stripe
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@Composable
fun GigsScreen(state: AppState, vm: AppViewModel) {
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(horizontal = 20.dp).padding(top = 18.dp, bottom = 26.dp)) {
        Text("Gigs", style = FkType.h1)
        Spacer(Modifier.height(6.dp))
        Text("${state.fGigs.size} active · ${state.quotesSent} quotes awaiting reply", style = FkType.meta.copy(color = FkColor.text50))
        Spacer(Modifier.height(16.dp))

        if (state.fGigs.isEmpty()) {
            Column(Modifier.fillMaxWidth().padding(top = 40.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                Text("◫", style = FkType.h2.copy(color = FkColor.text28))
                Spacer(Modifier.height(12.dp))
                Text(
                    "No gigs running. Quote on requests from the dashboard — accepted quotes turn into gigs here.",
                    style = FkType.body.copy(color = FkColor.text45),
                    textAlign = TextAlign.Center,
                )
                Spacer(Modifier.height(16.dp))
                androidx.compose.foundation.layout.Box(
                    Modifier
                        .clip(RoundedCornerShape(11.dp))
                        .background(FkColor.lime)
                        .clickable { vm.go(Screen.FDASH) }
                        .padding(horizontal = 16.dp, vertical = 12.dp),
                ) {
                    Text("See new requests", style = FkType.meta.copy(color = FkColor.onLime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                }
            }
        } else {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                state.fGigs.forEach { g ->
                    val done = g.status == "DELIVERED"
                    Column(
                        Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(15.dp))
                            .background(FkColor.card)
                            .border(1.dp, FkColor.line08, RoundedCornerShape(15.dp))
                            .padding(14.dp),
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Stripe(Modifier.size(36.dp).clip(RoundedCornerShape(11.dp)))
                            Spacer(Modifier.width(11.dp))
                            Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                                Text(g.client, style = FkType.cardTitle)
                                Text(g.service, style = FkType.meta.copy(color = FkColor.text50))
                            }
                            Text(g.amount, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                        }
                        Row(
                            Modifier.fillMaxWidth().padding(top = 11.dp).border(0.dp, FkColor.line07).padding(top = 0.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Text(g.status, style = FkType.monoSm.copy(color = if (done) FkColor.text45 else FkColor.lime))
                            if (done) {
                                Row(
                                    Modifier
                                        .clip(RoundedCornerShape(10.dp))
                                        .border(1.dp, FkColor.line14, RoundedCornerShape(10.dp))
                                        .clickable { vm.markGigDelivered(g.id) }
                                        .padding(horizontal = 13.dp, vertical = 9.dp),
                                ) { Text("Awaiting approval", style = FkType.meta.copy(color = FkColor.text60, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold)) }
                            } else {
                                Row(
                                    Modifier
                                        .clip(RoundedCornerShape(10.dp))
                                        .background(FkColor.lime)
                                        .clickable { vm.markGigDelivered(g.id) }
                                        .padding(horizontal = 13.dp, vertical = 9.dp),
                                ) { Text("Mark delivered", style = FkType.meta.copy(color = FkColor.onLime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold)) }
                            }
                        }
                    }
                }
            }
        }
    }
}
