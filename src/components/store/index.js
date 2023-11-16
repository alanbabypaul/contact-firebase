import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./Contact";


const store = configureStore({
    reducer:{
        contact: contactSlice.reducer
    }
})

export default store;