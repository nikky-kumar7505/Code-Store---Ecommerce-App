import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: { pendingCount: 0 },
  reducers: {
    requestStarted: (state) => {
      state.pendingCount += 1;
    },
    requestEnded: (state) => {
      state.pendingCount = Math.max(0, state.pendingCount - 1);
    },
  },
});

export const { requestStarted, requestEnded } = loadingSlice.actions;
export const selectIsGlobalLoading = (state) => state.loading.pendingCount > 0;
export default loadingSlice.reducer;
