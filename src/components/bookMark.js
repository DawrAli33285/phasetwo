import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { FaBookmark } from "react-icons/fa";
import ap from "../images/app.png";
import { useDispatch } from "react-redux";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import {store} from '../redux/store/storenew'
import casee from "../images/case.svg";
import { addBookmark } from "../redux/slices/jobsSlice";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { getBookmarks } from "../redux/slices/jobsSlice";

export default function BookMark() {
    const [state,setState]=React.useState([])
    const [userid,setUserId]=React.useState("")
    const dispatch=useDispatch();

    React.useEffect(()=>{
        setUserId(store.getState()?.authSlice?.user?._id)
        fetchBookMarks();
    },[])

    const fetchBookMarks=async()=>{
        let getbookmarkres=await dispatch(getBookmarks())
        if(getBookmarks.rejected.match(getbookmarkres)){
            toastr.error(getbookmarkres?.payload?.error)
        }
        if(getBookmarks.fulfilled.match(getbookmarkres)){
            console.log(getbookmarkres)
            setState(getbookmarkres?.payload?.data)
        }
    }

const removeBookmark=async(id)=>{
let addBookmarkres=await dispatch(addBookmark(id))
if(addBookmark.rejected.match(addBookmarkres)){
    toastr.error(addBookmarkres?.payload?.error)
}
if(addBookmark.fulfilled.match(addBookmarkres)){
    toastr.success("Bookmarked job removed")
    setState((prev)=>{
        let old=[...prev]
        let newdata=old.filter(u=>u._id!=id)
        return newdata
    })
}
}


    return (
        <div className="py-1 flex gap-5 flex-col main-bookmark items-center w-full ">
            {state?.map((val,i)=>{
                const deadlinePassed = new Date(val?.deadline_date) < new Date();
                return <div key={i.toString()} className="bookmarks  shadow-lg transition-all duration-700  w-[95%] py-[45px] rounded-[40px] flex lg:flex-row flex-col bookmark">
                    <div className="flex flex-col gap-[35px] ">
                        <div className="px-[60px] flex gap-[15px] items-center">
                            <div className=" w-[55px] rounded-[100%]">
                                <img
                                    src={val?.company_logo}
                                    alt=""
                                    className=" rounded-[30px] w-[100%] object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-[24px] font-bold">{val?.job_title}</h3>
                                <p className="text-[#595959] text-[15px]">{val?.company_name}</p>
                            </div>
                        </div>
                        <div className=" mb-[20px] px-[50px] md:px-[70px] flex items-center gap-[10px]">
                            <div>
                                <img src={casee} />
                            </div>
                            <div>
                                <p className="text-[#595959]">
                                    Job Applied:{" "}
                                    <span className=" font-medium text-black">{val?.appliedBy?.length+' '}Person</span>{" "}
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
                                        {val?.city+' '+val?.country}
                                    </p>
                                </span>
                            </div>
                            <div className="flex flex-col pt-[4px] pl-[15px]">
                                <span className="point font-semibold">
                                    <p className="pl-[5px]">
                                        <span className="text-[#595959] font-normal">
                                            Experience:{" "}
                                        </span>
                                        {val?.experience_required}
                                    </p>
                                </span>
                                <span className="point ">
                                    <p className="pl-[5px] font-semibold">
                                        <span className="text-[#595959] font-normal">
                                            Published:{" "}
                                        </span>
                                        {new Date(val?.createdAt)?.getDate().toString().padStart(2, '0') + ' ' + new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(val?.createdAt)) + ', ' + new Date(val?.createdAt)?.getFullYear()}
                                    </p>
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="flex lg:flex-row flex-col px-[20px] lg:px-[0px] justify-center gap-[20px] text-[13px] pt-[33px]">
                                <div className=" bg-[#F3E8C1] rounded-[100px]">
                                    <p className="py-[10px] px-[20px]">{val?.job_type}</p>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className=" pt-[5px]">
                            <div onClick={()=>removeBookmark(val?._id)} className="w-[25px] h-[25px] flex items-center justify-center rounded-[70px] shadow-md text-white bg-[#00a7ac]">
                                <AiFillDelete className="text-[13px] " />
                            </div>
                        </div>
                        <div className="flex absolute  lg:justify-end bottom-[3%] left-[10%] lg:bottom-[55px] lg:right-[30px] items-center change apply gap-[10px]"  id="badal">
                            <div className="w-[20px] flex items-center h-[20px] rounded-[100px] border-[#00a7ac] border-[1px] ">
                                <HiArrowLongRight className="text-[#00a7ac] text-[30px]  lg:text-[70px] arrow" id="teer" />
                            </div>
                            {
    val?.appliedBy?.length > 0 && val?.appliedBy?.find(u => u?.toString() === userid?.toString()) ? (
        <p className="text-[#00a7ac]">Already Applied</p>
    ) : (
        new Date(val?.deadline_date) < new Date() ? (
            <p className="text-[#00a7ac]">Job Expired</p>
        ) : (
            <Link to={`/Job-Detail?id=${val?._id}`} className="text-[15px] font-semibold">
            Apply Now
        </Link>
        )
    )
}
                        </div>
                    </div>
                </div>
            })}
        </div>
    );
}
