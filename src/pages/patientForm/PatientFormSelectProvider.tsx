import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import NextAndBackButton from "./NextAndBackButton";
import DynamicHeading from "../../components/sharedComponents/DynamicHeading";
import {
  PatientFormDetailsType,
  ProviderType,
} from "../../redux/appointmentBooking/appointmentType";
import FormRadioField from "../../components/sharedComponents/FormRadioField";

type AppProps = {
  pages: number;
  setPages: React.Dispatch<React.SetStateAction<number>>;
  onNext: (isValid: boolean) => void;
  handleBack: () => void;
  readOnlyField?: boolean;
  dispatchPersistPatientProvider: (data: ProviderType) => void;
  dispatchGetPatientBookingSlotAction: (data: any) => void;
  patientFormDetails: PatientFormDetailsType;
};

const PatientFormSelectProvider = ({
  pages,
  onNext,
  handleBack,
  dispatchPersistPatientProvider,
  patientFormDetails,
}: AppProps) => {
  const providers = [
    {
      name: "Marco Meloni",
      provNum: 4,
    },
    {
      name: "John O'brien",
      provNum: 1,
    },
    {
      name: "Clair Borden",
      provNum: 2,
    },
  ];

  const filteredProviders = [
    ...providers.filter(
      (provider) =>
        patientFormDetails?.reasonForVisit?.reason?.povNum &&
        patientFormDetails?.reasonForVisit?.reason?.povNum?.includes(
          provider?.provNum
        )
    ),
    {
      name: "Choose any",
      provNum: 0,
    },
  ];

  // Specify that the form handles ProviderType
  const {
    trigger,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ProviderType>({
    defaultValues: {
      provider: {
        name: "",
        provNum: null,
      },
    },
  });

  // Watch the currently selected provider
  const selectedProvider = watch();

  // Set the redux persist data to the form
  useEffect(() => {
    if (patientFormDetails?.providerDetails?.provider) {
      setValue(
        "provider",
        patientFormDetails?.providerDetails?.provider || {
          name: "",
          provNum: null,
        }
      );
    }
  }, [patientFormDetails?.providerDetails, setValue]);

  // Handle form data submission
  const handleFormData: SubmitHandler<ProviderType> = (data) => {
    if (selectedProvider && data) {
      dispatchPersistPatientProvider(data);
      // const finalData = {
      //   date: moment(new Date()).format("YYYY-MM-DD"),
      //   // date:"2024-09-27",
      //   ProvNum: data?.provider?.provNum, // Access the provNum from the provider object
      // };
      // dispatchGetPatientBookingSlotAction(finalData);
    }
  };

  // Handle the "Next" button click
  const handleNext = handleSubmit(async (data) => {
    const isValid = await trigger(); // Validate all fields
    isValid && handleFormData(data);
    isValid && onNext(isValid); // Proceed to the next step
  });

  return (
    <div id="patient-form-basic-details" className="">
      <div>
        <DynamicHeading
          text="Please select provider (optional)"
          hType="h1"
          className=""
        />
        <form
          className="mt-5 md:mt-7 gap-4 sm:gap-6"
          onSubmit={handleSubmit(handleFormData)}
        >
          <div className="flex flex-wrap gap-6 mt-5">
            {filteredProviders?.map((provider, index) => (
              <Controller
                key={index}
                name="provider" // Ensure the name matches the form field in ProviderType
                control={control}
                rules={{
                  required: "Please select a Provider",
                  validate: (value) =>
                    value?.provNum !== null || "Please select a Provider",
                }}
                render={({ field }) => (
                  <FormRadioField
                    text={provider?.name}
                    imageVisible={true}
                    index={index}
                    selectedPractice={selectedProvider?.provider?.name}
                    setValue={() => field.onChange(provider)}
                    classNameProps={
                      "lg:flex-[0_0_47%] flex-[1_0_100%] justify-start text-[20px] text-[#666565] border-[#00000070] font-[400]"
                    }
                  />
                )}
              />
            ))}
          </div>
          {errors.provider && (
            <p className="text-red-500 mt-10">{errors.provider?.message}</p>
          )}
        </form>
      </div>
      <div className="mt-12 gap-4 2xl:mt-18 items-center flex flex-wrap sm:justify-between justify-center border-gray-500">
        <NextAndBackButton
          pages={pages}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      </div>
    </div>
  );
};

export default PatientFormSelectProvider;
