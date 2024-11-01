import React, { useEffect } from "react";
import DynamicHeading from "../../components/sharedComponents/DynamicHeading";
import { useForm, Controller } from "react-hook-form";
import FormRadioField from "../../components/sharedComponents/FormRadioField";
import NextAndBackButton from "./NextAndBackButton";
import { ReasonForVisitType } from "../../redux/appointmentBooking/appointmentType";

// export type Inputs = {
//   practice: string; // This will hold the selected practice value
// };

type AppProps = {
  pages: number;
  setPages: React.Dispatch<React.SetStateAction<number>>;
  onNext: (isValid: boolean) => void;
  handleBack: () => void;
  readOnlyField?: boolean;
  dispatchPersistPatientReasonForVisit: (data: ReasonForVisitType) => void;
  reasonForVisit: ReasonForVisitType;
};

const PatientVisitForm = ({
  pages,
  onNext,
  handleBack,
  dispatchPersistPatientReasonForVisit,
  reasonForVisit,
}: AppProps) => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ReasonForVisitType>({
    defaultValues: {
      reason: {
        name: "",
        povNum: [],
        duration: null,
      },
    },
  });

  // Watch the currently selected practice
  const selectedPractice = watch("reason");

  // set the data to the form that get from redux
  useEffect(() => {
    if (reasonForVisit) {
      setValue("reason", reasonForVisit.reason || "");
    }
  }, [reasonForVisit, setValue]);

  // const onSubmit: SubmitHandler<ReasonForVisitType> = (data) => {};

  const reasonForVisitArray = [
    {
      name: "Dental Cleaning",
      // "opNum":1,
      povNum: [2],
      duration: 60,
    },
    {
      name: "Root Canal",
      // "opNum":2,
      povNum: [1, 2],
      duration: 40,
    },
    {
      name: "Implants",
      // "opNum":3,
      povNum: [2, 4],
      duration: 80,
    },
    {
      name: "Dental Emergency",
      // "opNum":4,
      povNum: [1, 4],
      duration: 50,
    },
    {
      name: "Veneers",
      // "opNum":5,
      povNum: [1, 2, 4],
      duration: 30,
    },
  ];

  const handleNext = handleSubmit(async (data) => {
    // Trigger validation for the specific field
    const isValid = await trigger();
    onNext(isValid);
    if (isValid) {
      dispatchPersistPatientReasonForVisit(data);
    }
  });

  return (
    <div id="patient-form-basic-details" className="">
      <DynamicHeading
        text="Please select the reason for your visit"
        hType="h1"
        className=""
      />
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="mt-5 md:mt-7 gap-4 sm:gap-6"
      >
        <div className="flex flex-wrap gap-4 mt-5">
          {reasonForVisitArray.map((reason, index) => (
            <Controller
              key={index}
              name="reason" // Controlled input for the reason
              control={control}
              rules={{
                required: "Please select a reason for your visit",
                validate: (value) =>
                  value && value.name
                    ? true
                    : "Please select a reason for your visit",
              }}
              render={({ field }) => (
                <FormRadioField
                  text={reason?.name}
                  index={index}
                  selectedPractice={selectedPractice?.name}
                  setValue={() => field.onChange(reason)}
                />
              )}
            />
          ))}
        </div>
        {errors.reason && (
          <p className="text-red-500 mt-10">{errors.reason.message}</p>
        )}
        <div className="mt-12 gap-4 2xl:mt-18 items-center flex flex-wrap sm:justify-between justify-center border-gray-500">
          <NextAndBackButton
            pages={pages}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        </div>
      </form>
    </div>
  );
};

export default PatientVisitForm;
