import { Controller, UseFormRegister } from "react-hook-form";
import FormInputField from "../../components/sharedComponents/FormInputField";
import DynamicHeading from "../../components/sharedComponents/DynamicHeading";
import FormRadioField from "../../components/sharedComponents/FormRadioField";
import PatientDOB from "./PatientDOB";
const radioOption = ["New Patient", "Returning Patient"];
type DOBDetails = {
  birthMonth: string;
  birthDay: string;
  birthYear: string;
};
type AppProps = {
  readOnlyField?: boolean;
  componentType?: string;
  validDob?: null | boolean;
  errors: any;
  register: UseFormRegister<any>;
  dobDetails?: DOBDetails;
  bookingForSomeOne?: boolean;
  control: any;
  patientStatus?: string;
};
const PatientFormBasicDetailsInput = ({
  readOnlyField,
  componentType,
  validDob,
  register,
  errors,
  bookingForSomeOne,
  control,
  patientStatus,
}: AppProps) => {
  return (
    <div className="grid grid-cols-6 gap-4 sm:gap-6 md:gap-8 mt-5 md:mt-7 w-full">
      <div className="md:col-span-3 col-span-6">
        <FormInputField
          register={register}
          type="text"
          placeholder="Enter First Name"
          fieldName="firstName"
          labelName="First Name"
          readOnlyField={readOnlyField}
          required={true}
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm">First name is required</span>
        )}
      </div>
      <div className="md:col-span-3 col-span-6">
        <FormInputField
          register={register}
          type="text"
          placeholder="Enter Last Name"
          fieldName="lastName"
          labelName="Last Name"
          readOnlyField={readOnlyField}
          required={true}
        />
        {errors.lastName && (
          <span className="text-red-500 text-sm">Last name is required</span>
        )}
      </div>
      {componentType === "allDetails" && (
        <div className="md:col-span-6 col-span-6">
          <PatientDOB register={register} errors={errors} />
        </div>
      )}
      {validDob === false && (
        <span className="text-red-500 text-sm">
          Birthday must be a valid date
        </span>
      )}

      {componentType !== "allDetails" && (
        <div className="mt-6 col-span-6">
          <DynamicHeading
            text={`Have ${
              bookingForSomeOne ? "they" : "you"
            } visited us before`}
            hType="h3"
            className="font-semibold text-gray-600 lg:text-[20px]"
          />
          <div className="flex flex-wrap gap-4 mt-5">
            {radioOption.map((practice, index) => (
              <Controller
                key={index}
                name="patientStatus"
                control={control}
                defaultValue="New Patient"
                rules={{ required: "Please select patient status" }}
                render={({ field }) => (
                  <FormRadioField
                    text={practice}
                    index={index}
                    selectedPractice={patientStatus || "New Patient"}
                    setValue={(value) => field.onChange(value)}
                  />
                )}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center mt-4 col-span-6 ">
        <input
          type="checkbox"
          id="booking-for-someone"
          {...register("bookingForSomeOne")}
          className="mr-2 scale-125 sm:scale-150"
        />
        <label
          htmlFor="booking-for-someone"
          className="cursor-pointer lg:text-[20px] text-[#515151]"
        >
          Booking for Someone Else
        </label>
      </div>
    </div>
  );
};

export default PatientFormBasicDetailsInput;
