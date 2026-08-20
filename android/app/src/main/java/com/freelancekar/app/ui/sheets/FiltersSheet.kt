package com.freelancekar.app.ui.sheets

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.AppState
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.Chip
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

private data class FilterGroup(val label: String, val key: String, val opts: List<Pair<String, String>>)

private val GROUPS = listOf(
    FilterGroup("MAX BUDGET", "budget", listOf("Any" to "any", "Under ₹2k" to "2000", "Under ₹10k" to "10000", "Under ₹25k" to "25000")),
    FilterGroup("DISTANCE", "dist", listOf("Any" to "any", "Within 3 km" to "3", "Within 5 km" to "5", "Within 10 km" to "10")),
    FilterGroup("WORK MODE", "mode", listOf("Any" to "any", "On-site" to "onsite", "Remote ok" to "remote")),
    FilterGroup("LANGUAGE", "lang", listOf("Any" to "any", "Hindi" to "Hindi", "Marathi" to "Marathi", "English" to "English")),
)

private fun valueFor(state: AppState, key: String): String = when (key) {
    "budget" -> state.filters.budget
    "dist" -> state.filters.dist
    "mode" -> state.filters.mode
    "lang" -> state.filters.lang
    else -> "any"
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FiltersSheet(state: AppState, vm: AppViewModel) {
    if (!state.filtersOpen) return
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)

    ModalBottomSheet(
        onDismissRequest = { vm.closeFilters() },
        sheetState = sheetState,
        containerColor = FkColor.sheet,
    ) {
        Column(Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(bottom = 22.dp)) {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text("Filters", style = FkType.sheetTitle)
                Text("✕", style = FkType.body.copy(color = FkColor.text50), modifier = Modifier.clickable { vm.closeFilters() })
            }

            GROUPS.forEach { g ->
                Column(Modifier.padding(top = 18.dp), verticalArrangement = Arrangement.spacedBy(9.dp)) {
                    Text(g.label, style = FkType.monoLabel.copy(color = FkColor.text45))
                    androidx.compose.foundation.layout.FlowRow(horizontalArrangement = Arrangement.spacedBy(7.dp)) {
                        g.opts.forEach { (name, value) ->
                            Chip(on = valueFor(state, g.key) == value, onClick = { vm.setFilter(g.key, value) }, text = name)
                        }
                    }
                }
            }

            Row(
                Modifier
                    .fillMaxWidth()
                    .padding(top = 18.dp)
                    .clip(RoundedCornerShape(14.dp))
                    .background(FkColor.nested)
                    .border(1.dp, FkColor.line09, RoundedCornerShape(14.dp))
                    .padding(horizontal = 14.dp, vertical = 13.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                    Text("Available this week", style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                    Text("Only show open calendars", style = FkType.meta.copy(color = FkColor.text50))
                }
                Box(
                    Modifier
                        .size(width = 44.dp, height = 26.dp)
                        .clip(CircleShape)
                        .background(if (state.filters.availNow) FkColor.lime else FkColor.nested)
                        .border(1.dp, if (state.filters.availNow) FkColor.lime else FkColor.line14, CircleShape)
                        .clickable { vm.toggleAvailNow() },
                ) {
                    Box(
                        Modifier
                            .padding(2.dp)
                            .size(20.dp)
                            .align(if (state.filters.availNow) Alignment.CenterEnd else Alignment.CenterStart)
                            .clip(CircleShape)
                            .background(if (state.filters.availNow) FkColor.onLime else FkColor.text50),
                    )
                }
            }

            Row(Modifier.fillMaxWidth().padding(top = 20.dp), horizontalArrangement = Arrangement.spacedBy(9.dp)) {
                Box(
                    Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(12.dp))
                        .border(1.dp, FkColor.line14, RoundedCornerShape(12.dp))
                        .clickable { vm.resetFilters() }
                        .padding(14.dp),
                ) {
                    Text("Reset", style = FkType.body.copy(color = FkColor.text.copy(alpha = 0.7f)), modifier = Modifier.fillMaxWidth(), textAlign = androidx.compose.ui.text.style.TextAlign.Center)
                }
                Box(
                    Modifier
                        .weight(1.5f)
                        .clip(RoundedCornerShape(12.dp))
                        .background(FkColor.lime)
                        .clickable { vm.applyFilters() }
                        .padding(14.dp),
                ) {
                    Text("Show results", style = FkType.body.copy(color = FkColor.onLime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold), modifier = Modifier.fillMaxWidth(), textAlign = androidx.compose.ui.text.style.TextAlign.Center)
                }
            }
        }
    }
}
