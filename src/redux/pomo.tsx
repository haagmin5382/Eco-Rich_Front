import { createSlice } from '@reduxjs/toolkit';

export const pomoSlice = createSlice({
  name: 'pomoNum',
  initialState: {
    value: { pomoNum: [], dayPomo: [] },
  },
  reducers: {
    setPomo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPomo } = pomoSlice.actions;
export default pomoSlice.reducer;
