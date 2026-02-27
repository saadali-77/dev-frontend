
import {configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionReducer from './connectionSlice'
import RequestReducer from './RequestSlice'
export const store = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connection:connectionReducer,
        request:RequestReducer
    }
})