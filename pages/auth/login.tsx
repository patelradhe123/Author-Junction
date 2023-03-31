import AuthForm from "@/components/AuthForm";
import ErrorMessage from "@/components/ErrorMessage";
import Header from "@/components/Header";
import InputText from "@/components/InputText";
import useForm from "@/hooks/useForm";
import AuthFormLayout from "@/UI/AuthFormLayout";
import AuthPageLayout from "@/UI/AuthPageLayout";
import { isStrongPassword, isValidEmail } from "@/utils/validation";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEventHandler, useState } from "react";

interface FormState {
  email: string;
  password: string;
}

interface ErrorState {
  state: boolean;
  message: string;
}

export default function Login() {
  const { changeHandler, state } = useForm<FormState>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<ErrorState>({ state: false, message: "" });
  const route = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    //validation
    if (!isValidEmail(state.email)) return setError({ state: true, message: "Email is not valid" });
    if (!isStrongPassword(state.password)) return setError({ state: true, message: "Password is too weak" });

    // login
    login();
  };

  const login = async (): Promise<void> => {
    const fetchHeader = new Headers();
    fetchHeader.append("Content-Type", "application/json");

    const fetchOption: RequestInit = {
      method: "POST",
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
      headers: fetchHeader,
    };

    const res = await fetch("/api/auth/login", fetchOption);
    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      return setError({ state: true, message: "login fail" });
    }

    route.push("/");
  };

  return (
    <AuthPageLayout>
      <Head>
        <title>User login</title>
      </Head>
      <ErrorMessage error={error} />
      <Header>
        <li>
          <Link href="/about">about</Link>
        </li>
        <li>
          <Link href="/contact">contact</Link>
        </li>
      </Header>
      <AuthFormLayout>
        <span className="mb-2 text-sm font-semibold text-gray-300">Login as an existing user</span>
        <h2 className="mb-2 text-5xl font-bold text-gray-200">Login with your account</h2>
        <span className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link className="capitalize text-blue-500 underline underline-offset-2" href="/auth/register">
            Register
          </Link>
        </span>
        <AuthForm submitHandler={handleSubmit} submitText="Login">
          <InputText type="email" required={true} name="email" text="Email" changeHandler={changeHandler} value={state.email} />
          <InputText type="password" required={true} name="password" text="Password" changeHandler={changeHandler} value={state.password} />
        </AuthForm>
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
