/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import AuthForm from "../../components/Form/authForm";
import { authUser } from "../../app/userSlice";
import { message } from "antd";

const fields = [
  {
    placeholder: "Name",
    name: "name",
    type: "text",
    rules: [
      { required: true, message: "Please input your Name!" },
    ]
  },
  {
    placeholder: "Password",
    name: "password",
    type: "password",
    rules: [
      { required: true, message: "Please input your Password!" },
      { 
        min: 6, 
        message: "Password must be at least 6 characters!",
      },
      { 
        pattern: /[A-Za-z]/, 
        message: "Password must contain at least 1 letter!",
      },
      { 
        pattern: /[0-9]/, 
        message: "Password must contain at least 1 number!",
      },
    ]
  }
];

export default function SignIn() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user.authenticated) {
      message.error("You already logged in.");
      navigate("/");
    }
  }, [user, navigate]);


  const containerStyle:React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    maxWidth: "400px",
    justifyContent: "space-between",
    flexWrap: "wrap",
    margin: "0 auto",
  };

  const onSubmit = (data: Record<string, unknown>) => {
    dispatch(authUser(data))
      .then(response => {
        if (!response.payload.name) {
          // If the backend provides a specific error message, display it, otherwise display a generic error message
          message.error( "Wrong name or password. Please try again.");
        } else {
          message.success("You have successfully logged in.");
          navigate("/");
          // if (response.payload.role === "employee" && !(response.payload.applicationStatus === "approved")) {
          //   //navigate(location.state?.from || '/');
          //   navigate("/application");
          // } else if ( response.payload.role === "employee") {
          //   navigate("/profile");
          // } else {
          //   navigate("/");
          // }
        }
      })
      .catch(err => {
        // This will handle any errors in the network request or if the promise rejects
        message.error("An unexpected error occurred. Please try again.");
      });
  };

  return (
    <div>
      <AuthForm
        buttonText="Sign in"
        onSubmit={onSubmit}
        title="Sign in to your account"
        fields={fields}
      />
      <div style={containerStyle}>
        <p>
            Dont have an account? <Link to="/signup">Sign up</Link>.
        </p>
        <p>
          <Link to="/password">Forget password</Link>?
        </p>
      </div>
    </div>
  );
}
