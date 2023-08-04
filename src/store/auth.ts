import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  accessToken: string | null;
  user: IUser | null;
}

const initialState: State = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ accessToken: string; user: IUser }>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    logoutUser: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
