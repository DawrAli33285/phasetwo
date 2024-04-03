import "../cv-form.css";
import React from "react";
import support from "../images/support.svg";
import {useDispatch} from 'react-redux'
import { contactUs } from "../redux/slices/jobsSlice";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
export default function ContactUs() {
  const [state,setState]=React.useState({
name:'',
email:'',
phone_number:'',
company_name:'',
message:''
  })
  const dispatch=useDispatch();
  const contactnow=async()=>{
    if(state.email.length==0){
      toastr.error("Please enter email")
      return
    }else if(state.name.length==0){
      toastr.error("Please enter name")
      return;
    }else if(state.message.length==0){
      toastr.error("Please enter a message")
      return

    }else if(state.phone_number.length==0){
      toastr.error("Please enter phone number")
      return
    }else if(state.company_name.length==0){
      toastr.error("Please enter a company name")
      return
    }
    let contactnowres=await dispatch(contactUs(state))
if(contactUs.rejected.match(contactnowres)){
  toastr.error(contactnowres.payload.error)
}
if(contactUs.fulfilled.match(contactnowres)){
  toastr.success("Email sent sucessfully")
  setState({
    name:'',
email:'',
phone_number:'',
company_name:'',
message:''
  })
}
  }
  return (
    <section id="Contact Us">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 py-[50px] px-[8%] "
        id="contact-us"
      >
        <div className="">
          <div className="flex gap-5 flex-col font-new">
            <h3 className="font-bold lg:text-[23px] w-[390px]">
            Need Any Help? Contact Us
            </h3>
            <p className="text-[#595959] text-[16px]">
              Alternatively you can also check for the Company email, phone
              number <br /> and address in the official website.
            </p>
          </div>
          <div>
            <div className="py-5 ">
              <div className="flex items-center gap-2 py-3">
                <img src={support} alt="" className=" rounded-md" />
                <p className="flex text-[15px] lg:text-[19px] font-medium items-center gap-2">
                  Support Line:{" "}
                  <span className="text-[#00a7ac] underline hover:text-black transition-all duration-300  ">
                    +099-035 7398 3465
                  </span>
                </p>
              </div>
              <div className="py-5 flex gap-3">
                <span className=" text-red-500 font-medium text-[17px]">N:B</span> 
                <span className="text-[#595959] text-[16px]">Our Customer Service Available from 9 am to 6 pm (Saturday
                to Thursday)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[5%]">
          
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              <input
                type="text"
                value={state.name}
                onChange={(e)=>setState({
                  ...state,
                  name:e.target.value
                })}
                id="Name"
                className="shadow appearance-none lg:w-[300px] w-full  py-4 px-3 border-[1px] border-[#00a7ac] border-solid rounded-md text-gray-700 outline-none  leading-tight border-opacity-[0.5] focus:shadow-outline"
                placeholder="Enter your Name"
              />
              <input
                type="text"
                value={state.email}
                onChange={(e)=>setState({
                  ...state,
                  email:e.target.value
                })}
                id="Name"
                className="shadow appearance-none lg:w-[300px] w-full  py-4 px-3 border-[1px] border-[#00a7ac] border-solid rounded-md text-gray-700 outline-none  leading-tight border-opacity-[0.5] focus:shadow-outline"
                placeholder="info@example.com"
              />
            </div>
            <div className="flex flex-col lg:flex-row  gap-6 lg:gap-10 py-5">
              <input 
                type="text"
                id="Name"
                value={state.phone_number}
                onChange={(e)=>setState({
                  ...state,
                  phone_number:e.target.value
                })}
                className="w-full shadow appearance-none lg:w-[300px] py-4 px-3 border-[1px] border-[#00a7ac] border-solid rounded-md text-gray-700 outline-none  leading-tight border-opacity-[0.5] focus:shadow-outline"
                placeholder="+099-035 *** *** ** "
              />
              <input
                type="text"
                id="Name"
                value={state.company_name}
                onChange={(e)=>setState({
                  ...state,
                  company_name:e.target.value
                })}
                className=" shadow appearance-none lg:w-[300px] w-full  py-4 px-3 border-[1px] border-[#00a7ac] border-solid rounded-md text-gray-700 outline-none  leading-tight border-opacity-[0.5] focus:shadow-outline"
                placeholder="Company name"
              />
            </div>
            <div className="">
              <textarea
              value={state.message}
              onChange={(e)=>setState({
                ...state,
                message:e.target.value
              })}
                rows="4"
                cols="50"
                name="Message"
                form="usrform"
                placeholder="Message"
                className=" shodow appearance-none w-full lg:w-[605px] py-4 px-3  border-[1px] border-[#00a7ac] border-solid rounded-md text-gray-700 outline-none  leading-tight border-opacity-[0.5] focus:shadow-outline"
              />
            </div>
         
          <button onClick={contactnow} className="focus:outline-none focus:ring-0 my-3 lg:my-2 focus:shadow-none flex items-center justify-center py-2 px-4 relative  overflow-hidden text-[15px] lg:text-[16px] rounded-md font-newone bg bg-[#00a7ac] text-white shadow-sm shadow-salte-500 transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white  lg:hover:before:w-3/4 lg:hover:before:bg-black lg:hover:after:w-2/4 lg:hover:after:bg-black">
            <span className="relative z-10">Send Me Message</span>
          </button>
        </div>
      </div>
    </section>
  );
}
