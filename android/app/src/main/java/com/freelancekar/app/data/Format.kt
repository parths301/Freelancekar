package com.freelancekar.app.data

import java.util.Locale

/**
 * Rupee amounts always use Indian digit grouping — ₹1,40,000, never ₹140,000.
 * java.text.NumberFormat with Locale("en", "IN") produces this grouping natively.
 */
private val inLocale = Locale("en", "IN")

fun money(n: Int): String {
    // Indian grouping: last 3 digits, then groups of 2.
    val neg = n < 0
    val s = kotlin.math.abs(n).toString()
    val grouped = if (s.length <= 3) {
        s
    } else {
        val head = s.substring(0, s.length - 3)
        val tail = s.substring(s.length - 3)
        val headGrouped = StringBuilder()
        var i = head.length
        var first = true
        while (i > 0) {
            val start = maxOf(0, i - 2)
            val part = head.substring(start, i)
            if (!first) headGrouped.insert(0, ",")
            headGrouped.insert(0, part)
            i = start
            first = false
        }
        "$headGrouped,$tail"
    }
    return (if (neg) "-₹" else "₹") + grouped
}

fun digitsOnly(v: String, max: Int): String = v.filter { it.isDigit() }.take(max)
