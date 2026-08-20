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
import com.freelancekar.app.data.*
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.BellButton
import com.freelancekar.app.ui.components.InlineButton
import com.freelancekar.app.ui.components.InlineOutlineButton
import com.freelancekar.app.ui.components.SectionTitle
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@Composable
fun DashboardScreen(state: AppState, vm: AppViewModel) {
    val city = CITIES[state.fCityIdx]
    val first = state.fName.trim().split(" ").firstOrNull().takeUnless { it.isNullOrEmpty() } ?: "there"
    val totals = paymentTotals(state)
    val strength = profileStrength(state)

    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        Row(
            Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(top = 18.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                Text("Good morning,", style = FkType.meta.copy(color = FkColor.text50))
                Text(first, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, fontSize = androidx.compose.ui.unit.TextUnit(19f, androidx.compose.ui.unit.TextUnitType.Sp)))
            }
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(9.dp)) {
                BellButton(state, { vm.openNotifs() }, size = 34)
                Row(
                    Modifier
                        .clip(CircleShape)
                        .background(FkColor.card)
                        .border(1.dp, FkColor.line09, CircleShape)
                        .clickable { vm.toggleAvailable() }
                        .padding(horizontal = 12.dp, vertical = 7.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Box(Modifier.size(7.dp).clip(CircleShape).background(if (state.available) FkColor.lime else FkColor.text35))
                    Spacer(Modifier.width(8.dp))
                    Text(if (state.available) "Available" else "Not taking work", style = FkType.meta.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.Medium))
                }
            }
        }

        if (state.kycRejected && state.onboarded) {
            Column(Modifier.padding(horizontal = 20.dp).padding(top = 18.dp)) {
                Row(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(FkColor.alert10)
                        .border(1.dp, FkColor.alertBd40, RoundedCornerShape(16.dp))
                        .padding(14.dp),
                ) {
                    Text("!", style = FkType.body.copy(color = FkColor.alert))
                    Spacer(Modifier.width(11.dp))
                    Column(verticalArrangement = Arrangement.spacedBy(3.dp)) {
                        Text("Verification incomplete", style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, color = FkColor.alert))
                        Text("Your selfie is missing, so your profile shows as unverified. Verified freelancers get ~3× more enquiries.", style = FkType.meta.copy(color = FkColor.text60))
                        Spacer(Modifier.height(4.dp))
                        Box(
                            Modifier
                                .clip(RoundedCornerShape(9.dp))
                                .background(FkColor.alert)
                                .clickable { vm.fixKyc() }
                                .padding(horizontal = 12.dp, vertical = 8.dp),
                        ) {
                            Text("Finish verification", style = FkType.meta.copy(color = FkColor.onAlert, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                        }
                    }
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 20.dp)) {
            Column(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(20.dp))
                    .background(FkColor.lime)
                    .clickable { vm.go(Screen.FEARN) }
                    .padding(18.dp),
            ) {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("EARNINGS · AUGUST", style = FkType.mono.copy(color = FkColor.onLime.copy(alpha = 0.65f)))
                    Text("All payments →", style = FkType.meta.copy(color = FkColor.onLime.copy(alpha = 0.7f), fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                }
                Spacer(Modifier.height(8.dp))
                Text(money(totals.payTotal), style = FkType.big.copy(color = FkColor.onLime))
                Row(
                    Modifier.fillMaxWidth().padding(top = 12.dp).border(0.dp, FkColor.onLimeDivider).padding(top = 12.dp),
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                ) {
                    Figure(money(totals.payDue), "pending pay")
                    Figure(money(totals.payGot), "received")
                    Figure("+22%", "vs July")
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 18.dp)) {
            Column(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(FkColor.card)
                    .border(1.dp, FkColor.line08, RoundedCornerShape(16.dp))
                    .padding(14.dp),
            ) {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Profile strength", style = FkType.cardTitle)
                    Text("$strength%", style = FkType.mono.copy(color = FkColor.lime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                }
                Spacer(Modifier.height(10.dp))
                Box(Modifier.fillMaxWidth().height(5.dp).clip(RoundedCornerShape(3.dp)).background(FkColor.track)) {
                    Box(Modifier.fillMaxHeight().fillMaxWidth(strength / 100f).background(FkColor.lime))
                }
                Spacer(Modifier.height(10.dp))
                Text(strengthNote(state), style = FkType.meta.copy(color = FkColor.text50))
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 22.dp)) {
            SectionTitle(
                "New requests",
                right = {
                    Box(Modifier.clip(RoundedCornerShape(6.dp)).background(FkColor.lime).padding(horizontal = 7.dp, vertical = 3.dp)) {
                        Text("${state.reqs.size} NEW", style = FkType.mono.copy(color = FkColor.onLime))
                    }
                },
            )
            Spacer(Modifier.height(11.dp))
            if (state.reqs.isEmpty()) {
                Box(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(15.dp))
                        .background(FkColor.card)
                        .border(1.dp, FkColor.line14, RoundedCornerShape(15.dp))
                        .padding(22.dp),
                ) {
                    Text(
                        "All caught up. New jobs matching your services in $city land here.",
                        style = FkType.bodySm.copy(color = FkColor.text45),
                        modifier = Modifier.fillMaxWidth(),
                        textAlign = androidx.compose.ui.text.style.TextAlign.Center,
                    )
                }
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(9.dp)) {
                    state.reqs.forEach { r ->
                        Column(
                            Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(15.dp))
                                .background(FkColor.card)
                                .border(1.dp, FkColor.line08, RoundedCornerShape(15.dp))
                                .padding(horizontal = 14.dp, vertical = 13.dp),
                        ) {
                            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                                Text(r.title, style = FkType.cardTitle)
                                Text(r.budget, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                            }
                            Spacer(Modifier.height(4.dp))
                            Text(r.meta, style = FkType.meta.copy(color = FkColor.text50))
                            Spacer(Modifier.height(11.dp))
                            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                InlineOutlineButton({ vm.passRequest(r.id) }, text = "Pass", modifier = Modifier.weight(1f))
                                InlineButton({ vm.openQuote(r.id) }, text = "Send quote", modifier = Modifier.weight(1f))
                            }
                        }
                    }
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 22.dp, bottom = 26.dp)) {
            Text("Your services", style = FkType.h3)
            Spacer(Modifier.height(11.dp))
            Column(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(15.dp))
                    .background(FkColor.card)
                    .border(1.dp, FkColor.line08, RoundedCornerShape(15.dp)),
            ) {
                myServices(state).forEach { svc ->
                    Row(
                        Modifier.fillMaxWidth().border(0.dp, FkColor.line07).padding(horizontal = 14.dp, vertical = 13.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                            Text(svc.name, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                            Text(svc.terms, style = FkType.meta.copy(color = FkColor.text50))
                        }
                        Text(svc.price, style = FkType.bodySm.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                    }
                }
                Text(
                    "+ Add a service",
                    style = FkType.bodySm.copy(color = FkColor.lime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold),
                    modifier = Modifier.fillMaxWidth().clickable { vm.addMoreServices() }.padding(horizontal = 14.dp, vertical = 13.dp),
                )
            }
        }
    }
}

@Composable
private fun Figure(value: String, label: String) {
    Column {
        Text(value, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, fontSize = androidx.compose.ui.unit.TextUnit(14f, androidx.compose.ui.unit.TextUnitType.Sp), color = FkColor.onLime))
        Text(label, style = FkType.metaXs.copy(color = FkColor.onLime.copy(alpha = 0.65f)))
    }
}
