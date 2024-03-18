"use client";
import Image from "next/image";
import React, { useReducer, useState } from "react";
import onBoardIcon from "/public/images/onboardIcon.png";
import bgGraph1 from "/public/images/bgGraph1.png";
import bgGraph2 from "/public/images/bgGraph2.png";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import useAuthStore from "@/store/authStore";
// import { notifyAndLogError, showDefaultNoti } from "@/utils/notification";
import { setCookie } from "nookies";
import { Redirect } from "@/lib/Redirect";

function reducer(state, action) {
  switch (action.type) {
    case "FIELD": {
      return {
        ...state,
        emailError: null,
        passwordError: null,
        errorMessage: null,
        [action.fieldName]: action.payload,
      };
    }
    case "LOGIN":
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case "EMAIL_MISSING":
      return {
        ...state,
        isLoading: false,
        emailError: "Please enter a valid email",
      };
    case "PASSWORD_MISSING":
      return {
        ...state,
        isLoading: false,
        passwordError: "Password is required",
      };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    isLoading: false,
    emailError: null,
    passwordError: null,
    errorMessage: null,
    rememberMe: false,
  });
//   const { login, setStep, user, token, setCurrentPath, currentPath } =
//     useAuthStore((state) => ({
//       login: state.login,
//       setStep: state.setStep,
//       user: state.user,
//       token: state.token,
//       setCurrentPath: state.setCurrentPath,
//       currentPath: state.currentPath,
//     }));
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN" });

    try {
      if (state.email?.length === 0) {
        dispatch({ type: "EMAIL_MISSING" });
      } else if (state.password?.length === 0) {
        dispatch({ type: "PASSWORD_MISSING" });
      } else {
        const response = await login(state);

        if (response?.status === 200) {
          setCurrentPath(
            response?.data?.user?.role?.name === "Student"
              ? `/${response?.data?.user?.role?.name}/dashboard`
              : `/${response?.data?.user?.role?.name}/edu-home`
          );
          response?.data?.user?.role?.name === "Student"
            ? router?.push(`/${response?.data?.user?.role?.name}/dashboard`)
            : router?.push(`/${response?.data?.user?.role?.name}/edu-home`);
        } else {
          const error = response;

        //   notifyAndLogError({ error, response });
          dispatch({ type: "ERROR" });

          if (response === "Your account email is not confirmed") {
            setStep("otp");
            router?.push("/auth/signup");
          }
        }
      }
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };

//   if (!!user && !!token) {
//     if (!!currentPath) {
//       return <Redirect to={currentPath} />;
//     } else {
//       if (user?.role?.name === "Student") {
//         return <Redirect to={`/${user?.role?.name}/dashboard`} />;
//       } else {
//         return <Redirect to={`/${user?.role?.name}/edu-home`} />;
//       }
//     }
//   }
  return (
    <div className="relative">
      <div className="container px-4 flex flex-col justify-between h-screen pb-12">
        <div className="flex flex-col">
          <div className="self-center mb-3">
            <Image
              src={onBoardIcon}
              width={300}
              height={300}
              alt="onboardIcon"
            />
          </div>
          <div className="absolute left-0 top-[180px] z-1">
            <Image src={bgGraph1} alt="bg-graph" width={300} height={300} />
          </div>
          <div className="absolute right-0 bottom-0 z-1">
            <Image src={bgGraph2} alt="bg-graph" width={300} height={300} />
          </div>
          <h1 className="text-[#2D2D2D] fw-bold text-4xl mb-2 z-2">Welcome</h1>
          <p className="text-[#484848] text-sm font-normal z-2">
            Elevate your career with our all-in-one business guide and
            networking app.
          </p>
          {state?.errorMessage && (
            <span className="text-sm text-[#FF4D4D] mt-4">
              {state.errorMessage}
            </span>
          )}
          
       
          <div className="form-floating mb-3 mt-8 z-2">
            {/* <input
              type="email"
              className="form-control formInput"
              id="floatingInput"
              placeholder="Email"
              onChange={(e) =>
                dispatch({
                  type: "FIELD",
                  fieldName: "email",
                  payload: e.target.value,
                })
              }
            /> */}

        <div>
            <input 
            type="email" 
            id="floatingInput"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Email" 
            required />
        </div>
            {state?.emailError && (
              <span className="text-sm text-[#FF4D4D]">{state.emailError}</span>
            )}
          </div>
        
          
          <div className="form-floating z-2">
            {/* <input
              type={showPassword ? "text" : "password"}
              className="form-control formInput"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) =>
                dispatch({
                  type: "FIELD",
                  fieldName: "password",
                  payload: e.target.value,
                })
              }
            /> */}

       <div>
            <input 
           type={showPassword ? "text" : "password"}
           id="floatingPassword"
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Password" 
            required />
        </div>
          
            {state?.passwordError && (
              <span className="text-sm text-[#FF4D4D]">
                {state.passwordError}
              </span>
            )}
            <div
              className={`absolute  top-50 ${
                state?.passwordError
                  ? "translate-y-[-100%]"
                  : "translate-y-[-50%]"
              } left-[90%]  right-0`}
            >
              {" "}
              {(showPassword && (
                <AiOutlineEye
                  size="1.2em"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )) || (
                <AiOutlineEyeInvisible
                  size="1.2em"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <div className="flex items-end justify-end mt-2 z-2">
            <div
              className="cursor-pointer text-[#E31F1F] text-sm font-semibold text-end z-2"
              onClick={() => router?.push("/auth/forgot-password")}
            >
              Forgot Password?
            </div>
          </div>
        </div>
        <div className="text-center z-2 pt-4 pb-2">
          <Button
            text="Login"
            handleClick={handleLogin}
            disable={state.isLoading}
          />

          <p className="text-sm font-normal mt-2 self-center z-2">
            <span className="text-[#000]">Don’t have an account?</span>
            <span
              className="text-[#167F5F] cursor-pointer font-semibold ms-2"
            //   onClick={() => router?.push("/auth/signup")}
            >
              Sign up here.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
