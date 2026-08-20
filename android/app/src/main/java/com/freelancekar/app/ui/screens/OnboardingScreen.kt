package com.freelancekar.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.*
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.BackButton
import com.freelancekar.app.ui.components.Chip
import com.freelancekar.app.ui.components.ErrorNote
import com.freelancekar.app.ui.components.PrimaryButton
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

private val BENEFITS = listOf(
    "List as many services as you do — one profile, many skills",
    "Clients near you see you first",
    "Clients pay you directly — you keep 100% of every job",
)

private val KYC_ITEMS = listOf(
    Triple("aadhaar", "Aadhaar", "ID check · never shown to clients"),
    Triple("pan", "PAN card", "For payouts above ₹20,000"),
    Triple("selfie", "Live selfie", "Matches your ID photo"),
)

@Composable
fun OnboardingScreen(state: AppState, vm: AppViewModel) {
    val cta = when {
        state.onbStep == 1 -> if (state.otpSent) "Verify & continue" else "Send OTP"
        state.onbStep == 4 -> "Continue to plan"
        else -> "Continue"
    }

    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        Row(Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(top = 16.dp), verticalAlignment = Alignment.CenterVertically) {
            BackButton { vm.onbBack() }
            Spacer(Modifier.width(4.dp))
            Box(
                Modifier
                    .weight(1f)
                    .height(3.dp)
                    .clip(RoundedCornerShape(2.dp))
                    .background(FkColor.track),
            ) {
                Box(
                    Modifier
                        .fillMaxHeight()
                        .fillMaxWidth(state.onbStep * 0.2f)
                        .background(FkColor.lime),
                )
            }
            Spacer(Modifier.width(4.dp))
            Text("${state.onbStep}/5", style = FkType.mono.copy(color = FkColor.text50))
        }

        when (state.onbStep) {
            1 -> StepPhone(state, vm)
            2 -> StepAbout(state, vm)
            3 -> StepVerify(state, vm)
            4 -> StepServices(state, vm)
            5 -> StepPlan(state, vm)
        }

        if (state.onbStep != 5) {
            Box(Modifier.padding(horizontal = 20.dp).padding(top = 22.dp, bottom = 26.dp)) {
                PrimaryButton({ vm.onbNext() }, text = cta)
            }
        }
    }
}

@Composable
private fun StepHead(title: String, body: String) {
    Text(title, style = FkType.onbH1)
    Spacer(Modifier.height(9.dp))
    Text(body, style = FkType.body.copy(color = FkColor.text50))
}

@Composable
private fun FieldLabel(text: String) {
    Text(text, style = FkType.monoLabel.copy(color = FkColor.text45))
}

@Composable
private fun StepPhone(state: AppState, vm: AppViewModel) {
    Column(Modifier.padding(horizontal = 20.dp).padding(top = 30.dp)) {
        StepHead("Start earning on FreelanceKar", "7-day free trial, then a simple monthly plan. Zero platform cut on your jobs, ever.")

        Spacer(Modifier.height(24.dp))
        FieldLabel("MOBILE NUMBER")
        Spacer(Modifier.height(8.dp))
        Row(
            Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(13.dp))
                .background(FkColor.card)
                .border(1.dp, FkColor.line09, RoundedCornerShape(13.dp))
                .padding(horizontal = 14.dp, vertical = 4.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text("+91", style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.Medium, color = FkColor.text50))
            Spacer(Modifier.width(10.dp))
            TextField(
                value = state.phone,
                onValueChange = { vm.setPhone(it) },
                placeholder = { Text("98765 43210", style = FkType.body.copy(color = FkColor.text42)) },
                modifier = Modifier.weight(1f),
                singleLine = true,
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = FkColor.card, unfocusedContainerColor = FkColor.card,
                    focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
                ),
                textStyle = FkType.body.copy(color = FkColor.text),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
            )
        }

        if (state.otpSent) {
            Spacer(Modifier.height(16.dp))
            FieldLabel("OTP SENT · USE 1234")
            Spacer(Modifier.height(8.dp))
            TextField(
                value = state.otp,
                onValueChange = { vm.setOtp(it) },
                placeholder = { Text("1234", style = FkType.otp.copy(color = FkColor.text42)) },
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(13.dp))
                    .border(1.dp, FkColor.line09, RoundedCornerShape(13.dp)),
                singleLine = true,
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = FkColor.card, unfocusedContainerColor = FkColor.card,
                    focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
                ),
                textStyle = FkType.otp.copy(color = FkColor.text),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.NumberPassword),
            )
        }

        if (state.onbErrorMsg.isNotEmpty()) ErrorNote(state.onbErrorMsg)

        Spacer(Modifier.height(26.dp))
        Column(verticalArrangement = Arrangement.spacedBy(11.dp)) {
            BENEFITS.forEach { b ->
                Row {
                    Text("✔", style = FkType.body.copy(color = FkColor.lime))
                    Spacer(Modifier.width(11.dp))
                    Text(b, style = FkType.bodySm.copy(color = FkColor.text60))
                }
            }
        }
    }
}

