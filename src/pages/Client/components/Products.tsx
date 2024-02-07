import { SwiperSlide } from "swiper/react"
import StyledTitle from "./ui/StyledTitle"
import Caroasel from "./ui/Caroasel"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getData } from "../../../helpers/api"
import { IProduct } from "../../../interfaces"
import ProductCard from "./ui/ProductCard"

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const getProducts = async () => {
    try {
      const data = await getData('/products?populate=categories&populate=img')
      if (data.data.length) {
        setProducts(data.data)
      }
    } catch (e) {
      toast.error('Something goes wrong.!🥲')
    }

  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className="lg:px-36 md:px-10 pb-16">
      <div className="pt-10 container">
        <StyledTitle subTitle="OUR MENU" align="start"
          title={<h2 className="capitalize text-[30px] xl:text-[50px] font-[700] text-[#18214F] mb-4 text-start">
            Menu That Always Make You<br className="hidden md:inline"/> Feel In best Meal</h2>} />
      </div>
      <Caroasel>
        {
          products.map(product => (
            <SwiperSlide key={product.id}><ProductCard product={product} /></SwiperSlide>
          ))
        }
      </Caroasel>
    </div>
  )
}

export default Products