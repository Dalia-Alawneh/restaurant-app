import { Swiper, SwiperSlide } from 'swiper/react';

import { useState, useEffect } from 'react'
// Import Swiper styles
import 'swiper/css';
import { getData } from '../utils/helpers';
import { ICategory } from '../interfaces';
import { allCategories } from '../assets';

const Carousel = () => {
    const [categories, setCategories] = useState<ICategory[]>([])


    console.log(categories);

    const setData = async () => {
        const data = await getData('/categories?populate=products&populate=img')
        setCategories(data)
    }
    useEffect(() => {
        setData()
    }, [])
    return (
        <Swiper
            breakpoints={
                {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    // when window width is >= 640px
                    800: {
                        slidesPerView: 4,
                        spaceBetween: 40
                    },
                }
            }
            spaceBetween={50}
            slidesPerView={5}
            onSlideChange={(swiper) => console.log(swiper.activeIndex)}
            onSwiper={(swiper) => console.log(swiper)}
            loop={true}
            className='my-8'
        >
            <SwiperSlide className='bg-white p-3 rounded-md'>
                <div className="card py-3 flex flex-col items-center">
                    <img className='w-16 mb-2 rounded-full' src={allCategories} alt="" />
                    <h3 className=''>All</h3>
                </div>
            </SwiperSlide>
            {categories.map(category => (
                <SwiperSlide className='bg-white p-3 rounded-md' key={category.id}>
                    <div className="card py-3 flex flex-col items-center">
                        <img className='w-16 mb-2' src={`http://localhost:1337${category.attributes.img.data.attributes.url}`} alt="" />
                        <h3 className=''>{category.attributes.title}</h3>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Carousel