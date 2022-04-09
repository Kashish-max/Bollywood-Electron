import { createSlice } from "@reduxjs/toolkit";

interface IAppState {
  isAuthenticated: boolean;
  navClassActive: boolean;
  authUser: any | null;
  allUsers: any | null;
}

const initialState: IAppState = {
  isAuthenticated: false,
  navClassActive: false,
  authUser: null,
  allUsers: null,
};

const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setNavClassActive: (state, action) => {
      state.navClassActive = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    sortAllUsers: (state) => {
      state.allUsers.Players.sort((a:any, b:any) => b.Score - a.Score);
    },
  },
});

export const { setIsAuthenticated, setNavClassActive, setAuthUser, setAllUsers, sortAllUsers } = AppSlice.actions;
export default AppSlice.reducer;
