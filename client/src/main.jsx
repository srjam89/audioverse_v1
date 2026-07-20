import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')

function applySystemTheme(event) {
  document.documentElement.classList.toggle('dark', event.matches)
}

applySystemTheme(systemTheme)
systemTheme.addEventListener('change', applySystemTheme)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