@Composable
private fun StepAbout(state: AppState, vm: AppViewModel) {
    Column(Modifier.padding(horizontal = 20.dp).padding(top = 30.dp)) {
        StepHead("About you", "This is what clients see at the top of your profile.")

        Spacer(Modifier.height(22.dp))
        FieldLabel("NAME OR STUDIO NAME")
        Spacer(Modifier.height(8.dp))
        TextField(
            value = state.fName,
            onValueChange = { vm.setFName(it) },
            placeholder = { Text("e.g. Rahul Verma / Studio Aarambh", style = FkType.body.copy(color = FkColor.text42)) },
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(13.dp))
                .border(1.dp, FkColor.line09, RoundedCornerShape(13.dp)),
            singleLine = true,
            colors = TextFieldDefaults.colors(
                focusedContainerColor = FkColor.card, unfocusedContainerColor = FkColor.card,
                focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
            ),
            textStyle = FkType.body.copy(color = FkColor.text, fontWeight = androidx.compose.ui.text.font.FontWeight.Medium),
        )

        Spacer(Modifier.height(18.dp))
        FieldLabel("YOUR CITY")
        Spacer(Modifier.height(8.dp))
        androidx.compose.foundation.layout.FlowRow(horizontalArrangement = Arrangement.spacedBy(7.dp)) {
            CITIES.forEachIndexed { i, c ->
                Chip(on = state.fCityIdx == i, onClick = { vm.setFCity(i) }, text = c)
            }
        }

        Spacer(Modifier.height(18.dp))
        FieldLabel("HOW FAR YOU'LL TRAVEL")
        Spacer(Modifier.height(8.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(7.dp)) {
            RADIUS_LABELS.forEachIndexed { i, r ->
                Box(Modifier.weight(1f)) {
                    Chip(on = state.fRadiusIdx == i, onClick = { vm.setFRadius(i) }, text = r, modifier = Modifier.fillMaxWidth())
                }
            }
        }

        Spacer(Modifier.height(18.dp))
        FieldLabel("ONE LINE ABOUT YOUR WORK")
        Spacer(Modifier.height(8.dp))
        TextField(
            value = state.fBio,
            onValueChange = { vm.setFBio(it) },
            placeholder = { Text("Reels and product shoots for cafés and local brands.", style = FkType.body.copy(color = FkColor.text42)) },
            modifier = Modifier
                .fillMaxWidth()
                .heightIn(min = 62.dp)
                .clip(RoundedCornerShape(13.dp))
                .border(1.dp, FkColor.line09, RoundedCornerShape(13.dp)),
            colors = TextFieldDefaults.colors(
                focusedContainerColor = FkColor.card, unfocusedContainerColor = FkColor.card,
                focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
            ),
            textStyle = FkType.bodySm.copy(color = FkColor.text),
        )

        if (state.onbErrorMsg.isNotEmpty()) ErrorNote(state.onbErrorMsg)
    }
}

@Composable
private fun StepVerify(state: AppState, vm: AppViewModel) {
    Column(Modifier.padding(horizontal = 20.dp).padding(top = 30.dp)) {
        StepHead("Get verified", "Verified profiles get roughly 3× more enquiries. Your documents are never shown to clients.")

        Spacer(Modifier.height(22.dp))
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            KYC_ITEMS.forEach { (key, name, note) ->
                val on = when (key) { "aadhaar" -> state.kyc.aadhaar; "pan" -> state.kyc.pan; else -> state.kyc.selfie }
                Row(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(14.dp))
                        .background(FkColor.card)
                        .border(1.dp, if (on) FkColor.lime else FkColor.line08, RoundedCornerShape(14.dp))
                        .clickable { vm.toggleKyc(key) }
                        .padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text(if (on) "✔" else "＋", style = FkType.body.copy(color = if (on) FkColor.lime else FkColor.text45))
                    Spacer(Modifier.width(12.dp))
                    Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(3.dp)) {
                        Text(name, style = FkType.cardTitle)
                        Text(note, style = FkType.meta.copy(color = FkColor.text50))
                    }
                    Text(if (on) "DONE" else "UPLOAD", style = FkType.monoSm.copy(color = if (on) FkColor.lime else FkColor.text45))
                }
            }
        }

        Spacer(Modifier.height(16.dp))
        Row(
            Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(14.dp))
                .background(FkColor.card)
                .border(1.dp, FkColor.line08, RoundedCornerShape(14.dp))
                .padding(14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(3.dp)) {
                Text("Bank account for payouts", style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
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

        if (state.onbErrorMsg.isNotEmpty()) ErrorNote(state.onbErrorMsg)

        Spacer(Modifier.height(14.dp))
        Text("Tap each item to simulate an upload.", style = FkType.meta.copy(color = FkColor.text40))
    }
}

