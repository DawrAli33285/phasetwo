import JobBody from "./components/JobBody";
import CateBanner from "./components/cateBanner";
import "./joblisting.css"
export default function JobDetail(){
    return(
        <>
        <CateBanner pageName='Job Detail'/>
        <JobBody/>
        </>
    );
}