import CateBanner from "./cateBanner";
import complogo from "../images/app.png"
export default function ChatPage() {
    return (
        <>
            <div className="chat-grid px-10">
                <div className="border-[1px] mx-[10px] rounded-lg border-[#d9d9d9]">
                    <div className="flex justify-center lg:px-[20px] lg:py-[20px] lg:text-[23px] text-[19px] font-semibold">
                        <h1>Message</h1>
                    </div>
                    <div className=".section-one overflow-y-scroll">
                        <div className="flex border-t-[1px] border-[#d9d9d9] py-[20px] px-[15px] items-center gap-[10px]">
                            <div className="">
                                <img src={complogo} alt="" className=" rounded-[50px]" />
                            </div>
                            <div className="flex flex-col">
                                <div className=" text-[17px] font-medium cursor-pointer hover:text-[#00a7ac]">
                                    <p>Company Name</p>
                                </div>
                                <div className="text-white font-semibold w-fit px-[5px] py-[2px] text-[10px] items-center flex justify-center rounded-lg bg-[#00a7ac] ">
                                    <span>Unread message 1</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-t-[1px] border-[#d9d9d9] py-[20px] px-[15px] items-center gap-[10px]">
                            <div className="">
                                <img src={complogo} alt="" className=" rounded-[50px]" />
                            </div>
                            <div className="flex flex-col">
                                <div className=" text-[17px] font-medium cursor-pointer hover:text-[#00a7ac]">
                                    <p>Company Name</p>
                                </div>
                                <div className="text-white font-semibold w-fit px-[5px] py-[2px] text-[10px] items-center flex justify-center rounded-lg bg-[#00a7ac] ">
                                    <span>Unread message 2</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-t-[1px] border-[#d9d9d9] py-[20px] px-[15px] items-center gap-[10px]">
                            <div className="">
                                <img src={complogo} alt="" className=" rounded-[50px]" />
                            </div>
                            <div className="flex flex-col">
                                <div className=" text-[17px] font-medium cursor-pointer hover:text-[#00a7ac]">
                                    <p>Company Name</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-t-[1px] border-[#d9d9d9] py-[20px] px-[15px] items-center gap-[10px]">
                            <div className="">
                                <img src={complogo} alt="" className=" rounded-[50px]" />
                            </div>
                            <div className="flex flex-col">
                                <div className=" text-[17px] font-medium cursor-pointer hover:text-[#00a7ac]">
                                    <p>Company Name</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-t-[1px] border-[#d9d9d9] py-[20px] px-[15px] items-center gap-[10px]">
                            <div className="">
                                <img src={complogo} alt="" className=" rounded-[50px]" />
                            </div>
                            <div className="flex flex-col">
                                <div className=" text-[17px] font-medium cursor-pointer hover:text-[#00a7ac]">
                                    <p>Company Name</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-[1px] rounded-lg border-[#d9d9d9]">
                    <div className="flex border-b-[1px] border-[#d9d9d9] py-[20px] px-[15px] items-center gap-[10px]">
                        <div className="">
                            <img src={complogo} alt="" className=" rounded-[50px]" />
                        </div>
                        <div className="flex flex-col">
                            <div className=" text-[17px] font-medium cursor-pointer hover:text-[#00a7ac]">
                                <p>Company Name</p>
                            </div>
                            <div className="text-white font-semibold w-fit px-[5px] py-[2px] text-[10px] items-center flex justify-center rounded-lg bg-[#00a7ac] ">
                                <span>TAG-The Alpha Group</span>
                            </div>
                        </div>
                    </div>
                    <div className=" overflow-y-scroll">
                          
                    </div>
                </div>
            </div>
        </>
    );
}