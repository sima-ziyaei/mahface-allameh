import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const signupSchema = z.object({
    username: z
      .string()
      .min(3, "name is required and must be at least 3 characters"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(6, "Password must be at leaset 6 characters long")
      .regex(/[A-Z]{2}/, "password-must-contain-two-captial-english-word"),
    confirmPassword: z
      .string()
      .min(1, "confirm password required")
      .refine(
        (value) => getValues()?.password === value,
        "password confirm don't match"
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

  const onSubmitSignin = (data: z.infer<typeof signupSchema>) => {
    console.log(data);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmitSignin)}>
          <div>
            <input
              type="username"
              placeholder="username"
              {...register("username")}
            />
            <span>{errors.username?.message}</span>
          </div>

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

          <div>
            <input
              type={showPassword ? "string" : "password"}
              placeholder="confirmPassword"
              {...register("confirmPassword")}
            />
            <span>{errors.confirmPassword?.message}</span>
          </div>

          <button type="submit">{"login-submit"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
