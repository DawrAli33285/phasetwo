import { Link } from "react-router-dom";
import catecase from "../images/case.svg"
export default function CateBanner({pageName}) {
  return (
    <div>
      <div id="cateB" className=" object-contain">
        <div className="flex flex-col gap-[10px] justify-center items-center">
          <div className="text-[28px] font-bold">
            <h1>{pageName}</h1>
          </div>
          <span className="cate-line self-center"></span>
          <div className="flex items-center gap-[8px]">
            <Link to="/" className="hover:text-[#00a7ac]">
              Home</Link>
            
              <span>
                <img src={catecase} />
              </span>
              <p className="text-[#00a7ac]">
                {pageName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
