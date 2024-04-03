import { BsArrowRight } from "react-icons/bs";
export default function BackOfCard({category}) {
  
  return (
    <div style={{ background: `url(${category.img_url})`, backgroundSize:'cover' }} className=" absolute font-bold rounded-[40px] py-[10] gap-5  flex-col  text-white inset-0 w-full h-full flex justify-center items-center bg-white transition-all z-10 card-back">
      <h2 className="text-[28px] hover:text-[#00a7ac] text-center">
        {category?.category}
      </h2>
      <p className="text-center text-[#fff] text-[16px]">
        {category?.jobs} total jobs
      </p>
      <a href="#" className="flex items-center gap-2">View All<BsArrowRight  className=" text-[20px]"/> </a>{" "} 
    </div>
  );
}
