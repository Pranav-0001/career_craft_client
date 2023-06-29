import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE={
    AdminId:"",
    AdminUsername:"",
    AdminImage:"",
   
}

export const AdminSlice=createSlice({
    name:"Admin",
    initialState:INITIAL_STATE,
    reducers:{
        updateAdmin:(state,action)=>{
            state.AdminId=action.payload.AdminId
            state.AdminUsername=action.payload.AdminUsername
            state.AdminImage=action.payload.AdminImage
        }
    }
})

export const {updateAdmin} =AdminSlice.actions
export default AdminSlice.reducer