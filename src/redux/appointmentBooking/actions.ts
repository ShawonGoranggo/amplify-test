import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  bookAppointmentApi,
  createNewPatientApi,
  getBookingSlotApi,
  getPatientDetailsApi,
  getPatientListApi,
} from "../../apis/appointmentApis";

// only async operations are here rest are handled in reducer.ts
export const bookAppointmentAction = createAsyncThunk(
  "user/login",
  async (data: any) => {
    const response = await bookAppointmentApi(data);
    return response.data;
  }
);

export const getPatientListAction = createAsyncThunk(
  "get/patientList",
  async () => {
    const response = await getPatientListApi();
    return response.data;
  }
);

export const getPatientBookingSlotAction = createAsyncThunk(
  "get/bookingSlot",
  async (data: any) => {
    const response = await getBookingSlotApi(data);
    return response.data;
  }
);

export const createNewPatientAction = createAsyncThunk(
  "create/newPatient",
  async (data: any) => {
    const response = await createNewPatientApi(data);
    return response.data;
  }
);

export const getPatientDetailsAction = createAsyncThunk(
  "get/patientDetails",
  async (data: any, { dispatch }) => {
    const response = await getPatientDetailsApi(data);
    // If response data is an empty array, call createNewPatientAction
    if (Array.isArray(response.data) && response.data.length === 0) {
      const newPatientResponse = await dispatch(createNewPatientAction(data));
      return newPatientResponse.payload; // Return newly created patient data
    }

    // If there are patients in the list, return the existing data
    return response.data;
  }
);
