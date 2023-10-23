import { createSlice } from "@reduxjs/toolkit";

interface SideNavState {
  value: boolean | undefined;
}

const initialState: SideNavState = {
  value: false,
};

const sideNavReducer = createSlice({
  name: "sideNav",
  initialState,
  reducers: {
    sideNavExpanded(state) {
      state.value = !state.value;
    },
  },
});

export const { sideNavExpanded } = sideNavReducer.actions;
export default sideNavReducer.reducer;
