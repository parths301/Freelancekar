package com.freelancekar.app.ui.sheets

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.freelancekar.app.data.AppState
import com.freelancekar.app.data.ISSUE_REASONS
import com.freelancekar.app.data.cityOf
import com.freelancekar.app.data.currentBooking
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.Chip
import com.freelancekar.app.ui.components.PrimaryButton
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun IssueSheet(state: AppState, vm: AppViewModel) {
    val b = currentBooking(state)
    if (!state.issueOpen || b == null) return
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)

    ModalBottomSheet(
        onDismissRequest = { vm.closeIssue() },
        sheetState = sheetState,
        containerColor = FkColor.sheet,
    ) {
        Column(Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(bottom = 22.dp)) {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text("Raise an issue", style = FkType.sheetTitle)
                Text("✕", style = FkType.body.copy(color = FkColor.text50), modifier = Modifier.clickable { vm.closeIssue() })
            }
            Text(
                "Order ${b.id} with ${b.name}. Support in ${cityOf(state)} picks this up within 24 hours.",
                style = FkType.bodySm.copy(color = FkColor.text55),
                modifier = Modifier.padding(top = 9.dp),
            )

            androidx.compose.foundation.layout.FlowRow(
                modifier = Modifier.padding(top = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(7.dp),
            ) {
                ISSUE_REASONS.forEachIndexed { i, name ->
                    Chip(on = state.issueReason == i, onClick = { vm.setIssueReason(i) }, text = name)
                }
            }

            TextField(
                value = state.issueText,
                onValueChange = { vm.setIssueText(it) },
                placeholder = { Text("What happened? Dates, what was promised, what you got.", style = FkType.body.copy(color = FkColor.text42)) },
                modifier = Modifier
                    .fillMaxWidth()
                    .heightIn(min = 80.dp)
                    .padding(top = 14.dp)
                    .clip(RoundedCornerShape(13.dp))
                    .border(1.dp, FkColor.line09, RoundedCornerShape(13.dp)),
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = FkColor.nested, unfocusedContainerColor = FkColor.nested,
                    focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
                ),
                textStyle = FkType.body.copy(color = FkColor.text),
            )

            if (state.issueError) {
                Text("Add a couple of lines so support can act on it.", style = FkType.meta.copy(color = FkColor.alert), modifier = Modifier.padding(top = 9.dp))
            }

            PrimaryButton({ vm.submitIssue(b) }, modifier = Modifier.padding(top = 16.dp), text = "Send to support")

            Text(
                "FreelanceKar never holds your money, so nothing is frozen — support mediates and can pause the freelancer's listing while the case is open.",
                style = FkType.meta.copy(color = FkColor.text40),
                modifier = Modifier.padding(top = 13.dp),
            )
        }
    }
}
