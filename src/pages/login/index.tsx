import Layout from "@/components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import t from "../../../locales/en/translation.json";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().min(1, "email-required").email("invalid-email"),
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
    axios
      .post(process.env.BASE_URL + "/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => res.data)
      .then((res) => {
        setLoading(false);
        toast.success(t["successfully-loggin"]);
        console.log(res);
        router.push("/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(t["username-or-pass-not-correct"]);
        console.error(err);
      });
  };

  return (
    <Layout>
      <div className="h-screen flex flex-col gap-4 items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmitLogin)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder={t.email}
              {...register("email")}
              className="px-2 py-3 border border-solid border-gray-600 rounded-2xl  w-[250px]"
            />
            <span className="text-red-800 text-sm">
              {t[errors.email?.message]}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <input
              type={showPassword ? "string" : "password"}
              placeholder={t.password}
              {...register("password")}
              className="px-2 py-3 border border-solid border-gray-600 rounded-2xl  w-[250px]"
            />
            <span className="text-red-800 text-sm">
              {t[errors.password?.message]}
            </span>
          </div>

          <button
            type="submit"
            className="border border-solid border-cyan-700 rounded-2xl py-3 bg-cyan-700 text-white hover:bg-cyan-800 w-[250px]"
          >
            {t.login}
          </button>
        </form>
        <span className="text-medium text-blue-600 cursor-pointer">
          {t["forgot-password"]}
        </span>
      </div>
    </Layout>
  );
};

export default Login;
