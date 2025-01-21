
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import t from "../../../i18next/locales/fa/translation.json";
import axios from "axios";
import {useRouter} from "next/router";
import toast, {Toaster} from "react-hot-toast";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import Image from "next/image";
import {AccountServices} from "@/services/Account";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [birthDate, setBirthDate] = useState("");
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
        formState: {errors},
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
        AccountServices.register({...data, birthDate})
            .then((res) => {
                setLoading(false);
                toast.success(t["successfully-signed-up"]);
                router.push("/");
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.data.response.statusMessage);
                console.error(err);
            });
    };

    return (
        <div className=" w-full h-screen flex justify-center items-center ">
            <form
                onSubmit={handleSubmit(onSubmitSignup)}
                className=" flex flex-col items-center justify-center h-full w-full gap-5"
            >
                <div className="flex flex-col gap-1 w-[50%] h-[80px]">
                    <input
                        type="username"
                        placeholder="نام کاربری"
                        {...register("username")}
                        className="px-4 py-2 border border-solid border-gray-600 rounded-lg "
                    ></input>

                    <span className="text-[12px] text-red-700 ">
            {t[errors.username?.message]}
          </span>
                </div>
                <div className="flex flex-col gap-1 w-[50%] h-[80px] ">
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
            {birthDate !== "" ? "" : t["birth-date-required"]}
          </span>
                </div>

                <div className="flex flex-col gap-1 w-[50%] h-[80px]">
                    <input
                        type="email"
                        placeholder="ایمیل"
                        {...register("email")}
                        className="px-4 py-2 border border-solid border-gray-600 rounded-lg "
                    />
                    <span className="text-[12px] text-red-700 ">
            {t[errors.email?.message]}
          </span>
                </div>

                <div className="flex flex-col gap-1 w-[50%] h-[80px]">
                    <input
                        type={showPassword ? "string" : "password"}
                        placeholder="رمز عبور"
                        {...register("password")}
                        className="px-4 py-2 border border-solid border-gray-600 rounded-lg "
                    />
                    <span className="text-[12px] text-red-700 ">
            {t[errors.password?.message]}
          </span>
                </div>

                <div className="flex flex-col gap-1 w-[50%] h-[80px]">
                    <input
                        type={showPassword ? "string" : "password"}
                        placeholder="تکرار رمز عبور"
                        {...register("confirmPassword")}
                        className="px-4 py-2 border border-solid border-gray-600 rounded-lg "
                    />
                    <span className="text-[12px] text-red-700 ">
            {t[errors.confirmPassword?.message]}
          </span>
                </div>

                <button
                    type="submit"
                    className="border border-solid border-cyan-700 rounded-lg py-2  bg-cyan-700 text-white hover:bg-cyan-800  w-[50%] h-30"
                >
                    {t.signup}
                </button>
                <Link href="/login">
          <span className="text-medium text-blue-600 cursor-pointer">
            {t["has-account"]}
          </span>
                </Link>
            </form>

            <img src={"/assets/login.jpg"} className="w-[50%] h-30 h-full"/>
            <Toaster position="bottom-left"/>
        </div>
    );
};

export default Signup;
