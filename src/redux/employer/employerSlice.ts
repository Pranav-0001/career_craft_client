import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE={
    EmployerId:"",
    EmpUsername:"",
    EmpImage:"",
    EmpEmail:''
}

export const EmployerSlice=createSlice({
    name:"Employer",
    initialState:INITIAL_STATE,
    reducers:{
        updateEmp:(state,action)=>{
            state.EmployerId=action.payload.EmployerId
            state.EmpUsername=action.payload.EmpUsername
            state.EmpImage=action.payload.EmpImage
            state.EmpEmail=action.payload.EmpEmail
        }
    }
})

export const {updateEmp} =EmployerSlice.actions
export default EmployerSlice.reducer