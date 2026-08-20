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
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.*
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.Stripe
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@Composable
fun FreelancerProfileScreen(state: AppState, vm: AppViewModel) {
    val kyc = kycCount(state)
    val name = state.fName.trim().ifEmpty { "Your name" }

    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(horizontal = 20.dp).padding(top = 18.dp, bottom = 26.dp)) {
        Text("Profile", style = FkType.h1)
        Spacer(Modifier.height(18.dp))

        Row(verticalAlignment = Alignment.CenterVertically) {
            Stripe(Modifier.size(56.dp).clip(RoundedCornerShape(16.dp)).border(1.dp, FkColor.line09, RoundedCornerShape(16.dp)))
            Spacer(Modifier.width(13.dp))
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(name, style = FkType.screenTitle)
                    Spacer(Modifier.width(6.dp))
                    Box(Modifier.clip(RoundedCornerShape(5.dp)).background(FkColor.limeBadge).padding(horizontal = 6.dp, vertical = 3.dp)) {
                        Text(if (kyc == 3) "KYC ✔" else "KYC $kyc/3", style = FkType.monoSm.copy(color = FkColor.lime))
                    }
                }
                Text("Freelancer · ${CITIES[state.fCityIdx]}", style = FkType.meta.copy(color = FkColor.text50))
            }
        }

        Spacer(Modifier.height(20.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FpStat(validSvcRows(state).size.toString(), "services", Modifier.weight(1f))
            FpStat(state.quotesSent.toString(), "quotes sent", Modifier.weight(1f))
            FpStat(state.fGigs.size.toString(), "active gigs", Modifier.weight(1f))
        }

        Spacer(Modifier.height(18.dp))
        Text(state.fBio.trim().ifEmpty { "Add a line about your work so clients know what you do." }, style = FkType.body.copy(color = FkColor.text60))

        Spacer(Modifier.height(20.dp))
        Column(
            Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(15.dp))
                .background(FkColor.card)
                .border(1.dp, FkColor.line08, RoundedCornerShape(15.dp)),
        ) {
            Text(
                "Edit services & pricing",
                style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.Medium),
                modifier = Modifier.fillMaxWidth().border(0.dp, FkColor.line07).clickable { vm.addMoreServices() }.padding(14.dp),
            )
            Box(Modifier.fillMaxWidth().height(1.dp).background(FkColor.line07))
            Row(
                Modifier.fillMaxWidth().clickable { vm.go(Screen.FEARN) }.padding(14.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text("Payments & bank details", style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.Medium))
                Text("→", style = FkType.meta.copy(color = FkColor.lime))
            }
            Box(Modifier.fillMaxWidth().height(1.dp).background(FkColor.line07))
            Row(
                Modifier.fillMaxWidth().clickable { vm.backToClient() }.padding(14.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text("Switch to client mode", style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, color = FkColor.lime))
                Text("→", style = FkType.meta.copy(color = FkColor.lime))
            }
        }
    }
}

@Composable
private fun FpStat(value: String, label: String, modifier: Modifier = Modifier) {
    Column(
        modifier
            .clip(RoundedCornerShape(14.dp))
            .background(FkColor.card)
            .border(1.dp, FkColor.line08, RoundedCornerShape(14.dp))
            .padding(horizontal = 6.dp, vertical = 13.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(value, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, fontSize = androidx.compose.ui.unit.TextUnit(16f, androidx.compose.ui.unit.TextUnitType.Sp)))
        Spacer(Modifier.height(3.dp))
        Text(label, style = FkType.metaXs.copy(color = FkColor.text45))
    }
}
