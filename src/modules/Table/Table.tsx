import { FC, JSX, useEffect, useRef } from 'react'
import clsx from 'clsx'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	getCryptoFromLocalStorage,
	removeCrypto,
	updateCrypto,
} from '../../store/slices/cryptoSlice'
import { IEventData, IUpdatedToken } from '../../models/tokenTypes'

import { Table as TableUI, withTableActions } from '@gravity-ui/uikit'

import styles from './Table.module.sass'

interface TableProps {
	className?: string
}

const MyTable = withTableActions(TableUI)
interface Item {
	name: string
	count: string
	price: JSX.Element
	totalPrice: string
	priceChangePercent: JSX.Element
	portfolioPercent: string
}

export const Table: FC<TableProps> = ({ className }) => {
	const { userCrypto } = useAppSelector((state) => state.cryptoReducer)
	const dispatch = useAppDispatch()
	const socket = useRef<WebSocket>(null)

	const streams = userCrypto
		.reduce((acc, item) => {
			return acc + item.symbol.toLowerCase() + '@ticker/'
		}, '')
		.slice(0, -1)

	useEffect(() => {
		socket.current = new WebSocket(
			`wss://stream.binance.com:9443/stream?streams=${streams}`
		)

		socket.current.onmessage = (event) => {
			const { data } = JSON.parse(event.data) as IEventData
			const updatedData: IUpdatedToken = {
				symbol: data.s,
				price: data.c,
				priceChangePercent: data.P,
			}
			dispatch(updateCrypto(updatedData))
		}

		return () => {
			if (socket.current?.readyState === 1) socket.current?.close()
		}
	}, [streams])

	useEffect(() => {
		dispatch(
			getCryptoFromLocalStorage(
				JSON.parse(localStorage.getItem('userCrypto') || '[]')
			)
		)
	}, [])

	const data: Item[] = userCrypto.map((item) => ({
		name: item.name,
		count: item.count.toFixed(5),
		price: <div className={styles.price}>${item.price.toFixed(2)}</div>,
		totalPrice: '$' + item.totalPrice.toFixed(2),
		priceChangePercent: (
			<div className={item.priceChangePercent > 0 ? styles.green : styles.red}>
				{item.priceChangePercent.toFixed(2).toString() + '%'}
			</div>
		),
		portfolioPercent: item.portfolioPercent.toFixed(2).toString() + '%',
	}))

	const columns = [
		{ id: 'name', name: 'Актив' },
		{ id: 'count', name: 'Количество' },
		{ id: 'price', name: 'Цена' },
		{ id: 'totalPrice', name: 'Общая стоимость' },
		{ id: 'priceChangePercent', name: 'Изм. за 24 ч.' },
		{ id: 'portfolioPercent', name: '% Портфеля' },
	]

	return (
		<div className={clsx(className, styles.table)}>
			<MyTable
				data={data}
				columns={columns}
				onRowClick={(item) => {
					dispatch(removeCrypto(item.name))
				}}
				className={styles.table}
				edgePadding={false}
				emptyMessage='Добавьте активы в портфель'
			/>
		</div>
	)
}
