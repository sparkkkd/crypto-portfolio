import { FC, useEffect, useState } from 'react'
import clsx from 'clsx'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { closeModal } from '../../store/slices/UISlice'
import { addCrypto, loadCrypto } from '../../store/slices/cryptoSlice'

import { Loader } from '../Loader/Loader'
import { Button, TextInput } from '@gravity-ui/uikit'
import { CryptoList } from '../CryptoList/CryptoList'

import styles from './CryptoAddPopup.module.sass'

interface CryptoAddPopupProps {
	className?: string
}

export interface IOptions {
	token: string
	tokenPrice: number
	totalPrice: number
	priceChangePercent: number
	symbol: string
}

export const CryptoAddPopup: FC<CryptoAddPopupProps> = ({ className }) => {
	const { isLoading, crypto } = useAppSelector((state) => state.cryptoReducer)
	const dispatch = useAppDispatch()

	const [search, setSearch] = useState<string>('')
	const filteredCrypto = crypto.filter((item) =>
		item.token.includes(search.toUpperCase())
	)

	const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false)
	const [tokenCount, setTokenCount] = useState<number>(1)

	const [options, setOptions] = useState<IOptions>({
		token: '',
		tokenPrice: 0,
		totalPrice: 0,
		priceChangePercent: 0,
		symbol: '',
	})

	const handleAddCrypto = () => {
		dispatch(
			addCrypto({
				name: options.token,
				count: tokenCount,
				price: options.tokenPrice,
				priceChangePercent: options.priceChangePercent,
				symbol: options.symbol,
				totalPrice: tokenCount * options.tokenPrice,
			})
		)
		setTokenCount(1)
	}

	useEffect(() => {
		dispatch(loadCrypto())
	}, [])

	return (
		<div className={clsx(className, styles.popup)}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<TextInput
						size='xl'
						className={styles.input}
						placeholder='Поиск...'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<CryptoList
						filteredCrypto={filteredCrypto}
						setOptions={setOptions}
						setTokenCount={setTokenCount}
						setIsOptionsVisible={setIsOptionsVisible}
					/>
					{isOptionsVisible && (
						<div className={styles.optionsWrapper}>
							<div className={styles.optionsToken}>{options.token}</div>
							<p>
								Итоговая стоимость: {'$'}
								{(options.tokenPrice * tokenCount).toFixed(2)}
							</p>
							<TextInput
								value={tokenCount.toString()}
								onChange={(e) => {
									if (Number(e.target.value) < 1) {
										return setTokenCount(1)
									}
									setTokenCount(Number(e.target.value))
								}}
								placeholder='Кол-во'
								type='number'
							/>
							<div className={styles.options}>
								<Button width='max' onClick={handleAddCrypto}>
									Добавить
								</Button>
								<Button
									width='max'
									onClick={() => {
										handleAddCrypto()
										setIsOptionsVisible(false)
										dispatch(closeModal())
									}}
								>
									Добавить и закрыть
								</Button>
								<Button
									width='max'
									onClick={() => {
										setOptions({
											token: '',
											tokenPrice: 0,
											priceChangePercent: 0,
											symbol: '',
											totalPrice: 0,
										})
										setTokenCount(1)
										setIsOptionsVisible(false)
									}}
								>
									Отмена
								</Button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	)
}
