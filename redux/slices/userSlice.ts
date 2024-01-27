import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
user:any;
isAuthenticated:boolean;
}

const initialState:IInitialState = {
    user:null,
    isAuthenticated:false
}

export const userSlice = createSlice({
    initialState,
    name:'userSlice',
    reducers:{
        setUser: (state,action:PayloadAction<any>) => {
            state.user = action.payload;
        },
        setIsAuthenticated: (state,action) => {
            state.isAuthenticated = action.payload;
        }
    }
});

// We'll add this in store
export default userSlice.reducer;

// We'll dispatch this actions to setUser and isAuthenticated.
export const {setUser,setIsAuthenticated} = userSlice.actions;