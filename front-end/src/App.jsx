import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import Login from './pages/login/Login'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: "Lexend, sans-serif",
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <div className='p-4 h-screen flex items-center justify-center'>
        <CssBaseline />
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
