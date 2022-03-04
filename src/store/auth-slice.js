import { createSlice } from "@reduxjs/toolkit";

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpTime = new Date(expirationTime).getTime();
  return adjExpTime - currentTime;
};

const getInitialState = () => {
  const token = localStorage.getItem("token") || null;
  const expirationDate = localStorage.getItem("expirationTime");
  const duration = calculateRemainingTime(expirationDate);

  if (duration <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return {
      token,
      isLoggedIn: false,
      duration: 0,
      timeoutId: null,
    };
  }

  return {
    token,
    isLoggedIn: !!token,
    duration: duration,
    timeoutId: null,
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, expiresIn } = action.payload;
      state.token = token;
      state.isLoggedIn = true;

      const expirationTime = new Date(
        new Date().getTime() + +expiresIn * 1000
      ).toISOString();

      state.duration = calculateRemainingTime(expirationTime);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.duration = 0;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
    },
    setTimeoutId: (state, action) => {
      state.timeoutId = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
