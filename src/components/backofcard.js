import { useNavigate } from "react-router-dom";
export default function BackCard({categori}) {
  const navigate=useNavigate()  
  return (
      <div onClick={(e)=>navigate(`/Job-Listing?city=${categori?._id?.city}`)} className="relative w-full h-full">
      <div style={{ background: `url(${categori?.img_url})`, backgroundSize:'cover',  }} className="absolute items-center  rounded-[45px] py-[10] gap-2 flex-col  text-white inset-0 w-full h-full flex justify-center bg-white ">
       <span className=" absolute  z-10  text-[13px] right-[20px] top-[15px] bg-[#b4f2c1] text-black font-medium w-[80px] text-center rounded-[40px]">
          Popular
       </span>
        <h2 className="lg:text-[28px]  z-10  text-[20px] font-semibold transition-all duration-700 hover:text-[#62f7fc] text-center">
          {categori?._id?.country+','+' '+categori?._id?.city}
        </h2>
        <p className="text-center  z-10  text-[#fff] font-medium text-[16px]">
        total jobs: {categori?.jobs}
        </p>
        
      </div>
      <div className="absolute inset-0 bg-black z-0 opacity-40 rounded-[45px]"></div>
      </div>
    );
  }
  