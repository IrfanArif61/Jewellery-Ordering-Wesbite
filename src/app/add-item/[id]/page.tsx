'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { axiosRequest } from "@/lib/config";

interface FormData {
  name: string;
  price: number;
  weight: number;
  calories: number;
  desc: string;
  _id: string;
}

const SingleItemPage: React.FC = () => {
  const router = useRouter();
  const { state } = useStore();
  const [formData, setFormData] = useState<FormData>({
    name: state.products.name,
    price: state.products.price,
    weight: state.products.weight,
    calories: state.products.calories,
    desc: state.products.desc,
    _id: state.products.id,
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosRequest.put(`/product`, formData);
      router.push("/add-item");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex gap-[50px] mt-5 w-[93%] text-white mx-20">
      <div className=" w-[28%]  bg-[#2b3e5d] p-5 rounded-[10px] font-bold text-white">
        {/* Your image display */}
        <h1 className="flex justify-center items-center p-4">{formData.name}</h1>
      </div>
      <div className="w-[65%] bg-[#2b3e5d] p-5 rounded-[10px] ">
        <form onSubmit={handleUpdate} className="flex flex-col gap-1">
          <label className="ml-3 text-[12px] ">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 rounded-[5px] bg-bgSoft text-white mx-[10px] my-0 border-2 border-[#2e374a]"
          />

          <label className="ml-3 text-[12px]">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 rounded-[5px] bg-bgSoft text-white mx-[10px] my-0 border-2 border-[#2e374a] "
          />

          <label className="ml-3 text-[12px]">Weight</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="p-2 rounded-[5px] bg-bgSoft text-white mx-[10px] my-0 border-2 border-[#2e374a] "
          />

          <label className="ml-3 text-[12px] ">Calories</label>
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            className="p-2 rounded-[5px] bg-bgSoft text-white mx-[10px] my-0 border-2 border-[#2e374a]"
          />

          <label className="ml-3 text-[12px] ">Description</label>
          <input
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="p-2 rounded-[5px] bg-bgSoft text-white mx-[10px] my-0 border-2 border-[#2e374a]"
          />

          <div className="flex gap-5 justify-center items-center">
            <button
              type="submit"
              className="w-[25%] p-5 bg-teal-500 text-white border-none rounded-[5px] cursor-pointer mt-5"
            >
              Update
            </button>
            <button
              className="w-[25%] p-5 bg-red-500 text-white border-none rounded-[5px] cursor-pointer mt-5"
              onClick={() => router.push("/")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleItemPage;
