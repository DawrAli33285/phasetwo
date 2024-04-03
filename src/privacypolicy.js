import CateBanner from "./components/cateBanner";
import {useDispatch} from 'react-redux'
import React from "react";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';



import { getPrivacycontent } from "./redux/slices/jobsSlice";
export default function Privacy() {
  const dispatch=useDispatch()
  const [content,setContent]=React.useState()
React.useEffect(()=>{
fetchContent();
},[])
const fetchContent=async()=>{
  let contentres=await dispatch(getPrivacycontent())
if(getPrivacycontent.rejected.match(contentres)){
toastr.error(contentres?.payload?.error)
}
if(getPrivacycontent.fulfilled.match(contentres)){
console.log("contentres")
console.log(contentres)
setContent(contentres?.payload?.content)
}
}

  return (
    <>
      <CateBanner pageName="Privacy & Policy" />

      <div className="max-w-[1140px] p-[20px] flex flex-col gap-[20px] mx-auto">
        <p className="text-[16px] text-[#595959]">
       {content?.introduction}
        </p>
        <ol className=" privacy-list">
          <li className="mt-[20px] flex flex-col gap-[20px]">
            <h2 className="text-[19px] text-[#00a7ac] font-bold">Information We Collect</h2>
            <p className="text-[16px] text-[#595959]">
            {content?.Information_We_Collect}
            </p>
          </li>
          <li className="mt-[20px] flex flex-col gap-[20px]">
            <h2 className="text-[19px] text-[#00a7ac] font-bold">Use of Information</h2>
            <p className="text-[16px] text-[#595959]">
             {content?.Use_of_Information}{" "}
            </p>
           
          </li>
          <li className="mt-[20px] flex flex-col gap-[20px]">
            <h2 className="text-[19px] text-[#00a7ac] font-bold">Disclosure of Information</h2>
            <p className="text-[16px] text-[#595959]">
           {content?.Disclosure_of_Information}
            </p>
            
          </li>
        </ol>
        {/* <p className="mt-[20px] text-[16px] text-[#595959] font-bold">Last updated: 18/10/2023</p>
       */}
      </div>
    </>
  );
}
