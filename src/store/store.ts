import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cryptoReducer from './slices/cryptoSlice'

const rootReducer = combineReducers({
	cryptoReducer,
})

export const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
