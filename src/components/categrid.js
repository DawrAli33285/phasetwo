import catetech from "../images/catetech.svg";
import { useNavigate } from "react-router-dom";
export default function CateGrid({categories}) {
const navigate=useNavigate();
console.log("CATEGORIES TO CHK")
console.log(categories)
  return (
    <div className="py-[25px] lg:px-[80px] px-[56px] cate-grid-card">

{categories?.map((val,i)=>{
  console.log("CATEGORYICON")
  console.log(val?.CategoryIcon)
  return <div onClick={(e)=>navigate(`/Job-Listing?category=${val?._id?.categoryName}`)} key={i.toString()} className=" flex flex-col cursor-pointer justify-center lg:max-w-[302px] w-full gap-[10px] rounded-md p-[20px] border-[rgba(0,167,172,.2)] border-[1px]">
  <div className="w-fit">
    <img src={val?.CategoryIcon} alt="" />
  </div>
  {/* /* this cate-grid-num come with index number */ }
  <span className="cate-grid-num"></span>
  <div className="lg:text-[25px] text-[17px] font-bold">
    <h2>{val?.categoryName}</h2>
  </div>
  {/* <div className="text-[#595959] lg:text-[15px] text-[10px] font-medium">
    <p>
      Job Available: <span className="text-[#00a7ac]">{val?.jobsCount}</span>
    </p>
  </div> */}
</div>
})}



    </div>
  );
}
