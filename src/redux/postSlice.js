import {createSlice} from "@reduxjs/toolkit"

const postSlice = createSlice({
    name:"post",
    initialState:{
        posts:null,
        refresh:false,
        isActive:true
    },
    reducers:{
        //multiple action
        getAllPost:(state,action)=>{
            state.posts=action.payload;
        },
        getRefresh:(state)=>{
            state.refresh=!state.refresh;
        },
        getIsActive:(state,action)=>{
            state.isActive=action.payload;
        }
    }
})

export const {getAlPost, getRefresh, getIsActive}= postSlice.actions;
export default postSlice.reducer;