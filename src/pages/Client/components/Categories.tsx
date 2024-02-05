import { Swiper, SwiperSlide } from "swiper/react"
import StyledTitle from "./ui/StyledTitle"
import 'swiper/css';
import CategoryCard from "./ui/CategoryCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getData } from "../../../helpers/api";
import { ICategory } from "../../../interfaces";
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
      <div className="container pt-24">
        <StyledTitle subTitle="OUR CATEGORIES" align="start"
          title={<h2 className="text-[30px] md:text-[40px] lg:text-[50px] font-[700] text-[#18214F] mb-10">Browser Our Top Food<br /> Categories</h2>} />
      </div>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          420: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 40
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 40
          }
        }}
        loop={true}
        className="py-8 pb-16 px-24"
        spaceBetween={50}
        slidesPerView={4}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {categories?.map(category => (
          <SwiperSlide><CategoryCard key={category.id} category={category} /></SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Categories
