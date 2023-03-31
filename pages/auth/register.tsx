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
import { FormEventHandler, useState } from "react";

interface FormState {
  username: string;
  email: string;
  password: string;
  confPassword: string;
}

interface ErrorState {
  state: boolean;
  message: string;
}

export default function register() {
  const {
    changeHandler,
    state: { confPassword, email, password, username },
  } = useForm<FormState>({ confPassword: "", email: "", username: "", password: "" });
  const [error, setError] = useState<ErrorState>({ state: false, message: "" });
  const router = useRouter();

  const submitHandler: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    // validating user input
    if (!isValidEmail(email)) return setError({ state: true, message: "Not a valid Email" });
    if (!isStrongPassword(password)) return setError({ state: true, message: "Password is too weak" });
    if (password !== confPassword) return setError({ state: true, message: "confirm password not matching" });

    //registering user
    setError({ state: false, message: "" });
    registerUser();
  };

  const registerUser = async () => {
    const reqHeader = new Headers();
    reqHeader.append("Content-Type", "application/json");

    const fetchOption: RequestInit = {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: reqHeader,
    };

    const res = await fetch("/api/auth/register", fetchOption);

    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      return setError({ state: true, message: "Failed to register, try again" });
    }

    router.push("/auth/login");
  };

  return (
    <AuthPageLayout>
      <ErrorMessage error={error} />
      <Head>
        <title>Register user</title>
      </Head>
      <Header>
        <li>
          <Link href="/about">about</Link>
        </li>
        <li>
          <Link href="/contact">contact</Link>
        </li>
      </Header>
      <AuthFormLayout>
        <span className="mb-2 text-sm font-semibold text-gray-300">Register as new user</span>
        <h2 className="mb-2 text-5xl font-bold text-gray-200">Create new account</h2>
        <span className="text-sm text-gray-400">
          Already a member?{" "}
          <Link className="text-blue-500 underline underline-offset-2" href="/auth/login">
            Login
          </Link>
        </span>
        <AuthForm submitHandler={submitHandler} submitText="register">
          <InputText required={true} text="Username" name="username" type="text" changeHandler={changeHandler} value={username} />
          <InputText required={true} text="Email" name="email" type="email" changeHandler={changeHandler} value={email} />
          <InputText required={true} text="Password" name="password" type="password" changeHandler={changeHandler} value={password} />
          <InputText required={true} text="Confirm Password" name="confPassword" type="password" changeHandler={changeHandler} value={confPassword} />
        </AuthForm>
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
