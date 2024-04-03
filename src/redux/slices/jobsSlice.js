import {createAsyncThunk,createSlice}   from '@reduxjs/toolkit'
import axios from 'axios'

let BASE_URL="http://localhost:5000"
export const getHomePageData=createAsyncThunk('jobs/homepage',async(state,thunkApi)=>{
    try{
let response=await axios.get(`${BASE_URL}/get-homepagedata`)
return response.data
    }catch(e){
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

export const getCategories=createAsyncThunk('jobs/category',async(state,thunkApi)=>{
    try{
let response=await axios.get(`${BASE_URL}/get-category`)
return response.data
    }catch(e){
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})


export const getJobposts=createAsyncThunk('jobs/get',async(state,thunkApi)=>{
    try{
let response=await axios.get(`${BASE_URL}/get-jobposts`)
return response.data
    }catch(e){
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

export const getCategoryJobs=createAsyncThunk('jobs/getCategoryJobs',async(state,thunkApi)=>{
    try{
let response=await axios.get(`${BASE_URL}/getCategoryJobs`)
return response.data
    }catch(e){
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

export const getIndivisualJobs=createAsyncThunk('jobs/indivisual',async(state,thunkApi)=>{

    try{
let response=await axios.get(`${BASE_URL}/getindivisualjob/${state}`)
console.log("response")
console.log(response)
return response.data
    }catch(e){
        console.log(e)
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})
export const applyNow=createAsyncThunk('jobs/apply',async(state,thunkApi)=>{
    try{
        let config={
            headers:{
                authorization:`Bearer ${thunkApi?.getState()?.authSlice?.user?.token}`
            }
          }
       let response=await axios.get(`${BASE_URL}/apply/${state}`,config)
       return response.data
    }catch(e){
        console.log(e)
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

export const addBookmark=createAsyncThunk('jobs/bookmark',async(state,thunkApi)=>{
    try{
  let config={
    headers:{
        authorization:`Bearer ${thunkApi?.getState()?.authSlice?.user?.token}`
    }
  }
        let response=await axios.get(`${BASE_URL}/addBookmark/${state}`,config)
     return response.data
    }catch(e){
        console.log(e)
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

export const contactUs=createAsyncThunk('jobs/contactus',async(state,thunkApi)=>{
    try{
let response=await axios.post(`${BASE_URL}/contact-us`,state)
return response.data
    }catch(e){
        console.log(e)
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

export const getPicLink=createAsyncThunk('jobs/getPicLink',async(state,thunkApi)=>{
    try{
let response=await axios.post(`${BASE_URL}/getPicLink`,state)
return response.data
    }catch(e){
        console.log(e)
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

export const uploadCv=createAsyncThunk('job/cvUpload',async(state,thunkApi)=>{
    try{
        let config={
            headers:{
                authorization:`Bearer ${thunkApi?.getState()?.authSlice?.user?.token}`
            }
          }
let response=await axios.post(`${BASE_URL}/uploadCv`,state,config)
return response.data
    }catch(e){
        console.log(e)
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

export const getHomeContent=createAsyncThunk('jobs/getHomeContent',async(state,thunkApi)=>{
    try{
let response=await axios.get(`${BASE_URL}/getHomeContent`)
return response.data
}catch(e){
    console.log(e)
    if(e?.response?.data){
        return thunkApi.rejectWithValue(e.response.data)
    }else{
        return thunkApi.rejectWithValue({error:"Network error please try later"})
    }
    }
})

export const getPrivacycontent=createAsyncThunk('jobs/getPrivacycontent',async(state,thunkApi)=>{
    try{
let response=await axios.get(`${BASE_URL}/getPrivacycontent`)
return response.data
}catch(e){
    console.log(e)
    if(e?.response?.data){
        return thunkApi.rejectWithValue(e.response.data)
    }else{
        return thunkApi.rejectWithValue({error:"Network error please try later"})
    }
    }
})

export const getTermsangpolicyc=createAsyncThunk('jobs/getTermsangpolicy',async(state,thunkApi)=>{
    try{
let response=await axios.get(`${BASE_URL}/getTermsangpolicy`)
return response.data
    }catch(e){
        console.log(e)
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})

export const getBookmarks=createAsyncThunk('jobs/getBookmarks',async(state,thunkApi)=>{
    try{
        let config={
            headers:{
                authorization:`Bearer ${thunkApi?.getState()?.authSlice?.user?.token}`
            }
          }
let response=await axios.get(`${BASE_URL}/getBookmarks`,config)
return response.data
    }catch(e){
        console.log(e)
        if(e?.response?.data){
            return thunkApi.rejectWithValue(e.response.data)
        }else{
            return thunkApi.rejectWithValue({error:"Network error please try later"})
        }
    }
})




const jobSlice=createSlice({
    name:'jobSlice',
    initialState:{
        jobs:''
    },
    extraReducers:(builder)=>{
builder.addCase(getIndivisualJobs.pending,(state,action)=>{
    state.loading=true;
})
builder.addCase(getIndivisualJobs.fulfilled,(state,action)=>{
    state.indivisualjob=action.payload
})
builder.addCase(getIndivisualJobs.rejected,(state,action)=>{
    state.serverErr=action?.payload;
    state.appErr=action?.error?.message

})
    }
})

export default jobSlice.reducer