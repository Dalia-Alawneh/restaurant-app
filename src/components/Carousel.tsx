import { Swiper, SwiperSlide } from 'swiper/react';

import { useState, useEffect } from 'react'
// Import Swiper styles
import 'swiper/css';
import { getData } from '../utils/helpers';
import { ICategory, IProduct } from '../interfaces';
import { allCategories } from '../assets';
interface IProps {
    setProducts: (products: IProduct[]) => void;
}
const Carousel = ({ setProducts }: IProps) => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const setData = async () => {
            try {
                const data = await getData('/categories?populate=products&populate=img');
                setCategories(data.data);
                setActiveIndex(0);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        setData();
    }, []);

    if (isLoading) {
        return <div className='grid grid-cols-4 gap-4'>
            {
                Array.from({length:4}, (_, index) =>(
                    <div key={index} role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div className="flex items-center justify-center w-full h-32 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>

                <span className="sr-only">Loading...</span>
            </div>
                ))
            }
        </div>

    }
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
            initialSlide={activeIndex}
            spaceBetween={50}
            slidesPerView={5}
            onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
                console.log(swiper.activeIndex);

            }}
            onSwiper={(swiper) => console.log(swiper)}
            loop={true}
        >
            {/* <SwiperSlide className='bg-white p-3 rounded-md'>
                <div className="card py-3 flex flex-col items-center">
                    <img className='w-16 mb-2 rounded-full' src={allCategories} alt="" />
                    <h3 className=''>All</h3>
                </div>
            </SwiperSlide> */}
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