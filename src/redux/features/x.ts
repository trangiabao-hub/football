import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: number = 0;

export const xSlice = createSlice({
  name: 'x',
  initialState,
  reducers: {
    setX: (state, action: PayloadAction<number>) => {
      console.log(state);

      return action.payload
    }
  },
})

export const { setX } = xSlice.actions;
export default xSlice.reducer;
