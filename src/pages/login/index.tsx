import Layout from "@/components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import t from "../../../../locales/en/translation.json";

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at leaset 6 characters long").regex(/[A-Z]{1}/, "password-must-contain-english-word"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
    console.log(data);
  };

  return (
    <Layout>

      <div className="h-screen flex items-center justify-center">

        <form onSubmit={handleSubmit(onSubmitLogin)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-4">
            <input type="email" placeholder={t.email} {...register("email")} className="px-4 py-3 border border-solid border-gray-600 rounded-2xl" />
            <span className="text-red-800 text-sm">{errors.email?.message}</span>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type={showPassword ? "string" : "password"}
              placeholder={t.password}
              {...register("password")}
              className="px-4 py-3 border border-solid border-gray-600 rounded-2xl" 
            />
            <span className="text-red-800 text-sm">{errors.password?.message}</span>
          </div>

          <button type="submit" className="border border-solid border-cyan-700 rounded-2xl py-3 bg-cyan-700 text-white hover:bg-blue-800">{t.login}</button>

        </form>

      </div>

    </Layout>
  );
};

export default Login;
