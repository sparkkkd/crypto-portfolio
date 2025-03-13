import { FC, useEffect, useState } from 'react'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loadCrypto } from '../../store/slices/cryptoSlice'
import { motion, Variants } from 'framer-motion'

import { Loader } from '../Loader/Loader'
import { Button, TextInput } from '@gravity-ui/uikit'

import styles from './CryptoAddPopup.module.sass'

interface CryptoAddPopupProps {
	className?: string
}

const listVariants: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
}

export const CryptoAddPopup: FC<CryptoAddPopupProps> = ({ className }) => {
	const { isLoading, crypto } = useAppSelector((state) => state.cryptoReducer)
	const dispatch = useAppDispatch()

	const [search, setSearch] = useState<string>('')
	const filteredCrypto = crypto.filter((item) =>
		item.token.includes(search.toUpperCase())
	)

	const [tokenCount, setTokenCount] = useState<number>(0)

	interface IOptions {
		token: string
		tokenPrice: number
		isOptionsVisible: boolean
	}

	const [options, setOptions] = useState<IOptions>({
		token: '',
		tokenPrice: 0,
		isOptionsVisible: false,
	})

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
					<motion.ul
						variants={listVariants}
						initial='initial'
						animate='animate'
						exit='initial'
						className={styles.list}
					>
						{filteredCrypto.map((token) => (
							<li
								className={styles.item}
								key={token.symbol}
								onClick={() => {
									setOptions((prev) => ({
										...prev,
										token: token.token,
										tokenPrice: token.price,
										isOptionsVisible: true,
									}))
									setTokenCount(0)
								}}
							>
								<div className={styles.toke}>{token.token}</div>
								<div className={styles.price}>{token.price.toFixed(2)}$</div>
								<div
									className={clsx(
										styles.percent,
										token.priceChangePercent < 0 && styles.red
									)}
								>
									{token.priceChangePercent > 0 && '+'}
									{token.priceChangePercent.toFixed(2)}%
								</div>
							</li>
						))}
					</motion.ul>
					{options.isOptionsVisible && (
						<div className={styles.optionsWrapper}>
							<div className={styles.optionsToken}>{options.token}</div>
							<p>
								Итоговая стоимость:{' '}
								{(options.tokenPrice * tokenCount).toFixed(2)}$
							</p>

							<div className={styles.options}>
								<TextInput
									value={tokenCount.toString()}
									onChange={(e) => setTokenCount(+e.target.value)}
									placeholder='Кол-во'
								/>
								<Button>Добавить</Button>
								<Button
									onClick={() => {
										setOptions({
											token: '',
											tokenPrice: 0,
											isOptionsVisible: false,
										})
										setTokenCount(0)
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
