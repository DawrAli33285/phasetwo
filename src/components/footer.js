import logo1 from "../images/footer-logo.svg";
import { CiFacebook } from "react-icons/ci";
import { AiFillLinkedin } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import support from "../images/footer-support-icon.svg";
import { Link } from "react-router-dom";
import { getHomeContent } from "../redux/slices/jobsSlice";
import { useDispatch } from "react-redux";
import React from "react";
export default function Footer() {
  const dispatch=useDispatch();
  const [state,setState]=React.useState()
React.useEffect(()=>{
fetchFooterContent();
},[])
const fetchFooterContent=async()=>{
let footercontentres=await dispatch(getHomeContent())
if(getHomeContent.fulfilled.match(footercontentres)){
setState(footercontentres?.payload?.content)
}
}
  return (
    <>
      <div className="footer bg-[#1a1a1a] text-white py-[20px] px-[20px] lg:py-[30px] lg:px-[60px]">
        <div className="flex flex-col lg:flex-row items-center gap-[11%] lg:py-[20px]">
          <div className="">
            <img src={logo1} alt="logo" />
          </div>
          <div className="flex items-center justify-between lg:justify-center w-full lg:w-auto lg:gap-[100px]">
            <div className="flex flex-col gap-[10px]">
              <div className="text-[20px] font-bold">
                <h3>About Company</h3>
              </div>
              <div className="flex flex-col gap-2 text-[#b3b3b3] text-[16px] font-medium ">
                <Link to="/Contact" className="hover:text-[#00A7AC] transition-all duration-700 ">Contact US</Link>
                <Link to="/Terms&Condition" className="hover:text-[#00A7AC] transition-all duration-700 ">Terms & Condition</Link>
                <Link to="/PrivacyPolicy" className="hover:text-[#00A7AC] transition-all duration-700 ">Privacy & Policy</Link>
              </div>
            </div>

            <div className="flex flex-col gap-[10px]">
              <div className="text-[20px] font-bold ">
                <h3>For Candidate’s</h3>
              </div>
              <div className="flex flex-col gap-2   text-[#b3b3b3] text-[16px] font-medium ">
                <Link to="/Create-Cv" className="hover:text-[#00A7AC] transition-all duration-700 ">Create Resume</Link>
                <Link to="/Job-Category" className="hover:text-[#00A7AC] transition-all duration-700 ">Browse Categories</Link>
                <Link to="/Job-Listing" className="hover:text-[#00A7AC] transition-all duration-700 ">Browse Jobs</Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col lg:flex-row justify-between gap-[20px] lg:gap-0 items-center py-[30px]">
            <div className="flex items-center gap-[10px]  ">
              <div>
                <img src={support} />
              </div>
              <div className="flex gap-2">
                <h5>Support Line: </h5>
                <Link to="/" className=" underline hover:text-[#b3b3b3] transition-all duration-700 text-[#00A7AC]">{state?.Phone_Number}</Link>
              </div>
            </div>
            <div className="flex lg:gap-5 gap-[10px] text-[15px] lg:text-[16px] justify-start flex-row">
              <div className="">
                <Link to="/PrivacyPolicy" className="text-[#b3b3b3] transition-all duration-700 hover:text-[#00A7AC]">
                  Privacy Policy
                </Link>
              </div>
              <div>
                <Link to="/Terms&Condition" className="text-[#b3b3b3] transition-all duration-700 hover:text-[#00A7AC]">
                  Terms of Services
                </Link>
              </div>
              <div>
                <Link to="#" className="text-[#b3b3b3] transition-all duration-700 hover:text-[#00A7AC]">
                  Our Sitemap
                </Link>
              </div>
            </div>
          </div>
          <hr className="border-[#b3b3b35b]" />
          <div className="flex justify-between text-[15px] items-center lg:pt-[25px] lg:flex-row flex-col gap-[10px] lg:gap-0">
            <div>
              <p className="py-[20px] lg:py-0">
                @Copyright 2024{" "}
                <Link
                  to="/"
                  className="text-[#00A7AC] transition-all duration-700 hover:text-[#b3b3b3]"
                >
                  JOBES
                </Link>{" "}
                | Design By{" "}
                <a
                  href="#"
                  className="text-[#00A7AC] hover:text-[#b3b3b3] transition-all duration-700"
                >
                  Dawar
                </a>{" "}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <p>
                Follow <span className="font-medium ">JOBES:</span>
              </p>
              <Link to={`/${state?.Facebook_Link}`} className="text-[26px] text-[#00A7AC] transition-all duration-700 hover:text-white hover:bg-[#00A7AC] rounded-[100%]">
                <CiFacebook />
              </Link>
              <Link to={`/${state?.Twitter_Link}`} className="text-[20px] text-[#00A7AC] transition-all duration-700  hover:text-white">
                <BsTwitterX />
              </Link>
              <Link to={`/${state?.LinkedIn_Link}`} className="text-[26px] text-[#00A7AC] transition-all duration-700 hover:bg-white hover:text-[#00A7AC] rounded-[1%]">
                <AiFillLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
