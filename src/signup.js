import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMobile,FaCity,FaReact } from "react-icons/fa";
import { BsEnvelopeFill,BsEyeFill, BsEyeSlashFill,BsSignpostFill, BsFillPersonFill } from 'react-icons/bs';
import CateBanner from "./components/cateBanner";
import { TbBuildingEstate } from "react-icons/tb";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { IoBookSharp } from "react-icons/io5";
import ReCAPTCHA from "react-google-recaptcha";
import { register } from './redux/slices/authSlice';
import { WithContext as ReactTags } from 'react-tag-input';
import "./cv-form.css";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import { useDispatch } from 'react-redux';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };
    const [password, setPassword] = useState('');
    const [isNewsletterChecked, setIsNewsletterChecked] = useState(false);

    const toggleNewsletterCheckbox = () => {
        setIsNewsletterChecked(!isNewsletterChecked);
    };

    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNumber,setMobileNumber]=useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [profilePic,setProfilePic]=useState("")
const [city,setCity]=useState("")
const [postalCode,setPostalCode]=useState("")
const [state,setState]=useState("")
const [country,setCountry]=useState("")
const [qualification,setQualification]=useState({
    levelOfEducation:'',
    fieldOfStudy:""
})
const [image,setImage]=useState("")
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showPassword);
    };
    const [skills, setSkills] = useState("");
    const [tags, setTags] = React.useState([]);
    const [inputValue, setInputValue] = useState('');
    const dispatch=useDispatch()
    const KeyCodes = {
        comma: 188,
        enter: 13
      };
      const delimiters = [KeyCodes.comma, KeyCodes.enter];


    const handleSubmit =async (e) => {
        e.preventDefault();
        // Implement your sign-up logic here
     if(!name){
toastr.error("Please enter name")
return;
     }else if(!email){
        toastr.error("Please enter email")
        return;
     }else if(!mobileNumber){
        toastr.error("Please enter mobile number")
        return;
     }else if(!city){
        toastr.error("Please enter city")
        return;
     }else if(!state){
        toastr.error("Please enter state")
        return;
     }else if(!country){
        toastr.error("Please enter country")
        return;
     }else if(!postalCode){
        toastr.error("Please enter post code")
        return;
     }else if(!tags){
        toastr.error("Please enter atleast 5 skills")
        return;
     }else if(!qualification.levelOfEducation){
        toastr.error("Please enter level of education")
        return;
     }else if(!qualification.fieldOfStudy){
        toastr.error("Please enter field of study")
        return;
     }else if(!password){
        toastr.error("Please enter password")
        return;
     }else if(!confirmPassword){
        toastr.error("Please confirm password")
        return;
     }else if(password!=confirmPassword){
        toastr.error("Password and comfirm password dont match")
        return;
     }else if(isChecked==false){
        toastr.error("Please accept terms and conditions")
    return; 
    }
 let formdata=new FormData();
 formdata.append('city',city)
 formdata.append('password',password)
 formdata.append('email',email)
 formdata.append('mobile_number',mobileNumber)
 formdata.append('state',state)
 formdata.append('name',name)
 formdata.append('country',country)
 formdata.append('post_code',postalCode)
 let finaltags;
 if (skills) {
     finaltags = skills.split(' ').join(', ');
 }
 

formdata.append('key_skills',finaltags)
let main_qualifications={
    level_of_education:qualification.levelOfEducation,
    field_of_study:qualification.fieldOfStudy
}
formdata.append('level_of_education',main_qualifications.level_of_education)
formdata.append('field_of_study',main_qualifications.field_of_study)
formdata.append('image',image)
let registerRes=await dispatch(register(formdata))
if(register.rejected.match(registerRes)){
    toastr.error(registerRes?.payload?.error)
    console.log(registerRes)
}
if(register.fulfilled.match(registerRes)){
    console.log(registerRes)
    toastr.success("Sucessfully Registered")
    setEmail("")
    setCity("")
    setCountry("")
    setPassword("")
    setConfirmPassword("")
    setMobileNumber("")
    setTags("")
    setName("")
    setPostalCode("")
    setState("")
    setProfilePic(null)
    setImage("")
}

};

    const pfpHandler=(e)=>{
if(e.target.files[0].type.startsWith('image')){
    setImage(e.target.files[0])
    let reader=new FileReader();
    reader.onload=()=>{
    setProfilePic(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
}else{
toastr.error("Please select image only")
}

    }
    const handleDelete = i => {
        setTags(tags?.filter((tag, index) => index !== i));
      };
    
      const handleAddition = tag => {
        setTags([...tags, tag]);
      };

      const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags?.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        setTags(newTags);
      };
    
    return (
        <>
            <CateBanner pageName="SignUp" />
            <div className="max-w-[500px] my-[40px] lg:mx-auto mx-[10px]  p-4 border-[1px] rounded-md bg-white border-[#00a7ac] flex flex-col gap-4">
                <form className='flex flex-col gap-[20px]'>
                <div className='flex justify-center items-center'>
    <div className="flex justify-center items-center w-24 h-24 rounded-full bg-gray-300 cursor-pointer">
        <label htmlFor="fileInput" className="w-full h-full flex flex-col items-center justify-center">
            <input
                id="fileInput"
                className="hidden"
                type="file"
                onChange={pfpHandler}
            />
           {profilePic?<img src={profilePic}></img>: <p className="text-center">Profile Picture</p>}
        </label>
    </div>
</div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-base">Name</p>
                        <div className="input-area flex items-center">
                        <BsFillPersonFill color="#00a7ac" size={20} />

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
          
                    <div className="flex flex-col relative">
                        <p className="font-semibold text-base">Email</p>
                        <div className="input-area flex items-center">
                            <BsEnvelopeFill color="#00a7ac" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col relative">
                        <p className="font-semibold text-base">Mobile Number</p>
                        <div className="input-area flex items-center">
                            <FaMobile color="#00a7ac" size={20} />
                            <input
                                type="tel"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                placeholder="mobile number"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col relative">
                        <p className="font-semibold text-base">City</p>
                        <div className="input-area flex items-center">
                            <FaCity color="#00a7ac" size={20} />
                            <input
                                type="text"
             value={city}
             onChange={(e)=>setCity(e.target.value)}
                                placeholder="City"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col relative">
                        <p className="font-semibold text-base">State</p>
                        <div className="input-area flex items-center">
                            <TbBuildingEstate  color="#00a7ac" size={20} />
                            <input
                                type="text"
                                value={state}
                                onChange={(e)=>setState(e.target.value)}
                                placeholder="State"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col relative">
                        <p className="font-semibold text-base">Country</p>
                        <div className="input-area flex items-center">
                            <LiaFlagUsaSolid color="#00a7ac" size={20} />
                            <input
                                type="text"
                               value={country}
                               onChange={(e)=>setCountry(e.target.value)}
                                placeholder="Country"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col relative">
                        <p className="font-semibold text-base">Post code</p>
                        <div className="input-area flex items-center">
                            <BsSignpostFill color="#00a7ac" size={20} />
                            <input
                                type="text"
                            value={postalCode}
                            onChange={(e)=>setPostalCode(e.target.value)}
                                placeholder="Post code"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col relative">
      <p className="font-semibold text-base mb-2">Skills</p>
      <div className="input-area flex items-center">
        <FaReact color="#00a7ac" size={20} />
       <input value={skills} onChange={(e)=>setSkills(e.target.value)} className="ml-2 outline-none border-b border-gray-400" type="text" placeholder='skills'></input>
      </div>
    </div>
                    <div className="flex flex-col relative">
                        <p className="font-semibold text-base">Qualification</p>
                        <div className="input-area flex items-center">
                            <IoBookSharp color="#00a7ac" size={20} />
                            <input
                                type="text"
                               value={qualification.levelOfEducation}
                               onChange={(e)=>setQualification({
                                ...qualification,
                                levelOfEducation:e.target.value
                               })}
                                placeholder="Level of education"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                        <div className="input-area flex items-center">
                            <IoBookSharp color="#00a7ac" size={20} />
                            <input
                                type="text"
                              value={qualification.fieldOfStudy}
                              onChange={(e)=>setQualification({
                                ...qualification,
                                fieldOfStudy:e.target.value
                              })}
                                placeholder="Field of study"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col relative">
                        <p className="font-semibold text-base">Password</p>
                        <div className="input-area flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="ml-2 outline-none border-b border-gray-400 pr-10"
                            />
                            {showPassword ? (
                                <BsEyeSlashFill
                                    color="#00a7ac"
                                    size={20}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                />
                            ) : (
                                <BsEyeFill
                                    color="#00a7ac"
                                    size={20}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col relative">
                        <p className="font-semibold text-base">Confirm Password</p>
                        <div className="input-area flex items-center">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="ml-2 outline-none border-b border-gray-400 pr-10"
                            />
                            {showConfirmPassword ? (
                                <BsEyeSlashFill
                                    color="#00a7ac"
                                    size={20}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                />
                            ) : (
                                <BsEyeFill
                                    color="#00a7ac"
                                    size={20}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                />
                            )}
                        </div>
                    </div>

                    <ReCAPTCHA
        sitekey="6LdRIr4jAAAAAOR-rtrm0FDj0QG7x2T2-SCo5-Ne"
       
      />
<div className="max-w-3xl w-full bg-white rounded-lg p-8">
            <h1 className="font-bold mb-4">Terms and Conditions</h1>
            <label className="flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={toggleCheckbox}
                    className="hidden"
                />
                <div className="w-8 h-8 border-2 border-gray-300 rounded-md flex items-center justify-center mr-2">
                    {isChecked && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 text-green-600"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    )}
                </div>
                <span className="text-gray-700 text-lg">I agree to the terms and conditions</span>
            </label>
        </div>
        <div className="max-w-3xl w-full bg-white rounded-lg p-8">
            <h1 className="font-bold mb-4">Newsletter</h1>
            <label className="flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={isNewsletterChecked}
                    onChange={toggleNewsletterCheckbox}
                    className="hidden"
                />
                <div className="w-8 h-8 border-2 border-gray-300 rounded-md flex items-center justify-center mr-2">
                    {isNewsletterChecked && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 text-green-600"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    )}
                </div>
                <span className="text-gray-700 text-lg">I would like to receive news</span>
            </label>
        </div>
                    <button onClick={handleSubmit} className="w-full relative h-[50px]  overflow-hidden border border-[#00a7ac] bg-white text-[#00a7ac]  transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-[#00a7ac] hover:before:w-2/4 hover:before:bg-[#00a7ac] hover:after:w-2/4 hover:after:bg-[#00a7ac]"><span class="relative z-10">Sign Up</span></button>

                </form>
                <div className="flex items-center mt-2">
                    <span className="text-sm">Already have an account? </span>
                    <Link to="/signin" className="text-sm" style={{ color: '#00a7ac' }}>Sign In</Link>
                </div>
            </div>
        </>
    );
}
