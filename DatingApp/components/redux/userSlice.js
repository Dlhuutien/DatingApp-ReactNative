import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Lưu trữ thông tin người dùng hiện tại
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Lưu dữ liệu người dùng vào state
      state.currentUser = action.payload; 
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
