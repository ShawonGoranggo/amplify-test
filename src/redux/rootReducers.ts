import { combineReducers } from "@reduxjs/toolkit";
import { appointmentSlice } from "./appointmentBooking";

export const reducers=combineReducers({
    appointmentBooking:appointmentSlice.reducer,
})