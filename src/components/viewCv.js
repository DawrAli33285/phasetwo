import React from 'react';
import CV from 'react-cv';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { useDispatch } from 'react-redux';
import { uploadCv } from '../redux/slices/jobsSlice';
const ViewCv = () => {
  const location=useLocation();
  const dispatch=useDispatch()
  const [personalData,setPersonalData]=React.useState(
   {
    name: 'John Doe',
      title: 'Web Developer',
      image: 'https://bulma.io/images/placeholders/128x128.png',
      contacts: [
        { type: 'email', value: 'john@example.com' },
        { type: 'phone', value: '+00 (123) 456 78 90' },
        { type: 'location', value: 'New York' },
        { type: 'website', value: 'example.com' },
        { type: 'linkedin', value: 'linkedin.com/in/johndoe' },
        { type: 'twitter', value: 'twitter.com/johndoe' },
        { type: 'github', value: 'github.com/johndoe' }
      ]
   }
  )
const [sections,setSections]=React.useState(  [
  {
    type: 'text',
    title: 'Career Profile',
    content: 'I am an experienced web developer with a passion for creating efficient and scalable web applications. I have expertise in HTML, CSS, JavaScript, and various frontend and backend frameworks.'
  },
  {
    type: 'text',
    title: 'Education',
    content: 'Bachelor of Science in Computer Science - XYZ University, 2015'
  },
  {
    type: 'text',
    title: 'Work Experience',
    content: 'Senior Web Developer - ABC Company (2016-present)'
  },
  {
    type: 'text',
    title: 'Skills',
    content: 'HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB'
  }
])



const savecv=()=>{
 document.addEventListener('DOMContentLoaded',async()=>{
  
  const cvNode = document.querySelector('.SPgITW_appContainer'); 
  console.log(cvNode)
  console.log("CVNODE")
  html2canvas(cvNode, { useCORS: true })
  .then(async(canvas) => {
  //   const imgData = canvas.toDataURL('image/png');
  // console.log(imgData)
  //   // const link = document.createElement('a');
  //   // link.download = 'cv.png';
  //   // link.href = imgData;
  //   // link.click();
  const imgData = canvas.toDataURL('image/png');
  // Create a Blob from the data URI
  const blob = dataURItoBlob(imgData);
  // Create a File object from the Blob
  const file = new File([blob], 'cv.png', { type: 'image/png' });
  const formData = new FormData();
  formData.append('image', file);
  let uploadcvres=await dispatch(uploadCv(formData))
  if(uploadCv.rejected.match(uploadcvres)){
    console.log('upload cv res')
    console.log(uploadcvres)
  }
  if(uploadCv.fulfilled.match(uploadcvres)){
    console.log('upload cv res')
    console.log(uploadcvres)
  }

  });
 })
}

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
React.useEffect(()=>{
storedata();
savecv();
},[])

const storedata=()=>{
let params=new URLSearchParams(location.search)
let name=params.get('name')
let image=params.get('image')
let current_job=params.get('current_job')
let designation=params.get('designation')
let experience=params.get('experience')
let qualification=params.get('qualification')
let email=params.get('email')
let phone_number=params.get('phone_number')
let website=params.get('website')
let languages=params.get('languages')
let carrer_objective=params.get('carrer_objective')
let certificate_name=params.get('certificate_name')
let organization_name=params.get('organization_name')
let certification_date=params.get('certification_date')
let skillsstring=params.get('skills')
let skills=JSON.parse(skillsstring)
let hobbiesstring=params.get('hobbies')
let hobbies=JSON.parse(hobbiesstring)
let educationstring=params.get('educations')
let education=JSON.parse(educationstring)
let experiencesstring=params.get('experiences')
let experiences=JSON.parse(experiencesstring)
let description=params.get('description')
// const languagesarray = languages.map((edu, index) => ({
//   type: 'text',
//   title: 'Education',
//   content: `${edu.degree} ${edu.fieldOfStudy} - ${edu.institution}, ${edu.graduationYear}`
// }));



if(website){
  setPersonalData({
    name,
    title:designation,
    
    image,
    contacts: [
      { type: 'email', value:email },
      { type: 'phone', value: phone_number },
    {type: 'website', value: website } 
      // { type: 'location', value: 'New York' },
  
      // { type: 'linkedin', value: 'linkedin.com/in/johndoe' },
      // { type: 'twitter', value: 'twitter.com/johndoe' },
      // { type: 'github', value: 'github.com/johndoe' }
    ]
    
  })
 
}else{
  setPersonalData({
    name,
    title:designation,
    image,

    contacts: [
      { type: 'email', value:email },
      { type: 'phone', value: phone_number },
      // { type: 'location', value: 'New York' },
  
      // { type: 'linkedin', value: 'linkedin.com/in/johndoe' },
      // { type: 'twitter', value: 'twitter.com/johndoe' },
      // { type: 'github', value: 'github.com/johndoe' }
    ],
   
  })
}
const educationSections = education.map((edu, index) => ({
  type: 'text',
  title: 'Education',
  icon:'graduation',
  content: `${edu.degree} ${edu.fieldOfStudy} - ${edu.institution}, ${edu.graduationYear}`
}));

const experienceSections = experiences.map((exp, index) => ({
  type: 'text',
  icon: 'archive',
  title: 'Work Experience',
  content: `${exp.designation} - ${exp.companyName} (${new Date(exp.startingPeriod)?.getFullYear()}-${new Date(exp.endingPeriod)?.getFullYear()})`
}));

setSections([
  {
    type: 'text',
    title: 'Career Profile',
    icon: 'usertie',
    content: description,
  },
  ...educationSections,
 ...experienceSections,

  {
    icon: 'tasks',
    type: 'text',
    title: 'Skills',
    content: skills.join(', ')
  },
  {
    type: 'common-list',
    title: 'Languages',
    icon: 'language',
    items: [
      {
        authority: languages,
      },
    ]
  },
  {
    type: 'tag-list',
    title: 'Hobbies & Interests',
    icon: 'cubes',
    items: hobbies
  }
])

console.log("EDUCATION")
console.log(experiences)



}

  return (
    <div>
  
    <CV
      personalData={personalData}
      sections={sections}
      branding={false} 
    />
 
  </div>
  );
};

export default ViewCv;