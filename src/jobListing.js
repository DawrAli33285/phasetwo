import CateBanner from "./components/cateBanner";
import "./joblisting.css";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { useState } from "react";
import React from 'react'
import { useDispatch } from "react-redux";
import { getJobposts,getCategories } from "./redux/slices/jobsSlice";
import toastr from 'toastr'
import { useLocation,Link } from "react-router-dom";
import 'toastr/build/toastr.min.css';
export default function JobListing() {
    const dispatch=useDispatch()
    const [jobPosts,setJobPosts]=React.useState([])
    const [jobCategory,setJobCategory]=React.useState([])
    const [orignalJobs,setOrignalJobs]=React.useState([])
    const [selectedCategory,setSelectedCategory]=React.useState("")
    const [selectedType,setSelectedType]=React.useState("")
    const location=useLocation();
React.useEffect(()=>{
fetchjobs();


},[])
const fetchjobs=async()=>{
let fetchjobsres=await dispatch(getJobposts())
let fetchjobcategoryres=await dispatch(getCategories())
if(getJobposts.rejected.match(fetchjobsres)){
    toastr.error(fetchjobsres.payload.error)
}
if(getJobposts.fulfilled.match(fetchjobsres)){
    console.log("JOB POSTs")
    console.log(fetchjobsres?.payload?.jobposts)
    let params=new URLSearchParams(location.search)
let category=params.get('category')
let city=params.get('city')
if(category){
 
 setSelectedCategory(category)
 setJobPosts((prev)=>{
    let data=fetchjobsres?.payload?.jobposts
    let filtered=fetchjobsres?.payload?.jobposts?.filter(u=>u?.category?.trim()==category)
    console.log("JOB POSTS FILTER")
    console.log(filtered)
    console.log(data)
    console.log(category)
    return filtered
})
}else if(city){
    setJobPosts((prev)=>{
        let filtered=fetchjobsres?.payload?.jobposts?.filter(u=>u?.city?.trim()==city)
   return filtered
    })
}else{
    setJobPosts(fetchjobsres?.payload?.jobposts)
}
    
    setOrignalJobs(fetchjobsres?.payload?.jobposts)
}
if(getCategories.rejected.match(fetchjobcategoryres)){
    toastr.error(fetchjobcategoryres?.payload?.error)
}
if(getCategories.fulfilled.match(fetchjobcategoryres)){
   
    setJobCategory(fetchjobcategoryres.payload.response)
}
}    
const totalJobs = 20;
    const jobsPerPage = 5;
    const totalPages = Math.ceil(jobPosts?.length / jobsPerPage);
    const [currentPage, setCurrentPage] = useState(1);



    const handleChangePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = Math.min(startIndex + jobsPerPage, jobPosts.length);
    const currentJobs = jobPosts.slice(startIndex, endIndex);
    const handleCheckboxChange = (categoryName) => {
     
setJobPosts((prev)=>{
    let newjobs;
 if(selectedType.length>0){
    newjobs=orignalJobs.filter(u=>u?.category?.trim()==categoryName && u?.job_type?.trim()==selectedType)
 }else{
    newjobs=orignalJobs.filter(u=>u?.category?.trim()==categoryName)
 }
    return newjobs
})

        if (selectedCategory === categoryName) {
            setSelectedCategory(""); 
        } else {
            setSelectedCategory(categoryName); 
        }
    };
    const handleCheckboxChangeType = (type) => {
    
      
        if (selectedType === type) {
            setSelectedType(""); 
            setJobPosts((prev)=>{
                let old=orignalJobs
                console.log("OLD")
                console.log(old)
                console.log(selectedCategory)
            if(selectedCategory){
                return old.filter(u=>u?.job_type?.trim()==selectedCategory?.trim())
            }else{
                return old
            }
            })
        } else {
            setSelectedType(type); 
            setJobPosts((prev)=>{
                let old=orignalJobs
                return old.filter(u=>u?.category?.trim()==type)
            })
        }
    };

    return (
        <>
            <CateBanner pageName="Job Listing" />
            <div className="lg:max-w-[1260px] mx-auto my-[40px] jobListingContainer">
                <div className="bg-[#f8f8f8]  p-[20px] flex flex-col gap-[20px]">
                    <div className="bg-white border border-gray-300 rounded-md p-8 mb-8">
                        <h2 className="text-xl font-semibold mb-4">Job Category</h2>
                        <ul className="list-none p-0">
                        {jobCategory?.map((category, index) => (
                <li key={index} className="flex items-center mb-2">
                    <input 
                        type="checkbox" 
                        id={`category_${index}`} 
                        className="mr-2" 
                        checked={selectedCategory === category?.categoryName?.trim()} 
                        onChange={() => handleCheckboxChange(category?.categoryName?.trim())} 
                    />
                    <label htmlFor={`category_${index}`} className="cursor-pointer">{category.categoryName}</label>
                </li>
            ))}
                        </ul>
                    </div>
                    <div className="bg-white border border-gray-300 rounded-md p-8 mb-8">
                        <h2 className="text-xl font-semibold mb-4">Job Type</h2>
                        <ul className="list-none p-0">
            <li className="flex items-center mb-2">
                <input 
                    type="checkbox" 
                    id="full_time" 
                    className="mr-2" 
                    checked={selectedType === "full-time"} 
                    onChange={() => handleCheckboxChangeType("full-time")} 
                />
                <label htmlFor="full_time" className="cursor-pointer">Full Time</label>
            </li>
            <li className="flex items-center mb-2">
                <input 
                    type="checkbox" 
                    id="part_time" 
                    className="mr-2" 
                    checked={selectedType === "part-time"} 
                    onChange={() => handleCheckboxChangeType("part-time")} 
                />
                <label htmlFor="part_time" className="cursor-pointer">Part Time</label>
            </li>
            <li className="flex items-center mb-2">
                <input 
                    type="checkbox" 
                    id="remote" 
                    className="mr-2" 
                    checked={selectedType === "remote"} 
                    onChange={() => handleCheckboxChangeType("remote")} 
                />
                <label htmlFor="remote" className="cursor-pointer">Remote</label>
            </li>
        </ul>
                    </div>

                </div>
                <div className="jobs-container">
                    {jobPosts?.map((job, index) => (
                        
                        <div key={index} className="jobCard rounded-md p-[10px] border-[1px] hover:border-[#00a7ac] border-gray-300">
                            <img src={job?.company_logo} className="w-full rounded-md" alt="Job" />
                            <div className="company-details flex my-[20px]">
                                <img src={job?.company_logo} alt="Company Logo" className="w-[40px] h-[40px] mr-[15px] rounded-[50%]" />
                                <div className="flex flex-col">
                                    <h2>{job?.job_type}</h2>
                                    <p className="text-[#595959] text-[14px]">{job?.country+','+' '+job?.city}</p>
                                    <h2>DeadLine: <span className="text-[#595959] text-[14px]">{new Date(job?.deadline_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></h2>
                                </div>
                            </div>
                            <div className="crossline"></div>
                            <div className="flex items-center my-[10px]">
                                <div className="dot"></div>
                                <p className="text-[#595959]">Salary: <span className="font-bold">{job?.salary}</span> / per hour</p>
                            </div>
                            <div className="flex items-center my-[10px]">
                                <div className="dot"></div>
                                <p className="text-[#595959]">Experience: <span className="font-bold">{job?.experience_required}</span></p>
                            </div>
                            {/* <div className="flex items-center my-[10px]">
                                <div className="dot"></div>
                                <p className="text-[#595959]">Location: <span className="font-bold">{job.location}</span></p>
                            </div> */}
                            <div className="mt-[20px] justify-between flex">
                                <div className=" bg-[#F3E8C1] rounded-[100px]">
                                    <p className="text-[12px] py-[10px] px-[20px]">{job?.job_description}</p>
                                </div>
                                <div className=" flex  items-center change gap-[10px]" id="badal">
                                    <div className="w-[20px] flex items-center h-[20px] rounded-[100px] border-[#00a7ac] border-[1px] ">
                                        <HiArrowLongRight className="text-[#00a7ac] text-[30px]  lg:text-[70px] arrow" id="teer" />
                                    </div>
                                    <Link to={`/Job-Detail?id=${job?._id}`} className="text-[15px] font-semibold">
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            {/* <div className="pagination flex justify-center mt-4 mb-5">
                <div className="w-[20px] flex items-center h-[20px] rounded-[100px] border-[#00a7ac] border-[1px] mr-2 cursor-pointer" onClick={() => handleChangePage(currentPage - 1)}>
                    <HiArrowLongLeft className="text-[#00a7ac] text-[30px] lg:text-[70px] arrow-left h-[20px] w-[20px]" id="prevArrow" />
                </div>
                {[...Array(totalPages)].map((_, index) => (
                    <div key={index} className={`pagination-number rounded-full text-center mx-1 cursor-pointer ${currentPage === index + 1 ? 'bg-[#00a7ac] text-white' : 'bg-[#F3E8C1] text-[#595959]'} hover:bg-[#00a7ac] hover:text-white px-[8px]`} onClick={() => handleChangePage(index + 1)}>
                        {index + 1}
                    </div>
                ))}
                <div className="w-[20px] flex items-center h-[20px] rounded-[100px] border-[#00a7ac] border-[1px] ml-2 cursor-pointer" onClick={() => handleChangePage(currentPage + 1)}>
                    <HiArrowLongRight className="text-[#00a7ac] text-[30px] lg:text-[70px] arrow-right h-[20px] w-[20px]" id="nextArrow" />
                </div>
            </div> */}
        </>
    )
}
