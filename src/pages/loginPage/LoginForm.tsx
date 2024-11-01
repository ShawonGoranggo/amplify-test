import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Seperater from "../../components/sharedComponents/Seperater";
import CreateNewAccountCTA from "../../components/sharedComponents/CreateNewAccountCTA";
import FormInputField from "../../components/sharedComponents/FormInputField";
import supabase from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

// Define form input types
interface LoginFormInputs {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handler: SubmitHandler<LoginFormInputs> = async (data) => {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: data?.email,
      password: data?.password,
    });

    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      if (session?.access_token) {
        navigate("/appointment");
      }
      console.log("User signed in:", user, session);
    }
  };

  return (
    <div className="w-full px-4 py-8 bg-white shadow-lg shadow-gray-200 rounded-xl  mt-8">
      <center className="font-[600] text-gray-600 text-[30px]">Sign In</center>
      <center className=" text-gray-500 mt-2">
        Welcome Back! Please enter your details.
      </center>
      <form
        onSubmit={handleSubmit(handler)}
        className="flex flex-col gap-4 p-4 rounded-md justify-center "
      >
        <FormInputField
          register={register}
          type={"email"}
          placeholder={"Enter your email..."}
          fieldName={"email"}
          labelName={"Email"}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <div>
          <label className="font-medium text-gray-600">Password</label>
          <div className="relative mt-[9px]">
            <input
              {...register("password", {
                required: "Password is required",
              })}
              type={showPassword ? "text" : "password"}
              className="p-4 border border-gray-300 placeholder-gray-400 w-full rounded-[7px]"
              placeholder="Enter your password..."
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3"
            >
              {showPassword ? (
                <FaRegEye className="text-xl text-blue-400" />
              ) : (
                <FaRegEyeSlash className="text-gray-400 text-xl" />
              )}
            </button>
          </div>
        </div>
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}

        <div className="flex justify-center mt-3  text-white">
          <button
            type="submit"
            className="bg-button-clr-400 rounded-xl p-2 text-[16px] font-[500] w-full hover:bg-opacity-90 h-12 max-w-[430px]"
          >
            Sign in
          </button>
        </div>
      </form>
      <Seperater width="60%" />
      <CreateNewAccountCTA />
    </div>
  );
}

export default LoginForm;
