import { Container } from './components/Container/Container.tsx'

import styles from './App.module.sass'
import { Header } from './modules/Header/Header.tsx'
import { Table } from './components/Table/Table.tsx'

function App() {
	return (
		<main className={styles.main}>
			<Container>
				<Header />
				<Table />
			</Container>
		</main>
	)
}

export default App
