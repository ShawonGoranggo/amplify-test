import practiceLogo from "../../assets/practice-logo.svg";

const PracticeBranding = () => {
  return (
    <div
      id="practice-branding"
      className="bg-brand-bg-color  h-full lg:pt-20 flex flex-col sm:flex-row items-center lg:flex-col pt-4 pb-4"
    >
      <div className=" flex align-center justify-center lg:w-1/2 w-1/3 sm:w-1/4">
        <img src={practiceLogo} alt="Practice Logo" className="w-full" />
      </div>

      <div
        id="practice-details"
        className="lg:mt-6 text-white lg:text-center sm:ml-6 ml-0 mt-4 sm:mt-2 lg:ml-0"
      >
        <div className=" font-medium hidden lg:block lg:text-[22px]">
          GoDental Office Fenton
        </div>

        <p className=" mt-2 text-center">500 North Leroy Street, Fenton, MI</p>

        <p className=" mt-2 text-lg lg:text-[20px] text-center">
          (0123)-456-789
        </p>
      </div>
    </div>
  );
};

export default PracticeBranding;
