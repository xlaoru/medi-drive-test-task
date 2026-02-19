import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ServiceLog } from "../utils/models"

interface LogsState {
  logs: ServiceLog[]
}

const initialState: LogsState = {
  logs: [],
}

const serviceLogsSlice = createSlice({
  name: "serviceLogs",
  initialState,
  reducers: {
    addLog(state, action: PayloadAction<ServiceLog>) {
      state.logs.push(action.payload)
    },
    updateLog(state, action: PayloadAction<ServiceLog>) {
      const index = state.logs.findIndex((l) => l.id === action.payload.id)
      if (index !== -1) state.logs[index] = action.payload
    },
    deleteLog(state, action: PayloadAction<string>) {
      state.logs = state.logs.filter((l) => l.id !== action.payload)
    },
  },
})

export const { addLog, updateLog, deleteLog } = serviceLogsSlice.actions
export default serviceLogsSlice.reducer
