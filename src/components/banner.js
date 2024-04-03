import React, { useState } from "react";
import cat from "../images/category.svg";
import ant from "../images/anty.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
// import { PiBriefcase } from "react-icons/pi";
import ed from "../images/edge.svg";
import circ from "../images/circle.svg";
import str from "../images/star.svg";
export default function Banner({homeContent}) {
  console.log("homeContent")
  console.log(homeContent)
  const [option, setOption] = useState("select");
  return (
    <div className="back w-[100%]  h-[700px] ">
      <div className="grid lg:grid-cols-2 w-[100%] h-full gap-10 " id="lula">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col text-center lg:text-left gap-10 text-white">
          <h1 className="text-[45px] font-extrabold">
  {homeContent?.Banner_Sub_Heading}
  <span className="text-[40px] flex justify-center lg:justify-start stroke-red-600" id="stroke">
    {" "}
    {homeContent?.Banner_Sub_Heading?.split(' ').pop()}
  </span>
</h1>

            <p className="text-20px font-medium">
            {homeContent?.Banner_Content}
            </p>
          </div>
        
        </div>
        <div className="lg:flex hidden justify-center items-center w-[100%] main">
          <div className="pt-9">
            <div className="relative" id="curve">
              <div className=" absolute" id="avtar">
                <img src={ed} />
                <img src={circ} id="circle" className="" />
              </div>
            </div>
            <div
              className="lg:flex lg:items-center hidden lg:justify-center w-auto"
              id="size"
            >
              <div className="my-7" id="banner-right">
                <div id="star">
                  <img src={str} alt="star" />
                </div>
                <div className=" w-[350px] object-fit m-auto" id="ant">
                  <img src={homeContent?.Banner_Image} alt="banner-image" className=" aspect-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
