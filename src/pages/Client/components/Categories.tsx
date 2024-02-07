import { SwiperSlide } from "swiper/react"
import StyledTitle from "./ui/StyledTitle"
import 'swiper/css';
import CategoryCard from "./ui/CategoryCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getData } from "../../../helpers/api";
import { ICategory } from "../../../interfaces";
import Caroasel from "./ui/Caroasel";
const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const getCategories = async () => {
    try {
      const data = await getData('/categories?populate=products&populate=img')
      if (data.data.length) {
        setCategories(data.data)
      }
    } catch (e) {
      toast.error('Something goes wrong.!🥲')
    }

  }
  useEffect(() => {
    getCategories()
  }, [])
  return (
    <>
      <div className="container pt-10 lg:pt-40">
        <StyledTitle subTitle="OUR CATEGORIES" align="start"
          title={<h2 className="text-[30px] md:text-[40px] lg:text-[50px] font-[700] text-[#18214F] mb-10">Browser Our Top Food<br /> Categories</h2>} />
      </div>
      <Caroasel>
        {categories?.map(category => (
          <SwiperSlide key={category.id}><CategoryCard  category={category} /></SwiperSlide>
        ))}
      </Caroasel>
    </>
  )
}

export default Categories
