import { UseFormRegister } from "react-hook-form";
import FormNumberTypeInputField from "../../components/sharedComponents/FormNumberTypeInputField";
import { months } from "../../constant";
type AppProps = {
  register: UseFormRegister<any>;
  errors: any;
};

const PatientDOB = ({ register, errors }: AppProps) => {
  return (
    <div className="gap-2 md:gap-4 grid grid-cols-9 items-center">
      <div className="col-span-4 md:col-span-3">
        <div className="flex flex-col flex-1 gap-2">
          <label className="mb-2 font-medium text-gray-600" htmlFor="month">
            Month
          </label>
          <div className="relative">
            <select
              id="month"
              {...register("birthMonth", { required: "Month is required" })}
              className={`p-3 border-[2px] border-gray-400 rounded-[7px] focus:ring-blue-500 focus:border-blue-500 appearance-none w-full pr-10 col-span-2 ${
                errors.birthMonth ? "border-red-500" : ""
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
          {errors.birthMonth && (
            <span className="text-red-500">{errors.birthMonth.message}</span>
          )}
        </div>
      </div>

      <div className="col-span-2 md:col-span-3">
        <FormNumberTypeInputField
          register={register}
          type="text"
          placeholder="DD"
          fieldName="birthDay"
          labelName="Day"
          required
          maxLength={2}
        />
        {errors.birthDay && (
          <span className="text-red-500 text-sm">Birthday is required</span>
        )}
      </div>

      <div className="col-span-3 md:col-span-3">
        <FormNumberTypeInputField
          register={register}
          type="text"
          placeholder="YYYY"
          fieldName="birthYear"
          labelName="Year"
          required
          maxLength={4}
        />
        {errors.birthYear && (
          <span className="text-red-500 text-sm">Birth year is required</span>
        )}
      </div>
    </div>
  );
};

export default PatientDOB;
