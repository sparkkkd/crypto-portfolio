import { FC, useEffect, useRef } from 'react'
import clsx from 'clsx'

import {
	Table as TableUI,
	withTableActions,
	RenderRowActionsProps,
} from '@gravity-ui/uikit'

import styles from './Table.module.sass'
import React from 'react'
import axios from 'axios'

interface TableProps {
	className?: string
}

const MyTable = withTableActions(TableUI)
// type Item = { id: number; text: string }
interface Item {
	active: string
	count: number
	price: number
	totalCount: number
	edit: string
	percent: string
}

const data: Item[] = [
	{
		active: 'Btc',
		count: 1,
		price: 1,
		totalCount: 1,
		edit: '+0.41%',
		percent: '99.99%',
	},
	{
		active: 'Btc',
		count: 1,
		price: 1,
		totalCount: 1,
		edit: '+0.41%',
		percent: '99.99%',
	},
	{
		active: 'Btc',
		count: 1,
		price: 1,
		totalCount: 1,
		edit: '+0.41%',
		percent: '99.99%',
	},
	{
		active: 'Btc',
		count: 1,
		price: 1,
		totalCount: 1,
		edit: '+0.41%',
		percent: '99.99%',
	},
	{
		active: 'Btc',
		count: 1,
		price: 1,
		totalCount: 1,
		edit: '+0.41%',
		percent: '99.99%',
	},
]
const columns = [
	{ id: 'active', name: 'Актив' },
	{ id: 'count', name: 'Количество' },
	{ id: 'price', name: 'Цена' },
	{ id: 'totalCount', name: 'Общая стоимость' },
	{ id: 'edit', name: 'Изм. за 24 ч.' },
	{ id: 'percent', name: '% портфеля' },
]

// s - Symbol
// c - current price
// P - price change percent

const RowAction = ({ item }: RenderRowActionsProps<Item>) => {
	return <React.Fragment>{`Action for - ${item.active}`}</React.Fragment>
}

export const Table: FC<TableProps> = ({ className }) => {
	const socket = useRef<WebSocket>(null)

	// wss://stream.binance.com:9443/stream?streams=btcusdt@avgPrice

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
			{/* @ts-ignore */}
			<MyTable
				data={data}
				columns={columns}
				onRowClick={(item) => {
					console.log(item)
				}}
				className={styles.table}
			/>
		</div>
	)
}
