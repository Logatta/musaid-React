import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokensCredentials {
  access: string;
  refresh: string;
}

const initialState: TokensCredentials = {
  access: "",
  refresh: "",
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    updateTokens(state, action: PayloadAction<TokensCredentials>) {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
    resetTokens(state) {
      state.access = "";
      state.refresh = "";
    },
  },
});

export const { updateTokens, resetTokens } = tokensSlice.actions;
export default tokensSlice.reducer;
