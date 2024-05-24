import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at leaset 6 characters long").regex(new RegExp('\b[A-Z]{2}\b'),"password-contain-two-captal-english-letter"),
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
    <div>

      <div>

        <form onSubmit={handleSubmit(onSubmitLogin)}>

          <div>
            <input type="email" placeholder="email" {...register("email")} />
            <span>{errors.email?.message}</span>
          </div>

          <div>
            <input
              type={showPassword ? "string" : "password"}
              placeholder="password"
              {...register("password")}
            />
            <span>{errors.password?.message}</span>
          </div>

          <button type="submit">{"login-submit"}</button>

        </form>

      </div>

    </div>
  );
};

export default Login;
