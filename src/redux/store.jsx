import { configureStore } from '@reduxjs/toolkit' 
import emailSlice from './slice/emailSlice'

const store = configureStore({
    reducer:{
        [emailSlice.reducerPath] : emailSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(emailSlice.middleware)
    
})

export default store

