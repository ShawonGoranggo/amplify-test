import DynamicHeading from "../../components/sharedComponents/DynamicHeading";
import FormInputField from "../../components/sharedComponents/FormInputField";
import { UseFormRegister } from "react-hook-form";
import { PatientContactDetails } from "../../redux/appointmentBooking/appointmentType";

type AppProps = {
  register: UseFormRegister<PatientContactDetails>;
  errors: any;
};

const PatientContactInformation = ({ register, errors }: AppProps) => {
  return (
    <div id="patientContactInformation" className="mt-7">
      <DynamicHeading text="Contact info" hType="h1" className="" />
      <div className="grid grid-cols-6 gap-4 sm:gap-6 md:gap-8 mt-5 md:mt-7">
        <div className=" md:col-span-3 col-span-6">
          <FormInputField
            register={register}
            type="email"
            placeholder="Enter Email"
            fieldName="email"
            labelName="Email"
          />
        </div>
        <div className="md:col-span-3 col-span-6">
          <FormInputField
            register={register}
            type="text"
            placeholder="Enter Phone number"
            fieldName="phone"
            labelName="Phone"
            required
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>
        <div className="col-span-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-600" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              placeholder="Enter your message..."
              rows={3}
              className={`p-3 border-[2px] border-gray-400 rounded-[7px] mt-2 ${
                errors.message ? "border-red-500" : ""
              }`}
            />
            {errors.message && (
              <span className="text-red-500 mt-1">
                {errors.message.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientContactInformation;
