import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cryptoReducer from './slices/cryptoSlice'
import UISlice from './slices/UISlice'

const rootReducer = combineReducers({
	cryptoReducer,
	UISlice,
})

export const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
