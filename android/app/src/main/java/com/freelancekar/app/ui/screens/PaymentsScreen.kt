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
import com.freelancekar.app.ui.components.BackButton
import com.freelancekar.app.ui.components.InlineButton
import com.freelancekar.app.ui.components.InlineOutlineButton
import com.freelancekar.app.ui.components.SectionTitle
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@Composable
fun PaymentsScreen(state: AppState, vm: AppViewModel) {
    val totals = paymentTotals(state)

    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        Row(Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(top = 16.dp), verticalAlignment = Alignment.CenterVertically) {
            BackButton { vm.go(Screen.FDASH) }
            Spacer(Modifier.width(8.dp))
            Text("Payments", style = FkType.screenTitle)
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 18.dp)) {
            Column(
                Modifier.fillMaxWidth().clip(RoundedCornerShape(20.dp)).background(FkColor.lime).padding(18.dp),
            ) {
                Text("COLLECTED · AUGUST", style = FkType.mono.copy(color = FkColor.onLime.copy(alpha = 0.65f)))
                Spacer(Modifier.height(8.dp))
                Text(money(totals.payGot), style = FkType.big.copy(color = FkColor.onLime))
                Row(
                    Modifier.fillMaxWidth().padding(top = 12.dp).border(0.dp, FkColor.onLimeDivider).padding(top = 12.dp),
                    horizontalArrangement = Arrangement.spacedBy(18.dp),
                ) {
                    PayFigure(money(totals.payDue), "still to collect")
                    PayFigure(money(totals.payTotal), "billed this month")
                    PayFigure("₹0", "platform cut")
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 22.dp)) {
            SectionTitle("To collect", right = { Text("PAID TO YOU DIRECTLY", style = FkType.monoSm.copy(color = FkColor.text40)) })
            Spacer(Modifier.height(11.dp))
            if (totals.due.isEmpty()) {
                Box(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(15.dp))
                        .background(FkColor.card)
                        .border(1.dp, FkColor.line14, RoundedCornerShape(15.dp))
                        .padding(20.dp),
                ) {
                    Text(
                        "Nothing outstanding. Every client has paid up.",
                        style = FkType.bodySm.copy(color = FkColor.text45),
                        modifier = Modifier.fillMaxWidth(),
                        textAlign = TextAlign.Center,
                    )
                }
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(9.dp)) {
                    totals.due.forEach { p ->
                        Column(
                            Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(15.dp))
                                .background(FkColor.card)
                                .border(1.dp, FkColor.line08, RoundedCornerShape(15.dp))
                                .padding(horizontal = 14.dp, vertical = 13.dp),
                        ) {
                            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                                Text(p.client, style = FkType.cardTitle)
                                Text(money(p.amount), style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                            }
                            Spacer(Modifier.height(4.dp))
                            Text("${p.service} · ${p.whenText}", style = FkType.meta.copy(color = FkColor.text50))
                            Spacer(Modifier.height(11.dp))
                            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                InlineOutlineButton({ vm.remindPayment(p.client) }, text = "Remind", modifier = Modifier.weight(1f))
                                InlineButton({ vm.markPaymentReceived(p.id) }, text = "Mark received", modifier = Modifier.weight(1.3f))
                            }
                        }
                    }
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 22.dp)) {
            Text("Received", style = FkType.h3)
            Spacer(Modifier.height(11.dp))
            Column(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(15.dp))
                    .background(FkColor.card)
                    .border(1.dp, FkColor.line08, RoundedCornerShape(15.dp)),
            ) {
                totals.got.forEach { p ->
                    Row(
                        Modifier.fillMaxWidth().border(0.dp, FkColor.line07).padding(horizontal = 14.dp, vertical = 13.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                            Text(p.client, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                            Text("${p.service} · ${p.via}", style = FkType.meta.copy(color = FkColor.text50))
                        }
                        Text(money(p.amount), style = FkType.bodySm.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                    }
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 22.dp, bottom = 26.dp)) {
            Text("Your plan", style = FkType.h3)
            Spacer(Modifier.height(11.dp))
            Column(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(15.dp))
                    .background(FkColor.card)
                    .border(1.dp, FkColor.line08, RoundedCornerShape(15.dp))
                    .padding(14.dp),
            ) {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Column(verticalArrangement = Arrangement.spacedBy(3.dp)) {
                        Text("${planName(state)} · ${planPrice(state)}", style = FkType.cardTitle)
                        Text("Renews 1 Sep · Razorpay", style = FkType.meta.copy(color = FkColor.text50))
                    }
                    Box(
                        Modifier
                            .clip(RoundedCornerShape(10.dp))
                            .border(1.dp, FkColor.line14, RoundedCornerShape(10.dp))
                            .clickable { vm.managePlan() }
                            .padding(horizontal = 13.dp, vertical = 9.dp),
                    ) {
                        Text("Manage", style = FkType.meta.copy(color = FkColor.text.copy(alpha = 0.75f), fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                    }
                }
                Row(
                    Modifier.fillMaxWidth().padding(top = 12.dp).border(0.dp, FkColor.line07).padding(top = 12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Column(verticalArrangement = Arrangement.spacedBy(3.dp)) {
                        Text("Where clients pay you", style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                        Text(if (state.bank) "HDFC ••4471 · verified" else "Add UPI ID or account number", style = FkType.meta.copy(color = FkColor.text50))
                    }
                    Box(
                        Modifier
                            .clip(RoundedCornerShape(10.dp))
                            .background(if (state.bank) FkColor.limeFill else FkColor.lime)
                            .clickable { vm.toggleBank() }
                            .padding(horizontal = 13.dp, vertical = 9.dp),
                    ) {
                        Text(if (state.bank) "Added" else "Add", style = FkType.meta.copy(color = if (state.bank) FkColor.lime else FkColor.onLime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                    }
                }
            }
            Spacer(Modifier.height(13.dp))
            Text(
                "FreelanceKar never holds your money — clients pay you by UPI or cash and you keep every rupee.",
                style = FkType.meta.copy(color = FkColor.text40),
            )
        }
    }
}

@Composable
private fun PayFigure(value: String, label: String) {
    Column {
        Text(value, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, fontSize = androidx.compose.ui.unit.TextUnit(14f, androidx.compose.ui.unit.TextUnitType.Sp), color = FkColor.onLime))
        Text(label, style = FkType.metaXs.copy(color = FkColor.onLime.copy(alpha = 0.65f)))
    }
}
