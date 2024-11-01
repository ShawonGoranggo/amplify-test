import LoginForm from "./LoginForm";
import Promotion from "./Promotion";

function Login() {
  return (
    <div className="  h-screen ">
      <div className=" flex justify-center items-center border h-full py-[20px] pr-[5%]">
        <div className="w-full lg:w-[50%] px-[10%]">
          <div className=" ">
            <img
              src="https://s3-alpha-sig.figma.com/img/9b34/ac17/db864ec0c98d02bcfe2e2d340d56163a?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Gb3yCOAj4Sso86P4i-S0TSUbLMnYMjKG3sbPJ5migFwyaIaTT1VYmqsFDO7RKs0CMWlBIRkCJ9yH3LhuOoUj59SWnhxjBFFRJn-EtlD8vGswGb1CGSLyw5tC2vI8Mh4GNyFD7vlkKP9KYsezlxZffu-dAXuwax9i3ZuxR6GYEt5f1wFo0Y3sWaGNk8jzs6obIAGdkVZ15YnzAQXOBT8z83ISNnIeQqeFOSG1GPLA4kbTtMYfXnqhHzpia4gOoZt7c86CO3MiTi3XSHjCn0VQV8WPQYgQYXB5Vnzrbjt76l8vdA6HltkKNrZ1mYJUaiUanHxjEv2ZG0WWwfoLgefF2g__"
              alt="godetal_logo"
              className="max-w-[280px] mx-auto"
            />
            <LoginForm />
          </div>
        </div>
        <div className="w-full lg:w-[50%] h-full md:block hidden">
          <Promotion />
        </div>
      </div>
    </div>
  );
}

export default Login;
