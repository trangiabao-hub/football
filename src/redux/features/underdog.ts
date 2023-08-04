import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Underdog } from '../../components/modal/underdog'

const initialState: Underdog[] = []

export const underDogSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUnderdog: (state, action: PayloadAction<Underdog[]>) => {
      return action.payload
    }
  },
})

export const { setUnderdog } = underDogSlice.actions;
export default underDogSlice.reducer;
