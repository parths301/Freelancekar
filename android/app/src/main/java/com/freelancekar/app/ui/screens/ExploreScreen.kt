package com.freelancekar.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.*
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.InlineButton
import com.freelancekar.app.ui.components.LocationPill
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

private val HOW_IT_WORKS = listOf("Describe work", "Compare quotes", "Pay them directly")

@Composable
fun ExploreScreen(state: AppState, vm: AppViewModel) {
    val city = cityOf(state)
    val recents = listOf(
        Triple("Reel editor under ₹1,500", "$city · within 10 km", "28"),
        Triple("Product photographer", "$city · available this week", "64"),
    )

    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        Row(
            Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(top = 18.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Text("Explore", style = FkType.h1)
            LocationPill(state, { vm.openCity() }, compact = true)
        }

        Row(
            Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .padding(top = 18.dp)
                .clip(RoundedCornerShape(14.dp))
                .background(FkColor.card)
                .border(1.dp, FkColor.line09, RoundedCornerShape(14.dp))
                .padding(horizontal = 13.dp, vertical = 4.dp),
        ) {
            Text("⌕", style = FkType.body.copy(color = FkColor.text45), modifier = Modifier.padding(top = 12.dp, end = 8.dp))
            TextField(
                value = state.query,
                onValueChange = { vm.setQuery(it) },
                placeholder = { Text("Search skills, services or people", style = FkType.body.copy(color = FkColor.text42)) },
                modifier = Modifier.weight(1f),
                singleLine = true,
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = FkColor.card, unfocusedContainerColor = FkColor.card,
                    focusedIndicatorColor = androidx.compose.ui.graphics.Color.Transparent,
                    unfocusedIndicatorColor = androidx.compose.ui.graphics.Color.Transparent,
                ),
                textStyle = FkType.body.copy(color = FkColor.text),
                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
                keyboardActions = KeyboardActions(onSearch = {
                    if (state.query.trim().isNotEmpty()) vm.searchPublic(state.query.trim())
                }),
            )
            if (state.query.trim().isNotEmpty()) {
                Box(Modifier.padding(vertical = 8.dp)) {
                    InlineButton({ vm.runSearch() }, text = "Go")
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 26.dp)) {
            Text("Tell us the work. We'll find the person.", style = FkType.hero)
        }

        Column(
            Modifier
                .padding(horizontal = 20.dp)
                .padding(top = 18.dp)
                .clip(RoundedCornerShape(18.dp))
                .background(FkColor.card)
                .border(1.dp, FkColor.line10, RoundedCornerShape(18.dp))
                .padding(14.dp),
        ) {
            TextField(
                value = state.brief,
                onValueChange = { vm.setBrief(it) },
                placeholder = { Text("Need 8 Instagram reels a month for my café in Dharampeth…", style = FkType.body.copy(color = FkColor.text42)) },
                modifier = Modifier.fillMaxWidth().heightIn(min = 62.dp),
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = FkColor.card, unfocusedContainerColor = FkColor.card,
                    focusedIndicatorColor = androidx.compose.ui.graphics.Color.Transparent,
                    unfocusedIndicatorColor = androidx.compose.ui.graphics.Color.Transparent,
                ),
                textStyle = FkType.body.copy(color = FkColor.text),
            )
            Row(Modifier.fillMaxWidth().padding(top = 8.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                Row {
                    Text("◉  ▤  ₹", style = FkType.body.copy(color = FkColor.text45))
                }
                InlineButton({ vm.runSearch() }, text = "Find people")
            }
        }

        androidx.compose.foundation.layout.FlowRow(
            modifier = Modifier.padding(horizontal = 20.dp).padding(top = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            SUGGESTION_CHIPS.forEach { name ->
                Box(
                    Modifier
                        .clip(CircleShape)
                        .background(FkColor.card)
                        .border(1.dp, FkColor.line09, CircleShape)
                        .clickable { vm.searchPublic(name) }
                        .padding(horizontal = 12.dp, vertical = 8.dp),
                ) {
                    Text(name, style = FkType.meta.copy(color = FkColor.text.copy(alpha = 0.75f)))
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 26.dp)) {
            Text("Recent searches", style = FkType.h4)
            Spacer(Modifier.height(11.dp))
            Column(verticalArrangement = Arrangement.spacedBy(9.dp)) {
                recents.forEach { (label, meta, count) ->
                    Row(
                        Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(14.dp))
                            .background(FkColor.card)
                            .border(1.dp, FkColor.line08, RoundedCornerShape(14.dp))
                            .clickable { vm.searchPublic(label) }
                            .padding(horizontal = 14.dp, vertical = 12.dp),
                        verticalAlignment = androidx.compose.ui.Alignment.CenterVertically,
                    ) {
                        Text("↺", style = FkType.meta.copy(color = FkColor.text40))
                        Spacer(Modifier.width(10.dp))
                        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                            Text(label, style = FkType.cardTitle)
                            Text(meta, style = FkType.metaXs.copy(color = FkColor.text45))
                        }
                        Text(count, style = FkType.mono.copy(color = FkColor.text40))
                    }
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 24.dp, bottom = 26.dp)) {
            Text("How hiring works", style = FkType.h4)
            Spacer(Modifier.height(11.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(9.dp)) {
                HOW_IT_WORKS.forEachIndexed { i, label ->
                    Column(
                        Modifier
                            .weight(1f)
                            .clip(RoundedCornerShape(14.dp))
                            .background(FkColor.card)
                            .border(1.dp, FkColor.line08, RoundedCornerShape(14.dp))
                            .padding(horizontal = 8.dp, vertical = 13.dp),
                        horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(4.dp),
                    ) {
                        Text("${i + 1}", style = FkType.h4)
                        Text(label, style = FkType.metaXs.copy(color = FkColor.text50), textAlign = androidx.compose.ui.text.style.TextAlign.Center)
                    }
                }
            }
        }
    }
}
