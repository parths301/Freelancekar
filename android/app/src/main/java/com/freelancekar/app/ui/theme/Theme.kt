package com.freelancekar.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val FkDarkScheme = darkColorScheme(
    primary = FkColor.lime,
    onPrimary = FkColor.onLime,
    secondary = FkColor.amber,
    background = FkColor.bg,
    onBackground = FkColor.text,
    surface = FkColor.card,
    onSurface = FkColor.text,
    error = FkColor.alert,
    onError = FkColor.onAlert,
)

@Composable
fun FreelanceKarTheme(content: @Composable () -> Unit) {
    // FreelanceKar is dark-first by design (lime/amber accents on near-black).
    MaterialTheme(
        colorScheme = FkDarkScheme,
        content = content,
    )
}
