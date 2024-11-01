import { useEffect, useState } from "react";
import PracticeBranding from "./PracticeBranding";
import PatientFormBasicDetails from "./PatientFormBasicDetails";
import { connect } from "react-redux";
import {
  createNewPatientAction,
  getPatientBookingSlotAction,
  getPatientDetailsAction,
  persistPatientBookingForSomeOne,
  persistPatientBookingSlotDetails,
  persistPatientCompanionDetailsData,
  persistPatientFormBasicDetailsData,
  persistPatientFormPages,
  persistPatientPatientContactDetails,
  persistPatientDOBDetails,
  persistPatientProvider,
  persistPatientReasonForVisit,
  resetPatientDetails,
  resetPatientFormDetails,
  bookAppointmentAction,
  resetAvailableBookingSlot,
} from "../../redux/appointmentBooking";
import PatientVisitForm from "./PatientVisitForm";
import PatientFormSelectProvider from "./PatientFormSelectProvider";
import PatientFormAllDetails from "./PatientFormAllDetails";
import PatientFormSlotBooking from "./PatientFormSlotBooking";
import AppointmentConfirmCard from "./AppointmentConfirmCard";
import {
  BasicDetailsDataType,
  BookingSlotDetailsType,
  CompanionBasicDetailsDataType,
  PatientContactDetails,
  PatientDOBDetails,
  PatientFormDetailsType,
  ProviderType,
  ReasonForVisitType,
} from "../../redux/appointmentBooking/appointmentType";

type AppProps = {
  dispatchPersistPatientFormBasicDetailsData: (
    data: BasicDetailsDataType
  ) => void;
  dispatchPersistPatientReasonForVisit: (data: ReasonForVisitType) => void;
  dispatchPersistPatientProvider: (data: ProviderType) => void;
  dispatchPersistPatientContactDetails: (data: PatientContactDetails) => void;
  dispatchPersistPatientBookingSlotDetails: (
    data: BookingSlotDetailsType
  ) => void;
  dispatchGetPatientBookingSlotAction: (data: any) => void;
  dispatchPersistPatientFormPages: (data: number) => void;
  dispatchGetPatientDetailsAction: (data: any) => void;
  dispatchCreateNewPatientAction: (data: any) => void;
  dispatchPersistPatientBookingForSomeOne: (data: boolean) => void;
  dispatchPersistPatientCompanionDetailsData: (
    data: CompanionBasicDetailsDataType
  ) => void;
  dispatchPersistPatientDOBDetails: (data: PatientDOBDetails) => void;
  dispatchBookAppointmentAction: (data: any) => void;
  dispatchResetPatientFormDetails: () => void;
  dispatchRresetPatientDetails: () => void;
  dispatchResetAvailableBookingSlot: () => void;
  patientCurrentPageNumber: number;
  patientFormDetails: PatientFormDetailsType;
  availableBookingSlot: any[];
  patientDetails: any[];
  fetching: boolean;
  isPatientExists: boolean;
  createPatient: boolean;
  patientPatNum: number | null;
};

