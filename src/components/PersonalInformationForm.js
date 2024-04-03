import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';

export default function PersonalInformationForm({educations,skillTags,hobbyTags,experiences,setExperiences,state,setState,setActiveStep}) {
const navigate=useNavigate()
    const handleAddExperience = () => {
        setExperiences([...experiences, { companyName: '', designation: '', startingPeriod: '', endingPeriod: '', continuing: false, responsibility: '' }]);
    };

    const handleInputChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const list = [...experiences];
        if (type === 'checkbox') {
            list[index][name] = checked;
        } else {
            list[index][name] = value;
        }
        setExperiences(list);
    };

    const handleRemoveExperience = (index) => {
        const list = [...experiences];
        list.splice(index, 1);
        setExperiences(list);
    };

const generate=()=>{
 if(experiences[0]?.companyName?.length==0){
    toastr.error("Please enter comapny name")
    return
 }else if(experiences[0]?.designation?.length==0){
    toastr.error("Please enter designation")
    return
 }else if(experiences[0]?.startingPeriod?.length==0){
    toastr.error("Please enter starting period")
    return
 }else if(experiences[0]?.endingPeriod?.length==0){
    toastr.error("Please enter ending period")
    return
 }else if(experiences[0]?.continuing?.length==0){
    toastr.error("Please enter continuing")
    return;
 }else if(experiences[0]?.responsibility?.length==0){
    toastr.error("Please enter experiences")
    return
 }

navigate(`/Your-Cv?name=${state.first_name+' '+state.last_name}&image=${state.image}&current_job=${state.current_job}&designation=${state.designation}&experience=${state.experience}&qualification=${state.qualification}&email=${state.email}&phone_number=${state.phone_number}&website=${state.website}&languages=${state.languages}&carrer_objective=${state.carrer_objective}&certificate_name=${state.certificate_name}&organization_name=${state.organization_name}&certification_date=${state. certification_date}&skills=${JSON.stringify(skillTags)}&hobbies=${JSON.stringify(hobbyTags)}&educations=${JSON.stringify(educations)}&experiences=${JSON.stringify(experiences)}&description=${state.description}`)
}


    return (
        <div className="p-4 border-t-4 rounded-md bg-white border-[#00a7ac] flex flex-col gap-4">
            <h2 className="text-center text-2xl font-bold">Work Experience</h2>
            {experiences?.map((experience, index) => (
                <div key={index} className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    <div className="flex flex-col">
                        <p className="font-semibold text-base">Company Name*</p>
                        <div className="input-area flex items-center">
                            <input
                                type="text"
                                name="companyName"
                                value={experience.companyName}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Company Name"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-base">Designation*</p>
                        <div className="input-area flex items-center">
                            <input
                                type="text"
                                name="designation"
                                value={experience.designation}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Designation"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-base">Starting Period*</p>
                        <div className="input-area flex items-center">
                            <input
                                type="date"
                                name="startingPeriod"
                                value={experience.startingPeriod}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Starting Period"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-base">Ending Period*</p>
                        <div className="input-area flex items-center">
                            <input
                                type="date"
                                name="endingPeriod"
                                value={experience.endingPeriod}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Ending Period"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <input
                            type="checkbox"
                            name="continuing"
                            checked={experience.continuing}
                            onChange={(e) => handleInputChange(index, e)}
                            className="ml-2 outline-none border-b border-gray-400"
                        /><p className=" text-base">Continuing Working Here</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-base">Responsibility**</p>
                        <div className="input-area flex items-center">
                            <input
                                type="text"
                                name="responsibility"
                                value={experience.responsibility}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Responsibility"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div>
                        <button onClick={() => handleRemoveExperience(index)} className="text-[#00a7ac]">Remove</button>
                    </div>
                </div>
            ))}
            <button onClick={handleAddExperience} className="text-[#00a7ac]">+ Add Experience</button>
            <div className='flex justify-end'>
             <button onClick={generate} className="relative px-[10px] h-[50px] overflow-hidden border border-[#00a7ac] bg-white text-[#00a7ac]  transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-[#00a7ac] hover:before:w-2/4 hover:before:bg-[#00a7ac] hover:after:w-2/4 hover:after:bg-[#00a7ac]"><span class="relative z-10">Genrate Resume</span></button>
            </div>
        </div>
    );
}
