import { AxiosResponse } from "axios";
import { getData, postData } from "./apiInstance";
import moment from "moment";

const customerKey = import.meta.env.VITE_OD_CUSTOMER_KEY;
const devKey = import.meta.env.VITE_OD_DEV_KEY;

export async function bookAppointmentApi(data: any): Promise<AxiosResponse> {
  const finalData = {
    PatNum: data?.patientDetails[0]?.PatNum,
    Op: data?.bookingSlotDetails?.timeSlot?.opNum,
    AptDateTime: `${data?.bookingSlotDetails?.date} ${moment(
      data?.bookingSlotDetails?.timeSlot?.slotStart,
      "hh:mm A"
    ).format("HH:mm")}`,
    ProvNum: data?.providerDetails?.provider?.provNum,
    Note: data?.patientContactDetails?.message,
    // Pattern: "/XXXX/",
    AppointmentTypeNum: 1,
  };
  return await postData(
    `appointments`,
    { ...finalData },
    {
      headers: {
        Authorization: `ODFHIR ${devKey}/${customerKey}`,
      },
    }
  );
}

export async function getPatientListApi(): Promise<AxiosResponse> {
  return await getData(`patients/Simple`, {
    headers: {
      Authorization: `ODFHIR ${devKey}/${customerKey}`,
    },
  });
}

export async function getBookingSlotApi(data: any): Promise<AxiosResponse> {
  const { date, ProvNum, OpNum } = data;
  const splitDate = date?.split("&");

  const finalParam: any = {
    ...(splitDate?.length > 1
      ? { dateStart: splitDate[0], dateEnd: splitDate[1] }
      : { date: splitDate[0] }),
    OpNum,
    ...(ProvNum ? { ProvNum } : {}), // Include ProvNum only if it is truthy (not 0, null, or undefined)
  };

  return await getData("appointments/Slots", {
    params: {
      ...finalParam,
    },
    headers: {
      Authorization: `ODFHIR ${devKey}/${customerKey}`,
    },
  });
}

export async function createNewPatientApi(data: any): Promise<AxiosResponse> {
  const { firstName, lastName, dob } = data;
  const finalParam = {
    FName: firstName,
    LName: lastName,
    Birthdate: dob,
  };
  return await postData(
    "patients",
    {
      ...finalParam,
    },
    {
      headers: {
        Authorization: `ODFHIR ${devKey}/${customerKey}`,
      },
    }
  );
}

export async function getPatientDetailsApi(data: any): Promise<AxiosResponse> {
  // GET /patients/Simple?LName=smi&FName=eter&Birthdate=1976-05-24
  const { firstName, lastName, dob } = data;
  console.log(
    `${+dob < 10 && dob.length < 2 ? `0${dob}` : dob}`,
    data,
    "jlksdrfh"
  );

  const finalParam = {
    FName: firstName,
    LName: lastName,
    Birthdate: dob,
  };
  return await getData("patients/Simple", {
    params: {
      ...finalParam,
    },
    headers: {
      Authorization: `ODFHIR ${devKey}/${customerKey}`,
    },
  });
}