const PatientAppointment = ({
  dispatchPersistPatientFormBasicDetailsData,
  patientCurrentPageNumber,
  dispatchPersistPatientProvider,
  dispatchPersistPatientReasonForVisit,
  dispatchPersistPatientContactDetails,
  dispatchPersistPatientBookingSlotDetails,
  dispatchPersistPatientFormPages,
  patientFormDetails,
  dispatchGetPatientBookingSlotAction,
  availableBookingSlot,
  dispatchGetPatientDetailsAction,
  patientDetails,
  dispatchCreateNewPatientAction,
  fetching,
  dispatchRresetPatientDetails,
  dispatchPersistPatientCompanionDetailsData,
  createPatient,
  dispatchPersistPatientBookingForSomeOne,
  dispatchPersistPatientDOBDetails,
  dispatchBookAppointmentAction,
  patientPatNum,
  dispatchResetAvailableBookingSlot,
}: AppProps) => {
  const [pages, setPages] = useState<number>(patientCurrentPageNumber || 1);

  useEffect(() => {
    dispatchRresetPatientDetails();
    dispatchResetAvailableBookingSlot();
  }, []);

  useEffect(() => {
    dispatchPersistPatientFormPages(pages);
  }, [pages]);

  useEffect(() => {
    if (patientCurrentPageNumber) {
      setPages(patientCurrentPageNumber);
    }
  }, [patientCurrentPageNumber]);

  const handleNext = async (isValid: boolean) => {
    if (isValid) {
      setPages((prev) => (prev < 6 ? prev + 1 : 5));
    }
  };

  const handleBack = () => {
    setPages((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const renderPatientForm = () => {
    switch (pages) {
      case 1:
        return (
          <PatientFormBasicDetails
            pages={pages}
            // setPages={setPages}
            onNext={handleNext}
            handleBack={handleBack}
            dispatchPersistPatientFormBasicDetailsData={
              dispatchPersistPatientFormBasicDetailsData
            }
            patientFormDetails={patientFormDetails}
            dispatchPersistPatientBookingForSomeOne={
              dispatchPersistPatientBookingForSomeOne
            }
          />
        );
      case 2:
        return (
          <PatientVisitForm
            pages={pages}
            setPages={setPages}
            onNext={handleNext}
            handleBack={handleBack}
            dispatchPersistPatientReasonForVisit={
              dispatchPersistPatientReasonForVisit
            }
            reasonForVisit={patientFormDetails?.reasonForVisit}
          />
        );
      case 3:
        return (
          <PatientFormSelectProvider
            pages={pages}
            setPages={setPages}
            onNext={handleNext}
            handleBack={handleBack}
            dispatchPersistPatientProvider={dispatchPersistPatientProvider}
            dispatchGetPatientBookingSlotAction={
              dispatchGetPatientBookingSlotAction
            }
            patientFormDetails={patientFormDetails}
          />
        );
      case 4:
        return (
          <PatientFormSlotBooking
            pages={pages}
            setPages={setPages}
            onNext={handleNext}
            handleBack={handleBack}
            dispatchPersistPatientBookingSlotDetails={
              dispatchPersistPatientBookingSlotDetails
            }
            patientFormDetails={patientFormDetails}
            dispatchGetPatientBookingSlotAction={
              dispatchGetPatientBookingSlotAction
            }
            availableBookingSlot={availableBookingSlot}
            fetching={fetching}
            dispatchResetAvailableBookingSlot={
              dispatchResetAvailableBookingSlot
            }
          />
        );
      case 5:
        return (
          <PatientFormAllDetails
            pages={pages}
            setPages={setPages}
            onNext={handleNext}
            fetching={fetching}
            handleBack={handleBack}
            dispatchPersistPatientContactDetails={
              dispatchPersistPatientContactDetails
            }
            patientFormDetails={patientFormDetails}
            patientDetails={patientDetails}
            createPatient={createPatient}
            dispatchCreateNewPatientAction={dispatchCreateNewPatientAction}
            dispatchGetPatientDetailsAction={dispatchGetPatientDetailsAction}
            dispatchPersistPatientBookingForSomeOne={
              dispatchPersistPatientBookingForSomeOne
            }
            dispatchPersistPatientCompanionDetailsData={
              dispatchPersistPatientCompanionDetailsData
            }
            dispatchPersistPatientDOBDetails={dispatchPersistPatientDOBDetails}
            dispatchBookAppointmentAction={dispatchBookAppointmentAction}
            patientPatNum={patientPatNum}
            dispatchRresetPatientDetails={dispatchRresetPatientDetails}
          />
        );
      case 6:
        return (
          <AppointmentConfirmCard patientFormDetails={patientFormDetails} />
        );
      default:
        return (
          <PatientFormBasicDetails
            pages={pages}
            // setPages={setPages}
            onNext={handleNext}
            handleBack={handleBack}
            dispatchPersistPatientFormBasicDetailsData={
              dispatchPersistPatientFormBasicDetailsData
            }
            patientFormDetails={patientFormDetails}
            dispatchPersistPatientBookingForSomeOne={
              dispatchPersistPatientBookingForSomeOne
            }
          />
        );
    }
  };

  return (
    <div
      id="patient-form"
      className=" container lg:mt-[8vh] mt-[20px] mb-[20px] "
    >
      <div className=" flex  flex-col lg:flex-row justify-start w-full min-h-[620px] lg:h-[84vh] border border-gray-300 bg-white ">
        <div className="w-full lg:w-[32%]  bg-black">
          <PracticeBranding />
        </div>
        <div className="w-full lg:w-[68%] p-6 md:p-8 lg:p-16 2xl:p-20 items-center container overflow-auto theme-scroll">
          {renderPatientForm()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  patientCurrentPageNumber: state.appointmentBooking.patientFormPageNumber,
  patientFormDetails: state.appointmentBooking.patientFormDetails,
  availableBookingSlot: state.appointmentBooking.availableBookingSlot,
  patientDetails: state.appointmentBooking.patientDetails,
  fetching: state.appointmentBooking.fetching,
  isPatientExists: state.appointmentBooking.isPatientExists,
  patientPatNum: state.appointmentBooking.patientPatNum,
  createPatient: state.appointmentBooking.createPatient,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchPersistPatientFormBasicDetailsData: (data: BasicDetailsDataType) =>
    dispatch(persistPatientFormBasicDetailsData(data)),
  dispatchPersistPatientReasonForVisit: (data: ReasonForVisitType) =>
    dispatch(persistPatientReasonForVisit(data)),
  dispatchPersistPatientProvider: (data: ProviderType) =>
    dispatch(persistPatientProvider(data)),
  dispatchPersistPatientBookingSlotDetails: (data: BookingSlotDetailsType) =>
    dispatch(persistPatientBookingSlotDetails(data)),
  dispatchPersistPatientContactDetails: (data: PatientContactDetails) =>
    dispatch(persistPatientPatientContactDetails(data)),
  dispatchPersistPatientCompanionDetailsData: (
    data: CompanionBasicDetailsDataType
  ) => dispatch(persistPatientCompanionDetailsData(data)),
  dispatchPersistPatientFormPages: (data: number) =>
    dispatch(persistPatientFormPages(data)),
  dispatchGetPatientBookingSlotAction: (data: any) =>
    dispatch(getPatientBookingSlotAction(data)),
  dispatchGetPatientDetailsAction: (data: any) =>
    dispatch(getPatientDetailsAction(data)),
  dispatchCreateNewPatientAction: (data: any) =>
    dispatch(createNewPatientAction(data)),
  dispatchPersistPatientBookingForSomeOne: (data: boolean) =>
    dispatch(persistPatientBookingForSomeOne(data)),
  dispatchPersistPatientDOBDetails: (data: PatientDOBDetails) =>
    dispatch(persistPatientDOBDetails(data)),
  dispatchBookAppointmentAction: (data: any) =>
    dispatch(bookAppointmentAction(data)),
  dispatchResetPatientFormDetails: () => dispatch(resetPatientFormDetails()),
  dispatchResetAvailableBookingSlot: () =>
    dispatch(resetAvailableBookingSlot()),
  dispatchRresetPatientDetails: () => dispatch(resetPatientDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientAppointment);
// unlike traditional  redux the connect functiones tablishes realtime link between the redux store and react states
//this trivilizes the use of useSelector and useDispatch
