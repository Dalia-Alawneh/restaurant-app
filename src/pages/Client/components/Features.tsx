import { features } from "../../../constants"
import StyledTitle from "./ui/StyledTitle"

const Features = () => {
  return (
    <div className="mt-16 container py-16">
      <StyledTitle subTitle="WHAT WE SERVE" align="center"
        title={<h2 className="text-[30px] md:text-[40px] lg:text-[50px] font-[700] text-[#18214F] mb-10 text-center">Your Favourite Food<br />Delivery Pantner</h2>} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features?.map(feature => (
          <div className="feature flex flex-col items-center justify-center text-center gap-3 p-5 py-16 rounded-md">
            <img src={feature.image} alt={feature.title} />
            <h3>{feature.title}</h3>
            <p className="px-4">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features