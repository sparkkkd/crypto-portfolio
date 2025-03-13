import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { ILoadToken, IToken, IUserToken } from '../../models/tokenTypes'

interface IInitialState {
	userCrypto: IUserToken[]
	crypto: IToken[]
	isLoading: boolean
}

const initialState: IInitialState = {
	userCrypto: [],
	crypto: [],
	isLoading: false,
}

export const loadCrypto = createAsyncThunk(
	'crypto/loadCrypto',
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get<ILoadToken[]>(
				'https://api.binance.com/api/v3/ticker/24hr'
			)

			return res.data
				.filter((item) => item.symbol.endsWith('USDT'))
				.map((item) => ({
					symbol: item.symbol,
					token: item.symbol.replace('USDT', ''),
					quoteAsset: 'USDT',
					price: parseFloat(item.lastPrice),
					priceChangePercent: parseFloat(item.priceChangePercent),
				}))
				.slice(0, 30)
		} catch (error: AxiosError | unknown) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.message)
			}
		}
	}
)

export const cryptoApi = createSlice({
	name: 'crypto',
	initialState,
	reducers: {
		addCrypto: (state, action) => {},

		removeCrypto: (state, action) => {},

		updateCrypto: (state, action) => {},
	},
	extraReducers: (builder) => {
		// Start Loading crypto
		builder.addCase(loadCrypto.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(loadCrypto.fulfilled, (state, action) => {
			if (action.payload) state.crypto = action.payload
			state.isLoading = false
		})
		builder.addCase(loadCrypto.rejected, (_, action) => {
			console.error(action.error.message)
		})
		// End Loading crypto
	},
})

export default cryptoApi.reducer
