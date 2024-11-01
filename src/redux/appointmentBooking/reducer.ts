import {
  AppointmentType,
  BasicDetailsDataType,
  BookingSlotDetailsType,
  CompanionBasicDetailsDataType,
  PatientContactDetails,
  PatientDOBDetails,
  ProviderType,
  ReasonForVisitType,
} from "./appointmentType";

export const appointmentReducer = {
  // This object(appointmentReducer) will be imported/called in slice.ts file.
  resetAuthError: (state: AppointmentType) => {
    state.error = null;
  },

  resetAuthSuccess: (state: AppointmentType) => {
    state.success = null;
  },

  resetAuthFetching: (state: AppointmentType) => {
    state.fetching = false;
  },

  resetAuthMessage: (state: AppointmentType) => {
    state.message = null;
  },

  // persist the patient patient form pages
  persistPatientFormPages: (
    state: AppointmentType,
    { payload }: { payload: number }
  ) => {
    state.patientFormPageNumber = payload;
  },

  // persist the patient Details Data
  persistPatientFormBasicDetailsData: (
    state: AppointmentType,
    { payload }: { payload: BasicDetailsDataType } // instead of using action.payload we are destructuring the payload from action
  ) => {
    state.patientFormDetails = {
      ...state.patientFormDetails,
      basicDetailsData: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        patientStatus: payload.patientStatus,
      },
    };
  },
  persistPatientCompanionDetailsData: (
    state: AppointmentType,
    { payload }: { payload: CompanionBasicDetailsDataType } // instead of using action.payload we are destructuring the payload from action
  ) => {
    state.patientFormDetails = {
      ...state.patientFormDetails,
      companionDetails: {
        companionFirstName: payload.companionFirstName,
        companionLastName: payload.companionLastName,
        companionBirthMonth: payload.companionBirthMonth,
        companionBirthDay: payload.companionBirthDay,
        companionBirthYear: payload.companionBirthYear,
      },
    };
  },
  persistPatientReasonForVisit: (
    state: AppointmentType,
    { payload }: { payload: ReasonForVisitType }
  ) => {
    state.patientFormDetails = {
      ...state.patientFormDetails,
      reasonForVisit: {
        reason: {
          name: payload.reason.name,
          povNum: payload.reason.povNum,
          duration: payload.reason.duration,
        },
      },
    };
  },
  persistPatientBookingForSomeOne: (
    state: AppointmentType,
    { payload }: { payload: boolean }
  ) => {
    state.patientFormDetails = {
      ...state.patientFormDetails,
      bookingForSomeOne: payload,
    };
  },

  persistPatientProvider: (
    state: AppointmentType,
    { payload }: { payload: ProviderType }
  ) => {
    state.patientFormDetails = {
      ...state.patientFormDetails,
      providerDetails: {
        provider: {
          name: payload.provider.name,
          provNum: payload.provider.provNum,
        },
      },
    };
  },
  persistPatientBookingSlotDetails: (
    state: AppointmentType,
    { payload }: { payload: BookingSlotDetailsType }
  ) => {
    state.patientFormDetails = {
      ...state.patientFormDetails,
      bookingSlotDetails: {
        date: payload.date,
        timeSlot: {
          slotStart: payload.timeSlot.slotStart,
          provNum: payload.timeSlot.provNum,
          opNum: payload.timeSlot.opNum,
        },
      },
    };
  },
  persistPatientPatientContactDetails: (
    state: AppointmentType,
    { payload }: { payload: PatientContactDetails }
  ) => {
    state.patientFormDetails = {
      ...state.patientFormDetails,
      patientContactDetails: {
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
      },
    };
  },
  persistPatientDOBDetails: (
    state: AppointmentType,
    { payload }: { payload: PatientDOBDetails }
  ) => {
    state.patientFormDetails = {
      ...state.patientFormDetails,
      patientDOBDetails: {
        birthMonth: payload.birthMonth,
        birthDay: `${
          +payload.birthDay < 10 && payload.birthDay.length < 2
            ? `0${payload.birthDay}`
            : payload.birthDay
        }`,
        birthYear: payload.birthYear,
      },
    };
  },

  resetPatientFormDetails: (state: AppointmentType) => {
    (state.patientFormDetails = {
      basicDetailsData: {
        firstName: "",
        lastName: "",
        patientStatus: "",
      },
      patientDOBDetails: {
        birthMonth: "",
        birthDay: "",
        birthYear: "",
      },
      bookingForSomeOne: false,
      companionDetails: {
        companionFirstName: "",
        companionLastName: "",
        companionBirthMonth: "01",
        companionBirthDay: "",
        companionBirthYear: "",
      },
      reasonForVisit: {
        reason: {
          name: "",
          povNum: [],
          duration: null,
        },
      },
      providerDetails: {
        provider: {
          name: "",
          provNum: null,
        },
      },
      bookingSlotDetails: {
        date: "",
        timeSlot: {
          slotStart: "",
          provNum: null,
          opNum: null,
        },
      },
      patientContactDetails: {
        email: "",
        phone: "",
        message: "",
      },
    }),
      (state.patientFormPageNumber = 1);
  },

  resetPatientDetails: (state: AppointmentType) => {
    state.patientDetails = [];
  },
  resetAvailableBookingSlot: (state: AppointmentType) => {
    state.availableBookingSlot = [];
  },
};
