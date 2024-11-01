import { createSlice } from "@reduxjs/toolkit";
import { appointmentReducer } from "./reducer";
import { initialState } from "./initialState";
import { AppointmentType } from "./appointmentType";
import {
  bookAppointmentAction,
  createNewPatientAction,
  getPatientBookingSlotAction,
  getPatientDetailsAction,
  getPatientListAction,
} from "./actions";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: initialState,
  reducers: appointmentReducer, // appointmentReducer is an object from reducer.ts (appointmentReducer contains all the reducer functions)
  extraReducers(builder) {
    builder
      .addCase(bookAppointmentAction.pending, (state: AppointmentType) => ({
        ...state,
        fetching: true,
      }))
      .addCase(
        bookAppointmentAction.fulfilled,
        (state: AppointmentType, { payload }) => {
          const { status_code, success, message } = payload;

          if (success === 0) {
            return {
              ...state,
              fetching: false,
              success,
              statusCode: status_code,
              error: message,
            };
          }

          return {
            ...state,
            fetching: false,
            statusCode: status_code,
          };
        }
      )
      .addCase(
        bookAppointmentAction.rejected,
        (state: AppointmentType, { error }) => ({
          ...state,
          fetching: false,
          error: error?.message,
          success: 0,
        })
      )
      .addCase(getPatientListAction.pending, (state: AppointmentType) => ({
        ...state,
        fetching: true,
      }))
      .addCase(
        getPatientListAction.fulfilled,
        (state: AppointmentType, { payload }) => {
          const { status_code, success, message } = payload;
          if (success === 0) {
            return {
              ...state,
              fetching: false,
              success,
              statusCode: status_code,
              error: message,
            };
          }

          return {
            ...state,
            fetching: false,
            statusCode: status_code,
            patientList: payload,
          };
        }
      )
      .addCase(
        getPatientListAction.rejected,
        (state: AppointmentType, { error }) => ({
          ...state,
          fetching: false,
          error: error?.message,
          success: 0,
        })
      )
      .addCase(
        getPatientBookingSlotAction.pending,
        (state: AppointmentType) => ({
          ...state,
          fetching: true,
        })
      )
      .addCase(
        getPatientBookingSlotAction.fulfilled,
        (state: AppointmentType, { payload }) => {
          const { status_code, success, message } = payload;
          if (success === 0) {
            return {
              ...state,
              fetching: false,
              success,
              statusCode: status_code,
              error: message,
            };
          }

          return {
            ...state,
            fetching: false,
            statusCode: status_code,
            availableBookingSlot: payload,
          };
        }
      )
      .addCase(
        getPatientBookingSlotAction.rejected,
        (state: AppointmentType, { error }) => ({
          ...state,
          fetching: false,
          error: error?.message,
          success: 0,
        })
      )
      .addCase(createNewPatientAction.pending, (state: AppointmentType) => ({
        ...state,
        fetching: true,
      }))
      .addCase(
        createNewPatientAction.fulfilled,
        (state: AppointmentType, { payload }) => {
          const { status_code, success, message } = payload;

          if (success === 0) {
            return {
              ...state,
              fetching: false,
              success,
              statusCode: status_code,
              error: message,
            };
          }

          return {
            ...state,
            fetching: false,
            statusCode: status_code,
            patientPatNum: payload?.PatNum,
            patientDetails: [payload],
          };
        }
      )
      .addCase(
        createNewPatientAction.rejected,
        (state: AppointmentType, { error }) => ({
          ...state,
          fetching: false,
          error: error?.message,
          success: 0,
        })
      )
      .addCase(getPatientDetailsAction.pending, (state: AppointmentType) => ({
        ...state,
        fetching: true,
      }))
      .addCase(
        getPatientDetailsAction.fulfilled,
        (state: AppointmentType, { payload }) => {
          const { status_code, success, message } = payload;
          if (success === 0) {
            return {
              ...state,
              fetching: false,
              success,
              statusCode: status_code,
              error: message,
            };
          }

          return {
            ...state,
            fetching: false,
            statusCode: status_code,
            patientDetails: payload,
            createPatient: payload.length === 0 ? true : false,
          };
        }
      )
      .addCase(
        getPatientDetailsAction.rejected,
        (state: AppointmentType, { error }) => ({
          ...state,
          fetching: false,
          error: error?.message,
          success: 0,
        })
      );
  },
});

export const {
  persistPatientFormBasicDetailsData,
  persistPatientReasonForVisit,
  persistPatientProvider,
  persistPatientBookingSlotDetails,
  persistPatientFormPages,
  persistPatientPatientContactDetails,
  resetPatientFormDetails,
  resetPatientDetails,
  persistPatientCompanionDetailsData,
  persistPatientDOBDetails,
  persistPatientBookingForSomeOne,
  resetAvailableBookingSlot,
} = appointmentSlice.actions;
// Normally the above reducer functions should be in this file but in here the
// reducer functions are in reduce,ts
// and the process of getting all the reducer functions here is on line number 16
