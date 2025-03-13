import { FC } from 'react'

import styles from './Container.module.sass'
import clsx from 'clsx'

interface ContainerProps extends React.PropsWithChildren {
	className?: string
}

export const Container: FC<ContainerProps> = ({ className, children }) => {
	return <div className={clsx(className, styles.container)}>{children}</div>
}
