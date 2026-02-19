import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ServiceLog } from "../utils/models"

interface DraftState {
  draft: Partial<ServiceLog> | null
  saving: boolean
  saved: boolean
}

const initialState: DraftState = {
  draft: null,
  saving: false,
  saved: false,
}

const draftsSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    setDraft(state, action: PayloadAction<Partial<ServiceLog>>) {
      state.draft = action.payload
    },
    setSaving(state, action: PayloadAction<boolean>) {
      state.saving = action.payload
    },
    setSaved(state, action: PayloadAction<boolean>) {
      state.saved = action.payload
    },
    deleteDraft(state) {
      state.draft = null
    },
    clearAllDrafts(state) {
      state.draft = null
    },
  },
})

export const { setDraft, setSaving, setSaved, deleteDraft, clearAllDrafts } =
  draftsSlice.actions

export default draftsSlice.reducer
