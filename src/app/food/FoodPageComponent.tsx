"use client";
import React, { useState } from "react";
import FoodCard from "@/components/FoodCard";
import { foodsType } from "@/types";

type Props = {
  title?: string;
  foods: foodsType[];
};

const FoodPageComponent = ({ title, foods }: Props) => {
  const [displayCount, setDisplayCount] = useState(3);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="bg-white p-20 flex flex-col items-center">
      <h3 className="text-[#551756] font-bold text-3xl mb-24 self-start">
        {title ? title : "Collection"}
      </h3>

      <div className="flex justify-between px-20 flex-wrap gap-y-20 w-full">
        {foods.slice(0, displayCount).map((item) => (
          <FoodCard key={item._id} item={item} />
        ))}
      </div>

      {displayCount < foods.length && (
        <button
          className="btn bg-[#cab273] rounded-full btn-md text-white hover:bg-gradient-to-r from-[#cab273] to-[#e2cb8e] h-full flex items-center mt-16"
          onClick={handleShowMore}
        >
          <span className="hover:text-white hover:bg-gradient-to-r from-[#cab273] to-[#e2cb8e] h-full flex items-center">
            Show More
          </span>
        </button>
      )}
    </div>
  );
};

export default FoodPageComponent;
