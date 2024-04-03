import people from "../images/log.svg";
import company from "../images/building.svg";
import idcard from "../images/id.svg";
import checkl from "../images/checklist.svg";
import { HiArrowLongRight } from "react-icons/hi2";
import BackCard from "./backofcard";
import { useNavigate } from "react-router-dom";
export default function JobLocation({recorddata,jobsaccordingtolocation,homeContent}) {
  console.log("LOCATION")
  console.log(jobsaccordingtolocation)
  const navigate=useNavigate()
    const categori = [
        {
            id:1,
            categoryname:'Loss Angles City, Canada',
            totaljobs:50,
            img_url:'https://jobes-nextjs.vercel.app/assets/images/bg/location-01.png'
        },
        {
            id:1,
            categoryname:'Loss Angles City, Canada',
            totaljobs:50,
            img_url:'https://jobes-nextjs.vercel.app/assets/images/bg/location-01.png'
        },
        {
            id:1,
            categoryname:'Loss Angles City, Canada',
            totaljobs:50,
            img_url:'https://jobes-nextjs.vercel.app/assets/images/bg/location-01.png'
        },
        {
            id:1,
            categoryname:'Loss Angles City, Canada',
            totaljobs:50,
            img_url:'https://jobes-nextjs.vercel.app/assets/images/bg/location-01.png'
        },

        {
            id:1,
            categoryname:'Loss Angles City, Canada',
            totaljobs:50,
            img_url:'https://jobes-nextjs.vercel.app/assets/images/bg/location-01.png'
        },

        {
            id:1,
            categoryname:'Loss Angles City, Canada',
            totaljobs:50,
            img_url:'https://jobes-nextjs.vercel.app/assets/images/bg/location-01.png'
        },
        
    ]

  return (
    <div className="my-[60px]">
      <div className="flex justify-center flex-col lg:flex-row items-center py-[40px] gap-[30px] lg:gap-[5%]">
        <div className="flex items-center gap-5 mia ">
          <div className="w-[52px] back-cricle">
            <img src={company} alt="" className="w-full" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[36px] font-bold">{recorddata?.totalCompanies[0]?.totalCompanies}</h3>
            <p className="text-[#595959] mt-3">{homeContent?.Total_Recruiters}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 mia ">
          <div className="self-center  back-cricle">
            <img src={people} alt="" className="w-full" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[36px] font-bold">{recorddata?.totalAppliesCount}</h3>
            <p className="text-[#595959] mt-3">{homeContent?.Daily_Job_Posted}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 mia ">
          <div className="self-center back-cricle">
            <img src={idcard} alt="" className="w-full" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[36px] font-bold">{recorddata?.totalusers}</h3>
            <p className="text-[#595959] mt-3">{homeContent?.Daily_User_Visited}</p>
          </div>
        </div>
        {/* <div className="flex items-center gap-5 mia ">
          <div className="self-center back-cricle">
            <img src={checkl} alt="" className="w-full" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[36px] font-bold">800k+</h3>
            <p className="text-[#595959] mt-1">Total Recruiters</p>
          </div>
        </div> */}
      </div>

      <div>
        <div className="flex lg:flex-row flex-col justify-between items-end px-[20px] lg:py-[50px] lg:px-[40px]  ">
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-[40px] font-bold">
            <span className="text-[#00a7ac]">{homeContent?.Featured_Job_List_Heading}</span>
            </h2>
            <p className="text-[17px] text-[#595959]">
              {homeContent?.Featured_Job_List_Content}
            </p>
          </div>
          <div className="flex change gap-[20px] ">
            <p onClick={(e)=>navigate('/Job-Listing')} className="lg:text-[18px] cursor-pointer  font-medium">
              View All Jobs
            </p>
            <div onClick={(e)=>navigate('/Job-Listing')}  className="w-[30px] cursor-pointer flex items-center h-[30px] rounded-[100px] border-[#00a7ac] border-[1px] ">
              <HiArrowLongRight className="text-[#00a7ac] text-[30px]  lg:text-[50px] arrow" />
            </div>
          </div>
        </div>

        <div className="cardo ">
          {jobsaccordingtolocation?.length>0?jobsaccordingtolocation?.map((cate) => (
   
           <div className="relative w-[100%] h-60 rounded-xl text-white overflow-hidden cursor-pointer transition-all duration-700 ">
              <BackCard  categori={cate} />
            </div>
          )):<p className="flex justify-center items-center">No jobs found</p>}
        </div>
      </div>
    </div>
  );
}
