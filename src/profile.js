import React, { useEffect, useState } from 'react';
import UserProfile from './components/userprofile';
import BookMark from './components/bookMark';
import PricePlan from './components/pricePlan';
import { FaDollarSign } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { FaBookmark,FaKey  } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import './Profile.css';
import { GrView } from "react-icons/gr";
import { Link } from 'react-router-dom';
import {persistor} from './redux/store/storenew'

export default function Profile() {
    
    const [activeComponent, setActiveComponent] = useState(<UserProfile />);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Component to be active by default when the page loads
        handleItemClick(<UserProfile />, 0);
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    const handleItemClick =async(component, index) => {
        setActiveComponent(component);
        setActiveIndex(index);
        if (component === 'Logout') {
            console.log('Logout');
            await persistor.purge();
            window.location.href = '/';
        } else {
            setActiveComponent(component);
        }
    };

    return (
        <div className="flex bg-[#f8f8f8] py-10 justify-center flex-col md:flex-row profile">
            <div className="md:w-[20%] w-full bg-white text-[#595959] h-auto md:h-fit">
                <ul className="py-10 w-full">
                    <li className={`cursor-pointer hover:bg-[#20c99610] text-lg font-[600] gap-2 hover:text-black flex transition duration-300 ease-in-out p-3 ${activeIndex === 0 ? 'bg-[#00A7AC] text-white' : ''}`} onClick={() => handleItemClick(<UserProfile />, 0)}>
                        <p className='flex items-center gap-3 px-[30px]'>
                            <span><CgProfile className='text-[19px]' /></span>Profile
                        </p>
                    </li>
                    <li className={`cursor-pointer hover:bg-[#20c99610] text-lg font-[600] gap-2 hover:text-black flex transition duration-300 ease-in-out p-3 ${activeIndex === 1 ? 'bg-[#00A7AC] text-white' : ''}`} onClick={() => handleItemClick(<BookMark />, 1)}>
                        <p className='flex items-center gap-3 px-[30px]'><span><FaBookmark className='text-[15px]'/></span>Bookmarks</p>
                    </li>
                    
                 
                    <li className={`cursor-pointer hover:bg-[#20c99610] text-lg font-[600] gap-2 hover:text-black flex transition duration-300 ease-in-out p-3 ${activeIndex === 4 ? 'bg-[#00A7AC] text-white' : ''}`} onClick={() => handleItemClick(<PricePlan />, 2)}>
                        <p className='flex items-center gap-3 px-[30px]'><FaDollarSign />Price & Plans</p>
                    </li>
                    <li className={`cursor-pointer hover:bg-[#20c99610] text-lg font-[600] gap-2 hover:text-black flex transition duration-300 ease-in-out p-3 ${activeIndex === 5 ? 'bg-[#00A7AC] text-white' : ''}`} onClick={() => handleItemClick("Logout", 3)}>
                        <p className='flex items-center gap-3 px-[30px]'><FaKey />Logout</p>
                    </li>
                </ul>
            </div>
            <div className="md:w-3/4 w-full py-[10px] md:py-0">
                {activeComponent}
            </div>
        </div>
    );
}
