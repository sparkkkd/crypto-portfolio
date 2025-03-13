import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

import { ThemeProvider } from '@gravity-ui/uikit'

import App from './App.tsx'

import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'

import './index.css'

createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme='dark'>
		<Provider store={store}>
			<App />
		</Provider>
	</ThemeProvider>
)
