import React, { useEffect, useState } from "react";
import PatientContactInformation from "./PatientContactInformation";
import { SubmitHandler, useForm } from "react-hook-form";
import NextAndBackButton from "./NextAndBackButton";
import {
  CompanionBasicDetailsDataType,
  PatientContactDetails,
  PatientDOBDetails,
  PatientFormDetailsType,
} from "../../redux/appointmentBooking/appointmentType";
import { isValidDate } from "../../constant/dateValidation";
import CompanionBasicDetails from "./CompanionBasicDetails";
import PatientFormBasicDetailsInput from "./PatientFormBasicDetailsInput";
import Loader from "./Loader";

type AppProps = {
  pages: number;
  setPages: React.Dispatch<React.SetStateAction<number>>;
  onNext: (isValid: boolean) => void;
  handleBack: () => void;
  readOnlyField?: boolean;
  dispatchPersistPatientContactDetails: (data: PatientContactDetails) => void;
  dispatchGetPatientDetailsAction: (data: any) => void;
  dispatchCreateNewPatientAction: (data: any) => void;
  dispatchPersistPatientBookingForSomeOne: (data: boolean) => void;
  dispatchPersistPatientCompanionDetailsData: (
    data: CompanionBasicDetailsDataType
  ) => void;
  patientFormDetails: PatientFormDetailsType;
  patientDetails: any;
  createPatient: boolean;
  fetching: boolean;
  patientPatNum: number | null;
  dispatchPersistPatientDOBDetails: (data: PatientDOBDetails) => void;
  dispatchBookAppointmentAction: (data: any) => void;
  dispatchRresetPatientDetails: () => void;
};

