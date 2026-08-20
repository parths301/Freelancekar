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
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.*
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.Chip
import com.freelancekar.app.ui.components.PrimaryButton
import com.freelancekar.app.ui.components.Stripe
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HireSheet(state: AppState, vm: AppViewModel) {
    if (state.hire <= 0) return
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
    val pro = activePro(state)
    val pkg = selectedPackage(state)

    ModalBottomSheet(
        onDismissRequest = { vm.closeHire() },
        sheetState = sheetState,
        containerColor = FkColor.sheet,
    ) {
        when (state.hire) {
            1 -> HireDetails(state, vm, pro, pkg)
            2 -> HirePay(state, vm, pro, pkg)
            3 -> HireSuccess(state, vm, pro, pkg)
            4 -> HireFailure(state, vm, pro, pkg)
        }
    }
}

@Composable
private fun Group(label: String, content: @Composable androidx.compose.foundation.layout.ColumnScope.() -> Unit) {
    Column(Modifier.padding(top = 16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(label, style = FkType.monoLabel.copy(color = FkColor.text45))
        content()
    }
}

@Composable
private fun DetailRow(label: String, value: String) {
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
        Text(label, style = FkType.meta.copy(color = FkColor.text55))
        Text(value, style = FkType.meta.copy(color = FkColor.text, fontWeight = androidx.compose.ui.text.font.FontWeight.Medium))
    }
}

@Composable
private fun HireDetails(state: AppState, vm: AppViewModel, pro: Pro, pkg: Package) {
    Column(Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(bottom = 22.dp)) {
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Text("Hire ${pro.first}", style = FkType.h1sm.copy(fontSize = androidx.compose.ui.unit.TextUnit(18f, androidx.compose.ui.unit.TextUnitType.Sp)))
            Text("✕", style = FkType.body.copy(color = FkColor.text50), modifier = Modifier.clickable { vm.closeHire() })
        }

        Group("SERVICE") {
            pro.packages.forEachIndexed { i, p ->
                Row(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(13.dp))
                        .background(FkColor.nested)
                        .border(1.dp, if (i == state.svcIdx) FkColor.lime else FkColor.line08, RoundedCornerShape(13.dp))
                        .clickable { vm.pickService(i) }
                        .padding(horizontal = 13.dp, vertical = 12.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                ) {
                    Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                        Text(p.name, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                        Text(p.terms, style = FkType.metaXs.copy(color = FkColor.text50))
                    }
                    Text(p.price, style = FkType.bodySm.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                }
            }
        }

        Group("START DATE") {
            Row(horizontalArrangement = Arrangement.spacedBy(7.dp)) {
                DATE_LABELS.forEachIndexed { i, label ->
                    Box(Modifier.weight(1f)) {
                        Chip(on = state.hireDateIdx == i, onClick = { vm.setHireDate(i) }, text = label, modifier = Modifier.fillMaxWidth())
                    }
                }
            }
        }

        Group("BRIEF") {
            TextField(
                value = state.hireNote,
                onValueChange = { vm.setHireNote(it) },
                placeholder = { Text("What exactly do you need? Add links or references.", style = FkType.body.copy(color = FkColor.text42)) },
                modifier = Modifier
                    .fillMaxWidth()
                    .heightIn(min = 64.dp)
                    .clip(RoundedCornerShape(13.dp))
                    .border(1.dp, FkColor.line09, RoundedCornerShape(13.dp)),
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = FkColor.nested, unfocusedContainerColor = FkColor.nested,
                    focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
                ),
                textStyle = FkType.body.copy(color = FkColor.text),
            )
            if (state.hireError) {
                Text("Add a line about the work so ${pro.first} can confirm.", style = FkType.meta.copy(color = FkColor.alert))
            }
        }

        PrimaryButton({ vm.toPay() }, modifier = Modifier.padding(top = 18.dp), text = "Continue · ${pkg.price}")
    }
}

