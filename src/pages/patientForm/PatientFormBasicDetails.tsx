import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DynamicHeading from "../../components/sharedComponents/DynamicHeading";
import NextAndBackButton from "./NextAndBackButton";
import {
  BasicDetailsDataType,
  PatientFormDetailsType,
} from "../../redux/appointmentBooking/appointmentType";
import PatientFormBasicDetailsInput from "./PatientFormBasicDetailsInput";

export type BasicDetailsDataFormType = {
  patientStatus: string;
  firstName: string;
  lastName: string;
  bookingForSomeOne: boolean;
};

type AppProps = {
  pages: number;
  onNext?: (isValid: boolean) => void;
  handleBack: () => void;
  readOnlyField?: boolean;
  dispatchPersistPatientFormBasicDetailsData?: (
    data: BasicDetailsDataType
  ) => void;
  dispatchPersistPatientBookingForSomeOne?: (data: boolean) => void;
  patientFormDetails: PatientFormDetailsType;
};

const PatientFormBasicDetails = ({
  pages,
  onNext,
  readOnlyField,
  handleBack,
  dispatchPersistPatientFormBasicDetailsData,
  patientFormDetails,
  dispatchPersistPatientBookingForSomeOne,
}: AppProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
    control,
    setFocus,
  } = useForm<BasicDetailsDataFormType>({
    defaultValues: {
      patientStatus: "New Patient",
      firstName: "",
      lastName: "",
      bookingForSomeOne: false,
    },
  });

  const { bookingForSomeOne } = watch();
  // Watch the currently selected practice
  const patientStatus = watch("patientStatus");
  // set the data to the form that get from redux
  useEffect(() => {
    setFocus("firstName");
    if (patientFormDetails?.basicDetailsData) {
      setValue(
        "firstName",
        patientFormDetails?.basicDetailsData.firstName || ""
      );
      setValue("lastName", patientFormDetails?.basicDetailsData.lastName || "");
      setValue(
        "bookingForSomeOne",
        patientFormDetails?.bookingForSomeOne ? true : false
      );
      setValue(
        "patientStatus",
        patientFormDetails?.basicDetailsData.patientStatus || "New Patient"
      );
    }
  }, [patientFormDetails?.basicDetailsData, setValue]);

  // const handleFormData: SubmitHandler<BasicDetailsDataFormType> = (data) => {};

  const handleNext = handleSubmit(async (data) => {
    const isValid = await trigger();
    onNext?.(isValid); // Proceed to the next step only if the form is valid
    if (isValid) {
      const patientBasicDetails = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        patientStatus: data?.patientStatus,
      };
      dispatchPersistPatientBookingForSomeOne?.(bookingForSomeOne);
      dispatchPersistPatientFormBasicDetailsData?.(patientBasicDetails); // persist the basic details data into redux
    }
    // upon validation dispatches  the payload by calling the function defined in index.tsx
  });

  return (
    <div id="patient-form-basic-details" className="">
      <DynamicHeading text="Enter your Details" hType="h1" className="" />
      <form 
      // onSubmit={handleSubmit(handleFormData)}
      >
        <PatientFormBasicDetailsInput
          register={register}
          errors={errors}
          control={control}
          patientStatus={patientStatus}
          bookingForSomeOne={bookingForSomeOne}
        />
      </form>
      {!readOnlyField && (
        <div className="mt-12 2xl:mt-16 items-center flex flex-wrap justify-between border-gray-500">
          <NextAndBackButton
            pages={pages}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        </div>
      )}
    </div>
  );
};

export default PatientFormBasicDetails;
