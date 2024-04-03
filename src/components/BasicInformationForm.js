import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import "../cv-form.css"
import { BiErrorCircle } from "react-icons/bi";
import { BsGlobe, BsPatchCheck } from "react-icons/bs";
import { LiaLanguageSolid } from "react-icons/lia";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import { useDispatch } from 'react-redux';
import { GiGraduateCap } from "react-icons/gi";
import { getPicLink } from '../redux/slices/jobsSlice';
import { BsFillPersonFill, BsEnvelopeFill, BsPhoneFill, BsLink45Deg, BsCalendar, BsBriefcase } from 'react-icons/bs';
import profile from "../images/profilepicker.png"
export default function BasicInformationForm({state,setState,setActiveStep}) {
    const [image, setImage] = useState(null);
    const [qualification, setQualification] = useState('');

const dispatch=useDispatch()
    const handleQualificationChange = (event) => {
        setQualification(event.target.value);
    };
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setState({
            ...state,
            image:file
        })
        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        };

        reader.readAsDataURL(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

const goToNext=async()=>{
if(state.first_name.length==0){
    toastr.error("Please insert first name")
    return
}else if(state.last_name.length==0){
    toastr.error("Please insert last name")
    return
}else if(!state.image){
    toastr.error("Please seelect image")
    return
}else if(state.experience.length==0){
    toastr.error("Please insert your experience")
    return
}else if(state.qualification.length==0){
    toastr.error("Please insert qualification")
    return
}else if(state.email.length==0){
    toastr.error("Please add your email")
     return
}else if(state.languages.length==0){
    toastr.error("Please insert languages")
     return
}else if(state.carrer_objective.length==0){
    toastr.error("Please insert carrer objectives")
     return
}
let formdata=new FormData();
formdata.append('image',state.image)
let picres=await dispatch(getPicLink(formdata))
if(getPicLink.rejected.match(picres)){
toastr.error(picres.payload.error)
}
if(getPicLink.fulfilled.match(picres)){
    setState({
        ...state,
        image:picres.payload.link.url
    })
    setActiveStep(1)
}


}

    return (
        <div className='p-[20px] border-t-[4px] rounded-md bg-white border-[#00a7ac] flex flex-col gap-[20px]'>
            <h2 className='text-center text-[32px] font-bold'>Basic Information Form</h2>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-[20px]'>
                <div className='flex flex-col'>
                    <p className='font-semibold text-[14px]'>First Name*</p>
                    <div className="input-area gap-[10px]">
                        <BsFillPersonFill color="#00a7ac" size={20} />
                        <input value={state.first_name} onChange={(e)=>setState({
                            ...state,
                            first_name:e.target.value
                        })} type="text" id="firstName" name="firstName" placeholder="First Name" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <p className='font-semibold text-[14px]'>Last Name*</p>
                    <div className="input-area gap-[10px]">
                        <BsFillPersonFill color="#00a7ac" size={20} />
                        <input value={state.last_name} onChange={(e)=>setState({...state,
                        last_name:e.target.value
                        })} type="text" id="lastName" name="lastName" placeholder="Last Name" />
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center my-[40px]'>
                <div className=" hover:cursor-pointer w-[130px] h-[130px] rounded-md overflow-hidden flex justify-center items-center">
                    <div {...getRootProps()} className="dropzone drag-area" title="Drag and drop an image here">
                        <input {...getInputProps()} id="imagePicker" name="imagePicker" accept="image/*" style={{ display: 'none' }} />
                        {image ? (
                            <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        ) : (
                            <div className='w-[100%] relative hover:cursor-pointer'>
                                <p className='image-picker-text absolute bottom-5 w-full'>Upload Image</p>
                                <img src={profile} alt="" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-[20px]'>
                <div className='flex flex-col'>
                    <p className='font-semibold text-[14px]'>Current Job*</p>
                    <div className="input-area gap-[10px]">
                        <BsBriefcase color="#00a7ac" size={20} />
                        <input value={state.current_job} onChange={(e)=>setState({
                            ...state,
                            current_job:e.target.value
                        })} type="text" id="currentJob" name="currentJob" placeholder="Current Job" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <p className='font-semibold text-[14px]'>Designation*</p>
                    <div className="input-area gap-[10px]">
                        <BiErrorCircle color="#00a7ac" size={20} />
                        <input value={state.designation} onChange={(e)=>setState({
                            ...state,
                            designation:e.target.value
                        })} type="text" id="designation" name="designation" placeholder="Designation" />
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-[20px]'>
                <div className='flex flex-col'>
                    <p className='font-semibold text-[14px]'>Year of experience*</p>
                    <div className="input-area gap-[10px]">
                        <BsPatchCheck color="#00a7ac" size={20} />
                        <input value={state.experience} onChange={(e)=>setState({
                            ...state,
                            experience:e.target.value
                        })} type="text" id="experience" name="experience" placeholder="3.5 Years" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <p className='font-semibold text-[14px]'>Qualification*</p>
                    <div className="input-area gap-[10px]">
                        <GiGraduateCap color="#00a7ac" size={20} />
                        <select id="qualification" name="qualification" value={state.qualification} onChange={(e)=>setState({
                            ...state,
                            qualification:e.target.value
                        })} className="select1">
                            <option value="">Select Qualification</option>
                            <option value="Bachelor Degree in CSE">Bachelor Degree in CSE</option>
                            <option value="IGCSE">IGCSE</option>
                            <option value="AS">AS</option>
                            <option value="A Level">A Level</option>
                            <option value="Matriculated">Matriculated</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-[20px]'>
                <div className='flex flex-col'>
                    <p className='font-semibold text-[14px]'>Email*</p>
                    <div className="input-area gap-[10px]">
                        <BsEnvelopeFill color="#00a7ac" size={20} />
                        <input value={state.email} onChange={(e)=>setState({
                            ...state,
                            email:e.target.value
                        })} type="email" id="email" name="email" placeholder="Email" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <p className='font-semibold text-[14px]'>Phone*</p>
                    <div className="input-area gap-[10px]">
                        <BsPhoneFill color="#00a7ac" size={20} />
                        <input value={state.phone_number} onChange={(e)=>setState({
                            ...state,
                            phone_number:e.target.value
                        })} type="phone" id="phone" name="phone" placeholder="Phone Number" />
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-[20px]'>
                <div className='flex flex-col'>
                    <p className='font-semibold text-[14px]'>Website Link*</p>
                    <div className="input-area gap-[10px]">
                        <BsGlobe color="#00a7ac" size={20} />
                        <input value={state.website} onChange={(e)=>setState({
                            ...state,
                            website:e.target.value
                        })} type="text" id="weblink" name="weblink" placeholder="Website Link" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <p className='font-semibold text-[14px]'>Languages*</p>
                    <div className="input-area gap-[10px]">
                        <LiaLanguageSolid color="#00a7ac" size={20} />
                        <input value={state.languages} onChange={(e)=>setState({
                            ...state,
                            languages:e.target.value
                        })} type="text" id="languages" name="languages" placeholder="English,Spanish" />
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <p className='font-semibold text-[14px]'>Career Objective*</p>

                <textarea value={state.carrer_objective} onChange={(e)=>setState({
                    ...state,
                    carrer_objective:e.target.value
                })} className='textarea w-full' rows={6} placeholder="Objectives"></textarea>

            </div>

            <div className='flex flex-col'>
                <p className='font-semibold text-[14px]'>Description*</p>

                <textarea value={state.description} onChange={(e)=>setState({
                    ...state,
                    description:e.target.value
                })} className='textarea w-full' rows={6} placeholder="Objectives"></textarea>

            </div>
            <div className='flex justify-end'>
                <button onClick={goToNext} className="relative px-[10px] h-[50px] overflow-hidden border border-[#00a7ac] bg-white text-[#00a7ac]  transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-[#00a7ac] hover:before:w-2/4 hover:before:bg-[#00a7ac] hover:after:w-2/4 hover:after:bg-[#00a7ac]"><span class="relative z-10">
                    Update Resume</span></button>
            </div>
        </div>
    );
}
