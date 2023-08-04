import { configureStore } from '@reduxjs/toolkit'
import statisticReducer from './features/statistic'
import underdogReducer from './features/underdog'
import xReducer from './features/x'

export const store = configureStore({
  reducer: {
    statistic: statisticReducer,
    x: xReducer,
    underdog: underdogReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
