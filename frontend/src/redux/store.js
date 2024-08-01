import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { loadState } from './loadState';

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        user: userReducer
    },
    preloadedState
});

// Save state to local storage
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('authToken', state.user.authToken);
    localStorage.setItem('authUser', JSON.stringify(state.user.authUser));
    localStorage.setItem('role', state.user.role);
});

export default store;