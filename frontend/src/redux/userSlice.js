import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authToken: null,
        authUser: null,
        role: null
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = `Bearer ${action.payload}`;
        },
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        }
    }
});

export const { setAuthToken, setAuthUser, setRole } = userSlice.actions;
export default userSlice.reducer;
