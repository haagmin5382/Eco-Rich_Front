import { createSlice } from '@reduxjs/toolkit';

export const listSlice = createSlice({
  name: 'pomoNum',
  initialState: {
    value: [],
  },
  reducers: {
    setList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setList } = listSlice.actions;
export default listSlice.reducer;
