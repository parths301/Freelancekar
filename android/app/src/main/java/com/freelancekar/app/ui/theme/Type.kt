package com.freelancekar.app.ui.theme

import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.em
import androidx.compose.ui.unit.sp

/**
 * Type scale mirrors the .t-* classes in src/app/globals.css. Named after the
 * role in the design handoff's typography table. Uses system sans/mono since
 * Archivo / JetBrains Mono font files aren't bundled in this MVP.
 */
object FkType {
    val onbH1 = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 26.sp, lineHeight = 30.sp, letterSpacing = (-0.025).em)
    val h1 = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 24.sp, letterSpacing = (-0.025).em)
    val hero = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 25.sp, lineHeight = 29.sp, letterSpacing = (-0.03).em)
    val h2 = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 22.sp, lineHeight = 26.sp, letterSpacing = (-0.02).em)
    val h1sm = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 21.sp, letterSpacing = (-0.02).em)
    val sheetTitle = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 17.sp, letterSpacing = (-0.02).em)
    val screenTitle = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 16.sp)
    val h3 = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 15.sp)
    val h4 = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
    val cardTitle = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 13.5.sp)
    val body = TextStyle(fontWeight = FontWeight.Normal, fontSize = 13.sp, lineHeight = 19.5.sp)
    val bodySm = TextStyle(fontWeight = FontWeight.Normal, fontSize = 12.5.sp, lineHeight = 19.4.sp)
    val meta = TextStyle(fontWeight = FontWeight.Normal, fontSize = 11.5.sp, lineHeight = 16.7.sp)
    val metaXs = TextStyle(fontWeight = FontWeight.Normal, fontSize = 10.5.sp, lineHeight = 14.2.sp)
    val tab = TextStyle(fontWeight = FontWeight.Medium, fontSize = 10.5.sp)
    val big = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 34.sp, letterSpacing = (-0.03).em)
    val quote = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 24.sp, letterSpacing = (-0.02).em)
    val monoLabel = TextStyle(fontFamily = FontFamily.Monospace, fontWeight = FontWeight.Medium, fontSize = 10.sp, letterSpacing = 0.07.em)
    val mono = TextStyle(fontFamily = FontFamily.Monospace, fontWeight = FontWeight.Medium, fontSize = 11.sp)
    val monoSm = TextStyle(fontFamily = FontFamily.Monospace, fontWeight = FontWeight.Medium, fontSize = 10.sp)
    val otp = TextStyle(fontFamily = FontFamily.Monospace, fontWeight = FontWeight.SemiBold, fontSize = 18.sp, letterSpacing = 0.4.em)
}

val Sp0: TextUnit = 0.sp
