import React, { useState } from 'react';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
export default function EducationForm({educations,setEducations,setActiveStep}) {
   
    const handleAddEducation = () => {
        setEducations([...educations, { institution: '', degree: '', fieldOfStudy: '', graduationYear: '' }]);
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const list = [...educations];
        list[index][name] = value;
        setEducations(list);
    };

    const handleRemoveEducation = (index) => {
        const list = [...educations];
        list.splice(index, 1);
        setEducations(list);
    };

    const goToNext=()=>{
if(educations[0]?.institution?.length==0){
toastr.error("Please add institute")
return
}else if(educations[0]?.degree?.length==0){
    toastr.error("Please enter degree")
    return
}else if(educations[0]?.fieldOfStudy?.length==0){
    toastr.error("Please enter field of study")
    return
}else if(educations[0]?.graduationYear?.length==0){
    toastr.error("Please enter graduation year")
    return
}
setActiveStep(3)

    }

    return (
        <div className="p-4 border-t-4 rounded-md bg-white border-[#00a7ac] flex flex-col gap-4">
            <h2 className="text-center text-2xl font-bold">Education</h2>
            {educations.map((education, index) => (
                <div key={index} className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    <div className="flex flex-col">
                        <p className="font-semibold text-base">Institution*</p>
                        <div className="input-area flex items-center">
                            <input
                                type="text"
                                name="institution"
                                value={education.institution}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Institution"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-base">Degree*</p>
                        <div className="input-area flex items-center">
                            <input
                                type="text"
                                name="degree"
                                value={education.degree}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Degree"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-base">Field of Study*</p>
                        <div className="input-area flex items-center">
                            <input
                                type="text"
                                name="fieldOfStudy"
                                value={education.fieldOfStudy}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Field of Study"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-base">Graduation Year*</p>
                        <div className="input-area flex items-center">
                            <input
                                type="text"
                                name="graduationYear"
                                value={education.graduationYear}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Graduation Year"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div>
                        <button onClick={() => handleRemoveEducation(index)} className="text-[#00a7ac] underline">Remove</button>
                    </div>
                </div>
            ))}
            <button onClick={handleAddEducation} className="text-[#00a7ac] underline">+ Add Education</button>
            <div className='flex justify-end'>
                <button onClick={goToNext}  className="relative px-[10px] h-[50px] overflow-hidden border border-[#00a7ac] bg-white text-[#00a7ac]  transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-[#00a7ac] hover:before:w-2/4 hover:before:bg-[#00a7ac] hover:after:w-2/4 hover:after:bg-[#00a7ac]"><span class="relative z-10">
                    Update Resume</span></button>
            </div>
        </div>
    );
}
