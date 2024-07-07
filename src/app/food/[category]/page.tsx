"use client";

import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { useStore } from "@/store";
import { foodsType } from "@/types";
import { toast, ToastContainer } from "react-toastify";

const CategoryPages = () => {
  const { state, dispatch } = useStore();
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    const savedCartItems = localStorage.getItem("cartItems");
    const existingCartItems: foodsType[] = savedCartItems
      ? JSON.parse(savedCartItems)
      : [];

    const isItemInCart = existingCartItems.some(
      (cartItem) => cartItem._id === state.productDetail._id
    );

    if (isItemInCart) {
      toast.error(`${state.productDetail.name} is already in the cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    state.productDetail.quantity = quantity;
    const updatedCartItems = [...existingCartItems, state.productDetail];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    dispatch({ type: "count", payload: state.count + 1 });
    toast.success(
      `${quantity} ${state.productDetail.name} has been added to the cart!`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  return (
    <div className="bg-white py-10">
      <ToastContainer />
      <div className="bg-white relative py-10">
        <div className="avatar flex items-center justify-center h-[310px] w-[310px] left-[160px] absolute z-10 drop-shadow-md ">
          <div className="rounded-full h-full w-full ring ring-white  ring-offset-4 overflow-hidden">
            <img src={state.productDetail.image} className="h-full w-full" />
          </div>
        </div>
        <div className="flex items-center justify-center bg-[#f3f0e9] py-10 w-[80%] mx-auto  drop-shadow-xl rounded-lg">
          <div className="flex flex-col gap-y-5 ">
            <h2 className="text-3xl text-[#551756] font-bold">
              {state.productDetail.name}
            </h2>
            <p className="text-xs text-[#551756]">
              {state.productDetail.weight}g | {state.productDetail.calories}{" "}
              kcal | {state.productDetail.category}
            </p>
            <h2 className="text-3xl font-medium text-[#551756]">
              ${state.productDetail.price}
            </h2>

            <div className="flex items-center gap-x-2">
              <p className="text-[#551756]">Quantity : </p>
              <button
                type="button"
                className="bg-lightGreen rounded-full h-8 w-8 drop-shadow-sm flex justify-center items-center border-red-600 border-2"
                onClick={handleDecreaseQuantity}
              >
                <FaMinus className="text-red-600 " />
              </button>
              <p>{quantity}</p>
              <button
                type="button"
                className="bg-lightGreen rounded-full h-8 w-8 drop-shadow-sm flex justify-center items-center border-[#3eba46] border-2"
                onClick={handleIncreaseQuantity}
              >
                <IoIosAdd className="text-green-600 " size={26} />
              </button>
            </div>

            <div className="flex justify-between items-center w-[70%]">
              <button
                className="text-white px-3 py-2 drop-shadow-lg bg-gradient-to-r from-[#cab273] to-[#e2cb8e] rounded-lg text-sm mx-auto transition-transform hover:scale-105 hover:bg-[#c9a752] "
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f3f0e9] drop-shadow-xl w-[80%] mx-auto px-14 py-8 rounded-lg">
        <h4 className="text-lg font-bold text-[#551756] mb-3">Description</h4>
        <p className="text-sm text-[#551756]">
          {state.productDetail.description}
        </p>
      </div>
    </div>
  );
};

export default CategoryPages;
