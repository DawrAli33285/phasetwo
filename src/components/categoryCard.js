import BackOfCard from "./backCard";
import FrontOfCard from "./frontCard";
import {useDispatch} from 'react-redux'
import React from 'react'
import { getHomePageData } from "../redux/slices/jobsSlice";
import { useNavigate } from "react-router-dom";
export default function CategoryCard({categoryJobs,homeContent}) {
const navigate=useNavigate()
const categories= [
        {
            id:1,
            categoryname:'Marketing & Sales',
            totaljobs:50,
            img_url:'https://img.freepik.com/premium-photo/businessman-use-laptop-marketing-advertising-social-media-social-media-concept_27634-664.jpg?w=900'
        },
        {
            id:2,
            categoryname:'Marketing & Sales',
            totaljobs:50,
            img_url:'https://img.freepik.com/premium-photo/businessman-use-laptop-marketing-advertising-social-media-social-media-concept_27634-664.jpg?w=900'
        },
        {
            id:3,
            categoryname:'Marketing & Sales',
            totaljobs:50,
            img_url:'https://img.freepik.com/premium-photo/businessman-use-laptop-marketing-advertising-social-media-social-media-concept_27634-664.jpg?w=900'
        },
        {
            id:4,
            categoryname:'Marketing & Sales',
            totaljobs:50,
            img_url:'https://img.freepik.com/premium-photo/businessman-use-laptop-marketing-advertising-social-media-social-media-concept_27634-664.jpg?w=900'

        },
        {
            id:5,
            categoryname:'Marketing & Sales',
            totaljobs:50,
            img_url:'https://img.freepik.com/premium-photo/businessman-use-laptop-marketing-advertising-social-media-social-media-concept_27634-664.jpg?w=900'
        }
       
    ]
  return (
    <div className=" my-[40px] flex flex-col">
      <div className="flex flex-col  gap-[10px] text-center lg:text-start  p-[50px] lg:p-[40px]">
        <h2 className=" lg:text-[40px] text-[28px] font-bold">
           <span className="text-[#00a7ac]">{homeContent?.Jobs_Category_List_Heading}</span> 
        </h2>
        <p className="text-[#595959] text-[18px] ">
          {homeContent?.Jobs_Category_List_Content}
        </p>
      </div>
      <div className="card">
       {
      categoryJobs?.map((categoryjob,i)=>{
        console.log("CATEGORY jobs")
        console.log(categoryjob)
        return <div onClick={(e)=>navigate(`/Job-Listing?category=${categoryjob?._id?.category}`)} key={i.toString()} className="relative w-full h-60 rounded-xl text-white overflow-hidden cursor-pointer transition-all duration-700 cardy">
        <FrontOfCard category={categoryjob}/>
        <BackOfCard category={categoryjob}/>
      </div>
      })
       }
        
      </div>
    </div>
  );
}
