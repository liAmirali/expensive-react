import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  user: IUser | null;
}

const initialState: State = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
