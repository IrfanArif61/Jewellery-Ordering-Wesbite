"use client";
import { axiosRequest } from "@/lib/config";
import { redirect } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  password: string;
  address: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "", address: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { data } = await axiosRequest.post("/user", formData);
        console.log(data);
        if (!data.success) {
          toast.error(data.message);
          return;
        }
        toast.success("Sign up successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form
            className="w-full max-w-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center mx-auto">
              
            </div>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Name"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}

<label>
          Radio Input:
          <input
            type="radio"
            name="radioInput"
            value="Option1"
            checked={formValues.radioInput === 'Option1'}
            onChange={handleInputChange}
          />
          Option 1
        </label>
        <label>
          <input
            type="radio"
            name="radioInput"
            value="Option2"
            checked={formValues.radioInput === 'Option2'}
            onChange={handleInputChange}
          />
          Option 2
        </label>

      


              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>

            <div className="relative flex items-center mt-4">
              

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password}</span>
              )}
            </div>

            <div className="relative flex items-center mt-4">
              

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Address"
              />
              {errors.address && (
                <span className="text-red-500">{errors.address}</span>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-[30%] px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#cab273] rounded-lg hover:bg-[#d4b76d] focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50 ml-40"
              >
                Sign Up
              </button>

              <div className="mt-6 text-center mb-4">
                <span className="text-sm text-gray-600 dark:text-gray-200">
                  Already have an account?{" "}
                </span>

                <Link
                  href="/login"
                  className="mx-2 text-sm font-bold text-[#cab273] dark:text-blue-400 hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUp;









// app/api/users/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rows = await pool.query('SELECT * FROM users');
    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error) {
    console.error('Error while fetching users:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}



// app/api/signup/route.js
import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  const req = new NextRequest(request);
  const { name, email, password, address } = await req.json();

  if (!name || !email || !password || !address) {
    return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, address) VALUES (?, ?, ?, ?)', 
      [name, email, password, address]
    );

    return NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error while registering user:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}



// app/api/users/[id]/route.js
import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  const req = new NextRequest(request);
  const { id } = params;
  const  data  = await req.json();

  

  try {
    const [result] = await pool.query(
      'UPDATE users SET ? WHERE id = ?',
      [data,id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error while updating user:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}





// app/api/users/[id]/route.js
import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error while deleting user:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

