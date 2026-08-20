package com.freelancekar.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
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
import com.freelancekar.app.data.*
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.*
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

private val SORTS: List<Pair<String, Sort>> = listOf(
    "Best match" to Sort.MATCH,
    "Nearest" to Sort.NEAR,
    "Under ₹15k" to Sort.PRICE,
    "4.8★+" to Sort.RATING,
)

@Composable
fun ResultsScreen(state: AppState, vm: AppViewModel) {
    val city = cityOf(state)
    val results = if (state.searching) emptyList() else selectResults(state)
    val active = filterCount(state)

    val countLabel = if (state.searching) "Searching…" else if (results.size == 1) "1 person" else "${results.size} people"
    val emptyNote = if (active > 0) {
        "Your filters are narrow for ${placeLabel(state)}. Widen the budget or distance and try again."
    } else {
        "Nobody in ${placeLabel(state)} matches \"${state.searchLabel.ifEmpty { "this" }}\" right now. Post the job and freelancers come to you."
    }

    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        Row(
            Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(top = 16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(11.dp),
        ) {
            BackButton { vm.go(Screen.EXPLORE) }
            Row(
                Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(12.dp))
                    .background(FkColor.card)
                    .border(1.dp, FkColor.line09, RoundedCornerShape(12.dp))
                    .padding(horizontal = 13.dp, vertical = 11.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text("⌕", style = FkType.meta.copy(color = FkColor.text45))
                Spacer(Modifier.width(9.dp))
                Text(
                    state.searchLabel.ifEmpty { "Reel editor" },
                    style = FkType.bodySm.copy(color = FkColor.text.copy(alpha = 0.8f)),
                    maxLines = 1,
                )
            }
            Box(
                Modifier.clickable { vm.openFilters() },
            ) {
                Text(
                    "⚙",
                    style = FkType.h3.copy(color = if (active > 0) FkColor.lime else FkColor.text60),
                )
                if (active > 0) {
                    Box(
                        Modifier
                            .align(Alignment.TopEnd)
                            .offset(x = 6.dp, y = (-4).dp)
                            .clip(RoundedCornerShape(50))
                            .background(FkColor.lime)
                            .padding(horizontal = 4.dp, vertical = 1.dp),
                    ) {
                        Text(active.toString(), style = FkType.monoSm.copy(color = FkColor.onLime, fontSize = androidx.compose.ui.unit.TextUnit(8.5f, androidx.compose.ui.unit.TextUnitType.Sp)))
                    }
                }
            }
        }

        Row(
            Modifier.horizontalScroll(rememberScrollState()).padding(horizontal = 20.dp).padding(top = 14.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            SORTS.forEach { (name, key) ->
                Chip(on = state.sort == key, onClick = { vm.setSort(key) }, text = name)
            }
        }

        Row(
            Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(top = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Bottom,
        ) {
            Text("$countLabel in $city", style = FkType.h4)
            Text(if (state.sort == Sort.MATCH) "MATCH SCORED" else "FILTERED", style = FkType.mono.copy(color = FkColor.text40))
        }

        if (state.searching) {
            Column(Modifier.padding(horizontal = 20.dp).padding(top = 14.dp, bottom = 26.dp), verticalArrangement = Arrangement.spacedBy(11.dp)) {
                repeat(3) {
                    Row(
                        Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(18.dp))
                            .background(FkColor.card)
                            .border(1.dp, FkColor.line07, RoundedCornerShape(18.dp))
                            .padding(14.dp),
                        horizontalArrangement = Arrangement.spacedBy(12.dp),
                    ) {
                        Box(
                            Modifier
                                .size(48.dp)
                                .clip(RoundedCornerShape(14.dp))
                                .background(FkColor.skeletonLg),
                        )
                        Column(Modifier.weight(1f).padding(top = 3.dp), verticalArrangement = Arrangement.spacedBy(9.dp)) {
                            Box(Modifier.fillMaxWidth(0.58f).height(11.dp).clip(RoundedCornerShape(4.dp)).background(FkColor.skeletonLg))
                            Box(Modifier.fillMaxWidth(0.82f).height(9.dp).clip(RoundedCornerShape(4.dp)).background(FkColor.skeletonSm))
                            Box(Modifier.fillMaxWidth(0.44f).height(9.dp).clip(RoundedCornerShape(4.dp)).background(FkColor.skeletonSm))
                        }
                    }
                }
            }
        } else if (results.isEmpty()) {
            Column(
                Modifier.fillMaxWidth().padding(horizontal = 30.dp).padding(vertical = 30.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                Text("⌕", style = FkType.h2.copy(color = FkColor.text28))
                Spacer(Modifier.height(14.dp))
                Text("Nobody matches this yet", style = FkType.screenTitle)
                Spacer(Modifier.height(8.dp))
                Text(emptyNote, style = FkType.bodySm.copy(color = FkColor.text50), textAlign = androidx.compose.ui.text.style.TextAlign.Center)
                Spacer(Modifier.height(20.dp))
                Column(verticalArrangement = Arrangement.spacedBy(9.dp)) {
                    PrimaryButton({ vm.clearAll() }, text = "Clear filters")
                    OutlineButton({ vm.go(Screen.EXPLORE) }, text = "Post the job instead")
                }
            }
        } else {
            Column(Modifier.padding(horizontal = 20.dp).padding(top = 14.dp, bottom = 26.dp), verticalArrangement = Arrangement.spacedBy(11.dp)) {
                results.forEachIndexed { i, p ->
                    Column(
                        Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(18.dp))
                            .background(FkColor.card)
                            .border(1.dp, if (i == 0) FkColor.lime else FkColor.line08, RoundedCornerShape(18.dp))
                            .padding(14.dp),
                    ) {
                        Row(
                            Modifier.fillMaxWidth().clickable { vm.openPro(p.id) },
                            horizontalArrangement = Arrangement.spacedBy(12.dp),
                        ) {
                            Stripe(Modifier.size(48.dp).clip(RoundedCornerShape(14.dp)).border(1.dp, FkColor.line09, RoundedCornerShape(14.dp)))
                            Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(p.name, style = FkType.h4.copy(fontSize = androidx.compose.ui.unit.TextUnit(14.5f, androidx.compose.ui.unit.TextUnitType.Sp)))
                                    if (p.verified) {
                                        Spacer(Modifier.width(6.dp))
                                        Text("✔", style = FkType.metaXs.copy(color = FkColor.lime))
                                    }
                                    Spacer(Modifier.weight(1f))
                                    Text("${p.match}%", style = FkType.mono.copy(color = if (i == 0) FkColor.lime else FkColor.text55))
                                }
                                Text(p.services, style = FkType.meta.copy(color = FkColor.text55))
                                Row(horizontalArrangement = Arrangement.spacedBy(9.dp)) {
                                    Text("★ ${p.rating}", style = FkType.meta.copy(color = FkColor.amber))
                                    Text("${p.jobs} jobs", style = FkType.meta.copy(color = FkColor.text40))
                                    Text(p.distance, style = FkType.meta.copy(color = FkColor.text40))
                                }
                            }
                        }
                        Row(
                            Modifier.fillMaxWidth().padding(top = 11.dp).border(0.dp, FkColor.line07).padding(top = 0.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Column {
                                Text(p.price, style = FkType.cardTitle)
                                Text(p.note, style = FkType.metaXs.copy(color = FkColor.text45))
                            }
                            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                InlineOutlineButton({ vm.messageFromResults(p) }, text = "Message")
                                InlineButton({ vm.openHire(p.id) }, text = "Hire")
                            }
                        }
                    }
                }
            }
        }
    }
}
