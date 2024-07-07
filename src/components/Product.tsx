// Product.js
import { foodsType } from "@/types";
import React, { useState } from "react";
import { FaMinus, FaTimesCircle } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

type Props = {
  item: foodsType;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
};

function Product({ item, onUpdateQuantity, onRemove }: Props) {
  const [quantity, setQuantity] = useState(item.quantity);

  // Calculate total weight for the item based on its quantity
  const totalWeight = item.weight * quantity;

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    onUpdateQuantity(item._id, newQuantity);
    setQuantity(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    onUpdateQuantity(item._id, newQuantity);
    setQuantity(newQuantity);
  };

  const handleRemove = () => {
    onRemove(item._id);
  };

  return (
    <div className="w-full items-center rounded-2xl bg-[#f3f0e9] drop-shadow-xl flex relative px-6 py-2">
      <div className="avatar absolute left-[-20px] drop-shadow-sm">
        <div className="card-sm">
          <img src={item.image} alt={item.name} />
        </div>
      </div>
      <div className="w-[70%] flex flex-col ml-auto gap-y-2">
        <div className="flex justify-between items-center">
          <h4 className="font-extrabold text-sm text-[#551756]">{item.name}</h4>
          <button onClick={handleRemove} className="text-red-600">
            <FaTimesCircle size={20} />
          </button>
        </div>
        <p className="text-xs">
          {totalWeight}g | {item.calories} kcal | {item.category}
        </p>

        <div className="flex items-center justify-between">
          <h2 className="text-3xl text-[#cab273] font-medium">
            Rs.{item.price.toFixed(2)}
          </h2>
          <div className="flex items-center gap-x-2">
            <p className="text-sm">Quantity : </p>
            <button
              onClick={handleIncrement}
              type="button"
              className="bg-lightGreen rounded-full h-8 w-8 drop-shadow-sm flex justify-center items-center border-[#3eba46] border-2"
            >
              <IoIosAdd className="text-green-600" size={26} />
            </button>
            <p>{quantity}</p>
            <button
              onClick={handleDecrement}
              type="button"
              className="bg-white rounded-full h-8 w-8 drop-shadow-lg flex justify-center items-center border-red-600 border-2"
            >
              <FaMinus className="text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
