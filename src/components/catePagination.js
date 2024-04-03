import { HiArrowLongRight } from "react-icons/hi2";
import React from 'react';

export default function CatePagination({ totalPages, currentPage, setCurrentPage }) {
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center items-center py-[40px] gap-[20px]">
            <div className="cate-arrow">
                <div className="w-[30px] flex items-center h-[30px] rounded-[100px] border-[#00a7ac] lg:border-[rgba(0,167,172,.2)] border-[1px] ">
                    <HiArrowLongRight className="text-[#00a7ac]  lg:text-[70px] cate-arrow-two" />
                </div>
            </div>
            {[...Array(totalPages)].map((_, index) => (
                <span
                    key={index.toString()}
                    className={`w-[30px] h-[30px] items-center flex justify-center border-[#d9d9d9] border-[1px] ${currentPage === index + 1 ? 'bg-[#00a7ac] text-white rounded-[50px]' : 'hover:bg-[#00a7ac] hover:text-white rounded-[50px]'} `}
                    onClick={() => setCurrentPage(index + 1)}
                >
                    <a href="#">{index + 1}</a>
                </span>
            ))}
            <div className="cate-arrow">
                <div className="w-[30px] flex items-center h-[30px] rounded-[100px] border-[#00a7ac] border-[1px] ">
                    <HiArrowLongRight className="text-[#00a7ac]  lg:text-[70px] cate-arrow-one" />
                </div>
            </div>
        </div>
    );
}
