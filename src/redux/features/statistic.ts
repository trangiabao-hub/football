import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Statistic } from '../../model/statistic'

const initialState: Statistic[] = []

export const statisticSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setStatistic: (state, action: PayloadAction<Statistic[]>) => {
      return action.payload
    }
  },
})

export const { setStatistic } = statisticSlice.actions;
export default statisticSlice.reducer;
