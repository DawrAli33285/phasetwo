import { Link,useLocation } from "react-router-dom";
import company from "../images/app.png";
import { FaBookmark } from "react-icons/fa";
import jobcase from "../images/case.svg";
import { BsLink45Deg } from "react-icons/bs";
import { CiFacebook } from "react-icons/ci";
import { AiFillLinkedin } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {store} from '../redux/store/storenew'
import React from "react";
import { addBookmark, applyNow, getIndivisualJobs } from "../redux/slices/jobsSlice";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import { useNavigate } from "react-router-dom";
export default function JobBody() {

  const dispatch = useDispatch()
  const location = useLocation();
  const [job, setJob] = React.useState({});
  const [userid,setUserId]=React.useState("")

  React.useEffect(() => {
    let params = new URLSearchParams(location.search);
    let id = params.get('id'); 
    setUserId(store.getState()?.authSlice?.user?._id) 
    fetchIndivisual(id);
  }, []);
  
  const fetchIndivisual = async (id) => {
      try {
      
 let fetchres=await dispatch(getIndivisualJobs(id))
if(getIndivisualJobs.rejected.match(fetchres)){
  console.log(fetchres)
toastr.error(fetchres?.payload?.error)
}
if(getIndivisualJobs.fulfilled.match(fetchres)){
setJob(fetchres.payload.jobdata)
console.log(fetchres?.payload?.jobdata)
console.log("JOB DATA")
}
} catch (error) {
          console.error("Error fetching individual job:", error);
      }
  };

  const handleBookmark=async()=>{
let bookmarkres=await dispatch(addBookmark(job?._id))
if(addBookmark.rejected.match(bookmarkres)){
toastr.error(bookmarkres?.payload?.error)
}
if(addBookmark.fulfilled.match(bookmarkres)){
  toastr.success('Bookmark added sucessfully')
  setJob((prev) => {
    let old = { ...prev };
    let existsIndex = old?.bookmark?.findIndex(u => u === store.getState()?.authSlice?.user?._id);

    let newBookmark;

    if (existsIndex !== -1) {
        // If the user ID already exists in the bookmark array, remove it
        newBookmark = old.bookmark.filter((item, index) => index !== existsIndex);
    } else {
        // If the user ID doesn't exist in the bookmark array, add it
        newBookmark = [...old.bookmark, store.getState()?.authSlice?.user?._id];
    }

    let newData = {
        ...prev,
        bookmark: newBookmark
    };

 
    return newData;
});

}
  }

  const submitApplynow=async(id)=>{
    let applynowres=await dispatch(applyNow(id))
    if(applyNow.rejected.match(applynowres)){
      toastr.error(applynowres?.payload?.error)
    }
    if(applyNow.fulfilled.match(applynowres)){
      toastr.success("application submitted")
window.location.reload(true)
    }
    console.log("APPLYNOW")
    console.log(applynowres)
  }
  return (
    <div className=" lg:py-[80px] lg:px-[40px]">
      <div className="flex items-start lg:items-center lg:justify-between">
        <div className="flex flex-col lg:flex-row gap-[30px] w-[730px]">
          <div className=" flex items-center">
            <div className="w-[55px] flex justify-center object-cover">
              <img src={job?.company_logo} alt="" className="rounded-[100px]" />
            </div>
            <div className="">
              <Link to="#">{job?.job_title}</Link>
              <p className="text-[13px] font-[500] text-[#595959]">
               {job?.company_name}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row  job-info px-[15px] text-[14px] lg:text-[15px]  lg:gap-[20px] lg:px-[0px]">
            <div className="flex flex-col pt-[4px] gap-[2px] pl-[10px] lg:pl-[15px]">
              <span className="point">
                <p className="pl-[5px] text-[#595959] ">
                  <span className="text-black font-normal">Location: </span>
                  {job?.city+','+' '+job?.country}
                </p>
              </span>
              <span className="point ">
                <p className="pl-[5px] text-[#595959]">
                  <span className="text-black font-normal">Category: </span>
                 {job.category}
                </p>
              </span>
            </div>
            <div className="flex flex-col gap-[2px]  pt-[4px] pl-[10px] lg:pl-[15px]">
              <span className="point ">
                <p className="pl-[5px] text-[#595959]">
                  <span className="text-black font-normal">Job Type: </span>
                 {job?.job_type}
                </p>
              </span>
              <span className="point ">
                <p className="pl-[5px] text-[#595959] ">
                  <span className="text-black font-normal">Salary: </span>
                 {job.salary}
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className=" flex i lg:flex-row lg:w-[480px] w-[100%] flex-col-reverse justify-center items-center gap-[10px] lg:py-[5px] lg:px-[2%]">
          <div className="flex gap-[10px] items-center">
           {job?.bookmark?.find(u=>u==store.getState()?.authSlice?.user?._id)? <div className="w-[25px] h-[25px] flex items-center justify-center rounded-[70px] shadow-md text-white bg-[#00a7ac]">
    <FaBookmark onClick={handleBookmark} className="text-[13px]" />
</div>
: <div className=" w-[25px] h-[25px] flex items-center justify-center rounded-[70px] shadow-md text-[#00a7ac] hover:text-white hover:bg-[#00a7ac]   bg-[#f8f8f8]">
              <FaBookmark onClick={handleBookmark} className="text-[13px] " />
            </div>}
           
          </div>
          <div className="text-white flex justify-center text-[13px] lg:text-[15px]">
       
{
    job?.appliedBy?.length > 0 && job?.appliedBy?.find(u => u?.toString() === userid?.toString()) ? (
        <p className="text-[#00a7ac]">Already Applied</p>
    ) : (
        new Date(job?.deadline_date) < new Date() ? (
            <p className="text-[#00a7ac]">Job Expired</p>
        ) : (
            <button onClick={() => submitApplynow(job?._id)} className="py-[10px] rounded-md px-[10px] lg:px-[20px] bg-[#00a7ac]">
                Apply Now
            </button>
        )
    )
}

          </div>
        </div>
      </div>
      <div className="detail-body-gird px-[10px] overflow-hidden">
        <div className="lg:py-[80px] py-[40px] text-[14px] lg:text-[15px]  lg:px-[10px]">
          <hr className="lg:hidden block py-[20px]" />
          <div className="flex flex-col gap-[30px]">
            <div>
              <h2 className="font-bold text-[#061421]">
                Job Description:{" "}
                <span className="font-medium text-[#595959]">
        {job?.job_description}
                </span>
              </h2>
            </div>

            <div>
              <h2 className="font-bold text-[#061421]">
                Job Responsibility:{" "}
                <span className="font-medium text-[#595959]">
               {job?.job_responsibility}
                </span>
              </h2>
            </div>

            {/* <div className="flex flex-col lg:pt-[4px] lg:gap-[5px]  pl-[10px] lg:pl-[15px]">
              <span className="point">
                <p className="pl-[5px] text-[#595959] ">
                  Conducting user research and testing to understand user needs
                  and behaviors.
                </p>
              </span>
              <span className="point ">
                <p className="pl-[5px] text-[#595959]">
                  Designing wireframes, prototypes, and high-fidelity mockups.
                </p>
              </span>
              <span className="point ">
                <p className="pl-[5px] text-[#595959]">
                  Developing and maintaining design systems and style guides.
                </p>
              </span>
              <span className="point ">
                <p className="pl-[5px] text-[#595959]">
                  Collaborating with cross-functional teams, including product
                  management, engineering, and marketing.
                </p>
              </span>
              <span className="point ">
                <p className="pl-[5px] text-[#595959]">
                  Staying up-to-date with the latest design trends and
                  technologies.
                </p>
              </span>
              <span className="point ">
                <p className="pl-[5px] text-[#595959]">
                  Gathering and analyzing user requirements to inform the design
                  of new software or web applications.
                </p>
              </span>
            </div> */}

            <div className="flex flex-col gap-[10px]  ">
              <h2 className="font-bold  text-[#061421] pl-[3px]">
                Educational Requirements:
              </h2>
              <div className="pl-[15px]">
                <span className="point ">
                  <p className="pl-[5px] text-[#595959]">
                    {job?.educational_requirements}
                  </p>
                </span>

              </div>
            </div>
{/* 
            <div className="flex flex-col gap-[10px]">
              <h2 className="font-bold pl-[3px] text-[#061421]">
                Main Duties:{" "}
                <span className="text-[#595959] font-medium">
                  {" "}
                  Some specific tasks that a UI/UX designer might be responsible
                  for include:
                </span>
              </h2>
              <div className="pl-[15px]">
                <span className="point ">
                  <p className="pl-[5px] text-[#595959]">
                    Gathering and analyzing user requirements to inform the
                    design of new software or web applications.
                  </p>
                </span>
                <span className="point">
                  <p className="pl-[5px] text-[#595959]">
                    Designing the layout, visual design, and interactivity of
                    the user interface.
                  </p>
                </span>
                <span className="point">
                  <p className="pl-[5px] text-[#595959]">
                    Developing and maintaining design systems and style guides
                    to ensure consistency in theux
                  </p>
                </span>
                <span className="point">
                  <p className="pl-[5px] text-[#595959]">
                    Collaborating with cross-functional teams, including product
                    management, engineering, and marketing, to
                    <br />
                    ensure that the user interface is aligned with business and
                    technical requirements
                  </p>
                </span>
              </div>
            </div> */}

            {/* <div className="flex flex-col gap-[10px]">
              <h2 className="font-bold pl-[3px] text-[#061421]">
                Main Duties:{" "}
                <span className="text-[#595959] font-medium">
                  {" "}
                  Some specific tasks that a UI/UX designer might be responsible
                  for include:
                </span>
              </h2>
              <div className="pl-[15px]">
                <span className="point ">
                  <p className="pl-[5px] text-[#595959]">
                    Gathering and analyzing user requirements to inform the
                    design of new software or web applications.
                  </p>
                </span>
                <span className="point">
                  <p className="pl-[5px] text-[#595959]">
                    Designing the layout, visual design, and interactivity of
                    the user interface.
                  </p>
                </span>
                <span className="point">
                  <p className="pl-[5px] text-[#595959]">
                    Developing and maintaining design systems and style guides
                    to ensure consistency in theux
                  </p>
                </span>
                <span className="point">
                  <p className="pl-[5px] text-[#595959]">
                    Collaborating with cross-functional teams, including product
                    management, engineering, and marketing, to
                    <br />
                    ensure that the user interface is aligned with business and
                    technical requirements
                  </p>
                </span>
              </div>
            </div> */}

            <div className="flex flex-col gap-[10px]">
              <h2 className="font-bold pl-[3px] text-[#061421]">
                Extra Benefits:{" "}
                <span className="text-[#595959] font-medium">
                  {" "}
                  Some specific tasks that a UI/UX designer might be responsible
                  for include:
                </span>
              </h2>
              <div className="pl-[15px]">
            
              {job?.extra_benefits?.split(' ')?.map((val,i)=>{
                return   <span className="point">
                <p key={i.toString()} className="pl-[5px] text-[#595959]">
                  {val}
                </p>
              </span>
              })}
              </div>
       
            </div>
          </div>
        </div>
        <div className="lg:py-[80px] flex flex-col lg:items-center px-[10px] py-[30px] text-[14px]">
          {/* <div className="line"></div> */}
          <div className="flex flex-col items-center bg-[#f8f8f8] rounded-[28px] lg:w-[416px] px-[10px] py-[40px]  gap-[10px]">
            <h2 className="font-bold text-left text-[18px] lg:text-[20px] pl-[80px] w-full text-[#061421]">
              Job Summary:{" "}
            </h2>
            <div className="pl-[15px] text-[14px] lg:text-[15px] flex flex-col gap-[10px]">
              <span className="point ">
                <p className="pl-[5px] text-[#595959] ">
                  <span className="text-black font-semibold">Job Title: </span>
                  {job?.job_title}
                </p>
              </span>
              <span className="point">
                <p className="pl-[5px] text-[#595959] ">
                  <span className="text-black font-semibold">Vacancy: </span>
                  {job?.vacancy}
                </p>
              </span>
              <span className="point">
                <p className="pl-[5px] text-[#595959] ">
                  <span className="text-black font-semibold">
                    Experiences:{" "}
                  </span>
                {job?.experience_required}
                </p>
              </span>
              <span className="point">
                <p className="pl-[5px] text-[#595959] ">
                  <span className="text-black font-semibold">
                    Job Category:{" "}
                  </span>
                  {job?.category}
                </p>
              </span>
              <span className="point">
                <p className="pl-[5px] text-[#595959] ">
                  <span className="text-black font-semibold">Job Type: </span>
               {job?.job_type}
                </p>
              </span>
              <span className="point">
                <p className="pl-[5px] text-[#595959] ">
                  <span className="text-black font-semibold">Salary: </span>
                 {job?.salary}
                </p>
              </span>
              <span className="point">
                <p className="pl-[5px] text-[#595959] ">
                  <span className="text-black font-semibold">Deadline: </span>
                  {job?.deadline_date}
                </p>
              </span>
            </div>
          </div>
          <div>
            <div className="flex flex-col font-medium px-[15px] lg:px-[0px] lg:py-[80px]">
              <p className="flex items-center gap-[5px] transition-all duration-300 hover:text-[#00a7ac] cursor-pointer">
                <span>
                  <img src={jobcase} alt="" />{" "}
                </span>
                View All Jobs In This Company{" "}
              </p>
              <div className="flex gap-[15px] items-center py-[20px]">
                <p>Job Link Share:</p>
                <div className="flex gap-[10px] items-center">
                  <div className="text-[26px] text-[#00A7AC] transition-all duration-300 hover:text-white hover:bg-[#00A7AC] rounded-[100%]">
                    <BsLink45Deg onClick={(e)=>{
                      navigator.clipboard.writeText(`http://localhost:3000/Job-Detail?id=${job?._id}`)
toastr.success("Link copied sucessfully")
}} />
                  </div>

                  <div className="text-[26px] text-[#00A7AC] transition-all duration-300 hover:text-white hover:bg-[#00A7AC] rounded-[100%]">
                    <CiFacebook onClick={(e)=>{
                        const shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(`http://localhost:3000/Job-Detail?id=${job?._id}`); 

 window.open(shareUrl, '_blank');
                     }} />
                  </div>
                  <div className="text-[20px] text-[#00A7AC] transition-all duration-300 hover:text-black ">
                    <BsTwitterX onClick={(e)=>{
                       const shareUrl = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(`http://localhost:3000/Job-Detail?id=${job?._id}`); 

                       window.open(shareUrl, '_blank');
                    }} />
                  </div>
                  <div className="text-[26px] text-[#00A7AC] transition-all duration-300 hover:bg-[#00A7AC] hover:text-white rounded-[1%]">
                    <AiFillLinkedin onClick={(e)=>{
                       const shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(`http://localhost:3000/Job-Detail?id=${job?._id}`);
                       window.open(shareUrl, '_blank');
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
