import { useSelector} from 'react-redux';
import { RootState } from './app/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EditApplication from './pages/EditApplication';
import NotFound from './pages/NotFound';
import LoginFirst from './pages/LoginFirst';
import './App.css'

function App() {
  const user = useSelector((state:RootState) => state.user);

  if (user.isAuthenticated === false) {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="*" element={<LoginFirst/>} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>} >
          <Route path="register" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="application" element={<EditApplication />} />
          <Route path="application/:applicationId" element={<EditApplication />} />
          <Route path="user/:username/application/:applicationId" element={<EditApplication />} />
          <Route path="*" element={<NotFound/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
