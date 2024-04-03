import React, { useState } from 'react';
import BasicInformationForm from './components/BasicInformationForm';
import ProfileForm from './components/ProfileForm';
import EducationForm from './components/EducationForm';
import PersonalInformationForm from './components/PersonalInformationForm';

export default function CreateResume() {
  const [activeStep, setActiveStep] = useState(0);
  const [state,setState]=useState({
    first_name:'',
    last_name:'',
    image:'',
    current_job:'',
    designation:'',
    experience:'',
    qualification:'',
    email:'',
    phone_number:'',
    website:'',
    languages:'',
    carrer_objective:'',
    description:'',
    certificate_name:'',
    organization_name:'',
    certification_date:'',
})
const [skills, setSkills] = useState('');
const [hobbies, setHobbies] = useState('');
const [skillTags, setSkillTags] = useState([]);
const [hobbyTags, setHobbyTags] = useState([]);
const [educations, setEducations] = useState([]);
const [experiences, setExperiences] = useState([]);


  const steps = [
    { name: 'Basic Information', component: <BasicInformationForm state={state} setState={setState} setActiveStep={setActiveStep} /> },
    { name: 'Profile', component: <ProfileForm skills={skills} skillTags={skillTags} setSkills={setSkills} setSkillTags={setSkillTags} hobbies={hobbies} setHobbies={setHobbies} hobbyTags={hobbyTags} setHobbyTags={setHobbyTags} state={state} setState={setState} setActiveStep={setActiveStep} /> },
    { name: 'Education', component: <EducationForm educations={educations} setEducations={setEducations} state={state} setState={setState} setActiveStep={setActiveStep} /> },
    { name: 'Personal Information', component: <PersonalInformationForm educations={educations}   skillTags={skillTags} hobbyTags={hobbyTags}  experiences={experiences} setExperiences={setExperiences} state={state} setState={setState} setActiveStep={setActiveStep} /> }
  ];

  const handleStepClick = (index) => {
    // setActiveStep(index);
  };

  return (
    <div className='bg-[#f8f8f8] py-[40px]'>
      <div className="flex items-center justify-center mt-8 gap-[40px] relative stepper-index max-w-[900px] px-[20px] mx-auto ">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={`step px-4 py-2 rounded-[10px] z-10 ${
                activeStep === index ? 'bg-teal-500 text-white' : 'bg-white text-teal-500 hover:cursor-pointer'
              }`}
              onClick={() => handleStepClick(index)}
            >
              {step.name}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="mt-8 max-w-[900px] mx-auto my-[40px]">
        {steps[activeStep].component}
      </div>
    </div>
  );
}
