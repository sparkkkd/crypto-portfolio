import { FC } from 'react'
import { motion, Variants } from 'framer-motion'

import styles from './CryptoList.module.sass'
import clsx from 'clsx'
import { Virtuoso } from 'react-virtuoso'
import { IToken } from '../../models/tokenTypes'
import { IOptions } from '../CryptoAddPopup/CryptoAddPopup'

interface CryptoListProps {
	className?: string
	filteredCrypto: IToken[]
	setOptions: React.Dispatch<React.SetStateAction<IOptions>>
	setTokenCount: React.Dispatch<React.SetStateAction<number>>
	setIsOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const listVariants: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
}

export const CryptoList: FC<CryptoListProps> = ({
	className,
	filteredCrypto,
	setOptions,
	setTokenCount,
	setIsOptionsVisible,
}) => {
	return (
		<motion.ul
			variants={listVariants}
			initial='initial'
			animate='animate'
			exit='initial'
			className={clsx(className, styles.list)}
		>
			<Virtuoso
				style={{ height: 400 }}
				data={filteredCrypto}
				totalCount={filteredCrypto.length}
				className={styles.virtual}
				itemContent={(_, token) => (
					<li
						className={styles.item}
						key={token.symbol}
						onClick={() => {
							setOptions(() => ({
								token: token.token,
								tokenPrice: token.price,
								priceChangePercent: token.priceChangePercent,
								symbol: token.symbol,
								totalPrice: 0,
							}))
							setTokenCount(1)
							setIsOptionsVisible(true)
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
				)}
			/>
		</motion.ul>
	)
}
