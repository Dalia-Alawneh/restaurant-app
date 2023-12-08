import { Plus, Check } from 'lucide-react'
import { useAppDispatch } from '../../app/store';
import { addToTempOrders, calculateTotalPrice, removeFromTempOrders } from '../../features/tempOrder/TempOrder';
import Rating from './Rating';
import { IProduct } from '../../interfaces';
import CardSkeleton from './CardSkeleton';
interface IProps extends IProduct {
    isSelectProduct: boolean;
    setIsSelectProduct: (value: boolean) => void;
    isLoading: boolean;
}
const ProductCard = ({ id, attributes, isLoading, img, isSelectProduct = false, setIsSelectProduct }: IProps) => {
    const { price, title, stars, duration } = attributes
    const dispatch = useAppDispatch()
    const orderClickHandler = () => {
        setIsSelectProduct(!isSelectProduct)
        if (!isSelectProduct) {
            dispatch(addToTempOrders({ id, attributes, img}));
            dispatch(calculateTotalPrice())
        } else {
            dispatch(removeFromTempOrders(id))
        }
    }
    return (

        <>
            {isLoading ?
                <CardSkeleton />
                :

                <div className="cursor-pointer rounded-xl border flex flex-col justify-between w-full min-h-[460px]" onClick={orderClickHandler}>
                    <img className="w-full" src={img} alt={title} />
                    <div className="card-head p-3">
                        <Rating starsCount={stars} />
                        <h3 className='my-2 text-lg font-semibold capitalize'>{title}</h3>
                        <div className="flex justify-between items-center">
                            <p className='text-[--sec-color] font-bold text-lg'>${price.toFixed(2)}</p>
                            <button className={`border-0 focus:outline-none ${isSelectProduct ? 'bg-[--primary-light]' : 'bg-[--sec-color]'} p-1`}>
                                {isSelectProduct ? <Check color='white' /> : <Plus color='white' />}
                            </button>
                        </div>
                        <p className='text-center my-2 text-[#80808052] font-semibold'>{duration} min</p>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductCard