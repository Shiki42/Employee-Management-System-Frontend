import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>} />
        <Route path="register" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
