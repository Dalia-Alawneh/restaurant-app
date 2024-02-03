import { ArrowBigRightDashIcon } from "lucide-react"
import { burger, vegetable } from "../../../assets"
import StyledTitle from "./ui/StyledTitle"

const FoodQuality = () => {
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 my-12 mb-20 gap-2 ">
      <div className="relative">
        <div className="hidden lg:block relative top-20">
          <svg className="shap-bg" viewBox="0 0 917 588" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M883.652 165.651L-28 0.330566V587.331L854.966 365.127C869.165 361.554 880.277 350.509 883.935 336.332L915.245 215.004C921.053 192.498 906.522 169.798 883.652 165.651Z" fill="var(--primary)"></path>
          </svg>
        </div>
        <div className="px-4 sm:px-0">
          <img className="lg:absolute m-auto p-5 custom-shadow rounded-3xl top-4 left-20 bg-white" src={burger} alt="" />
        </div>
      </div>
      <div className="md:pt-16 pt-24 container">
        <StyledTitle subTitle="WHAT THEY SAY" align="start"
          title={<h2 className="text-[30px] md:text-[40px] lg:text-[50px] font-[700] text-[#18214F] mb-10 md:pe-10">Food Quality Is The Most Important Part For Test</h2>} />
        <p className="mb-5">There are many variations of passages of Lorem Ipsum available, but the majority have suffered
          alteration in some for by injected randomised words which don't look even slightly believable.</p>
        <p className="mb-10">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <button className="bg-[--primary] py-4 px-8 flex text-white gap-3 capitalize">shop more <ArrowBigRightDashIcon /> </button>
        <img className="inline md:hidden lg:inline absolute lg:-bottom-16 right-0 -bottom-20 lg:w-[200px] w-[140px]" src={vegetable} alt="" />
      </div>
    </div>
  )
}

export default FoodQuality