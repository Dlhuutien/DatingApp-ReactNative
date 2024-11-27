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
    updateProfileDetails: (state, action) => {
      if (state.currentUser) {
        state.currentUser.profileDetails = {
          ...state.currentUser.profileDetails,
          ...action.payload,
        };
      }
    },
  },
});

export const { setUser, updateProfileDetails } = userSlice.actions;
export default userSlice.reducer;
