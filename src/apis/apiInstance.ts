import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

const openDentalBaseApiURL = import.meta.env.VITE_OD_BASE_URL;

function urlCreator(url: string) {
  return `${openDentalBaseApiURL}/${url}`;
}

export const getData = (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosPromise> => {
  return axios.get(urlCreator(url), config);
};

export const postData = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosPromise> => {
  return axios.post(urlCreator(url), data, config);
};

export const putData = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosPromise> => {
  return axios.put(urlCreator(url), data, config);
};

export const deleteData = (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosPromise> => {
  return axios.delete(urlCreator(url), config);
};

// this get , post , put etc method will be called in appointmentApis for further use with OD
