import {registerUserApi,loginUserApi,forgotPasswordApi,resetPasswordApi,getUserApi,
    updateUserApi,logoutApi,TRegisterData,TLoginData,TAuthResponse} from '../utils/burger-api';
import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import {TUser} from '../utils/types';
import { setCookie } from '../utils/cookie';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export const registerUser = createAsyncThunk(
  'user/register',
  async(data: TRegisterData) => {
    const res =  await registerUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('name', res.user.name);
    localStorage.setItem('email', res.user.email);
    setCookie('accessToken', res.accessToken);
    return res;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async(data: TLoginData) => {
    const res = await loginUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('name', res.user.name);
    localStorage.setItem('email', res.user.email);
    setCookie('accessToken', res.accessToken);
    return res;
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async(data: {email: string}) => {
    return await forgotPasswordApi(data);
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async(data: { password: string; token: string }) => {
    return await resetPasswordApi(data);
  }
);

export const getUser = createAsyncThunk(
  'user/userApi',
  async() => {
    return await getUserApi();
  }
);

export const updateUser = createAsyncThunk(
  'user/updateApi',
  async(user: Partial<TRegisterData>) => {
    return await updateUserApi(user);
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async() => {
    return await logoutApi();
  }
);

export interface Iauthentication {
  data: TAuthResponse,
  isAuth: boolean,
  error: string | undefined,
  isLoading: boolean
  isAuthCheckedSelector: boolean
};

export const initialState: Iauthentication = {
  data: {
    success: false,
    refreshToken: '',
    accessToken: '',
    user: { email: '', name: ''}
  },
  isAuth: false,
  error: undefined,
  isLoading: false,
  isAuthCheckedSelector: false
};

const authenticationSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthCheckedSelector = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled,(state, action:PayloadAction<TAuthResponse>)=> {
        state.data.user = action.payload.user;
        state.isAuth = true;
      })
      
      .addCase(registerUser.rejected,(state, action) => {
        state.error = action.error.message;
      })

      .addCase(registerUser.pending,(state, action) => {
        state.isLoading =  true;
        state.isAuth = false;
      })
      
      .addCase(loginUser.fulfilled,(state, action: PayloadAction<TAuthResponse>)=> {
        state.data.user = action.payload.user;
        state.isAuth = true;
        state.data.success = true
        // state.isLoading = false;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.data.success = false;
        state.isAuth = false;
      })

      .addCase(loginUser.pending,(state, action) => {
        state.isLoading =  true;
        state.isAuth = false;
      })

      .addCase(getUser.fulfilled, ( state, action) => {
        state.data.user = action.payload.user
        state.isAuth = true;
        state.isLoading = false;
        state.isAuthCheckedSelector = true
      })

      .addCase(getUser.rejected, ( state, action) => {
        state.isAuthCheckedSelector = true
      })

      .addCase(updateUser.fulfilled, ( state, action) => {
        state.data.user = action.payload.user;
        state.isAuth = true;
        state.isLoading = false;
        state.isAuthCheckedSelector = true
      })

      .addCase(updateUser.rejected, ( state, action) => {
        state.error = action.error.message;
      })

      .addCase(logout.fulfilled, ( state, action) => {
        state.data.user = {
          name: '',
          email: ''
        }
        state.isAuth = false;
        state.data.success = true;
      })

      .addCase(logout.rejected, ( state, action) => { 
        // state.isAuth = false;
        state.error = action.error.message;
        // state.isLoading = true;
        state.data.success = false;
      })
    }
})


export default authenticationSlice.reducer;

export const users = (store: RootState) => store.authentication.data.user;
export const isAuth = (store: RootState) => store.authentication.isAuth;