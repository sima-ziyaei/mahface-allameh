import Layout from "@/components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import t from "../../../i18next/locales/fa/translation.json";
import axios from "axios";
import { useRouter } from "next/router";
import toast  from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signupSchema = z.object({
    username: z.string().min(3, "username-required"),
    email: z.string().min(1, "email-required").email("invalid-email"),
    password: z
      .string()
      .min(1, "password-required")
      .min(6, "Password-must-be-at-leaset-6-characters-long")
      .regex(/[A-Z]{1}/, "password-must-contain-english-word"),
    confirmPassword: z
      .string()
      .min(1, "confirm-password-required")
      .refine(
        (value) => getValues()?.password === value,
        "password-confirm-not-match"
      ),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitSignup = (data: z.infer<typeof signupSchema>) => {
    setLoading(true);
    axios
      .post(process.env.BASE_URL + "/register", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setLoading(false);
        toast.success(t["successfully-signed-up"]);
        console.log(res);
        router.push("/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
        console.error(err);
      });
  };

  return (
    <Layout>
      <div className=" w-full h-screen flex justify-center items-center ">
        <div className="flex flex-col item-center p-3  w-[450px] h-[500px] gap-4">
          <form
            onSubmit={handleSubmit(onSubmitSignup)}
            className=" flex flex-col items-center gap-5"
          >
            <div className="flex flex-col gap-1">
              <input
                type="username"
                placeholder="نام کاربری"
                {...register("username")}
                className="px-4 py-3 border border-solid border-gray-600 rounded-2xl w-[250px]"
              ></input>

              <span className="text-xs text-red-700 h-1">
                {t[errors.username?.message]}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="email"
                placeholder="ایمیل"
                {...register("email")}
                className="px-4 py-3 border border-solid border-gray-600 rounded-2xl w-[250px]"
              />
              <span className="text-xs text-red-700 h-1">
                {t[errors.email?.message]}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <input
                type={showPassword ? "string" : "password"}
                placeholder="رمز عبور"
                {...register("password")}
                className="px-4 py-3 border border-solid border-gray-600 rounded-2xl w-[250px]"
              />
              <span className="text-xs text-red-700 h-1">
                {t[errors.password?.message]}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <input
                type={showPassword ? "string" : "password"}
                placeholder="تکرار رمز عبور"
                {...register("confirmPassword")}
                className="px-4 py-3 border border-solid border-gray-600 rounded-2xl w-[250px]"
              />
              <span className="text-xs text-red-700 h-1">
                {t[errors.confirmPassword?.message]}
              </span>
            </div>

            <button
              type="submit"
              className="border border-solid border-cyan-700 rounded-2xl py-3  bg-cyan-700 text-white hover:bg-cyan-800 w-[250px]"
            >
              {t.signup}
            </button>
          </form>
          <Link href="/login">
            <span className="text-medium text-blue-600 cursor-pointer">
              {t["has-account"]}
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
