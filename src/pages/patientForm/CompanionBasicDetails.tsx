import { UseFormRegister } from "react-hook-form";
import FormInputField from "../../components/sharedComponents/FormInputField";
import FormNumberTypeInputField from "../../components/sharedComponents/FormNumberTypeInputField";
import { months } from "../../constant";

type AppProps = {
  register: UseFormRegister<any>;
  errors: any;
  validCompanionDob: null | boolean;
};

const CompanionBasicDetails = ({
  register,
  errors,
  validCompanionDob,
}: AppProps) => {
  return (
    <div
      id="patient-form-basic-details"
      className="grid grid-cols-6 gap-4 sm:gap-6 md:gap-8 mt-5 md:mt-7"
    >
      <div className="md:col-span-3 col-span-6">
        <FormInputField
          register={register}
          type="text"
          placeholder="Enter First Name"
          fieldName="companionFirstName"
          labelName="Companion First Name"
          required={true}
        />
        {errors.companionFirstName && (
          <span className="text-red-500 text-sm">
            {errors.companionFirstName.message}
          </span>
        )}
      </div>
      <div className="md:col-span-3 col-span-6">
        <FormInputField
          register={register}
          type="text"
          placeholder="Enter Last Name"
          fieldName="companionLastName"
          labelName="companion Last Name"
          required={true}
        />
        {errors.companionLastName && (
          <span className="text-red-500 text-sm">
            {errors.companionLastName.message}
          </span>
        )}
      </div>
      <div className="md:col-span-6 col-span-6 gap-2 md:gap-4 grid grid-cols-9 items-center">
        <div className="col-span-4 md:col-span-3">
          <div className="flex flex-col flex-1 gap-2">
            <label className="mb-2 font-medium text-gray-600" htmlFor="month">
              Month
            </label>
            <div className="relative">
              <select
                id="month"
                {...register("companionBirthMonth", {
                  required: "Month is required",
                })}
                className={`p-3 border-[2px] border-gray-400 rounded-[7px] focus:ring-blue-500 focus:border-blue-500 appearance-none w-full pr-10 col-span-2 ${
                  errors.companionBirthMonth ? "border-red-500" : ""
                }`}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12l-4-4h8l-4 4z" />
                </svg>
              </div>
            </div>
            {errors.companionBirthMonth && (
              <span className="text-red-500">
                {errors.companionBirthMonth.message}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-2 md:col-span-3">
          <FormNumberTypeInputField
            register={register}
            type="text"
            placeholder="DD"
            fieldName="companionBirthDay"
            labelName="Day"
            required
            maxLength={2}
          />
          {errors.companionBirthDay && (
            <span className="text-red-500 text-sm">
              Companion BirthDay is required
            </span>
          )}
        </div>
        <div className="col-span-3 md:col-span-3">
          <FormNumberTypeInputField
            register={register}
            type="text"
            placeholder="YYYY"
            fieldName="companionBirthYear"
            labelName="Year"
            required
            maxLength={4}
          />
          {errors.companionBirthYear && (
            <span className="text-red-500 text-sm">Birth year is required</span>
          )}
        </div>
      </div>
      {validCompanionDob === false && (
        <span className="text-red-500 text-sm">
          Birthday must be a valid date
        </span>
      )}
    </div>
  );
};

export default CompanionBasicDetails;
