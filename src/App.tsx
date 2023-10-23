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
  const dispatch = useDispatch();

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

  const user = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <ConditionalNavigate />
      {!user.isAuthenticated ? (
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            <Route path="*" element={<LoginFirst />} />
          </Route>
        </Routes>
      ) : user.role === 'employee' ? (
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path="application" element={<EditApplication />} />
            <Route path="profile" element={<EditApplication />} />
            <Route path="visa-status" element={<EditApplication />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      ) : (
        user.role === 'HR' && (
          // HR-specific routes here
          <></>
        )
      )}
    </BrowserRouter>
  );
}

function ConditionalNavigate() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.isAuthenticated && user.role === 'employee') {
      if (user.applicationStatus !== 'approved') {
        navigate('/application');
      } else {
        navigate('/profile');
      }
    }
  }, [user, navigate]);

  return null;
}

export default App
