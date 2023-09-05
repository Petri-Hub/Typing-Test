import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/style/reset.css'
import './assets/style/style.css'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
   palette: {
      text: {
         primary: '#fff'
      }
   }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <ThemeProvider theme={theme}>
         <App />
      </ThemeProvider>
   </React.StrictMode>,
)
