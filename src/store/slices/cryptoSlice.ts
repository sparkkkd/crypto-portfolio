import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { updatePortfolioPercent } from '../../lib/updatePortfolioPercent'

import { ILoadToken, IToken, IUserToken } from '../../models/tokenTypes'
import { IAddCryptoPayload } from '../../models/payloadTypes'

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
		addCrypto: (state, action: { payload: IAddCryptoPayload }) => {
			const index = state.userCrypto.findIndex(
				(item) => item.name === action.payload.name
			)

			if (index !== -1) {
				state.userCrypto[index].count += action.payload.count
				state.userCrypto[index].totalPrice += action.payload.totalPrice
			} else {
				state.userCrypto.push({
					...action.payload,
					totalPrice: action.payload.totalPrice,
					portfolioPercent: 0,
				})
			}

			// Update portfolio
			updatePortfolioPercent(state.userCrypto)

			localStorage.setItem('userCrypto', JSON.stringify(state.userCrypto))
		},

		updateCrypto: () => {
			console.log(`update`)
		},

		removeCrypto: (state, action: { payload: string }) => {
			state.userCrypto = state.userCrypto.filter(
				(item) => item.name !== action.payload
			)

			localStorage.setItem('userCrypto', JSON.stringify(state.userCrypto))
		},

		getCryptoFromLocalStorage: (state, action) => {
			state.userCrypto = action.payload
		},
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
export const { addCrypto, removeCrypto, getCryptoFromLocalStorage } =
	cryptoApi.actions
