import Layout from "@/components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import t from "../../../i18next/locales/fa/translation.json";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { AccountServices } from "@/services/Account";


const loginSchema = z.object({
  userNameOrEmailORPhoneNumber: z
    .string()
    .min(1, "email-or-username-or-phone-number-required"),
  password: z
    .string()
    .min(6, "Password-must-be-at-leaset-6-characters-long")
    .regex(/[A-Z]{1}/, "password-must-contain-english-word"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitLogin = (data: LoginFormData) => {
    setLoading(true);
    AccountServices.login(data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        toast.success(t["successfully-loggin"]);
        console.log(res);
        router.push("/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.statusMessage);
        console.error(err.response.data.statusMessage);
      });
  };

  return (
    <div className="h-screen w-screen flex  items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmitLogin)}
        className="flex flex-col items-center justify-center gap-4 w-[50%] "
      >
        <div className="flex flex-col gap-1 w-[50%] h-[80px]">
          <input
            placeholder={t["email-username-number"]}
            {...register("userNameOrEmailORPhoneNumber")}
            className="px-2 py-3 border border-solid border-gray-600 rounded-lg "
          />
          <span className="text-red-800 text-[12px]">
            {t[errors.userNameOrEmailORPhoneNumber?.message]}
          </span>
        </div>

        <div className="flex flex-col gap-1 w-[50%] h-[80px]">
          <input
            type={showPassword ? "string" : "password"}
            placeholder={t.password}
            {...register("password")}
            className="px-2 py-3 border border-solid border-gray-600 rounded-lg"
          />
          <span className="text-red-800 text-[12px]">
            {t[errors.password?.message]}
          </span>
        </div>

        <button
          type="submit"
          className="border border-solid border-cyan-700 rounded-lg py-3 bg-cyan-700 text-white hover:bg-cyan-800 w-[50%]"
        >
          {t.login}
        </button>
        <div className="w-[50%] flex flex-col">
          <span className="text-medium text-blue-500 cursor-pointer">
            {t["forgot-password"]}
          </span>
          <span
            className="text-medium text-blue-500 cursor-pointer self-start"
            onClick={() => router.push("/signup")}
          >
            {t["signup"]}
          </span>
        </div>
      </form>
      <img src={"/assets/login.jpg"} className="w-[50%] h-full" />
      <Toaster position="bottom-left" toastOptions={{ duration: 2000 }} />
    </div>
  );
};

export default Login;
