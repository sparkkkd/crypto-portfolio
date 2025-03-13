import { FC, JSX, useEffect, useRef } from 'react'
import clsx from 'clsx'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	getCryptoFromLocalStorage,
	removeCrypto,
} from '../../store/slices/cryptoSlice'

import { Table as TableUI, withTableActions } from '@gravity-ui/uikit'

import styles from './Table.module.sass'

interface TableProps {
	className?: string
}

const MyTable = withTableActions(TableUI)
interface Item {
	name: string
	count: string
	price: string
	totalPrice: string
	priceChangePercent: JSX.Element
	portfolioPercent: string
}

export const Table: FC<TableProps> = ({ className }) => {
	const { userCrypto } = useAppSelector((state) => state.cryptoReducer)
	const dispatch = useAppDispatch()
	const socket = useRef<WebSocket>(null)

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
		price: '$' + item.price.toFixed(2),
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

	// wss://stream.binance.com:9443/stream?streams=btcusdt@avgPrice
	// s - Symbol
	// c - current price
	// P - price change percent

	// useEffect(() => {
	// 	socket.current = new WebSocket(
	// 		`wss://stream.binance.com:9443/stream?streams=bnbusdt@ticker/btcusdt@ticker`
	// 	)

	// 	socket.current.onopen = (event) => {
	// 	}

	// 	socket.current.onmessage = (event) => {
	// 		console.log(JSON.parse(event.data))
	// 	}
	// }, [])

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
			/>
		</div>
	)
}
