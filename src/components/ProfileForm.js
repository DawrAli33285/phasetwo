import React, { useState } from 'react';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
export default function ProfileForm({state,setState,setActiveStep,skills,skillTags,setSkills,setSkillTags,hobbies,setHobbies,hobbyTags,setHobbyTags}) {
    const [certificateName, setCertificateName] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [certificateDate, setCertificateDate] = useState('');

    const handleSkillKeyPress = (e) => {
        if (e.key === 'Enter' && skills.trim() !== '') {
            setSkillTags([...skillTags, skills.trim()]);
            setSkills('');
        }
    };

    const handleHobbyKeyPress = (e) => {
        if (e.key === 'Enter' && hobbies.trim() !== '') {
            setHobbyTags([...hobbyTags, hobbies.trim()]);
            setHobbies('');
        }
    };

    const removeSkillTag = (index) => {
        const newSkillTags = [...skillTags];
        newSkillTags.splice(index, 1);
        setSkillTags(newSkillTags);
    };

    const removeHobbyTag = (index) => {
        const newHobbyTags = [...hobbyTags];
        newHobbyTags.splice(index, 1);
        setHobbyTags(newHobbyTags);
    };

    const goToNext=()=>{
if(state.certificate_name.length==0){
toastr.error("Please enter certificate name")
return;
}else if(state.organization_name.length==0){
    toastr.error("Please enter organization name")
    return
}else if(state.certification_date.length==0){
    toastr.error("Please enter certification date")
    return
}else if(skillTags.length==0){
    toastr.error("Please enter skills")
    return
}else if(hobbyTags.length==0){
    toastr.error("Please enter hobbies")
    return
}
setActiveStep(2)
    }
    return (
        <div className='p-4 border-t-4 rounded-md bg-white border-[#00a7ac] flex flex-col gap-4'>
            <h2 className='text-center text-2xl font-bold'>Profile</h2>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                <div className='flex flex-col'>
                    <p className='font-semibold text-base'>Certificate Name*</p>
                    <div className="input-area">
                        <input
                            type="text"
                            id="certificateName"
                            name="certificateName"
                            placeholder="Certificate Name"
                            value={state.certificate_name}
                            onChange={(e) => setState({
                                ...state,
                                certificate_name:e.target.value
                            })}
                        />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <p className='font-semibold text-base'>Organization Name*</p>
                    <div className="input-area">
                        <input
                            type="text"
                            id="organizationName"
                            name="organizationName"
                            placeholder="Organization Name"
                            value={state.organization_name}
                            onChange={(e) => setState({
                                ...state,
                                organization_name:e.target.value
                            })}
                        />
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                <div className='flex flex-col'>
                    <p className='font-semibold text-base'>Certificate Date*</p>
                    <div className="input-area">
                        <input
                            type="date"
                            id="certificateDate"
                            name="certificateDate"
                            placeholder="Certificate Date"
                            value={state.certification_date}
                            onChange={(e) => setState({
                                ...state,
                                certification_date:e.target.value
                            })}
                        />
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

            <div className='flex flex-col'>
                <p className='font-semibold text-base'>Hobbies</p>
                <div className="input-area w-full flex gap-[5px] h-[30px]">
                    {hobbyTags.map((tag, index) => (
                        <div key={index} className="tag bg-[#00a7ac] text-white relative px-[8px] rounded-md flex items-center justify-center  h-[30px]">
                            {tag}
                            <button
                                className="absolute top-[-2px] right-0 text-[12px]"
                                onClick={() => removeHobbyTag(index)}
                            >
                                x
                            </button>
                        </div>
                    ))}
                    <input
                        type="text"
                        id="hobbies"
                        name="hobbies"
                        placeholder="Hobbies"
                        value={hobbies}
                        onChange={(e) => setHobbies(e.target.value)}
                        onKeyPress={handleHobbyKeyPress}
                    />
                </div>

            </div>
            <div className='flex justify-end'>
                <button onClick={goToNext} className="relative px-[10px] h-[50px] overflow-hidden border border-[#00a7ac] bg-white text-[#00a7ac]  transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-[#00a7ac] hover:before:w-2/4 hover:before:bg-[#00a7ac] hover:after:w-2/4 hover:after:bg-[#00a7ac]"><span class="relative z-10">
                    Update Resume</span></button>
            </div>
        </div>
    );
}
