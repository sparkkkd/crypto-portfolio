import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
	isModalOpen: boolean
}

const initialState: IInitialState = {
	isModalOpen: false,
}

export const UISlice = createSlice({
	name: 'UISlice',
	initialState,
	reducers: {
		openModal: (state) => {
			state.isModalOpen = true
		},
		closeModal: (state) => {
			state.isModalOpen = false
		},
	},
})

export default UISlice.reducer

export const { openModal, closeModal } = UISlice.actions
