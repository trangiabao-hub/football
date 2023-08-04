import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Statistic } from '../../model/statistic'

const initialState: number = 0;

export const xSlice = createSlice({
  name: 'x',
  initialState,
  reducers: {
    setX: (state, action: PayloadAction<number>) => {
      return action.payload
    }
  },
})

export const { setX } = xSlice.actions;
export default xSlice.reducer;
