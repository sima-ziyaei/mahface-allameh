import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import t from "../../../i18next/locales/fa/translation.json";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import { AccountServices } from "@/services/Account";
import { CircularProgress } from "@mui/material";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [birthDate, setBirthDate] = useState<Date>(undefined);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signupSchema = z.object({
    firstname: z.string().min(3, "firstname-required"),
    lastname: z.string().min(3, "lastname-required"),
    username: z.string().min(3, "username-required"),
    email: z.string().min(1, "email-required").email("invalid-email"),
    nationalCode: z
      .string()
      .length(10, { message: "national-code-must-be-10chart" })
      .regex(/^\d+$/, { message: "input-must-be-a-valid-number" }),
    phoneNumber: z
      .string()
      .length(11, { message: "phone-number-must-be-11-chars" })
      .regex(/^\d+$/, { message: "input-must-be-a-valid-number" }),
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
      gender: z
      .enum(['female, male'], {message: 'choose one'})
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
      firstname: "",
      lastname: "",
      nationalCode: "",
      phoneNumber: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: ""
    },
  });

  const onSubmitSignup = (data: z.infer<typeof signupSchema>) => {
    setLoading(true);
    console.log(data);
    AccountServices.register({ ...data, birthDate, genderEnum: 1 })
      .then((res) => {
        if (!res.data.isValid) {
          toast.error(res.data.statusMessage);
          return;
        }
        setLoading(false);
        toast.success(t["successfully-signed-up"]);
        router.push("/login");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.data?.response?.statusMessage);
        console.error(err);
      });
  };

  return (
    <div className=" w-full h-screen flex justify-center items-center ">
      <form
        onSubmit={handleSubmit(onSubmitSignup)}
        className=" flex flex-col items-center justify-center h-full w-full"
      >
        <div className="flex flex-col gap-1 w-[50%] h-[75px]">
          <input
            type="string"
            placeholder="نام"
            {...register("firstname")}
            className="px-4 py-2 border border-solid border-gray-600 rounded-lg "
          />

          <span className="text-[12px] text-red-700 ">
            {t[typeof errors.firstname?.message === 'string' ? errors.firstname?.message : null]}
          </span>
        </div>

        <div className="flex flex-col gap-1 w-[50%] h-[75px]">
          <input
            type="string"
            placeholder="نام‌خانوادگی"
            {...register("lastname")}
            className="px-4 py-2 border border-solid border-gray-600 rounded-lg "
          />

          <span className="text-[12px] text-red-700 ">
            {t[typeof errors.lastname?.message === 'string' ? errors.lastname?.message : null]}
          </span>
        </div>

        <div className="flex flex-col gap-1 w-[50%] h-[75px]">
          <input
            type="text"
            placeholder="کدملی"
            {...register("nationalCode")}
            className="px-4 py-2 border border-solid border-gray-600 rounded-lg "
          />

          <span className="text-[12px] text-red-700 ">
            {t[typeof errors.nationalCode?.message === 'string' ? errors.nationalCode?.message : null]}
          </span>
        </div>

        <div className="flex flex-col gap-1 w-[50%] h-[75px]">
          <input
            type="username"
            placeholder="نام کاربری"
            {...register("username")}
            className="px-4 py-2 border border-solid border-gray-600 rounded-lg "
          />

          <span className="text-[12px] text-red-700 ">
            {t[typeof errors.username?.message === 'string' ? errors.username?.message : null]}
          </span>
        </div>

        <div className="flex flex-col gap-1 w-[50%] h-[75px]">
          <input
            type="text"
            placeholder="شماره تلفن همراه خود را با فرمت ...09 وارد نمایید"
            {...register("phoneNumber")}
            className="px-4 py-2 border border-solid border-gray-600 rounded-lg "
          />

          <span className="text-[12px] text-red-700 ">
            {t[typeof errors.phoneNumber?.message === 'string' ? errors.phoneNumber?.message : null]}
          </span>
        </div>

        <div className="flex flex-col gap-1 w-[50%] h-[75px] ">
          <DatePicker
            placeholder={t["birth-date"]}
            inputClass="px-4 py-2 default-input border border-solid border-gray-600 rounded-lg w-full"
            value={birthDate}
            onChange={(date) => setBirthDate(date?.toDate())}
            // format="MM/DD/YYYY"
            calendar={persian}
            maxDate={Date.now() - 18 * 365 * 24 * 60 * 60 * 1000}
            locale={fa}
          />
          <span className="text-[12px] text-red-700 ">
            {birthDate !== undefined ? "" : t["birth-date-required"]}
          </span>
        </div>

        <div className="flex flex-col gap-1 w-[50%] h-[75px]">
          <input
            type="email"
            placeholder="ایمیل"
            {...register("email")}
            className="px-4 py-2 border border-solid border-gray-600 rounded-lg "
          />
          <span className="text-[12px] text-red-700 ">
            {t[typeof errors.email?.message === 'string' ? errors.email?.message : null]}
          </span>
        </div>

        <div className="flex flex-col gap-1 w-[50%] h-[75px]">
          <select
            name="gender"
            {...register("gender")}
            className={`px-4 py-2 border border-solid outline-none bg-white border-gray-600 rounded-lg`}
          >
            <option value="" disabled selected className="text-[#9CA3AF]"> {t['gender']} </option>
            <option value={'female'}> {t['female']}</option>
            <option value={'male'}> {t['male']} </option>
          </select>
          <span className="text-[12px] text-red-700 ">
            {t[typeof errors.gender?.message === 'string' ? errors.gender?.message : null]}
          </span>
        </div>

        <div className="flex flex-col gap-1 w-[50%] h-[75px]">
          <input
            type={showPassword ? "string" : "password"}
            placeholder="رمز عبور"
            {...register("password")}
            className="px-4 py-2 border border-solid border-gray-600 rounded-lg "
          />
          <span className="text-[12px] text-red-700 ">
            {t[typeof errors.password?.message === 'string' ? errors.password?.message : null]}
          </span>
        </div>

        <div className="flex flex-col gap-1 w-[50%] h-[75px]">
          <input
            type={showPassword ? "string" : "password"}
            placeholder="تکرار رمز عبور"
            {...register("confirmPassword")}
            className="px-4 py-2 border border-solid border-gray-600 rounded-lg "
          />
          <span className="text-[12px] text-red-700 ">
            {t[typeof errors.confirmPassword?.message === 'string' ? errors.confirmPassword?.message : null]}
          </span>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="border border-solid border-cyan-700 rounded-lg py-2 bg-cyan-700 text-white hover:bg-cyan-800 w-1/2 flex items-center gap-3 justify-center"
        >
          {t.signup}
          {loading ? <CircularProgress color="inherit" size={'24px'} /> : null}
        </button>

        <Link href="/login" className="self-start mr-[25%] mt-4">
          <span className="text-medium text-blue-600 cursor-pointer text-right">
            {t["has-account"]}
          </span>
        </Link>
      </form>

      <img src={"/assets/login.jpg"} className="w-[50%] h-30 h-full" />
      <Toaster position="bottom-left" />
    </div>
  );
};

export default Signup;
