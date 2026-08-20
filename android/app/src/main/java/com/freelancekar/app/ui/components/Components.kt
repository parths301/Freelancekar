package com.freelancekar.app.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@Composable
fun PrimaryButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    text: String,
) {
    Button(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier.fillMaxWidth().height(50.dp),
        shape = RoundedCornerShape(13.dp),
        colors = ButtonDefaults.buttonColors(containerColor = FkColor.lime, contentColor = FkColor.onLime, disabledContainerColor = FkColor.lime.copy(alpha = 0.7f)),
    ) {
        Text(text, style = FkType.h4)
    }
}

@Composable
fun OutlineButton(onClick: () -> Unit, modifier: Modifier = Modifier, text: String) {
    OutlinedButton(
        onClick = onClick,
        modifier = modifier.fillMaxWidth().height(46.dp),
        shape = RoundedCornerShape(13.dp),
        border = BorderStroke(1.dp, FkColor.line14),
        colors = ButtonDefaults.outlinedButtonColors(contentColor = FkColor.text),
    ) {
        Text(text, style = FkType.body)
    }
}

@Composable
fun InlineButton(onClick: () -> Unit, modifier: Modifier = Modifier, text: String) {
    Button(
        onClick = onClick,
        modifier = modifier,
        shape = RoundedCornerShape(10.dp),
        contentPadding = PaddingValues(horizontal = 15.dp, vertical = 10.dp),
        colors = ButtonDefaults.buttonColors(containerColor = FkColor.lime, contentColor = FkColor.onLime),
    ) {
        Text(text, style = FkType.meta.copy(color = FkColor.onLime))
    }
}

@Composable
fun InlineOutlineButton(onClick: () -> Unit, modifier: Modifier = Modifier, text: String) {
    OutlinedButton(
        onClick = onClick,
        modifier = modifier,
        shape = RoundedCornerShape(10.dp),
        contentPadding = PaddingValues(horizontal = 13.dp, vertical = 9.dp),
        border = BorderStroke(1.dp, FkColor.line14),
        colors = ButtonDefaults.outlinedButtonColors(contentColor = FkColor.text),
    ) {
        Text(text, style = FkType.meta)
    }
}

@Composable
fun Chip(on: Boolean, onClick: () -> Unit, text: String, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .clip(CircleShape)
            .background(if (on) FkColor.lime else FkColor.card)
            .border(1.dp, if (on) FkColor.lime else FkColor.line09, CircleShape)
            .clickable(onClick = onClick)
            .padding(horizontal = 13.dp, vertical = 8.dp),
    ) {
        Text(text, style = FkType.meta.copy(color = if (on) FkColor.onLime else Color(0xBFF2F2F0)))
    }
}

@Composable
fun Stripe(modifier: Modifier = Modifier, content: (@Composable BoxScope.() -> Unit)? = null) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(14.dp))
            .background(Brush.linearGradient(listOf(FkColor.stripeA, FkColor.stripeB, FkColor.stripeA))),
        contentAlignment = Alignment.Center,
    ) {
        content?.invoke(this)
    }
}

@Composable
fun SectionTitle(title: String, modifier: Modifier = Modifier, right: (@Composable () -> Unit)? = null) {
    Row(modifier = modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Bottom) {
        Text(title, style = FkType.h3)
        right?.invoke()
    }
}

@Composable
fun BackButton(onClick: () -> Unit) {
    IconButton(onClick = onClick, modifier = Modifier.size(32.dp)) {
        Text("←", color = FkColor.text60)
    }
}

@Composable
fun ErrorNote(text: String) {
    Text(text, style = FkType.meta.copy(color = FkColor.alert), modifier = Modifier.padding(top = 10.dp))
}

@Composable
fun EmptyState(glyph: String, body: String, title: String? = null) {
    Column(
        modifier = Modifier.fillMaxWidth().padding(horizontal = 26.dp, vertical = 60.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(glyph, style = androidx.compose.ui.text.TextStyle(fontSize = 22.sp, color = FkColor.text28))
        if (title != null) {
            Spacer(Modifier.height(14.dp))
            Text(title, style = FkType.screenTitle)
        }
        Spacer(Modifier.height(12.dp))
        Text(body, style = FkType.body.copy(color = FkColor.text45), textAlign = TextAlign.Center)
    }
}

/** Uppercase mono status chip — colour + label, never colour alone. */
@Composable
fun StatusText(label: String, color: Color) {
    Text(label, style = FkType.monoSm.copy(color = color))
}

@Composable
fun MonoLabel(text: String) {
    Text(text, style = FkType.monoLabel.copy(color = FkColor.text45))
}
