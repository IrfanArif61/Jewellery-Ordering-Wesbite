import React from "react";
import { FaTree, FaRecycle, FaGem } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { GiChestnutLeaf, GiCutDiamond } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
type Props = {};

const data = [
  {
    title: "CONVINENCE",
    description:
      "With healty food delivery, you can have nutritious meal delivered right to your door, saving you time and effort in meal planning and grocery shopping",
    icon: FaTree,
  },
  {
    title: "Exquisite Craftsmanship",
    description:
      "Our pieces are meticulously crafted by expert jewelers and designers to ensure that each item embodies the perfect balance of elegance and durability.   ",
    icon: GiCutDiamond,
  },
  {
    title: "Unmatched Quality",
    description:
      "Each piece is created with the finest materials and attention to detail, ensuring you receive stunning jewelry that is both beautiful and long-lasting. Our collections offer a wide range of styles to suit every taste.",
    icon: MdVerified,
  },
  {
    title: "COST-EFFECTIVE",
    description:
      "Compared to eating out or ordering from expensive meal delivery services, a healthy food delivery service can be a cost effective way to ensure you are eating all without breaking the bank.",
    icon: FaRecycle,
  },
];

function ChooseUs({}: Props) {
  return (
    <div className="flex mb-20">
      <div className="w-[50%]">
        <div className="avatar flex items-center justify-center">
          <div className="w-[70%] rounded-full ring ring-white  ring-offset-4">
            <img src="/6.png" height={50} width={50} />
          </div>
        </div>
      </div>
      <div className="w-[50%] flex flex-col gap-6">
        <h2 className="text-[#551756] font-extrabold text-xl ml-8">
          WHY PEOPLE CHOOSE US?
        </h2>
        {data.map((item) => (
          <div className="flex items-center">
            <div className="w-[13%]">
              <item.icon className="text-[4rem] text-[#cab273]" />
            </div>
            <div className="w-[70%]">
              <h4 className="font-semibold text-[#551756]">{item.title}</h4>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChooseUs;
