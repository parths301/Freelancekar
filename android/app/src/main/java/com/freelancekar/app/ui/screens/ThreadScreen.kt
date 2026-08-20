package com.freelancekar.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
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
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.*
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.BackButton
import com.freelancekar.app.ui.components.Stripe
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

private data class QuoteStatusInfo(val client: String, val freelancer: String, val color: Color, val border: Color)

private fun quoteStatus(status: String): QuoteStatusInfo = when (status) {
    "pending" -> QuoteStatusInfo("AWAITING YOUR REPLY", "SENT · AWAITING REPLY", FkColor.amber, FkColor.amber.copy(alpha = 0.45f))
    "accepted" -> QuoteStatusInfo("ACCEPTED · BOOKED", "ACCEPTED · BOOKED", FkColor.lime, FkColor.lime)
    else -> QuoteStatusInfo("DECLINED", "DECLINED", FkColor.text40, FkColor.line08)
}

@Composable
fun ThreadScreen(state: AppState, vm: AppViewModel) {
    val t = currentThread(state)
    val q = t?.quote
    val status = q?.let { quoteStatus(it.status) }

    Column(Modifier.fillMaxSize()) {
        Row(
            Modifier.fillMaxWidth().border(0.dp, FkColor.line08).padding(horizontal = 18.dp, vertical = 14.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            BackButton { vm.go(Screen.CHATS) }
            Spacer(Modifier.width(4.dp))
            Stripe(Modifier.size(34.dp).clip(RoundedCornerShape(11.dp)))
            Spacer(Modifier.width(12.dp))
            Column {
                Text(t?.name ?: "", style = FkType.h4)
                Text("Usually replies in 15 min", style = FkType.metaXs.copy(color = FkColor.text45))
            }
        }

        Column(
            Modifier.weight(1f).verticalScroll(rememberScrollState()).padding(horizontal = 18.dp).padding(top = 16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp),
        ) {
            (t?.msgs ?: emptyList()).forEach { m ->
                val mine = m.from == "me"
                Row(Modifier.fillMaxWidth(), horizontalArrangement = if (mine) Arrangement.End else Arrangement.Start) {
                    Column(
                        Modifier
                            .fillMaxWidth(0.78f)
                            .wrapContentWidth(if (mine) Alignment.End else Alignment.Start)
                            .clip(RoundedCornerShape(topStart = 15.dp, topEnd = 15.dp, bottomStart = if (mine) 15.dp else 5.dp, bottomEnd = if (mine) 5.dp else 15.dp))
                            .background(if (mine) FkColor.limeBadge else FkColor.card)
                            .border(1.dp, if (mine) FkColor.limeBd35 else FkColor.line08, RoundedCornerShape(topStart = 15.dp, topEnd = 15.dp, bottomStart = if (mine) 15.dp else 5.dp, bottomEnd = if (mine) 5.dp else 15.dp))
                            .padding(horizontal = 13.dp, vertical = 10.dp),
                    ) {
                        Text(m.text, style = FkType.body)
                        Spacer(Modifier.height(5.dp))
                        Text(m.ts, style = FkType.monoSm.copy(color = FkColor.text.copy(alpha = 0.5f)), modifier = Modifier.align(Alignment.End))
                    }
                }
            }

            if (q != null && status != null) {
                Column(
                    Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(17.dp))
                        .background(FkColor.card)
                        .border(1.dp, status.border, RoundedCornerShape(17.dp))
                        .padding(15.dp),
                ) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        com.freelancekar.app.ui.components.MonoLabel("QUOTE")
                        Text(if (state.freelancerMode) status.freelancer else status.client, style = FkType.monoSm.copy(color = status.color))
                    }
                    Spacer(Modifier.height(8.dp))
                    Text(money(q.amount), style = FkType.quote)
                    Spacer(Modifier.height(3.dp))
                    Text("${q.service} · delivery in ${q.days}", style = FkType.meta.copy(color = FkColor.text50))
                    Spacer(Modifier.height(11.dp))
                    Text(q.msg, style = FkType.bodySm.copy(color = FkColor.text.copy(alpha = 0.62f)))

                    if (q.status == "pending" && !state.freelancerMode) {
                        Row(
                            Modifier.fillMaxWidth().padding(top = 14.dp).border(0.dp, FkColor.line07).padding(top = 13.dp),
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                        ) {
                            Box(
                                Modifier
                                    .weight(1f)
                                    .clip(RoundedCornerShape(11.dp))
                                    .border(1.dp, FkColor.line14, RoundedCornerShape(11.dp))
                                    .clickable { vm.declineQuote() }
                                    .padding(11.dp),
                            ) { Text("Decline", style = FkType.bodySm.copy(color = FkColor.text.copy(alpha = 0.7f)), textAlign = androidx.compose.ui.text.style.TextAlign.Center, modifier = Modifier.fillMaxWidth()) }
                            Box(
                                Modifier
                                    .weight(1.4f)
                                    .clip(RoundedCornerShape(11.dp))
                                    .background(FkColor.lime)
                                    .clickable { vm.acceptQuote() }
                                    .padding(11.dp),
                            ) { Text("Accept quote", style = FkType.bodySm.copy(color = FkColor.onLime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold), textAlign = androidx.compose.ui.text.style.TextAlign.Center, modifier = Modifier.fillMaxWidth()) }
                        }
                    }

                    if (q.status == "accepted") {
                        Box(
                            Modifier
                                .fillMaxWidth()
                                .padding(top = 13.dp)
                                .clip(RoundedCornerShape(11.dp))
                                .border(1.dp, FkColor.line14, RoundedCornerShape(11.dp))
                                .clickable { vm.openOrderFromThread() }
                                .padding(11.dp),
                        ) { Text("View order", style = FkType.meta.copy(color = FkColor.lime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold), textAlign = androidx.compose.ui.text.style.TextAlign.Center, modifier = Modifier.fillMaxWidth()) }
                    }
                }
            }

            if (state.typing) {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Start) {
                    Box(
                        Modifier
                            .clip(RoundedCornerShape(topStart = 15.dp, topEnd = 15.dp, bottomStart = 5.dp, bottomEnd = 15.dp))
                            .background(FkColor.card)
                            .border(1.dp, FkColor.line08, RoundedCornerShape(topStart = 15.dp, topEnd = 15.dp, bottomStart = 5.dp, bottomEnd = 15.dp))
                            .padding(horizontal = 14.dp, vertical = 11.dp),
                    ) {
                        Text("typing…", style = FkType.body.copy(color = FkColor.text45))
                    }
                }
            }
            Spacer(Modifier.height(8.dp))
        }
    }
}

