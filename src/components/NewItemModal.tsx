import { axiosRequest } from "@/lib/config";
import { CldUploadButton } from "next-cloudinary";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewItemModal = (props: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [brand, setBrand] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation
    if (!name || !price || !weight || !brand || !desc || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await axiosRequest.post("/product", {
        name,
        price,
        weight,
        brand,
        description: desc,
        category: "salad",
        image,
      });
      toast.success("Item added successfully!");
      setTimeout(() => {
        props.setOpen(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item. Please try again later.");
    }
  };

  const handleImageUpload = (res: any) => {
    setImage(res.info.secure_url || res.info.public_id);
  };

  return (
    <div className="w-[100vw] mx-auto h-[100vh] absolute top-0 left-0 bg-[#0f0e0eb9] flex justify-center items-center text-white z-20">
      <div className="p-[50px] rounded-[10px] bg-[#3b3436] relative flex flex-col">
        <span
          className="absolute top-[10px] right-[10px] cursor-pointer text-red-600 font-bold"
          onClick={() => props.setOpen(false)}
        >
          X
        </span>
        <h1 className="mb-[40px] text-2xl font-bold text-center">
          Add New Item
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label className="input input-bordered flex items-center gap-2 text-gray-500 font-semibold">
              Name:
              <input
                type="text"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 text-gray-500 font-semibold">
              Price:
              <input
                type="number"
                className="grow"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 text-gray-500 font-semibold">
              Weight:
              <input
                type="number"
                className="grow"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 text-gray-500 font-semibold">
              Brand:
              <input
                type="text"
                className="grow"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 text-gray-500 font-semibold">
              Desc:
              <input
                type="text"
                className="grow"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </label>

            <CldUploadButton
              uploadPreset="food-website"
              className="bg-red-600 text-white p-2 rounded-md w-[50%] mx-auto"
              onSuccess={handleImageUpload}
            >
              {image ? "Uploaded" : "Upload"}
            </CldUploadButton>
          </div>
          <div className="flex justify-center items-center mt-8">
            <button className="text-xl bg-[#cab273] hover:bg-[#ebcc7e]  rounded-[5px] px-36 py-2.5">
              Add
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewItemModal;
