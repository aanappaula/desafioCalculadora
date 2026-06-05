import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/custom-theme.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
