/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/Form/authForm';
import { signUpUser } from '../../app/userSlice';
import { AppDispatch } from '../../app/store';
import { message, Form } from 'antd';
import { useEffect, useState } from 'react';

const fields = [
  {
    placeholder: 'Name',
    name: 'name',
    type: 'text',
    rules: [
      { required: true, message: 'Please input your Name!' },
    ]
  },
  {
    placeholder: 'Email',
    name: 'email',
    type: 'text',
    rules: [
      { required: true, message: 'Please input your Email!' },
      { 
        type: 'email', 
        message: 'The input is not valid Email!',
      },
    ],
    initialValue: '',
    disabled: true,
  },
  {
    placeholder: 'Password',
    name: 'password',
    type: 'password',
    rules: [
      { required: true, message: 'Please input your Password!' },
      { 
        min: 6, 
        message: 'Password must be at least 6 characters!',
      },
      { 
        pattern: /[A-Za-z]/, 
        message: 'Password must contain at least 1 letter!',
      },
      { 
        pattern: /[0-9]/, 
        message: 'Password must contain at least 1 number!',
      },
    ]
  }
];

const containerStyle:React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  maxWidth: "400px",
  justifyContent: "space-between",
  flexWrap: "wrap",
  margin: "0 auto",
}

export default function SignUp() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email') || '';
  fields[1].initialValue = email;
  console.log(fields)
  const onSubmit = (data:any) => {
    
    const token = urlParams.get('token');
    
    if (token) {
      data.token = token;
    }
    try{
    dispatch(signUpUser(data)).then((response) => {
      if (response.payload.email) {
        message.success( "Account created successfully. Please sign in.");
        navigate('/signin');
      } else if (response.payload.message){
        message.error("Invalid token.");
        navigate('/')
      } else {
        message.error("Something went wrong.");
        navigate('/')
      }
      })
    } catch (error:any) {
      message.error(error.message);
      navigate('/')
    }
  };
  return (
    <div>
      <AuthForm 
        buttonText="Create account"
        onSubmit={onSubmit}
        title="Sign up an account"
        fields={fields}
        form={form}
      />
      <div style={containerStyle}>
        <p>Already have an account? Please <Link to="/signin">Sign in</Link>.</p>
      </div>
    </div>
  );
}