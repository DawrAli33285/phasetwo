import logo from "../images/header-logo.svg"
import { FiBell } from 'react-icons/fi';
import { RiAccountCircleLine } from "react-icons/ri";
import { AiOutlineClose } from 'react-icons/ai';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";
import "../headerDrawer.css"
import { useState } from "react";
import { FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { store } from "../redux/store/storenew";
import { useNavigate } from "react-router-dom";
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const signuppage = () => {
        window.location.href = "/signin"
    }
    const navigate=useNavigate();
    const anchorstyle = "text-[17px] hover:text-[#00A7AC] lg:hover:bg-transparent hover:bg-[#63caef] rounded-md lg:p-[0px] p-[6px] hover:text-white hover:lg:text-black"
    return (
        <>
            <div className=" relative w-full flex justify-between px-[7%] py-[20px] ">
                <a href="/" className=" w-[120px]">
                    <img src={logo} alt="img" />
                </a>
                <div className="hidden lg:flex py-34px px-[15px] items-center gap-[30px]">
                    <Link className={anchorstyle} to="/">Home</Link>
                    <Link className={anchorstyle} to="/Job-Category">Job Category</Link>
                    <Link className={anchorstyle} to="/Job-Listing">Job Listing</Link>
                    <Link className={anchorstyle} to="Create-Cv">Create Resume</Link>
                    <Link className={anchorstyle} to="/Contact">Contact</Link>
                </div>
                <div className={`lg:hidden z-[999] flex flex-col py-34px px-[15px] menu-drawer gap-[20px] pt-[50px] ${isMenuOpen ? 'open' : ''}`}>
                    <div className="absolute top-3 right-3" onClick={toggleMenu}>
                        <AiOutlineClose />
                    </div>
                    <Link className={anchorstyle} to="/">Home</Link>
                    <Link className={anchorstyle} to="/Job-Category">Job Category</Link>
                    <Link className={anchorstyle} to="/Job-Listing">Job Listing</Link>
                    <Link className={anchorstyle} to="Create-Cv">Create Resume</Link>
                    <Link className={anchorstyle} to="/Contact">Contact</Link>
                 {store.getState()?.authSlice?.user?<>
                    <Link className={anchorstyle} to="/UserProfile">Profile</Link>
                    <Link className={anchorstyle} to="/Message">Message</Link>
                    </>:<button onClick={signuppage} className="w-[150px] relative py-[9px] px-[28px] overflow-hidden border border-[#00A7AC] text-[#00A7AC] shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#00A7AC] before:duration-300 before:ease-out hover:text-white hover:shadow-[#00A7AC] hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                        <span className="relative z-10 flex items-center gap-[5px]"><RiAccountCircleLine /> Sign In</span>
                    </button>}
                </div>
                <div className="flex gap-[25px] items-center">
                    <span className="h-[34px] w-[34px] bg-[#eff1f0] rounded-full flex justify-center items-center">

                        <FiBell className="h-[16px] w-[16px] text-[#00A7AC]" />
                    </span>
                    {store.getState()?.authSlice?.user?<>
                        <FaRegUserCircle onClick={()=>navigate('/UserProfile')} />
                        <FaMessage onClick={()=>navigate('/Message')} />
                    </>:<button onClick={signuppage} className="w-[150px] relative py-[9px] px-[28px] overflow-hidden border border-[#00A7AC] text-[#00A7AC] shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#00A7AC] before:duration-300 before:ease-out hover:text-white hover:shadow-[#00A7AC] hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                        <span className="relative z-10 flex items-center gap-[5px]"><RiAccountCircleLine /> Sign In</span>
                    </button>}
                    <div className="burger lg:hidden block" onClick={toggleMenu}>
                    <div className="burger lg:hidden" onClick={toggleMenu}>
                        {isMenuOpen ? <AiOutlineClose /> : <RxHamburgerMenu />}

                    </div>
                </div>
            </div>
            </div>

        </>
    )
}