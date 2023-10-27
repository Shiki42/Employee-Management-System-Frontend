import { useSelector, useDispatch} from "react-redux";
import { RootState } from "./app/store";
import { setCurrentUser } from "./app/userSlice";

import { getStatus } from "./services/auth";
import { BrowserRouter, Routes, Route, useNavigate  } from "react-router-dom";
import { useEffect } from "react";

import MainLayout from "./components/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditApplication from "./pages/EditApplication";
import ProfilePage from "./pages/EmployeeProfile";
import NotFound from "./pages/NotFound";
import LoginFirst from "./pages/LoginFirst";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchStatus() {
      const userString = localStorage.getItem("user");
      
      if (userString) {
        try {
          const userData = JSON.parse(userString);
          const userStatus = await getStatus({token:userData.token});
          if (userStatus.applicationStatus) {
            userData.applicationStatus = userStatus.applicationStatus;
          }
          dispatch(setCurrentUser(userData));
        } catch (e) {
          console.error("Parsing error:", e);
          const userData = JSON.parse(userString);
          dispatch(setCurrentUser(userData));
        }
      }
    }
    fetchStatus();
  }, [dispatch]);

  const user = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      
      {!user.isAuthenticated ? (
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            <Route path="*" element={<LoginFirst />} />
          </Route>
        </Routes>
      ) : user.role === "employee" ? (
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<ProfilePage />} />
            <Route path="application" element={<EditApplication />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="visa-status" element={<EditApplication />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      ) : (
        user.role === "HR" && (
          // HR-specific routes here
          <></>
        )
      )}
      <ConditionalNavigate />
    </BrowserRouter>
  );
}

function ConditionalNavigate() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.isAuthenticated && user.role === "employee") {
      if (user.applicationStatus !== "approved") {
        navigate("/application");
      }
      // } else {
      //   navigate('/profile');
      // }
    }
  }, [user, navigate]);

  return null;
}

export default App;
