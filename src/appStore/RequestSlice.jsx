import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests:(state, action) => action.payload,
    removeRequests:  (state,action) => {
        const newArray= state.filter(r=>r._id !==action.payload)
        return newArray
    }
  }
});

export const { addRequests, removeRequests } = RequestSlice.actions;
export default RequestSlice.reducer;