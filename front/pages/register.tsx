import InputGroup from "@/components/InputGroup";
import { useAuthState } from "@/context/auth";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const { authenticated } = useAuthState();
  let router = useRouter();

  if (authenticated) router.push("/");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await axios.post("/auth/register", {
        email,
        username,
        password,
      });
      console.log(res);
      router.push("/login");
    } catch (error: any) {
      console.log("error", error);
      setErrors(error.response.data || {});
    }
  };
  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-2xl text-black font-medium">회원가입</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder="Email"
              value={email}
              setValue={setEmail}
              error={errors.email}
            />
            <InputGroup
              placeholder="Username"
              value={username}
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              placeholder="Password"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              회원가입
            </button>
          </form>
          <small>
            이미 아이디가 있으신가요?
            <Link href="/login">
              <span className="ml-1 text-blue-500 uppercase">로그인</span>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
