import { Plus,Star, Check } from 'lucide-react'
import {useState} from 'react'
interface IProps {
    img: string;
    title: string;
    price: number;
}
const ProductCard = ({ img, price, title }: IProps) => {
    const [isSelectProduct, setIsSelectProduct] = useState(false)
    return (
        <div className="cursor-pointer rounded-xl border w-full sm:w-1/2 md:w-1/4" onClick={()=> setIsSelectProduct(!isSelectProduct)}>
            <img className="w-full" src={img} alt={title} />
            <div className="card-head p-3">
                <div className="flex gap-1 rating">
                    <Star color='#eee333' />
                    <Star color='#eee333' />
                    <Star color='#eee333' />
                    <Star color='#d7d7d7' />
                    <Star color='#d7d7d7' />
                </div>
                <h3 className='my-2 text-lg font-semibold'>{title}</h3>
                <div className="flex justify-between items-center">
                    <p className='text-[--sec-color] font-bold text-lg'>${price.toFixed(2)}</p>
                    <button className={`border-0 focus:outline-none ${isSelectProduct?'bg-[--primary-light]': 'bg-[--sec-color]'} p-1`}>
                    {isSelectProduct ?<Check color='white'/>: <Plus color='white'/>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard