import { ReactNode } from "react"
import 'swiper/css';
import { Swiper } from "swiper/react";
interface IProps {
  children: ReactNode
}
const Caroasel = ({ children }: IProps) => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      }}
      loop={true}
      className="py-8 pb-16 px-12"
      spaceBetween={50}
      slidesPerView={4}
    >
      {children}
    </Swiper>
  )
}

export default Caroasel