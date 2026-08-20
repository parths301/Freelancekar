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
import com.freelancekar.app.data.currentBooking
import com.freelancekar.app.ui.AppViewModel
import com.freelancekar.app.ui.components.PrimaryButton
import com.freelancekar.app.ui.theme.FkColor
import com.freelancekar.app.ui.theme.FkType

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ReviewSheet(state: AppState, vm: AppViewModel) {
    val b = currentBooking(state)
    if (!state.reviewOpen || b == null) return
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)

    ModalBottomSheet(
        onDismissRequest = { vm.closeReview() },
        sheetState = sheetState,
        containerColor = FkColor.sheet,
    ) {
        Column(Modifier.fillMaxWidth().padding(horizontal = 20.dp).padding(bottom = 22.dp)) {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text("Close out the job", style = FkType.sheetTitle)
                Text("✕", style = FkType.body.copy(color = FkColor.text50), modifier = Modifier.clickable { vm.closeReview() })
            }
            Text(
                "Confirm you've paid ${b.first} ${b.amount} directly. How was the work?",
                style = FkType.bodySm.copy(color = FkColor.text55),
                modifier = Modifier.padding(top = 9.dp),
            )

            Row(Modifier.padding(top = 16.dp)) {
                (1..5).forEach { n ->
                    Text(
                        "★",
                        style = FkType.h2.copy(color = if (n <= state.reviewStars) FkColor.amber else FkColor.text22),
                        modifier = Modifier.clickable { vm.setReviewStars(n) }.padding(end = 8.dp),
                    )
                }
            }

            TextField(
                value = state.reviewText,
                onValueChange = { vm.setReviewText(it) },
                placeholder = { Text("What went well? This shows on their profile.", style = FkType.body.copy(color = FkColor.text42)) },
                modifier = Modifier
                    .fillMaxWidth()
                    .heightIn(min = 70.dp)
                    .padding(top = 14.dp)
                    .clip(RoundedCornerShape(13.dp))
                    .border(1.dp, FkColor.line09, RoundedCornerShape(13.dp)),
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = FkColor.nested, unfocusedContainerColor = FkColor.nested,
                    focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
                ),
                textStyle = FkType.body.copy(color = FkColor.text),
            )

            if (state.reviewError) {
                Text("Pick a star rating first.", style = FkType.meta.copy(color = FkColor.alert), modifier = Modifier.padding(top = 9.dp))
            }

            PrimaryButton({ vm.submitReview(b) }, modifier = Modifier.padding(top = 16.dp), text = "Mark paid & post review")
        }
    }
}
