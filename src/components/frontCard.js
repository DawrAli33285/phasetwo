export default function FrontOfCard({category}) {
    return (
      <div className="absolute border-[#00a7ac] rounded-[39px] font-bold border-[1px] inset-0 py-[10] w-full h-full text-black flex flex-col gap-5 justify-center items-center bg-white transition-all duration-100 delay-200 z-20 hover:opacity-0">
        
            <h2 className="text-[28px] text-center " >{category?._id}</h2>
            <p className="text-center text-[#595959] text-[16px]">{category?.jobs} total jobs</p>
            <a href="#">View All Jobs</a>
      </div>
    );
  }