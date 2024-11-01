import Home from "../pages/Home";
// import Login from "../pages/loginPage/Index";
import PatientAppointment from "../pages/patientForm";

const ROUTES = [
  {
    path: "/",
    key: "Home",
    component: Home, //appointment confirm component.
    isPrivate: true,
    exact: true,
  },
  // {
  //   path: "/login",
  //   key: "Login",
  //   component: Login, //this is from the index component of loginPage folder.
  //   isPrivate: false,
  //   exact: true,
  // },
  {
    path: "/appointment",
    key: "AppointMent",
    component: PatientAppointment, //this is from the index component of PatientForm folder.
    isPrivate: true,
    exact: true,
  }
];

export default ROUTES;
