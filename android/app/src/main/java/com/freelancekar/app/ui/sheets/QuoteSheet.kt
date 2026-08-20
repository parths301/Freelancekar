package com.freelancekar.app.ui.sheets

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.AppState
import com.freelancekar.app.data.DAY_LABELS
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.Chip
import com.freelancekar.app.ui.components.PrimaryButton
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun QuoteSheet(state: AppState, vm: AppViewModel) {
    val req = state.reqs.find { it.id == state.quoteFor }
    if (req == null) return
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)

    ModalBottomSheet(
        onDismissRequest = { vm.closeQuote() },
        sheetState = sheetState,
        containerColor = FkColor.sheet,
    ) {
        Column(Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(bottom = 22.dp)) {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text("Send a quote", style = FkType.sheetTitle)
                Text("✕", style = FkType.body.copy(color = FkColor.text50), modifier = Modifier.clickable { vm.closeQuote() })
            }

            Column(
                Modifier
                    .fillMaxWidth()
                    .padding(top = 14.dp)
                    .clip(RoundedCornerShape(14.dp))
                    .background(FkColor.nested)
                    .border(1.dp, FkColor.line09, RoundedCornerShape(14.dp))
                    .padding(13.dp),
            ) {
                Text(req.title, style = FkType.cardTitle)
                Spacer(Modifier.height(4.dp))
                Text(req.meta, style = FkType.meta.copy(color = FkColor.text50))
                Spacer(Modifier.height(6.dp))
                Text("Client budget: ${req.budget}", style = FkType.meta.copy(color = FkColor.lime, fontWeight = androidx.compose.ui.text.font.FontWeight.Medium))
            }

            Column(Modifier.padding(top = 16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("YOUR PRICE", style = FkType.monoLabel.copy(color = FkColor.text45))
                Row(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(13.dp))
                        .background(FkColor.nested)
                        .border(1.dp, FkColor.line09, RoundedCornerShape(13.dp))
                        .padding(horizontal = 13.dp, vertical = 2.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text("₹", style = FkType.body.copy(color = FkColor.text50))
                    Spacer(Modifier.width(9.dp))
                    TextField(
                        value = state.quoteAmount,
                        onValueChange = { vm.setQuoteAmount(it) },
                        placeholder = { Text("14000", style = FkType.body.copy(color = FkColor.text42)) },
                        modifier = Modifier.weight(1f),
                        singleLine = true,
                        colors = TextFieldDefaults.colors(
                            focusedContainerColor = FkColor.nested, unfocusedContainerColor = FkColor.nested,
                            focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
                        ),
                        textStyle = FkType.body.copy(color = FkColor.text, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold),
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    )
                }
                Text("You keep 100% — client pays you directly, no platform cut.", style = FkType.meta.copy(color = FkColor.text42))
            }

            Column(Modifier.padding(top = 16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("DELIVERY IN", style = FkType.monoLabel.copy(color = FkColor.text45))
                Row(horizontalArrangement = Arrangement.spacedBy(7.dp)) {
                    DAY_LABELS.forEachIndexed { i, d ->
                        Box(Modifier.weight(1f)) {
                            Chip(on = state.quoteDayIdx == i, onClick = { vm.setQuoteDay(i) }, text = d, modifier = Modifier.fillMaxWidth())
                        }
                    }
                }
            }

            Column(Modifier.padding(top = 16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("MESSAGE", style = FkType.monoLabel.copy(color = FkColor.text45))
                TextField(
                    value = state.quoteMsg,
                    onValueChange = { vm.setQuoteMsg(it) },
                    placeholder = { Text("What's included, how you work, what you need from them.", style = FkType.body.copy(color = FkColor.text42)) },
                    modifier = Modifier
                        .fillMaxWidth()
                        .heightIn(min = 66.dp)
                        .clip(RoundedCornerShape(13.dp))
                        .border(1.dp, FkColor.line09, RoundedCornerShape(13.dp)),
                    colors = TextFieldDefaults.colors(
                        focusedContainerColor = FkColor.nested, unfocusedContainerColor = FkColor.nested,
                        focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
                    ),
                    textStyle = FkType.body.copy(color = FkColor.text),
                )
                if (state.quoteError) {
                    Text("Add a price and a short message before sending.", style = FkType.meta.copy(color = FkColor.alert))
                }
            }

            PrimaryButton({ vm.sendQuote() }, modifier = Modifier.padding(top = 18.dp), text = "Send quote")
        }
    }
}