@Composable
private fun HirePay(state: AppState, vm: AppViewModel, pro: Pro, pkg: Package) {
    Column(Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(bottom = 22.dp)) {
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Text("←", style = FkType.body.copy(color = FkColor.text60), modifier = Modifier.clickable { vm.toDetails() })
            Text("Secure payment", style = FkType.screenTitle)
            Text("✕", style = FkType.body.copy(color = FkColor.text50), modifier = Modifier.clickable { vm.closeHire() })
        }

        Column(
            Modifier
                .fillMaxWidth()
                .padding(top = 16.dp)
                .clip(RoundedCornerShape(15.dp))
                .background(FkColor.nested)
                .border(1.dp, FkColor.line09, RoundedCornerShape(15.dp))
                .padding(14.dp),
        ) {
            Row(
                Modifier.fillMaxWidth().padding(bottom = 12.dp).border(0.dp, FkColor.line07),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Stripe(Modifier.size(38.dp).clip(RoundedCornerShape(11.dp)))
                Spacer(Modifier.width(11.dp))
                Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                    Text(pro.name, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                    Text(pkg.name, style = FkType.meta.copy(color = FkColor.text50))
                }
            }
            Row(Modifier.fillMaxWidth().padding(top = 12.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                Text("Service", style = FkType.bodySm.copy(color = FkColor.text60))
                Text(pkg.price, style = FkType.bodySm.copy(color = FkColor.text))
            }
            Row(
                Modifier.fillMaxWidth().padding(top = 11.dp).border(0.dp, FkColor.line07).padding(top = 11.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text("Total to pay ${pro.first}", style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                Text(money(pkg.amount), style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
            }
        }

        Group("PAY WITH") {
            PAY_METHODS.forEachIndexed { i, (icon, name, note) ->
                Row(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(13.dp))
                        .background(FkColor.nested)
                        .border(1.dp, if (i == state.methodIdx) FkColor.lime else FkColor.line09, RoundedCornerShape(13.dp))
                        .clickable { vm.setMethod(i) }
                        .padding(horizontal = 13.dp, vertical = 12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text(icon, style = FkType.body)
                    Spacer(Modifier.width(11.dp))
                    Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                        Text(name, style = FkType.bodySm.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                        Text(note, style = FkType.metaXs.copy(color = FkColor.text50))
                    }
                    Text(if (i == state.methodIdx) "●" else "○", style = FkType.meta.copy(color = if (i == state.methodIdx) FkColor.lime else FkColor.text35))
                }
            }
        }

        Text(
            "You pay ${pro.first} directly — no platform fee. This confirms the booking and shares your contact details.",
            style = FkType.meta.copy(color = FkColor.text45),
            modifier = Modifier.padding(top = 14.dp),
        )

        PrimaryButton(
            { vm.payNow(pro, pkg.name, pkg.amount) },
            modifier = Modifier.padding(top = 16.dp),
            enabled = !state.paying,
            text = if (state.paying) "Confirming…" else "Confirm booking",
        )
    }
}

@Composable
private fun HireSuccess(state: AppState, vm: AppViewModel, pro: Pro, pkg: Package) {
    Column(
        Modifier.fillMaxWidth().padding(horizontal = 22.dp).padding(top = 34.dp, bottom = 26.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Box(
            Modifier.size(52.dp).clip(CircleShape).background(FkColor.lime),
            contentAlignment = Alignment.Center,
        ) { Text("✓", style = FkType.h2.copy(color = FkColor.onLime)) }
        Spacer(Modifier.height(16.dp))
        Text("Booked with ${pro.first}", style = FkType.h1sm)
        Spacer(Modifier.height(8.dp))
        Text(
            "Pay ${pro.first} ${money(pkg.amount)} directly on delivery. Usually confirms within ${pro.replyIn} — you'll get a notification.",
            style = FkType.body.copy(color = FkColor.text55),
            textAlign = androidx.compose.ui.text.style.TextAlign.Center,
        )
        Column(
            Modifier
                .fillMaxWidth()
                .padding(top = 18.dp)
                .clip(RoundedCornerShape(15.dp))
                .background(FkColor.nested)
                .border(1.dp, FkColor.line09, RoundedCornerShape(15.dp))
                .padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(9.dp),
        ) {
            DetailRow("Service", pkg.name)
            DetailRow("Starts", DATE_LABELS[state.hireDateIdx])
            DetailRow("Order", state.bookings.firstOrNull()?.id ?: "")
        }
        Row(Modifier.fillMaxWidth().padding(top = 16.dp), horizontalArrangement = Arrangement.spacedBy(9.dp)) {
            Box(
                Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(12.dp))
                    .border(1.dp, FkColor.line16, RoundedCornerShape(12.dp))
                    .clickable { vm.afterBookChat() }
                    .padding(13.dp),
            ) { Text("Open chat", style = FkType.bodySm.copy(color = FkColor.text), modifier = Modifier.fillMaxWidth(), textAlign = androidx.compose.ui.text.style.TextAlign.Center) }
            Box(
                Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(12.dp))
                    .background(FkColor.lime)
                    .clickable { vm.afterBookHome() }
                    .padding(13.dp),
            ) { Text("Done", style = FkType.bodySm.copy(color = FkColor.onLime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold), modifier = Modifier.fillMaxWidth(), textAlign = androidx.compose.ui.text.style.TextAlign.Center) }
        }
    }
}

@Composable
private fun HireFailure(state: AppState, vm: AppViewModel, pro: Pro, pkg: Package) {
    Column(
        Modifier.fillMaxWidth().padding(horizontal = 22.dp).padding(top = 32.dp, bottom = 26.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Box(
            Modifier
                .size(52.dp)
                .clip(CircleShape)
                .background(FkColor.alert14)
                .border(1.dp, FkColor.alertBd50, CircleShape),
            contentAlignment = Alignment.Center,
        ) { Text("!", style = FkType.h2.copy(color = FkColor.alert)) }
        Spacer(Modifier.height(16.dp))
        Text("Payment didn't go through", style = FkType.h1sm)
        Spacer(Modifier.height(8.dp))
        Text(
            "Your bank declined the card. Nothing was charged and ${pro.first} hasn't been booked yet.",
            style = FkType.body.copy(color = FkColor.text55),
            textAlign = androidx.compose.ui.text.style.TextAlign.Center,
        )
        Column(
            Modifier
                .fillMaxWidth()
                .padding(top = 18.dp)
                .clip(RoundedCornerShape(15.dp))
                .background(FkColor.nested)
                .border(1.dp, FkColor.line09, RoundedCornerShape(15.dp))
                .padding(horizontal = 14.dp, vertical = 13.dp),
            verticalArrangement = Arrangement.spacedBy(7.dp),
        ) {
            DetailRow("Attempted", money(pkg.amount))
            DetailRow("Reason", "DECLINED_BY_ISSUER")
        }
        Column(Modifier.fillMaxWidth().padding(top = 16.dp), verticalArrangement = Arrangement.spacedBy(9.dp)) {
            Box(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(FkColor.lime)
                    .clickable { vm.payWithUpi() }
                    .padding(14.dp),
            ) { Text("Pay with UPI instead", style = FkType.body.copy(color = FkColor.onLime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold), modifier = Modifier.fillMaxWidth(), textAlign = androidx.compose.ui.text.style.TextAlign.Center) }
            Box(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .border(1.dp, FkColor.line16, RoundedCornerShape(12.dp))
                    .clickable { vm.retryPay() }
                    .padding(13.dp),
            ) { Text("Try the card again", style = FkType.body.copy(color = FkColor.text), modifier = Modifier.fillMaxWidth(), textAlign = androidx.compose.ui.text.style.TextAlign.Center) }
        }
    }
}
