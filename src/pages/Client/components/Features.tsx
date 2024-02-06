import { features } from "../../../constants"
import StyledTitle from "./ui/StyledTitle"

const Features = () => {
  return (
    <div className="mt-16 container py-16">
      <StyledTitle subTitle="WHAT WE SERVE" align="center"
        title={<h2 className="text-[30px] lg:text-[50px] font-[700] text-[#18214F] mb-10 text-center md:w-[40%]">Your Favourite Food Delivery Pantner</h2>} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
        {features?.map((feature,index) => (
          <div key={index} className="feature flex flex-col items-center justify-center text-center gap-3 p-5 py-16 rounded-md">
            <img src={feature.image} alt={feature.title} />
            <h3>{feature.title}</h3>
            <p className="px-2 sm:px-4">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features