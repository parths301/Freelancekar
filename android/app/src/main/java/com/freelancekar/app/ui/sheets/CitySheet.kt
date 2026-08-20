package com.freelancekar.app.ui.sheets

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.SheetState
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.AppState
import com.freelancekar.app.data.selectCityRows
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CitySheet(state: AppState, vm: AppViewModel) {
    if (!state.cityOpen) return
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
    val rows = selectCityRows(state)

    ModalBottomSheet(
        onDismissRequest = { vm.closeCity() },
        sheetState = sheetState,
        containerColor = FkColor.sheet,
    ) {
        Column(Modifier.fillMaxWidth()) {
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(top = 6.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text("Where do you need work done?", style = FkType.sheetTitle, modifier = Modifier.weight(1f))
                Text("✕", style = FkType.body.copy(color = FkColor.text50), modifier = Modifier.clickable { vm.closeCity() })
            }

            Row(
                Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp)
                    .padding(top = 14.dp)
                    .clip(RoundedCornerShape(13.dp))
                    .background(FkColor.nested)
                    .border(1.dp, FkColor.line10, RoundedCornerShape(13.dp))
                    .padding(horizontal = 13.dp, vertical = 2.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text("⌕", style = FkType.meta.copy(color = FkColor.text45))
                Spacer(Modifier.width(8.dp))
                TextField(
                    value = state.citySearch,
                    onValueChange = { vm.setCitySearch(it) },
                    placeholder = { Text("Locality or city — e.g. Dharampeth", style = FkType.bodySm.copy(color = FkColor.text42)) },
                    modifier = Modifier.weight(1f),
                    singleLine = true,
                    colors = TextFieldDefaults.colors(
                        focusedContainerColor = FkColor.nested, unfocusedContainerColor = FkColor.nested,
                        focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
                    ),
                    textStyle = FkType.bodySm.copy(color = FkColor.text),
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
                )
            }

            Row(
                Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp)
                    .padding(top = 9.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .border(1.dp, FkColor.limeBd35, RoundedCornerShape(12.dp))
                    .clickable { vm.useCurrentLocation() }
                    .padding(horizontal = 13.dp, vertical = 11.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text("◉", style = FkType.meta.copy(color = FkColor.lime))
                Spacer(Modifier.width(9.dp))
                Text("Use my current location", style = FkType.meta.copy(color = FkColor.lime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
            }

            Column(Modifier.padding(horizontal = 20.dp).padding(top = 14.dp, bottom = 22.dp), verticalArrangement = Arrangement.spacedBy(7.dp)) {
                rows.forEach { r ->
                    Row(
                        Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(13.dp))
                            .background(FkColor.nested)
                            .border(1.dp, if (r.on) FkColor.lime else FkColor.line09, RoundedCornerShape(13.dp))
                            .clickable { vm.pickPlace(r.city, r.locality) }
                            .padding(horizontal = 13.dp, vertical = 12.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Text(r.icon, style = FkType.meta.copy(color = if (r.on) FkColor.lime else FkColor.text40))
                        Spacer(Modifier.width(11.dp))
                        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                            Text(r.name, style = FkType.cardTitle)
                            Text(r.sub, style = FkType.metaXs.copy(color = FkColor.text45))
                        }
                        Text(r.count, style = FkType.monoSm.copy(color = FkColor.text35))
                    }
                }

                if (rows.isEmpty()) {
                    Column(Modifier.fillMaxWidth().padding(vertical = 26.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            "No match for \"${state.citySearch}\". FreelanceKar is live in Nagpur, Indore, Jabalpur and Nashik — more cities each month.",
                            style = FkType.bodySm.copy(color = FkColor.text45),
                            textAlign = androidx.compose.ui.text.style.TextAlign.Center,
                        )
                        Spacer(Modifier.height(14.dp))
                        Row(
                            Modifier
                                .clip(RoundedCornerShape(11.dp))
                                .border(1.dp, FkColor.limeBd35, RoundedCornerShape(11.dp))
                                .clickable { vm.setCitySearch("") }
                                .padding(horizontal = 14.dp, vertical = 10.dp),
                        ) {
                            Text("Show all localities", style = FkType.meta.copy(color = FkColor.lime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                        }
                    }
                }
            }
        }
    }
}
