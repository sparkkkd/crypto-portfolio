import { FC } from 'react'
import clsx from 'clsx'

import { useAppDispatch } from '../../store/hooks'
import { openModal } from '../../store/slices/UISlice'

import { CryptoAddPopup } from '../../components/CryptoAddPopup/CryptoAddPopup'
import { Button } from '@gravity-ui/uikit'
import { Modal } from '../Modal/Modal'

import styles from './Header.module.sass'

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
	const dispatch = useAppDispatch()

	return (
		<header className={clsx(className, styles.header)}>
			<h1 className={styles.title}>Porfolio Overview</h1>
			<Button onClick={() => dispatch(openModal())} size='xl'>
				Добавить
			</Button>
			<Modal className={styles.modal}>
				<CryptoAddPopup />
			</Modal>
		</header>
	)
}
