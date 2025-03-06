import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/property-modal.css'
import App from './App.tsx'

// Log the base URL for debugging
console.log('Base URL:', import.meta.env.BASE_URL);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
