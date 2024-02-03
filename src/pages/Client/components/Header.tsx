import { ArrowBigRightDashIcon } from "lucide-react"
import { headerBg } from "../../../assets"
import StyledTitle from "../components/ui/StyledTitle"

const Header = () => {
  return (
    <div className="mt-26 h-screen header bg-cover bg-center" style={{ backgroundImage: `url(${headerBg})` }}>
      <div className="container flex flex-col items-start justify-center h-full">
        <StyledTitle subTitle="#1 We Make Best Test" align="start"
          title={<h1 className="text-[30px] md:text-[40px] lg:text-[60px] font-[700] text-[#18214F] mb-10">For the love of<br /> delicious food</h1>} />
        <button className="bg-[--primary] py-4 px-8 flex text-white gap-3 capitalize">shop more <ArrowBigRightDashIcon /> </button>
      </div>
    </div>
  )
}

export default Header