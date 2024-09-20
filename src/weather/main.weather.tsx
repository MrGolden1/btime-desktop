// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import './app.css'
import { ThemeProvider } from '@material-tailwind/react'
import App from './app.weather'

if (document.getElementById('root')) {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</React.StrictMode>,
	)
}

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

window.ipcRenderer.on('transparent_status', (evt, message) => {
	const bodyElement = document.body
	if (message.newStatus) {
		bodyElement.classList.add('transparent-active')
	} else bodyElement.classList.remove('transparent-active')
})

window.ipcRenderer.on('border-radius', (evt, message) => {
	document.querySelector('.h-screen').style.borderRadius = message.radius
})
