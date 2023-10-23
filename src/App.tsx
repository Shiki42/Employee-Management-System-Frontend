import { useSelector, useDispatch} from 'react-redux';
import { RootState } from './app/store';
import { setCurrentUser } from './app/userSlice';
import { BrowserRouter, Routes, Route, useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EditApplication from './pages/EditApplication';
import NotFound from './pages/NotFound';
import LoginFirst from './pages/LoginFirst';
import './App.css'

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state:RootState) => state.user);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        dispatch(setCurrentUser(userData));
      } catch (e) {
        console.error("Parsing error:", e);
      }
    }
  }, [dispatch]); 

  useEffect(() => {
    if (user.isAuthenticated && user.role === 'employee') {
      if (user.applicationStatus !== 'approved') {
        navigate('/application');
      } else {
        navigate('/profile');
      }
    }
  }, [user, navigate]);

  

  if (!user.isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>} >
          <Route index element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
          <Route path="*" element={<LoginFirst/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }

  if(user.role === 'employee') {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>} >
          <Route path="application" element={<EditApplication />} />
          <Route path="profile" element={<EditApplication />} />
          <Route path="visa-status" element={<EditApplication />} />
          <Route path="*" element={<NotFound/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
  }

  if(user.role === 'HR') {
    return (
      <></>
    )
  }
}

export default App
