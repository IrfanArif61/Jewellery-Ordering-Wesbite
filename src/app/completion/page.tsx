"use client";
import { useStore } from "@/store";
import Link from "next/link";
import React, { useEffect } from "react";

const ThankYouPage: React.FC = () => {
  const { dispatch } = useStore();
  useEffect(() => {
    localStorage.setItem("cartItems", "");
    dispatch({ type: "count", payload: 0 });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-[#551756]">
      <h1 className="text-4xl font-bold mb-4">Thank You for Shopping!</h1>
      <p className="text-lg">Your order has been successfully placed.</p>
      <p className="text-lg">We appreciate your business.</p>
      <Link
        href={"/order"}
        className="text-white px-3 py-2 drop-shadow-lg bg-gradient-to-r from-[#cab273] to-[#e2cb8e] rounded-lg text-sm mx-auto transition-transform hover:scale-105 hover:bg-[#c9a752] mt-4 "
      >
        View Orders
      </Link>
    </div>
  );
};

export default ThankYouPage;
