import DataOfGrid from "@/components/GridData";
import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/Options";
import { redirect } from "next/navigation";
import { axiosRequest } from "@/lib/config";

const OrderPage = async () => {
  const session = await getServerSession(options);

  if (!session) redirect("/login");

  const { data } = await axiosRequest.get(`/order/${session.user.id}`);

  return (
    <div className="bg-[#3b3436] p-5 rounded-[10px] mt-2.5 mx-20 mb-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Order Page</h1>
      </header>
      <DataOfGrid action="detail" data={data.message} />
    </div>
  );
};

export default OrderPage;
