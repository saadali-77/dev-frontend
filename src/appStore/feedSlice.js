import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    updateFeed: (state, action) => action.payload,
    removeFeed: () => null,
  },
});

export const { updateFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;