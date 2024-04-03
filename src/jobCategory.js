import React from 'react';
import CateBanner from "./components/cateBanner";
import CateBody from "./components/cateBody";
import CateGrid from "./components/categrid";
import "./CatePage.css";
import CatePagination from "./components/catePagination";
import { useDispatch } from 'react-redux';
import { getCategories, getCategoryJobs } from "./redux/slices/jobsSlice";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default function JobCategory() {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(0);
    const [saveCategoryJobs,setCategoryJobs]=React.useState([])
    const [endIndex, setEndIndex] = React.useState(itemsPerPage);
const [orignalCategories,setOrignalCategories]=React.useState([])
    const [categories, setCategories] = React.useState([]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        fetchCategories();
        fetchCategoryjobs();
    }, []);

    const fetchCategories = async () => {
        try {
            const fetchCategoriesRes = await dispatch(getCategories());
            if (fetchCategoriesRes.payload) {
                setCategories(fetchCategoriesRes.payload.response);
                setOrignalCategories(fetchCategoriesRes.payload.response)
            } else if (fetchCategoriesRes.error) {
                toastr.error(fetchCategoriesRes.error.message);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            toastr.error('Error fetching categories');
        }
    };

const fetchCategoryjobs=async()=>{
let  getCategoryJobsres=await dispatch( getCategoryJobs())
if(getCategoryJobs.rejected.match( getCategoryJobsres)){
toastr.error(getCategoryJobsres?.payload?.error)
}
if(getCategoryJobs.fulfilled.match(getCategoryJobsres)){
console.log("CATEGORYJOBRES")
console.log(getCategoryJobsres)
    setCategoryJobs(getCategoryJobsres?.payload?.categoryJobs)
}
}


    React.useEffect(() => {
        const newStartIndex = (currentPage - 1) * itemsPerPage;
        const newEndIndex = Math.min(newStartIndex + itemsPerPage, categories.length);
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
    }, [currentPage, categories, itemsPerPage]);

    return (
        <>
            <CateBanner pageName="Job Category" />
            <CateBody orignalCategories={orignalCategories} setCategories={setCategories} categories={categories} />
            <CateGrid categories={saveCategoryJobs.slice(startIndex, endIndex)} />
            {/* <CatePagination
                totalPages={Math.ceil(categories.length / itemsPerPage)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            /> */}
        </>
    );
}
