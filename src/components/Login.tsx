"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res) {
          if (res.error) {
            toast.error("Incorrect username or password!");
          } else {
            toast.success("Login successful!");
            localStorage.setItem("cartItems", "");
            setTimeout(() => {
              router.replace("/");
            }, 2000);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to sign in. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <ToastContainer />
      <div className="w-[70%] p-8 max-w-sm mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="px-6 py-4">
          <h3 className="mt-3  mb-8 text-2xl font-medium text-center text-[#551756] dark:text-gray-200">
            <b>ZaGull's</b>
          </h3>

          <p className="mt-1 text-center text-[#6c2b6d] dark:text-gray-400">
            Login or create account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <input
                className="block text-black w-full px-4 py-2 mt-2 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-black placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password}</span>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <a
                href="#"
                className="text-sm text-[#551756] dark:text-gray-200 hover:text-gray-500"
              >
                Forget Password?
              </a>

              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#cab273] focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50 rounded-lg ease-in  "
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Don't have an account?{" "}
          </span>

          <Link
            href="/sign-up"
            className="mx-2 text-sm font-bold text-[#cab273] dark:text-blue-400 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
