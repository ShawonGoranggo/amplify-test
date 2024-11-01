import practiceLogo from "../../assets/practice-logo.svg";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { PatientFormDetailsType } from "../../redux/appointmentBooking/appointmentType";

type AppProps = {
  patientFormDetails: PatientFormDetailsType;
};

const AppointmentConfirmCard = ({ patientFormDetails }: AppProps) => {
  return (
    <div id="AppointmentConfirmCard" className="p-6 ">
      <div className=" p-5  flex flex-wrap sm:justify-start items-center bg-blue-950 text-white rounded-t-2xl justify-center md:px-8">
        <div>
          <img
            src={practiceLogo}
            alt="Practice Logo"
            className="  max-w-[150px]"
          />
        </div>

        <div className=" items-center text-center mt-4 sm:mt-0 sm:text-left sm:ml-6 md:ml-10 ">
          <h1 className="text-xl sm:text-lg font-semibold">
            GoDental Office Fenton
          </h1>
          <p className="text-base sm:text-sm mt-1">
            500 North Leroy Street, Fenton, MI
          </p>
          <p className="text-2xl sm:text-xl mt-1">0123 456 789</p>
        </div>
      </div>

      {/* ............... */}

      <div className=" border border-gray-400 py-4 px-4 md:px-8 md:py-8 rounded-b-2xl">
        <div className="grid grid-cols-1   md:grid-cols-2 relative ">
          <div className="  p-4 border-t-[1px] ">
            <div className="  ">
              <h2 className="font-medium   lg:text-[24px] md:text-[23px] text-[22px]">
                {/** smallest screen text-[22px] , then bigger md , then mopre bigger lg */}
                {`${patientFormDetails?.bookingSlotDetails?.date} ${patientFormDetails?.bookingSlotDetails?.timeSlot?.slotStart}`}
              </h2>
              <p className="lg:text-[20px] md:text-[19px] text-[18px] text-gray-600">
                {patientFormDetails?.reasonForVisit?.reason?.name}
              </p>
            </div>
          </div>
          <div className=" p-4 border-t-[1px]">
            <div className=" items-center  flex flex-wrap ">
              <img
                src="https://www.shutterstock.com/image-vector/male-doctor-smiling-selfconfidence-flat-260nw-2281709217.jpg"
                alt="Doctor"
                className="h-12 w-12  rounded-full object-cover "
              />
              <div>
                <p className="ml-2 lg:text-[24px] md:text-[22px] text-[21px] font-semibold text-gray-500">
                  {patientFormDetails?.providerDetails?.provider?.name}
                </p>
              </div>
            </div>
          </div>

          {/* ............... */}
          <div className=" p-4 border-t-[1px] ">
            <div className="">
              <h2 className="font-medium lg:text-[24px] md:text-[22px] text-[21px]">
                Patient Details
              </h2>
              <p className="lg:text-[20px] md:text-[19px] text-[18px] text-gray-600">
                {`${patientFormDetails?.basicDetailsData?.firstName} ${patientFormDetails?.basicDetailsData?.lastName}`}
              </p>
            </div>
          </div>
          <div className="  p-4 border-t-[1px] ">
            <div>
              <p className="lg:text-[20px] md:text-[19px] text-[18px] font-semibold text-gray-600">
                {patientFormDetails?.patientContactDetails?.phone}
              </p>
              <p className="lg:text-[20px] md:text-[19px] text-[18px]] font-semibold text-gray-600">
                {patientFormDetails?.patientContactDetails?.email}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/4 bg-confirm-bg text-green-700 p-3 rounded-xl flex items-center justify-center mx-auto mt-6 gap-1">
          <span className="text-xl  ">
            <IoCheckmarkCircleOutline className="" />
          </span>
          <span className="text-base sm:text-lg font-semibold">
            Appointment Confirmed
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmCard;
