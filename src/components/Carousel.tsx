import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { categories } from '../assets';

const Carousel = () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={5}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            loop={true}
            className='my-8'
        >
            {categories.map(category=> (
                <SwiperSlide className='bg-white p-3 rounded-md'>
                    <div className="card py-3 flex flex-col items-center">
                        <img className='w-16 mb-2' src={category.img} alt="" />
                        <h3 className=''>{category.title}</h3>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Carousel