/** Replaces the tab bar while a thread is open. */
@Composable
fun ThreadComposer(state: AppState, vm: AppViewModel) {
    Row(
        Modifier
            .fillMaxWidth()
            .background(FkColor.bar)
            .border(1.dp, FkColor.line08)
            .padding(horizontal = 18.dp)
            .padding(top = 12.dp, bottom = 20.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(9.dp),
    ) {
        TextField(
            value = state.draft,
            onValueChange = { vm.setDraft(it) },
            placeholder = { Text("Write a message", style = FkType.body.copy(color = FkColor.text42)) },
            modifier = Modifier
                .weight(1f)
                .clip(RoundedCornerShape(12.dp))
                .border(1.dp, FkColor.line09, RoundedCornerShape(12.dp)),
            singleLine = true,
            colors = TextFieldDefaults.colors(
                focusedContainerColor = FkColor.card, unfocusedContainerColor = FkColor.card,
                focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
            ),
            textStyle = FkType.body.copy(color = FkColor.text),
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Send),
            keyboardActions = KeyboardActions(onSend = { vm.sendMsg() }),
        )
        Box(
            Modifier
                .clip(RoundedCornerShape(12.dp))
                .background(FkColor.lime)
                .clickable { vm.sendMsg() }
                .padding(horizontal = 15.dp, vertical = 15.dp),
        ) {
            Text("Send", style = FkType.meta.copy(color = FkColor.onLime, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold))
        }
    }
}
