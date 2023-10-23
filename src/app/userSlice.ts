/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { signIn, signUp } from '../services/auth';
import {Application} from '../interfaces/Application.interface';
import {UserState} from '../interfaces/UserState.interface';

const emptyState = () => {
    return (
    {
        isAuthenticated: false,
        role: '',
        email: '',
        name: '',
        applicationId:null,
        applicationStatus: null,
        } as  UserState);
}
const initialState = {
    isAuthenticated:false,
    role: '',
    email: '',
    name: '',
    applicationId:null,
    applicationStatus: null,
} as UserState;

//登录和查找当前ongoingApplication不是同步的，因为可以有多个ongoingApplication，登录只更新用户信息，不更新ongoingApplication
export const authUser = createAsyncThunk(
    'currentUser/authUser',
    async (data:Record<string,unknown>, thunkAPI:any) => {
        try{
        const user = await signIn(data);
        return user;
    } catch (error:any) {
        const{message} = error.response.data;
        return thunkAPI.rejectWithValue(message);
    }
}
);


export const signUpUser = createAsyncThunk(
    'currentUser/signUpUser',
    async (data:Record<string,unknown>, thunkAPI:any) => {
      try {
        const user = await signUp(data);
        return user;
      } catch (error:any) {
        const { message } = error;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );


const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
      setCurrentUser: (state, action) => {
        const {name, email, role, applicationId, applicationStatus} = action.payload;
        state.name = name;
        state.email = email;
        state.role = role;
        state.isAuthenticated = true;
        state.applicationId = applicationId;
        state.applicationStatus = applicationStatus;
        localStorage.setItem('user', JSON.stringify(action.payload));
      },
      logOutUser: (state, action) => {
        state.name = '';
        state.email = '';
        state.role = '';
        state.isAuthenticated = false;
        state.applicationId = null;
        //state.status = 'idle';
        localStorage.removeItem('user');
      }
    },
    extraReducers: builder => {
      builder.addCase(authUser.fulfilled, (state, action) => {        
        const {name, email, role, applicationId, applicationStatus} = action.payload;
        state.name = name;
        state.email = email;
        state.role = role;
        state.isAuthenticated = true;
        state.applicationId = applicationId;
        state.applicationStatus = applicationStatus;
        localStorage.setItem('user', JSON.stringify(state));
        
      });
      builder.addCase(authUser.rejected, (state, action) => {
        logOutUser(state)
        //state.status = 'failed';
      });
      builder.addCase(authUser.pending, (state, action) => {
        //state.status = 'pending';
      });
      builder.addCase(signUpUser.fulfilled, (state, action) => {
        //state.status = 'succeeded';
      });
      builder.addCase(signUpUser.rejected, (state, action) => {
        //state.status = 'failed';
      });
      builder.addCase(signUpUser.pending, (state, action) => {
        //state.status = 'pending';
      });
    }
  });
  
  export const { setCurrentUser, logOutUser } = currentUserSlice.actions;
  
  export default currentUserSlice.reducer;