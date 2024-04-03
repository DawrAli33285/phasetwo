import { BsSearch } from "react-icons/bs";
import React from 'react'
export default function CateBody({ categories,setCategories,orignalCategories}){
    const [search,setSearch]=React.useState("")
    const filternow=()=>{
        setCategories(prev => {
            // Filter categories based on the search term
            const filteredCategories = orignalCategories.filter(val =>
                val.categoryName.toLowerCase().startsWith(search.toLowerCase())
            );
            return filteredCategories;
        });
      
    }
    return(
        <div className="lg:py-[30px] lg:px-[80px] ">
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-[30px] justify-between items-center">
                <div>
                    <h6 className="text-[#595959] lg:text-[16px] text-[14px] font-[500]">{orignalCategories?.length} categories</h6>
                </div>
                <div className="flex items-center">
                    <div className="">
                        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="search" placeholder="Search.."   aria-label="Search"  className=" outline-none py-[10px] px-[20px] bg-[#f8f8f8]"/>
                    </div>
                    <div className="bg-[#00a7ac] px-[15px] py-[14px] rounded-[5px]">
                        <button className="flex items-center">
                        <BsSearch onClick={filternow} className="text-white"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}