import { FC } from 'react'
import ReactDOM from 'react-dom'
import clsx from 'clsx'

import { AnimatePresence, motion, Variants } from 'framer-motion'

import styles from './Modal.module.sass'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { closeModal } from '../../store/slices/UISlice'

interface ModalProps extends React.PropsWithChildren {
	className?: string
}

const overlayVariants: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
}

const wrapperVariants: Variants = {
	initial: {
		opacity: 0,
		scale: 0,
		fill: 'blur(5px)',
		transition: {
			duration: 0.5,
			ease: [1, 0, 0, 1],
		},
	},
	animate: {
		opacity: 1,
		scale: 1,
		filter: 'blur(0px)',
		transition: {
			duration: 0.5,
			ease: [1, 0, 0, 1],
		},
	},
}

export const Modal: FC<ModalProps> = ({ className, children }) => {
	const { isModalOpen } = useAppSelector((state) => state.UISlice)
	const dispatch = useAppDispatch()

	return ReactDOM.createPortal(
		<AnimatePresence>
			{isModalOpen && (
				<motion.div
					variants={overlayVariants}
					initial='initial'
					animate='animate'
					exit='initial'
					className={clsx(className, styles.overlay)}
					onClick={() => dispatch(closeModal())}
				>
					<motion.div
						variants={wrapperVariants}
						initial='initial'
						animate='animate'
						exit='initial'
						className={styles.wrapper}
						onClick={(e) => e.stopPropagation()}
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	)
}
