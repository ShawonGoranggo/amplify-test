import React, { useEffect, useState } from "react";
import DynamicHeading from "../../components/sharedComponents/DynamicHeading";
import { Calendar } from "../../components/ui/calendar";
import { useForm, Controller } from "react-hook-form";
import NextAndBackButton from "./NextAndBackButton";
import {
  BookingSlotDetailsType,
  PatientFormDetailsType,
} from "../../redux/appointmentBooking/appointmentType";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import generateTimeSlots from "../../constant";

type AppProps = {
  pages: number;
  setPages: React.Dispatch<React.SetStateAction<number>>;
  onNext: (isValid: boolean) => void;
  handleBack: () => void;
  dispatchResetAvailableBookingSlot: () => void;
  readOnlyField?: boolean;
  dispatchPersistPatientBookingSlotDetails: (
    data: BookingSlotDetailsType
  ) => void;
  patientFormDetails: PatientFormDetailsType;
  dispatchGetPatientBookingSlotAction: any;
  availableBookingSlot: any;
  fetching: boolean;
};

const PatientFormSlotBooking = ({
  pages,
  onNext,
  handleBack,
  dispatchPersistPatientBookingSlotDetails,
  patientFormDetails,
  dispatchGetPatientBookingSlotAction,
  availableBookingSlot,
  fetching,
  dispatchResetAvailableBookingSlot,
}: AppProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date()); // Default to today's date
// We have to handle time zone problem
  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingSlotDetailsType>({
    defaultValues: {
      timeSlot: {
        slotStart: "",
        provNum: null,
        opNum: null,
      },
    },
  });

  // Watch selected provider
  const selectedProvider = watch("timeSlot");
  // const testTimeSlots
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
  const [availableDates, setAvailableDates] = useState([]);
  const [slots, setSlots] = useState<any>([]);
  const startOfMonth = moment(currentMonth)
    .startOf("month")
    .format("YYYY-MM-DD");
  const endOfMonth = moment(currentMonth).endOf("month").format("YYYY-MM-DD");


  
  
  // colect available dates
  useEffect(() => {
    if (availableBookingSlot) {
      console.log("jlkhasekd",availableBookingSlot?.filter(
        (availableDate: any) =>
          availableDate?.DateTimeStart?.split(" ")[0] ===
          moment(date).format("YYYY-MM-DD")
        ));
      const filterDates = availableBookingSlot?.map(
        (availableDates: any) =>
          new Date(availableDates?.DateTimeStart?.split(" ")[0])
      );
      setAvailableDates(filterDates);
      setDate(filterDates[0]);
      availableBookingSlot.map((data:any)=>console.log("edeuid",data)
      )
      const testTimeSlots = generateTimeSlots({
        appointments: availableBookingSlot?.filter(
          (availableDate: any) =>
            availableDate?.DateTimeStart?.split(" ")[0] ===
            moment(date).format("YYYY-MM-DD")
          ),
          gapMinutes: patientFormDetails?.reasonForVisit?.reason?.duration,
        });
        console.log(testTimeSlots,availableBookingSlot,"testTimeSlots",availableBookingSlot,availableBookingSlot?.filter(
          (availableDate: any) =>
            availableDate?.DateTimeStart?.split(" ")[0] ===
            moment(date).format("YYYY-MM-DD")
          ),availableBookingSlot[0]?.DateTimeStart?.split(" ")[0],moment(date).format("YYYY-MM-DD"));
      
      setSlots(testTimeSlots)
    }
  }, [availableBookingSlot,fetching]);
  // Set the redux persist data to the form
  useEffect(() => {
    if (patientFormDetails?.bookingSlotDetails) {
      setValue(
        "timeSlot",
        patientFormDetails?.bookingSlotDetails.timeSlot || {
          slotStart: "",
          provNum: null,
          opNum: null,
        }
      );
      setDate(
        patientFormDetails?.bookingSlotDetails?.date
          ? new Date(patientFormDetails?.bookingSlotDetails?.date)
          : new Date()
      );
    }
  }, [patientFormDetails?.bookingSlotDetails, setValue]);

  useEffect(() => {
    dispatchResetAvailableBookingSlot();
    const finalData = {
      date: `${startOfMonth}&${endOfMonth}`,
      ProvNum: patientFormDetails?.providerDetails?.provider?.provNum
        ? patientFormDetails?.providerDetails?.provider?.provNum
        : "", // Access the provNum from the provider object
    };
    dispatchGetPatientBookingSlotAction(finalData);
  }, [moment(currentMonth).format("MM")]);

  // Validate the form fields
  const handleNext = handleSubmit(async (data) => {
    // Trigger validation for the specific field
    const isValid = await trigger();
    onNext(isValid);
    if (isValid) {
      const slotBookingDate = date
        ? moment(new Date(date)).format("YYYY-MM-DD")
        : "";
      const finalData = { date: slotBookingDate, timeSlot: data.timeSlot };

      dispatchPersistPatientBookingSlotDetails(finalData);
    }
  });

  return (
    <div id="patient-form-basic-details" className="h-full">
      <div>
        <DynamicHeading
          text="Please select a slot and provider"
          hType="h1"
          className=""
        />
        <div className="flex sm:flex-nowrap [@media(max-width:592px)]:flex-wrap flex-nowrap  mt-5  ">
          <div className="box-border border-r-[1px]  border-gray-300 pr-6  [@media(max-width:522px)]:border-none sm:w-[80%] md:w-[55%] lg:w-[60%] w-[100%]">
            <Calendar
              selected={date} // Date | undefined
              className="rounded-md border-none font-semibold text-[25px]"
              setCurrentMonth={setCurrentMonth}
              availableDates={availableDates}
            />
          </div>

          <div className=" flex  flex-col gap-3 box-border  overflow-y-auto max-h-[350px] overflow-x-hidden theme-scroll  sm:w-[80%] w-[100%] md:w-[45%]">
            {fetching ? (
              [...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  height={50}
                  className="w-3/5 ml-[20%] rounded-md"
                />
              ))
            ) : slots?.length > 0 ? (
              slots?.map((slot: any) => (
                <Controller
                  key={slot?.slotStart}
                  name="timeSlot"
                  control={control}
                  rules={{
                    required: "Please select a slot if you wish.",
                    validate: (value) =>
                      value && value.slotStart
                        ? true
                        : "Please select a slot if you wish.",
                  }}
                  render={({ field }) => (
                    <div
                      className={` border border-[#616163] rounded-lg py-2.5 px-4 text-center box-border cursor-pointer whitespace-nowrap w-[60%] mx-auto ${
                        selectedProvider?.slotStart === slot?.slotStart
                          ? "bg-button-clr-700 text-white"
                          : "bg-white text-black"
                      }`}
                      onClick={() => field.onChange(slot)}
                    >
                      <span className="pl-2">{slot?.slotStart}</span>
                    </div>
                  )}
                />
              ))
            ) : (
              <div className="text-center">No Slots available</div>
            )}
          </div>
        </div>
        {errors.timeSlot && (
          <p className="text-red-500">{errors.timeSlot.message}</p>
        )}
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

export default PatientFormSlotBooking;
