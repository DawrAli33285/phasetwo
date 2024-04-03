import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import "../cv-form.css"
import { BiErrorCircle } from "react-icons/bi";
import { BsGlobe, BsPatchCheck } from "react-icons/bs";
import { GiGraduateCap } from "react-icons/gi";
import {useDispatch} from 'react-redux'
import { getProfile, updateProfile } from '../redux/slices/authSlice';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';


import { BsFillPersonFill, BsEnvelopeFill, BsPhoneFill, BsLink45Deg, BsCalendar, BsBriefcase } from 'react-icons/bs';
import profile from "../images/profilepicker.png"
export default function UserProfile() {
    const [certificateDate, setCertificateDate] = useState('');
    const [skills, setSkills] = useState('');
    const [skillTags, setSkillTags] = useState([]);
    const [image, setImage] = useState(null);
    const [qualification, setQualification] = useState('');
    const [cv,setCV]=React.useState("")
    const dispatch=useDispatch()
    const [state,setState]=React.useState({
        name:'',
        profile_photo:'',
        country:'',
        state:'',
        city:'',
        post_code:'',
        field_of_study:'',
        level_of_education:'',
        main_qualifications:[{
            field_of_study:'',
            level_of_education:''

        }],
        field_of_study:'',
        email:'',
        password:'',
        mobile_number:'',
        cv:'',
        key_skills:[]
    })

    const handleQualificationChange = (event) => {
        setQualification(event.target.value);
    };
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        };

        reader.readAsDataURL(file);
        setState({
            ...state,
            profile_photo:file
        })
    }, []);

    const handleSkillKeyPress = (e) => {
        if (e.key === 'Enter' && skills.trim() !== '') {
            setSkillTags([...skillTags, skills.trim()]);
            setSkills('');
        }
    };

    const removeSkillTag = (index) => {
        const newSkillTags = [...skillTags];
        newSkillTags.splice(index, 1);
        setSkillTags(newSkillTags);
    };
    React.useEffect(()=>{
fetchProfile();
    },[])
    const fetchProfile=async()=>{
        let fetchprofileres=await dispatch(getProfile())
        if(getProfile.rejected.match(fetchprofileres)){
toastr.error(fetchprofileres?.payload?.error)
        }
        if(getProfile.fulfilled.match(fetchprofileres)){
            console.log("fetchprofileres")
            console.log(fetchprofileres)
            let data=fetchprofileres?.payload?.user
            setState({
city:data?.city,
country:data?.country,
email:data?.email,
key_skills:data?.key_skills,
main_qualifications:[{
    field_of_study:data?.main_qualifications[0]?.field_of_study,
    level_of_education:data?.main_qualifications[0]?.level_of_education


}],
mobile_number:data?.mobile_number,
name:data?.name,
post_code:data?.post_code,
profile_photo:data?.profile_photo,
state:data?.state,
password:data.password,
cv:data?.cv
})
setCV(data?.cv)
let tempSkillTags = [];
data?.key_skills[0]?.split(',')?.map((val) => {
    tempSkillTags.push(val);
});
setSkillTags(tempSkillTags);
console.log('main')
console.log(data?.main_qualifications[0])

        }
    }
    const downloadCV = async () => {
        const cloudinaryUrl = state?.cv;
        if (cloudinaryUrl) {
            try {
                const response = await fetch(cloudinaryUrl);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'file';
                link.click();
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        } else {
            console.error('Cloudinary URL is undefined');
        }
    };
const updatenow=async(e)=>{
    e.preventDefault();
    console.log(state.main_qualifications)
    console.log('main updatenowres')
let formdata=new FormData();
formdata.append('name',state.name)
formdata.append('password',state.password)
formdata.append('email',state.email)
formdata.append('country',state.country)
formdata.append('state',state.state)
formdata.append('city',state.city)
formdata.append('post_code',state.post_code)
formdata.append('mobile_number',state.mobile_number)
let tags=skillTags.join(',')
formdata.append('key_skills',[tags])
formdata.append('level_of_education',state?.main_qualifications[0]?.level_of_education)
formdata.append('field_of_study',state?.main_qualifications[0]?.field_of_study)
formdata.append('profile_photo',state.profile_photo)
formdata.append('cv',cv)
let updateres=await dispatch(updateProfile(formdata))
if(updateProfile.rejected.match(updateres)){
    toastr.error(updateres?.payload?.error)
    console.log(updateres)
}
if(updateProfile.fulfilled.match(updateres)){
    toastr.success("Updated sucessfully")
    window.location.reload(true)
    console.log(updateres)
}

}

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });
    return (
        <div className=' px-[20px]'>
            <div className='p-[20px] border-t-[4px] rounded-md bg-white border-[#00a7ac] flex flex-col gap-[20px]'>
                <h2 className='text-center text-[32px] font-bold'>Basic Information Form</h2>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-[20px]'>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-[14px]'>Name*</p>
                        <div className="input-area gap-[10px]">
                            <BsFillPersonFill color="#00a7ac" size={20} />
                            <input onChange={(e)=>setState({
                                ...state,
                                name:e.target.value
                            })} value={state?.name?.split(' ')[0]} type="text" id="firstName" name="firstName" placeholder="Name" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-[14px]'>Password*</p>
                        <div className="input-area gap-[10px]">
                            <BsFillPersonFill color="#00a7ac" size={20} />
                            <input onChange={(e)=>setState({
                                ...state,
                                password:e.target.value
                            })} value={state.password} type="Password" id="Password" name="Password" placeholder="Password" />
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
                                    <img src={state.profile_photo} alt="" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-[20px]'>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-[14px]'>Country*</p>
                        <div className="input-area gap-[10px]">
                            <BsBriefcase color="#00a7ac" size={20} />
                            <input onChange={(e)=>setState({
                                ...state,
                                country:e.target.value
                            })} value={state.country} type="text" id="Country" name="Country" placeholder="Country Name" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-[14px]'>State*</p>
                        <div className="input-area gap-[10px]">
                            <BiErrorCircle color="#00a7ac" size={20} />
                            <input onChange={(e)=>setState({
                                ...state,
                                state:e.target.value
                            })} value={state?.state} type="text" id="State" name="State" placeholder="State" />
                        </div>
                    </div>
                </div>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-[20px]'>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-[14px]'>City*</p>
                        <div className="input-area gap-[10px]">
                            <BsPatchCheck color="#00a7ac" size={20} />
                            <input onChange={(e)=>setState({
                                ...state,
                                city:e.target.value
                            })} value={state?.city} type="text" id="City" name="City" placeholder="City" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-[14px]'>Postal Code*</p>
                        <div className="input-area gap-[10px]">
                            <BsPatchCheck color="#00a7ac" size={20} />
                            <input onChange={(e)=>setState({
                                ...state,
                                post_code:e.target.value
                            })} value={state?.post_code} type="text" id="PostalCode" name="PostalCode" placeholder="Postal Code" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-[14px]'>Qualification*</p>
                        <div className="input-area gap-[10px]">
                            <GiGraduateCap color="#00a7ac" size={20} />
                            <input 
  onChange={(e) => setState({
    ...state,
    level_of_education:e.target.value
  })} 
  value={state?.main_qualifications[0]?.level_of_education} 
  type="text" 
  id="Field" 
  name="Field" 
  placeholder="Level of Education" 
/>

                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-[14px]'>Field Of Study*</p>
                        <div className="input-area gap-[10px]">
                            <BsPatchCheck color="#00a7ac" size={20} />
                            <input 
onChange={(e)=>setState({
    ...state,
    field_of_study:e.target.value
})}
  value={state?.main_qualifications[0]?.field_of_study} 
  type="text" 
  id="Field" 
  name="Field" 
  placeholder="Field Of Study" 
/>
                        </div>
                    </div>
                </div>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-[20px]'>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-[14px]'>Email*</p>
                        <div className="input-area gap-[10px]">
                            <BsEnvelopeFill color="#00a7ac" size={20} />
                            <input onChange={(e)=>setState({
                                ...state,
                                email:e.target.value
                            })} value={state?.email} type="email" id="email" name="email" placeholder="Email" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-[14px]'>Phone*</p>
                        <div className="input-area gap-[10px]">
                            <BsPhoneFill color="#00a7ac" size={20} />
                            <input onChange={(e)=>setState({
                                ...state,
                                mobile_number:e.target.value
                            })} value={state?.mobile_number} type="phone" id="phone" name="phone" placeholder="Phone Number" />
                        </div>
                    </div>
                </div>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-[20px]'>
                <div className='flex flex-col'>
                    <p className='font-semibold text-base'>Upload Cv*</p>
                    <div className="input-area">
                       {state.cv!=="Example"?<div>
                        <input
                        
                        onChange={(e)=>setCV(e.target.files[0])}
                            type="File"
                            id="UploadCv"
                            name="UploadCv"
                            placeholder="Upload Cv"
                        />
                        <button onClick={downloadCV}>Download CV</button>
                       </div>:<input
                      
                        onChange={(e)=>setCV(e.target.files[0])}
                            type="File"
                            id="UploadCv"
                            name="UploadCv"
                            placeholder="Upload Cv"
                        />}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <p className='font-semibold text-base'>Skills*</p>
                    <div className="input-area w-full flex gap-[5px] h-[30px]">
                        {skillTags.map((tag, index) => (
                            <div key={index} className="tag bg-[#00a7ac] text-white relative px-[8px] rounded-md flex items-center justify-center  h-[30px]">
                                {tag}
                                <button
                                    className="absolute top-[-2px] right-0 text-[12px]"
                                    onClick={() => removeSkillTag(index)}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            placeholder="Skills"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            onKeyPress={handleSkillKeyPress}
                        />
                    </div>
                </div>
                </div>
                <div className='flex justify-end'>
                    <button onClick={updatenow} className="relative px-[10px] h-[50px] overflow-hidden border border-[#00a7ac] bg-white text-[#00a7ac]  transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-[#00a7ac] hover:before:w-2/4 hover:before:bg-[#00a7ac] hover:after:w-2/4 hover:after:bg-[#00a7ac]"><span class="relative z-10">
                        Update Profile</span></button>
                </div>
            </div>
        </div>
    );
};

