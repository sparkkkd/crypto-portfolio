import { FC } from 'react'

import { Spin } from '@gravity-ui/uikit'

import styles from './Loader.module.sass'
import clsx from 'clsx'

interface LoaderProps {
	className?: string
}

export const Loader: FC<LoaderProps> = ({ className }) => {
	return (
		<div className={clsx(className, styles.loader)}>
			<Spin />
		</div>
	)
}
