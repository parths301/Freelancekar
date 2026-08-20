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
import com.freelancekar.app.ui.components.*
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@Composable
fun ProfileScreen(state: AppState, vm: AppViewModel) {
    val pro = activePro(state)
    val saved = state.saved.contains(pro.id)

    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        Box(Modifier.fillMaxWidth()) {
            Stripe(Modifier.fillMaxWidth().padding(top = 12.dp).height(104.dp))
            Box(
                Modifier
                    .padding(top = 12.dp, start = 16.dp)
                    .size(32.dp)
                    .clip(CircleShape)
                    .background(FkColor.bg.copy(alpha = 0.72f))
                    .border(1.dp, FkColor.line12, CircleShape)
                    .clickable { vm.go(if (state.searchLabel.isNotEmpty()) Screen.RESULTS else Screen.HOME) },
                contentAlignment = Alignment.Center,
            ) {
                Text("←", style = FkType.body.copy(color = FkColor.text))
            }
        }

        Row(
            Modifier.fillMaxWidth().offset(y = (-30).dp).padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Bottom,
        ) {
            Stripe(Modifier.size(72.dp).clip(RoundedCornerShape(20.dp)).border(3.dp, FkColor.bg, RoundedCornerShape(20.dp)))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(bottom = 4.dp)) {
                Box(
                    Modifier
                        .clip(RoundedCornerShape(10.dp))
                        .border(1.dp, FkColor.line14, RoundedCornerShape(10.dp))
                        .clickable { vm.toggleSave(pro.id, pro.first) }
                        .padding(horizontal = 11.dp, vertical = 7.dp),
                ) {
                    Text(if (saved) "♥" else "♡", style = FkType.body.copy(color = if (saved) FkColor.lime else FkColor.text.copy(alpha = 0.7f)))
                }
                Box(
                    Modifier
                        .clip(RoundedCornerShape(10.dp))
                        .border(1.dp, FkColor.line14, RoundedCornerShape(10.dp))
                        .padding(horizontal = 11.dp, vertical = 7.dp),
                ) {
                    Text("↗", style = FkType.body.copy(color = FkColor.text.copy(alpha = 0.7f)))
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).offset(y = (-18).dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(pro.name, style = FkType.h1sm)
                Spacer(Modifier.width(7.dp))
                Box(
                    Modifier.clip(RoundedCornerShape(6.dp)).background(FkColor.limeBadge).padding(horizontal = 7.dp, vertical = 3.dp),
                ) {
                    Text("KYC ✔", style = FkType.monoSm.copy(color = FkColor.lime))
                }
            }
            Spacer(Modifier.height(6.dp))
            Text(pro.tagline, style = FkType.body.copy(color = FkColor.text55))
        }

        Row(
            Modifier.padding(horizontal = 20.dp).padding(top = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            StatBox(pro.rating.toString(), "${pro.jobs} jobs", FkColor.amber, Modifier.weight(1f))
            StatBox("98%", "completion", null, Modifier.weight(1f))
            StatBox(pro.replyIn, "replies in", null, Modifier.weight(1f))
            StatBox(pro.years, "on platform", null, Modifier.weight(1f))
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 24.dp)) {
            SectionTitle(
                "Services offered",
                right = { Text("${pro.packages.size} ACTIVE", style = FkType.mono.copy(color = FkColor.text40)) },
            )
            Spacer(Modifier.height(11.dp))
            Column(verticalArrangement = Arrangement.spacedBy(9.dp)) {
                pro.packages.forEachIndexed { i, p ->
                    Row(
                        Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(14.dp))
                            .background(FkColor.card)
                            .border(1.dp, if (i == state.svcIdx) FkColor.lime else FkColor.line08, RoundedCornerShape(14.dp))
                            .clickable { vm.pickService(i) }
                            .padding(horizontal = 14.dp, vertical = 13.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Column(verticalArrangement = Arrangement.spacedBy(3.dp)) {
                            Text(p.name, style = FkType.cardTitle)
                            Text(p.terms, style = FkType.meta.copy(color = FkColor.text50))
                        }
                        Text(p.price, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                    }
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 24.dp)) {
            Text("Recent work", style = FkType.h3)
            Spacer(Modifier.height(11.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(7.dp)) {
                Stripe(Modifier.weight(1f).aspectRatio(3f / 4f).clip(RoundedCornerShape(11.dp)))
                Stripe(Modifier.weight(1f).aspectRatio(3f / 4f).clip(RoundedCornerShape(11.dp)))
                Stripe(Modifier.weight(1f).aspectRatio(3f / 4f).clip(RoundedCornerShape(11.dp))) {
                    Text("+14", style = FkType.h4.copy(color = FkColor.text60))
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 24.dp, bottom = 30.dp)) {
            Text("Reviews", style = FkType.h3)
            Spacer(Modifier.height(11.dp))
            Column(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(14.dp))
                    .background(FkColor.card)
                    .border(1.dp, FkColor.line08, RoundedCornerShape(14.dp))
                    .padding(14.dp),
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Stripe(Modifier.size(28.dp).clip(CircleShape))
                    Spacer(Modifier.width(9.dp))
                    Text(pro.reviewer, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, fontSize = androidx.compose.ui.unit.TextUnit(12.5f, androidx.compose.ui.unit.TextUnitType.Sp)))
                    Spacer(Modifier.weight(1f))
                    Text("★ 5.0", style = FkType.meta.copy(color = FkColor.amber))
                }
                Spacer(Modifier.height(10.dp))
                Text(pro.review, style = FkType.bodySm.copy(color = FkColor.text60))
            }
        }
    }
}

@Composable
private fun StatBox(value: String, label: String, valueColor: androidx.compose.ui.graphics.Color?, modifier: Modifier = Modifier) {
    Column(
        modifier
            .clip(RoundedCornerShape(12.dp))
            .background(FkColor.card)
            .border(1.dp, FkColor.line08, RoundedCornerShape(12.dp))
            .padding(horizontal = 4.dp, vertical = 10.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(value, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, fontSize = androidx.compose.ui.unit.TextUnit(14f, androidx.compose.ui.unit.TextUnitType.Sp), color = valueColor ?: FkColor.text))
        Spacer(Modifier.height(2.dp))
        Text(label, style = FkType.metaXs.copy(color = FkColor.text45))
    }
}

/** Replaces the tab bar while a freelancer profile is open. */
@Composable
fun ProfileActionBar(state: AppState, vm: AppViewModel) {
    val pro = activePro(state)
    val pkg = selectedPackage(state)
    Row(
        Modifier
            .fillMaxWidth()
            .background(FkColor.bar)
            .border(1.dp, FkColor.line07)
            .padding(horizontal = 20.dp)
            .padding(top = 14.dp, bottom = 20.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column {
            Text(pkg.price, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, fontSize = androidx.compose.ui.unit.TextUnit(15f, androidx.compose.ui.unit.TextUnitType.Sp)))
            Text(pkg.terms, style = FkType.metaXs.copy(color = FkColor.text45))
        }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            InlineOutlineButton({ vm.messagePro(pro) }, text = "Chat")
            InlineButton({ vm.openHire() }, text = "Hire")
        }
    }
}
