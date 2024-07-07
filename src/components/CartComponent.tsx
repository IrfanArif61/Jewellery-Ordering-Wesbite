"use client";
import { useStore } from "@/store";
import { foodsType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import Link from "next/link";

type Props = {};

const CartComponent = (props: Props) => {
  const [cartItems, setCartItems] = useState<foodsType[]>([]);
  const { state, dispatch } = useStore();
  const router = useRouter();

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");

    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const orderWeight = cartItems.reduce(
    (acc, curr) => acc + curr.weight * curr.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const updatedItems = cartItems.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedItems);
  };

  const removeItem = (itemId: string) => {
    const updatedItems = cartItems.filter((item) => item._id !== itemId);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    dispatch({ type: "count", payload: state.count - 1 });
  };

  const Proceed = () => {
    dispatch({
      type: "cart",
      payload: {
        cartItems,
        totalPrice: totalPrice + 10,
        totalItems: cartItems.length,
        totalWeight: orderWeight,
      },
    });
    router.push("/cart/checkout");
  };

  return (
    <div className="bg-white px-20 py-10">
      <h3 className="text-[#551756] font-bold text-xl">MY CART</h3>
      {/* Added conditional statement to check if cartItems is empty */}
      {cartItems.length === 0 ? (
        <>
          <p className="text-center text-lg font-medium mt-10">
            Your cart is currently empty.
          </p>
          <Link href="/food">
            <div className="flex items-center justify-center mt-4">
              <button className="bg-gradient-to-r from-[#cab273] to-[#e2cb8e] text-white px-4 rounded-xl h-[38px] ">
                Add Something
              </button>
            </div>
          </Link>
        </>
      ) : (
        <div className="flex justify-between mt-10">
          <div className="w-[40%] flex flex-col gap-y-8">
            {cartItems.map((item) => (
              <Product
                key={item._id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
          <div className="w-[50%]">
            <div className="rounded-xl bg-[#f3f0e9] flex flex-col p-5 items-start gap-y-2">
              <h3 className="text-[#551756] font-semibold text-md">
                Details of your Order
              </h3>
              <p className="text-[#551756] text-xs">
                Order Weight : <span className="font-bold">{orderWeight}g</span>
              </p>
              <p className="text-[#551756] text-xs">
                Good items ({cartItems.length}) :{" "}
                <span className="font-bold">Rs.{totalPrice.toFixed(2)}</span>
              </p>
              <p className="text-[#551756] text-xs">
                Delivery : <span className="font-bold">Rs.200</span>
              </p>
              <div className="w-full h-[1px] bg-gray-500"></div>
              <p className="text-[#551756] text-xs">
                Total Price :{" "}
                <span className="font-bold text-[#cab273]">
                  Rs.{(totalPrice + 200).toFixed(2)}
                </span>
              </p>
              <button
                onClick={Proceed}
                className="text-white px-3 py-2 drop-shadow-lg bg-gradient-to-r from-[#cab273] to-[#e2cb8e] rounded-full text-sm mx-auto transition-transform hover:scale-105 hover:bg-[#c9a752]"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