@Composable
private fun StepServices(state: AppState, vm: AppViewModel) {
    Column(Modifier.padding(horizontal = 20.dp).padding(top = 30.dp)) {
        StepHead("What do you offer?", "Add every service you do. Each one gets listed separately, so you show up in more searches.")

        Spacer(Modifier.height(20.dp))
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            state.svcRows.forEachIndexed { i, r ->
                Column(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(15.dp))
                        .background(FkColor.card)
                        .border(1.dp, FkColor.line09, RoundedCornerShape(15.dp))
                        .padding(13.dp),
                ) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text("SERVICE ${i + 1}", style = FkType.monoLabel.copy(color = FkColor.text40))
                        Text("✕", style = FkType.body.copy(color = FkColor.text40), modifier = Modifier.clickable { vm.removeSvcRow(i) })
                    }

                    Spacer(Modifier.height(9.dp))
                    Row(
                        Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(11.dp))
                            .background(FkColor.nested)
                            .border(1.dp, FkColor.line09, RoundedCornerShape(11.dp))
                            .clickable { vm.updRow(i, cat = (r.cat + 1) % SVC_CATS.size) }
                            .padding(horizontal = 12.dp, vertical = 11.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                    ) {
                        Text(SVC_CATS[r.cat], style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                        Text("▾", style = FkType.metaXs.copy(color = FkColor.text40))
                    }

                    Spacer(Modifier.height(8.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(7.dp)) {
                        SVC_TYPES.forEachIndexed { ti, (name, _) ->
                            Box(Modifier.weight(1f)) {
                                Chip(on = r.type == ti, onClick = { vm.updRow(i, type = ti) }, text = name, modifier = Modifier.fillMaxWidth())
                            }
                        }
                    }

                    Spacer(Modifier.height(8.dp))
                    Row(
                        Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(11.dp))
                            .background(FkColor.nested)
                            .border(1.dp, FkColor.line09, RoundedCornerShape(11.dp))
                            .padding(horizontal = 12.dp, vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Text("₹", style = FkType.body.copy(color = FkColor.text50))
                        Spacer(Modifier.width(9.dp))
                        TextField(
                            value = r.amount,
                            onValueChange = { vm.updRow(i, amount = it.filter { c -> c.isDigit() }.take(7)) },
                            placeholder = { Text("1500", style = FkType.body.copy(color = FkColor.text42)) },
                            modifier = Modifier.weight(1f),
                            singleLine = true,
                            colors = TextFieldDefaults.colors(
                                focusedContainerColor = FkColor.nested, unfocusedContainerColor = FkColor.nested,
                                focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
                            ),
                            textStyle = FkType.body.copy(color = FkColor.text, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold),
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        )
                        Text(SVC_TYPES[r.type].second, style = FkType.meta.copy(color = FkColor.text45))
                    }
                }
            }
        }

        Spacer(Modifier.height(11.dp))
        Box(
            Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(13.dp))
                .border(1.dp, FkColor.limeBd40, RoundedCornerShape(13.dp))
                .clickable { vm.addSvcRow() }
                .padding(13.dp),
        ) {
            Text("+ Add another service", style = FkType.meta.copy(color = FkColor.lime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold), modifier = Modifier.fillMaxWidth(), textAlign = androidx.compose.ui.text.style.TextAlign.Center)
        }

        if (state.onbErrorMsg.isNotEmpty()) ErrorNote(state.onbErrorMsg)
    }
}

@Composable
private fun StepPlan(state: AppState, vm: AppViewModel) {
    Column(Modifier.padding(horizontal = 20.dp).padding(top = 30.dp, bottom = 26.dp)) {
        StepHead("Choose your plan", "Clients pay you directly by UPI or cash — FreelanceKar never touches that money. This plan just keeps your profile listed and searchable.")

        Spacer(Modifier.height(22.dp))
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            PLANS.forEachIndexed { i, p ->
                Column(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(15.dp))
                        .background(FkColor.card)
                        .border(1.dp, if (i == state.planIdx) FkColor.lime else FkColor.line08, RoundedCornerShape(15.dp))
                        .clickable { vm.subscribeAndPublish(i) }
                        .padding(15.dp),
                ) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Bottom) {
                        Text(p.name, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, fontSize = androidx.compose.ui.unit.TextUnit(15f, androidx.compose.ui.unit.TextUnitType.Sp)))
                        Text(p.price, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, fontSize = androidx.compose.ui.unit.TextUnit(15f, androidx.compose.ui.unit.TextUnitType.Sp), color = if (i == state.planIdx) FkColor.lime else FkColor.text))
                    }
                    Spacer(Modifier.height(6.dp))
                    Text(p.note, style = FkType.meta.copy(color = FkColor.text55))
                }
            }
        }

        Spacer(Modifier.height(16.dp))
        Text("Billed via Razorpay. Cancel anytime — your profile stays live until the period ends.", style = FkType.meta.copy(color = FkColor.text40))
    }
}
