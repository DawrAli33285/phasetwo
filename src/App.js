import React from 'react'
import './App.css';
import Banner from './components/banner';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import CategoryCard from './components/categoryCard';
import FeaturedJob from './components/featuredJob';
import { getHomePageData,addBookmark,getHomeContent } from './redux/slices/jobsSlice';
import JobLocation from './components/jobLocation';
import {useDispatch} from 'react-redux'
function App() {
  const dispatch=useDispatch()
  const [homeContent,setHomeContent]=React.useState()
  const [recorddata,setRecordData]=React.useState({
    totalAppliesCount:'',
totalCompanies:'',
totalusers:''
  })
  const [state,setState]=React.useState({
    categoryjobs:[],
    jobs:[],
    jobsaccordingtolocation:[]
  })
  React.useEffect(()=>{
fetchHomeData()
fetchHomeContent();
  },[])

const fetchHomeContent=async()=>{
let homecontentres=await dispatch(getHomeContent())
if(getHomeContent.rejected.match(homecontentres)){
toastr.error(homecontentres?.payload?.error)
}
if(getHomeContent.fulfilled.match(homecontentres)){
console.log("HOMECONTENT")
setHomeContent(homecontentres?.payload?.content)
console.log(homecontentres)
}
}

  const fetchHomeData=async()=>{
    let fetchomedatares=await dispatch(getHomePageData())
    if(getHomePageData.rejected.match(fetchomedatares)){
console.log(fetchomedatares)
    }
    if(getHomePageData.fulfilled.match(fetchomedatares)){
      console.log("ALLJOBS")
      console.log(fetchomedatares)
      setRecordData({
        totalAppliesCount:fetchomedatares.payload?.data?.totalAppliesCount,
        totalCompanies:fetchomedatares.payload?.data?.totalCompanies,
        totalusers:fetchomedatares.payload?.data?.totalusers

      })
      setState({
        jobs:fetchomedatares.payload?.data?.jobs,
        categoryjobs:fetchomedatares.payload?.data?.categoryjobs,
        jobsaccordingtolocation:fetchomedatares?.payload?.data?.jobsaccordingtolocation
      })
    }
  }
  return (
     <>
       <Banner homeContent={homeContent}/>
       <CategoryCard homeContent={homeContent} categoryJobs={state?.categoryjobs}/>
       <FeaturedJob homeContent={homeContent} setState={setState} FeaturedJob={state?.jobs[0]}/>
       <JobLocation recorddata={recorddata} homeContent={homeContent} jobsaccordingtolocation={state?.jobsaccordingtolocation}/>
     </>
  );
}

export default App;