const PatientFormAllDetails = ({
  pages,
  handleBack,
  dispatchPersistPatientContactDetails,
  patientFormDetails,
  dispatchGetPatientDetailsAction,
  onNext,
  patientDetails,
  dispatchPersistPatientCompanionDetailsData,
  dispatchPersistPatientBookingForSomeOne,
  dispatchPersistPatientDOBDetails,
  dispatchBookAppointmentAction,
  fetching,
  dispatchRresetPatientDetails,
}: AppProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
    control,
  } = useForm<any>({
    defaultValues: {
      firstName: "",
      lastName: "",
      bookingForSomeOne: patientFormDetails?.bookingForSomeOne || false,
      email: "",
      phone: "",
      message: "",
      birthMonth: "01",
      birthDay: "",
      birthYear: "",
      companionFirstName: "",
      companionLastName: "",
      companionBirthMonth: "01",
      companionBirthDay: "",
      companionBirthYear: "",
    },
  });

  const {
    birthMonth,
    birthDay,
    birthYear,
    companionFirstName,
    companionLastName,
    companionBirthMonth,
    companionBirthDay,
    companionBirthYear,
    bookingForSomeOne,
  } = watch();
  const [validDob, setValidDob] = useState<null | boolean>(null);
  const [submitForm, setSubmitForm] = useState<boolean>(false);
  const [validCompanionDob, setValidCompanionDob] = useState<null | boolean>(
    null
  );

  useEffect(() => {
    dispatchRresetPatientDetails();
  }, []);

  useEffect(() => {
    dispatchPersistPatientBookingForSomeOne(bookingForSomeOne);
  }, [bookingForSomeOne]);

  // Set the redux persist data to the form
  useEffect(() => {
    if (patientFormDetails?.patientContactDetails) {
      setValue("email", patientFormDetails?.patientContactDetails.email || "");
      setValue(
        "companionFirstName",
        patientFormDetails?.companionDetails?.companionFirstName || ""
      );
      setValue(
        "companionLastName",
        patientFormDetails?.companionDetails?.companionLastName || ""
      );
      setValue(
        "companionBirthMonth",
        patientFormDetails?.companionDetails?.companionBirthMonth || "01"
      );
      setValue(
        "companionBirthDay",
        patientFormDetails?.companionDetails?.companionBirthDay || ""
      );
      setValue(
        "companionBirthYear",
        patientFormDetails?.companionDetails?.companionBirthYear || ""
      );
      setValue(
        "birthDay",
        patientFormDetails?.patientDOBDetails?.birthDay || ""
      );
      setValue(
        "birthYear",
        patientFormDetails?.patientDOBDetails?.birthYear || ""
      );
      setValue(
        "birthMonth",
        patientFormDetails?.patientDOBDetails?.birthMonth || "01"
      );

      setValue(
        "message",
        patientFormDetails?.patientContactDetails.message || ""
      );
    }
  }, [patientFormDetails?.patientContactDetails, setValue]);

  useEffect(() => {
    if (patientFormDetails?.basicDetailsData) {
      setValue(
        "firstName",
        patientFormDetails?.basicDetailsData.firstName || ""
      );
      setValue("lastName", patientFormDetails?.basicDetailsData.lastName || "");
    }
  }, [patientFormDetails?.basicDetailsData, setValue]);

  //Appointment booking api dispatch
  useEffect(() => {
    if (patientDetails?.length && submitForm) {
      dispatchBookAppointmentAction({ ...patientFormDetails, patientDetails });
      onNext(true);
    }
  }, [patientDetails]);

  const handleFormData: SubmitHandler<PatientContactDetails> = (data) => {
    dispatchPersistPatientContactDetails(data);
    const companionDetails = {
      companionFirstName,
      companionLastName,
      companionBirthMonth,
      companionBirthDay,
      companionBirthYear,
    };
    patientFormDetails?.bookingForSomeOne &&
      dispatchPersistPatientCompanionDetailsData(companionDetails);
    const patientDOBDetails = {
      birthMonth,
      birthDay: `${
        +birthDay < 10 && birthDay.length < 2 ? `0${birthDay}` : birthDay
      }`,
      birthYear,
    };
    setSubmitForm(true);
    dispatchPersistPatientDOBDetails(patientDOBDetails);
  };

  // Validate the form fields
  const handleNext = handleSubmit(async (data) => {
    // Trigger validation for the specific field
    const isPatientDOBValid = isValidDate(
      `${birthYear}-${birthMonth}-${
        +birthDay < 10 && birthDay.length < 2 ? `0${birthDay}` : birthDay
      }`
    );
    const isPatientCompanionDOBValid = isValidDate(
      `${companionBirthYear}-${companionBirthMonth}-${
        +companionBirthDay < 10 && companionBirthDay.length < 2
          ? `0${companionBirthDay}`
          : companionBirthDay
      }`
    );
    const isValid = await trigger();
    setValidCompanionDob(
      companionBirthMonth &&
        companionBirthDay &&
        companionBirthYear &&
        isPatientCompanionDOBValid
    );
    setValidDob(birthMonth && birthDay && birthYear && isPatientDOBValid);
    if (isValid && isPatientDOBValid) {
      if (patientFormDetails?.basicDetailsData) {
        const finalData = {
          firstName: patientFormDetails?.basicDetailsData?.firstName,
          lastName: patientFormDetails?.basicDetailsData?.lastName,
          dob: `${birthYear}-${birthMonth}-${
            +birthDay < 10 && birthDay.length < 2 ? `0${birthDay}` : birthDay
          }`,
        };
        dispatchGetPatientDetailsAction(finalData);
      }
      handleFormData(data);
    }
  });

  return (
    <>
      {fetching ? (
        <div className="max-w[100px] m-auto flex items-center h-full justify-center">
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleFormData)}>
          <PatientFormBasicDetailsInput
            register={register}
            errors={errors}
            control={control}
            componentType="allDetails"
            readOnlyField={true}
            validDob={validDob}
          />
          <div className="mt-10 border-b-2 border-gray-300 w-full"></div>
          {patientFormDetails?.bookingForSomeOne && (
            <CompanionBasicDetails
              register={register}
              errors={errors}
              validCompanionDob={validCompanionDob}
            />
          )}
          <PatientContactInformation register={register} errors={errors} />
          <div className="mt-12 gap-4 2xl:mt-18 items-center flex flex-wrap sm:justify-between justify-center border-gray-500">
            <NextAndBackButton
              pages={pages}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default PatientFormAllDetails;
