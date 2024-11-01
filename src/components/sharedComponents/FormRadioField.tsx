import doctor_avatar from "../../assets/doctor_avatar.png";
type AppProps = {
  imageVisible?: boolean;
  text: string;
  index: number;
  selectedPractice: string | undefined;
  setValue: (value: string) => void;
  classNameProps?: string;
};

const FormRadioField = ({
  classNameProps,
  imageVisible = false,
  text,
  index,
  selectedPractice,
  setValue,
}: AppProps) => {
  return (
    <div
      className={` flex border-[1px] min-h-[3rem] border-[#616163]  px-3 py-2 gap-3 ${
        classNameProps
          ? classNameProps
          : "sm:flex-[0_1_187px] lg:flex-[0_1_187px] flex-[1_0_250px] justify-center"
      } items-center box-border whitespace-nowrap cursor-pointer rounded
            ${
              selectedPractice === text
                ? "bg-button-clr-700 text-white border-button-clr-700"
                : "bg-white text-black "
            }`}
      style={{ gridColumn: index >= 3 ? "span 1 / span 1" : "auto" }}
      onClick={() => setValue(text)} // Use the correct field name here (e.g., "practice")
    >
      <input
        type="radio"
        value={text}
        className="hidden" //  To hide the actual radio button
      />
      {imageVisible === true && (
        <img
          src={doctor_avatar}
          className="rounded-full bg-gray-300 max-w-[55px] mr-2 aspect-square "
          alt="practice"
        />
      )}

      <span>{text}</span>
    </div>
  );
};

export default FormRadioField;

// flex-[1_1_200px] firstone flex-grow , secondone flex-shrink , 200px is flex-basis
