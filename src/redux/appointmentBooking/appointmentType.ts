export type AppointmentType = {
  fetching: boolean;
  isPatientExists: boolean;
  createPatient: boolean;
  message: string | null;
  error: string | null | undefined;
  success: number | null;
  token: string | null;
  statusCode: null | number;
  patientFormPageNumber: number;
  patientList: any[];
  availableBookingSlot: any[];
  patientDetails: {};
  patientFormDetails: PatientFormDetailsType;
  patientPatNum: null | number;
};

export type PatientFormDetailsType = {
  basicDetailsData: BasicDetailsDataType;
  reasonForVisit: ReasonForVisitType;
  providerDetails: ProviderType;
  bookingSlotDetails: BookingSlotDetailsType;
  patientContactDetails: PatientContactDetails;
  companionDetails: CompanionBasicDetailsDataType;
  bookingForSomeOne: boolean;
  patientDOBDetails: PatientDOBDetails;
};
export type PatientDOBDetails = {
  birthMonth: string;
  birthDay: string;
  birthYear: string;
};
export type BasicDetailsDataType = {
  firstName: string;
  lastName: string;
  patientStatus: string;
  // bookingForSomeOne?: boolean;
};
export type CompanionBasicDetailsDataType = {
  companionFirstName: string;
  companionLastName: string;
  companionBirthMonth: string;
  companionBirthDay: string;
  companionBirthYear: string;
};

export type ProviderType = {
  provider: {
    name: string;
    provNum: null | number;
  };
};

export type ReasonForVisitType = {
  reason: {
    name: string;
    povNum: number[];
    duration: number | null;
  };
};

export type BookingSlotDetailsType = {
  date: string;
  timeSlot: {
    slotStart: string;
    provNum: number | null;
    opNum: null | number;
  };
};
export type PatientContactDetails = {
  email: string;
  phone: string;
  message: string;
  dob?: string;
  birthMonth?: string;
  birthDay?: string;
  birthYear?: string;
};
// companionDetails:CompanionBasicDetailsDataType
