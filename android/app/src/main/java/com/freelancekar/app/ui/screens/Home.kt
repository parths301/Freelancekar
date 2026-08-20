package com.freelancekar.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.*
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.*
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@Composable
fun HomeScreen(state: AppState, vm: AppViewModel) {
    val city = cityOf(state)
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        Row(
            Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(top = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Text("FreelanceKar", style = FkType.h4.copy(color = FkColor.lime, fontSize = androidx.compose.ui.unit.TextUnit(18f, androidx.compose.ui.unit.TextUnitType.Sp)))
            Row {
                BellButton(state, { vm.openNotifs() })
                Spacer(Modifier.width(9.dp))
                LocationPill(state, { vm.openCity() })
            }
        }

        Box(
            Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .padding(top = 18.dp)
                .clip(RoundedCornerShape(14.dp))
                .background(FkColor.card)
                .border(1.dp, FkColor.line09, RoundedCornerShape(14.dp))
                .clickable { vm.go(Screen.EXPLORE) }
                .padding(horizontal = 14.dp, vertical = 13.dp),
        ) {
            Text("⌕  Search \"reel editor\", \"GST filing\"…", style = FkType.body.copy(color = FkColor.text42))
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 24.dp)) {
            Text("What do you need done?", style = FkType.h2)
            Spacer(Modifier.height(3.dp))
            Text("${CITY_COUNTS[city]} verified freelancers in $city", style = FkType.body.copy(color = FkColor.text50))
            Spacer(Modifier.height(14.dp))

            LazyVerticalGrid(
                columns = GridCells.Fixed(3),
                horizontalArrangement = Arrangement.spacedBy(9.dp),
                verticalArrangement = Arrangement.spacedBy(9.dp),
                modifier = Modifier.height(180.dp),
            ) {
                items(CATS) { (icon, name, query) ->
                    Column(
                        Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(14.dp))
                            .background(FkColor.card)
                            .border(1.dp, FkColor.line08, RoundedCornerShape(14.dp))
                            .clickable { vm.searchPublic(query) }
                            .padding(horizontal = 10.dp, vertical = 13.dp),
                        verticalArrangement = Arrangement.spacedBy(9.dp),
                    ) {
                        Text(icon, style = FkType.h3)
                        Text(name, style = FkType.meta.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.Medium))
                    }
                }
            }

            Spacer(Modifier.height(10.dp))
            Text(
                "All 24 categories →",
                style = FkType.meta.copy(color = FkColor.lime, fontWeight = androidx.compose.ui.text.font.FontWeight.Medium),
                modifier = Modifier.clickable { vm.go(Screen.EXPLORE) }.padding(6.dp),
            )
        }

        Column(Modifier.padding(top = 22.dp)) {
            SectionTitle(
                "Top rated near you",
                modifier = Modifier.padding(horizontal = 20.dp),
                right = { Text("See all", style = FkType.meta.copy(color = FkColor.text45), modifier = Modifier.clickable { vm.go(Screen.EXPLORE) }) },
            )
            Row(
                Modifier.horizontalScroll(rememberScrollState()).padding(horizontal = 20.dp).padding(top = 14.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                PROS.take(3).forEach { p ->
                    Column(
                        Modifier
                            .width(150.dp)
                            .clip(RoundedCornerShape(16.dp))
                            .background(FkColor.card)
                            .border(1.dp, FkColor.line08, RoundedCornerShape(16.dp))
                            .clickable { vm.openPro(p.id) },
                    ) {
                        Stripe(Modifier.fillMaxWidth().height(92.dp))
                        Column(Modifier.padding(horizontal = 11.dp).padding(top = 10.dp, bottom = 12.dp), verticalArrangement = Arrangement.spacedBy(5.dp)) {
                            Text(p.name, style = FkType.cardTitle)
                            Text(p.headline, style = FkType.meta.copy(color = FkColor.text50))
                            Text("★ ${p.rating}  (${p.jobs})", style = FkType.meta.copy(color = FkColor.amber))
                            Text(p.price, style = FkType.h4)
                        }
                    }
                }
            }
        }

        Box(Modifier.padding(horizontal = 20.dp).padding(top = 22.dp, bottom = 26.dp)) {
            Row(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(FkColor.card)
                    .border(1.dp, FkColor.line08, RoundedCornerShape(16.dp))
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Column {
                    Text("Can't find it? Post a job", style = FkType.h4)
                    Text("Get quotes in under an hour", style = FkType.metaXs.copy(color = FkColor.text50))
                }
                InlineButton({ vm.go(Screen.EXPLORE) }, text = "Post")
            }
        }
    }
}
