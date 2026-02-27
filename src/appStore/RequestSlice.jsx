import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests:(state, action) => action.payload,
    removeRequests:  () => null,
  }
});

export const { addRequests, removeRequests } = RequestSlice.actions;
export default RequestSlice.reducer;