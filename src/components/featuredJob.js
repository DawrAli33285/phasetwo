import { HiArrowLongRight } from "react-icons/hi2";
import { FaBookmark } from "react-icons/fa";
import ap from "../images/app.png";
import casee from "../images/case.svg";
import toastr from 'toastr'
import React from "react";
import 'toastr/build/toastr.min.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addBookmark } from "../redux/slices/jobsSlice";
import { useDispatch } from "react-redux";
import {store} from '../redux/store/storenew'
export default function  FeaturedJob({FeaturedJob,setState}) {
  console.log("FEATUREDJOB")
  
  console.log(FeaturedJob)
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const [userid,setUserId]=React.useState("")
  let deadlinePass = new Date(FeaturedJob?.deadline_date) < new Date();

  const handleBookmark = async () => {
    try {
        let bookmarkres = await dispatch(addBookmark(FeaturedJob?._id));

        if (addBookmark.rejected.match(bookmarkres)) {
            toastr.error(bookmarkres?.payload?.error);
        }

        if (addBookmark.fulfilled.match(bookmarkres)) {
            toastr.success('Bookmark added successfully');

 setTimeout(()=>{
  window.location.reload(true)
 },500)
        }
    } catch (error) {
        console.error('Error bookmarking job:', error);
    }
};
const deadlinePassed = new Date(FeaturedJob?.deadline_date) < new Date();
React.useEffect(()=>{
setUserId(store?.getState()?.authSlice?.user?._id)
},[])
  return (
    <div className="my-[60px] bg-[#f8f8f8]">
{FeaturedJob?<div>
  <div className="flex flex-col lg:flex-row justify-between items-end px-[20px] gap-[20px] py-5 lg:px-[40px]  ">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[40px] font-bold">
            <span className="text-[#00a7ac]">Featured</span> Job List
          </h2>
          <p className="text-[17px] text-[#595959]">
            To choose your trending job dream & to make future bright.
          </p>
        </div>
        <div className="flex change gap-[20px]">
          <p onClick={(e)=>navigate('/Job-Listing')} className="text-[18px] cursor-pointer font-medium">
            Explore More{" "}
          </p>
          <div onClick={(e)=>navigate('/Job-Listing')} className="w-[30px] cursor-pointer flex items-center h-[30px] rounded-[100px] border-[#00a7ac] border-[1px] ">
            <HiArrowLongRight className="text-[#00a7ac] text-[30px]  lg:text-[50px] arrow" />
          </div>
        </div>
      </div>

    <div className="py-1">
    <div className="hover:border-[#00a7ac]  shadow-lg transition-all duration-700 bg-white border-[1px] w-[95%] py-[45px] m-auto rounded-[40px] my-[60px] flex lg:flex-row flex-col bookmark">
        <div className="flex flex-col gap-[35px] ">
          <div className="px-[60px] flex gap-[15px] items-center">
            <div className=" w-[55px] rounded-[100%]">
              <img
                src={FeaturedJob?.company_logo}
                alt=""
                className=" rounded-[30px] w-[100%] object-cover"
              />
            </div>
            <div>
              <h3 className="text-[24px] font-bold">{FeaturedJob?.job_title}</h3>
              <p className="text-[#595959] text-[15px]">{FeaturedJob?.company_name}</p>
            </div>
            </div>
          <div className=" mb-[20px] px-[70px] flex items-center gap-[10px]">
            <div>
              <img src={casee} />
            </div>
            <div>
              <p className="text-[#595959]">
                Job Applied:{" "}
                <span className=" font-medium text-black">{FeaturedJob?.appliedBy?.length} Person</span>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className=" ">
          <div className="flex gap-[50px] px-[20px] lg:px-[0px]">
            <div className="flex flex-col pt-[4px] pl-[15px]">
              <span className="point font-semibold">
                <p className="pl-[5px]">
                  <span className="text-[#595959] font-normal">Location: </span>
                  {FeaturedJob?.country+','+' '+FeaturedJob?.city}
                </p>
              </span>

            </div>
            <div className="flex flex-col pt-[4px] pl-[15px]">
              <span className="point font-semibold">
                <p className="pl-[5px]">
                  <span className="text-[#595959] font-normal">
                    Experience:{" "}
                  </span>
                {FeaturedJob?.experience_required}
                </p>
              </span>
              <span className="point ">
                <p className="pl-[5px] font-semibold">
                  <span className="text-[#595959] font-normal">
                    Published:{" "}
                  </span>
                  {
    `${new Date(FeaturedJob?.createdAt).toLocaleString('en-US', { month: 'long' })}, ${new Date(FeaturedJob?.createdAt).getMonth() + 1}, ${new Date(FeaturedJob?.createdAt).getFullYear()}`
}


                </p>
              </span>
            </div>
          </div>
          <div>
            <div className="flex lg:flex-row flex-col px-[20px] lg:px-[0px] justify-center gap-[20px] text-[13px] pt-[33px]">
          
              <div className=" bg-[#b4f2ee] rounded-[100px]">
                <p className="py-[10px] px-[20px]">{FeaturedJob?.job_type}</p>
              </div>
           
            </div>
          </div>
        </div>
        <div  className="flex flex-col">
          <div className=" pt-[5px]">
            <div className="icon w-[25px] h-[25px] flex items-center justify-center rounded-[70px] shadow-md text-[#00a7ac] transition-all duration-700 hover:text-white hover:bg-[#00a7ac] bg-[#f8f8f8]">
            {FeaturedJob?.bookmark?.find(u=>u==userid)? <div className="w-[25px] h-[25px] flex items-center justify-center rounded-[70px] shadow-md text-white bg-[#00a7ac]">
    <FaBookmark onClick={handleBookmark} className="text-[13px]" />
</div>
: <div className=" w-[25px] h-[25px] flex items-center justify-center rounded-[70px] shadow-md text-[#00a7ac] hover:text-white hover:bg-[#00a7ac]   bg-[#f8f8f8]">
              <FaBookmark onClick={handleBookmark} className="text-[13px] " />
            </div>}
            </div>
          </div>
          <div className="flex absolute  lg:justify-end bottom-[3%] left-[10%] lg:bottom-[55px] lg:right-[30px] items-center change gap-[10px]" id="badal">
            <div className="w-[20px] flex items-center h-[20px] rounded-[100px] border-[#00a7ac] border-[1px] ">
              <HiArrowLongRight className="text-[#00a7ac] text-[30px]  lg:text-[70px] arrow" id="teer" />
            </div>
                   {
    FeaturedJob?.appliedBy?.length > 0 && FeaturedJob?.appliedBy?.find(u => u?.toString() === userid?.toString()) ? (
        <p className="text-[#00a7ac]">Already Applied</p>
    ) : (
        new Date(FeaturedJob?.deadline_date) < new Date() ? (
            <p className="text-[#00a7ac]">Job Expired</p>
        ) : (
            <Link to={`/Job-Detail?id=${FeaturedJob?._id}`} className="text-[15px] font-semibold">
            Apply Now
        </Link>
        )
    )
}
          </div>
        </div>
      </div>
    </div>
</div>:<div className="flex justify-center items-center">
<p>No category found</p>
  </div>}
    </div>
  );
}
