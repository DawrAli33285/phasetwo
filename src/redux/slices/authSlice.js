import { createAction,createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

let BASE_URL="http://localhost:5000"
export const register=createAsyncThunk('auth/register',async(state,thunkApi)=>{
    try{
let response=await axios.post(`${BASE_URL}/register`,state)
return response.data
}catch(e){
  
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

export const login=createAsyncThunk('auth/login',async(state,thunkApi)=>{
    try{
let response=await axios.post(`${BASE_URL}/login`,state)
return response.data
    }catch(e){
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

export const getProfile=createAsyncThunk('auth/getProfile',async(state,thunkApi)=>{
    try{
        let config={
            headers:{
                authorization:`Bearer ${thunkApi?.getState()?.authSlice?.user?.token}`
            }
          }
let response=await axios.get(`${BASE_URL}/getProfile`,config)
return response.data
    }catch(e){
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

export const updateProfile=createAsyncThunk('user/updateProfile',async(state,thunkApi)=>{
    try{
        let config={
            headers:{
                authorization:`Bearer ${thunkApi?.getState()?.authSlice?.user?.token}`
            }
          }
let response=await axios.post(`${BASE_URL}/updateProfile`,state,config)
return response.data
    }catch(e){
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

const authSlice=createSlice({
    name:'authSlice',
    initialState:{
        user:''
    },
    extraReducers:(builder)=>{
builder.addCase(login.pending,(state,action)=>{
    state.loading=true;
})
builder.addCase(login.fulfilled,(state,action)=>{
    state.user=action.payload
})

    }
})

export default authSlice.reducer