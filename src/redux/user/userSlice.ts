import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE={
    userId:"",
    username:"",
    image:"",
    userEmail:'',
    isPrime:''
}

export const UserSclice=createSlice({
    name:"User",
    initialState:INITIAL_STATE,
    reducers:{
        updateUser:(state,action)=>{
            state.userId=action.payload.userId
            state.username=action.payload.username
            state.image=action.payload.image
            state.userEmail=action.payload.userEmail
            state.isPrime=action.payload.isPrime
        }
    }
})

export const {updateUser} =UserSclice.actions
export default UserSclice.reducer