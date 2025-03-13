import { FC, useState } from 'react'
import clsx from 'clsx'

import { CryptoAddPopup } from '../../components/CryptoAddPopup/CryptoAddPopup'
import { Button } from '@gravity-ui/uikit'
import { Modal } from '../../components/Modal/Modal'

import styles from './Header.module.sass'

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<header className={clsx(className, styles.header)}>
			<h1 className={styles.title}>Porfolio Overview</h1>
			<Button onClick={() => setOpen(true)} size='xl'>
				Добавить
			</Button>
			<Modal
				open={open}
				setOpen={() => setOpen(false)}
				className={styles.modal}
			>
				<CryptoAddPopup />
			</Modal>
		</header>
	)
}
