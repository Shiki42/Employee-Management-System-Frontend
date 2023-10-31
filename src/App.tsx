/* eslint-disable @typescript-eslint/no-unused-vars */
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
import VisaStatusManagement from "./pages/EmployeeVisa";

import HRProfilesOverview from "./pages/HRProfilesOverview";
import HRProfile from "./pages/HRProfile";
import HRVisaStatusManagement from "./pages/HRvisaStatus";
import HRhiringManagement from "./pages/HRhiringManagement";
//import HRapplicationView from "./pages/HRapplicationView";
import NotFound from "./pages/NotFound";
import LoginFirst from "./pages/LoginFirst";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchStatus() {
      //localStorage.removeItem("user");
      const userString = localStorage.getItem("user");
      
      if (userString) {
        const userData = JSON.parse(userString);
        try {
          
          if(userData.token) {
            const userStatus = await getStatus({token:userData.token});
            const newUserData = {...userData, ...userStatus};
            dispatch(setCurrentUser(newUserData));
          }
          

        } catch (e) {
          console.error("Parsing error:", e);
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
            <Route path="/register" element={<SignUp />} />
            <Route path="*" element={<LoginFirst />} />
          </Route>
        </Routes>
      ) : user.role === "employee" ? (
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<EditApplication />} />
            <Route path="/application" element={<EditApplication />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/visa-status" element={<VisaStatusManagement />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      ) : (
        user.role === "HR" && (
          <Routes>
            <Route path="/" element={<MainLayout/>}>
              <Route index element={<HRProfilesOverview />} />
              <Route path="/user/:id/profile" element={<HRProfile />} />
              <Route path="/user/:id/application" element={<HRProfile />} />
              <Route path="/hiringManagement" element={<HRhiringManagement />} />
              <Route path="/visaStatus" element={<HRVisaStatusManagement />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        )
      )}
      {/* <ConditionalNavigate /> */}
    </BrowserRouter>
  );
}

// function ConditionalNavigate() {
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.user);


//   return null;
// }

export default App;
