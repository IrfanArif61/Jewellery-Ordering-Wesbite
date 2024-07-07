import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex gap-2 text-white mx-20 mb-15 mt-4">
      <div className="flex-1 flex flex-col gap-5">
        <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-bold text-[#551756] ">
          Welcome to <span className=" text-[#cab273]">ZaGull's</span> Your
          One-Stop Store For Luxurious and Hand Crafted Jewellery!
        </h1>
        <p className="text-lg md:text-xl text-[#551756] mt-8">
          We believe that finding the perfect piece of jewelry shouldn't be
          complicated or time-consuming. We're committed to making it easy for
          everyone to enjoy exquisite, high-quality jewelry crafted with
          precision and care. Our mission is to:
        </p>
        <ul className="list-disc ml-4 text-lg md:text-xl text-[#551756] mt-6">
          <li>Offer a variety of stunning and unique jewelry options</li>
          <li>Source premium, ethically-sourced materials</li>
          <li>Provide convenient online shopping and delivery options</li>
          <li>Promote elegance and sophistication in every piece</li>
        </ul>
        <div className="flex items-center justify-between text-lg md:text-xl mt-10 mb-20">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-[#cab273] text-3xl md:text-4xl font-bold">
              10K+
            </h2>
            <p className="text-[#551756] font-bold">Satisfied Customers</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-[#cab273] text-3xl md:text-4xl font-bold">
              1K+
            </h2>
            <p className="text-[#551756] font-bold">Orders Delivered</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-[#cab273] text-3xl md:text-4xl font-bold">
              4Y+
            </h2>
            <p className="text-[#551756] font-bold">In Industry</p>
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        <img src="/4.png" alt="Salad" className="object-contain w-full ml-10" />
      </div>
    </div>
  );
};

export default About;
