"use client";
import ChooseUs from "@/components/ChooseUs";
import FoodPackages from "@/components/FoodPackages";
import SeasonalOffers from "@/components/SeasonalOffers";
import { axiosRequest } from "@/lib/config";
import { useStore } from "@/store";
import { foodsType } from "@/types";
import Image from "next/image";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";

export default function HomePage() {
  const [foods, setFoods] = useState<foodsType[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { state, dispatch } = useStore();

  useEffect(() => {
    (async function () {
      try {
        const savedCartItems = localStorage.getItem("cartItems");
        const existingCartItems: foodsType[] = savedCartItems
          ? JSON.parse(savedCartItems)
          : [];
        dispatch({ type: "count", payload: existingCartItems.length });
        const { data } = await axiosRequest.get("/product");
        setFoods(data.message);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <div>
        <div id="container" className="flex  min-h-screen">
          <div className=" flex flex-col gap-10">
            <p className="text-xl text-[#551756] mt-10">
              Welcome to{" "}
              <span className="font-semibold">ZaGull's Jewellery Store</span>{" "}
            </p>
            <h1 className="text-5xl font-bold text-[#551756]">
              The Finest Luxury Jewelry
              <span className=" text-[#cab273] bg-clip-text mt-8">
                <TypewriterComponent
                  options={{
                    strings: [
                      "Crafted For You!!",
                      "Crafted For Perfection!!",
                      "Crafted For Elegance!!",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </h1>

            <p className="text-md text-justify max-w-[450px] text-[#551756]">
              Discover a world of exquisite craftsmanship where elegance meets
              sophistication. Indulge in our handcrafted pieces, meticulously
              designed to captivate your senses. ZaGull's Jewellery promises an
              unforgettable experience of luxury. Join us and savor the essence
              of fine jewelry, redefined for your style.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href={"/food"}
                className="p-3 min-w-[120px] cursor-pointer border-none rounded-2xl bg-gradient-to-r from-[#cab273] to-[#e2cb8e] text-white font-bold flex justify-center items-center animate-bounce  "
              >
                Order Now
              </Link>
            </div>
          </div>
          <div className="w-[800px] flex">
            <img src="/3.png" alt="" className="my-auto" />
          </div>
        </div>
        <div className="bg-[#f4f4f4] flex flex-col gap-20 pt-24">
          {!loading ? (
            <SeasonalOffers foods={foods} />
          ) : (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          )}

          <ChooseUs />
          {/* {!loading ? (
            <FoodPackages foods={foods} />
          ) : (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
