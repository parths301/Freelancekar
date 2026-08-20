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
import com.freelancekar.app.ui.components.BackButton
import com.freelancekar.app.ui.components.OutlineButton
import com.freelancekar.app.ui.components.PrimaryButton
import com.freelancekar.app.ui.components.Stripe
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

private val ORDER_SEQ = listOf(BookingStatus.AWAITING, BookingStatus.IN_PROGRESS, BookingStatus.DELIVERED, BookingStatus.APPROVED)

@Composable
fun OrderScreen(state: AppState, vm: AppViewModel) {
    val b = currentBooking(state) ?: return
    val at = ORDER_SEQ.indexOf(b.status)
    val complete = b.status == BookingStatus.APPROVED
    val issue = b.issue

    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState())) {
        Row(Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(top = 16.dp), verticalAlignment = Alignment.CenterVertically) {
            BackButton { vm.go(Screen.YOU) }
            Spacer(Modifier.width(4.dp))
            Text("Order ${b.id}", style = FkType.screenTitle)
        }

        Column(
            Modifier
                .padding(horizontal = 20.dp)
                .padding(top = 20.dp)
                .fillMaxWidth()
                .clip(RoundedCornerShape(18.dp))
                .background(FkColor.card)
                .border(1.dp, FkColor.line08, RoundedCornerShape(18.dp))
                .padding(16.dp),
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Stripe(Modifier.size(44.dp).clip(RoundedCornerShape(13.dp)))
                Spacer(Modifier.width(12.dp))
                Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(3.dp)) {
                    Text(b.name, style = FkType.h4)
                    Text(b.service, style = FkType.meta.copy(color = FkColor.text50))
                }
            }
            Row(
                Modifier.fillMaxWidth().padding(top = 14.dp).border(0.dp, FkColor.line07).padding(top = 13.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Column {
                    Text(b.amount, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, fontSize = androidx.compose.ui.unit.TextUnit(18f, androidx.compose.ui.unit.TextUnitType.Sp)))
                    Text(if (complete) "Paid to ${b.first} directly" else "Pay ${b.first} directly", style = FkType.meta.copy(color = if (complete) FkColor.text45 else FkColor.lime))
                }
                Text(ORDER_STATUS_LABEL[b.status] ?: "", style = FkType.monoSm.copy(color = if (complete) FkColor.text45 else FkColor.lime))
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 22.dp)) {
            Text("Progress", style = FkType.h3)
            Spacer(Modifier.height(13.dp))
            ORDER_STEPS.forEachIndexed { i, (title, note) ->
                val reached = i <= at
                val last = i == ORDER_STEPS.size - 1
                Row(Modifier.fillMaxWidth()) {
                    Column(Modifier.width(18.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                        Box(
                            Modifier
                                .size(11.dp)
                                .clip(CircleShape)
                                .background(if (reached) FkColor.lime else FkColor.bg)
                                .border(2.dp, if (reached) FkColor.lime else FkColor.line18, CircleShape),
                        )
                        if (!last) {
                            Box(Modifier.width(1.dp).height(26.dp).background(if (i < at) FkColor.lime else FkColor.line12))
                        }
                    }
                    Column(Modifier.weight(1f).padding(start = 13.dp, bottom = 16.dp), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                        Text(title, style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, color = if (reached) FkColor.text else FkColor.text40))
                        Text(if (reached) note else "—", style = FkType.meta.copy(color = FkColor.text45))
                    }
                }
            }
        }

        if (b.review != null) {
            Column(Modifier.padding(horizontal = 20.dp).padding(top = 4.dp)) {
                Column(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(15.dp))
                        .background(FkColor.card)
                        .border(1.dp, FkColor.line08, RoundedCornerShape(15.dp))
                        .padding(14.dp),
                ) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text("Your review", style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
                        Text("★".repeat(b.review.stars), style = FkType.meta.copy(color = FkColor.amber))
                    }
                    Spacer(Modifier.height(9.dp))
                    Text(b.review.text, style = FkType.bodySm.copy(color = FkColor.text60))
                }
            }
        }

        if (issue != null) {
            Column(Modifier.padding(horizontal = 20.dp).padding(top = 4.dp)) {
                Column(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(15.dp))
                        .background(FkColor.alert08)
                        .border(1.dp, FkColor.alertBd35, RoundedCornerShape(15.dp))
                        .padding(14.dp),
                ) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text("Issue · ${issue.ref}", style = FkType.body.copy(fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold, color = FkColor.alert))
                        Text(if (issue.status == "open") "SUPPORT REVIEWING" else "SUPPORT REPLIED", style = FkType.monoSm.copy(color = if (issue.status == "open") FkColor.amber else FkColor.lime))
                    }
                    Spacer(Modifier.height(5.dp))
                    Text(issue.reason, style = FkType.meta.copy(color = FkColor.text55))
                    Spacer(Modifier.height(9.dp))
                    val firstOrDefault = b.first.ifEmpty { "the freelancer" }
                    Text(
                        if (issue.status == "open") "Raised with the support team. Keep any files or messages from $firstOrDefault — you'll get a reply within 24 hours."
                        else "Support has spoken to $firstOrDefault and paused their listing while this is open. Add anything else in chat.",
                        style = FkType.bodySm.copy(color = FkColor.text60),
                    )
                }
            }
        }

        Column(Modifier.padding(horizontal = 20.dp).padding(top = 18.dp, bottom = 26.dp), verticalArrangement = Arrangement.spacedBy(9.dp)) {
            if (b.status == BookingStatus.DELIVERED) {
                PrimaryButton({ vm.openReview() }, text = "Mark complete & rate")
            }
            OutlineButton({ b.proId.let { vm.openThreadPublic(it) } }, text = "Message ${b.first}")
            if (issue == null) {
                Text(
                    "Raise an issue",
                    style = FkType.meta.copy(color = FkColor.text55),
                    modifier = Modifier.fillMaxWidth().clickable { vm.openIssue() }.padding(6.dp),
                    textAlign = androidx.compose.ui.text.style.TextAlign.Center,
                )
            }
        }
    }
}
