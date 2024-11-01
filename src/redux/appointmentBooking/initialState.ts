import { AppointmentType } from "./appointmentType";

export const initialState: AppointmentType = {
  fetching: false,
  message: null,
  error: null,
  success: null,
  token: null,
  statusCode: null,
  patientList: [],
  patientDetails: [],
  isPatientExists: true,
  createPatient: false,
  availableBookingSlot: [],
  patientFormDetails: {
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
  },
  patientPatNum: null,
  patientFormPageNumber: 1,
};
