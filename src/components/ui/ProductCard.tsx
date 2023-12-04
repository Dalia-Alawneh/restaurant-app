import { Plus, Check } from 'lucide-react'
import { useState } from 'react'
import { useAppDispatch } from '../../app/store';
import { addToTempOrders, calculateTotalPrice, removeFromTempOrders } from '../../features/tempOrder/TempOrder';
import Rating from './Rating';
import { IProduct } from '../../interfaces';

const ProductCard = ({ id, attributes, img }: IProduct) => {
    const { price, title, stars, duration } = attributes
    const [isSelectProduct, setIsSelectProduct] = useState(false)
    const dispatch = useAppDispatch()
    const orderClickHandler = () => {
        setIsSelectProduct(!isSelectProduct)
        if (!isSelectProduct) {
            dispatch(addToTempOrders({ id, price, title, qty: 1 }));
            dispatch(calculateTotalPrice())
        } else {
            dispatch(removeFromTempOrders(id))
        }
    }
    return (
        <div className="cursor-pointer rounded-xl border w-full sm:w-1/2 md:w-1/4" onClick={orderClickHandler}>
            <img className="w-full" src={img} alt={title} />
            <div className="card-head p-3">
                <Rating starsCount={stars} />
                <h3 className='my-2 text-lg font-semibold'>{title}</h3>
                <div className="flex justify-between items-center">
                    <p className='text-[--sec-color] font-bold text-lg'>${price.toFixed(2)}</p>
                    <button className={`border-0 focus:outline-none ${isSelectProduct ? 'bg-[--primary-light]' : 'bg-[--sec-color]'} p-1`}>
                        {isSelectProduct ? <Check color='white' /> : <Plus color='white' />}
                    </button>
                </div>
                <p className='text-center my-2 text-[#80808052] font-semibold'>{duration}</p>
            </div>
        </div>
    )
}

export default ProductCard