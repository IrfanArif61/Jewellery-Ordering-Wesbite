"use client";
import { useStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SingleItemPage = ({ params }: { params: { id: string } }) => {
  const { state } = useStore();
  const { id } = params;

  const requiredOrder = state.orders.find((item) => item._id === id);

  return (
    <>
      <div className="flex gap-[50px] mt-5 w-[93%] text-white mx-20 mb-10">
        <div className=" w-[28%]  bg-[#3b3436] p-5 rounded-[10px] font-bold text-white">
          <div className="rounded-xl bg-[#474042]  flex flex-col p-5 items-start mt-auto gap-y-6">
            <h3 className="text-white font-semibold text-md">
              Details of your Order
            </h3>
            <p className="text-white text-xs">
              Order Weight :{" "}
              <span className="font-bold">{requiredOrder.totalWeight}g</span>
            </p>
            <p className="text-white text-xs">
              Good items ({requiredOrder.totalItems}) :{" "}
              <span className="font-bold">
                Rs.{requiredOrder.totalPrice - 200}
              </span>
            </p>
            <p className="text-white text-xs">
              Delivery : <span className="font-bold">Rs.200</span>
            </p>
            <div className="w-full h-[1px] bg-gray-500"></div>
            <p className="text-white text-xs">
              Total Price :{" "}
              <span className="font-bold text-[#cab273]">
                Rs.{requiredOrder.totalPrice + 200}
              </span>
            </p>
          </div>
        </div>
        <div className="w-[65%] bg-[#3b3436] p-5 rounded-[10px] flex flex-col items-center justify-center gap-y-8">
          {requiredOrder.products.map((item: any) => (
            <div className="w-[80%] items-center rounded-2xl bg-[#484042] drop-shadow-xl flex relative px-6 py-2">
              <div className="avatar absolute left-[-20px] drop-shadow-sm">
                <div className="card-sm">
                  <img src={item.product.image} alt={"sa"} />
                </div>
              </div>
              <div className="w-[70%] flex flex-col ml-auto gap-y-2">
                <h4 className="font-extrabold text-xl text-white">
                  {item.product.name}
                </h4>
                <p className="text-xs">
                  {item.product.weight * item.quantity}g | {item.product.brand}{" "}
                </p>

                <div className="flex items-center justify-between">
                  <h2 className="text-3xl text-[#cab273] font-medium">
                    Rs.{item.product.price * item.quantity}
                  </h2>
                  <div className="flex items-center gap-x-2">
                    <p className="text-sm">Quantity : </p>

                    <p>{item.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center mt-4">
            <Link href="/order">
              <button className="bg-[#cab273] text-white px-4 rounded-xl h-[38px] ">
                Return Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleItemPage;
