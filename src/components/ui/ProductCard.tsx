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
    const { price, title, stars, duration, discount, isNew } = attributes
    const dispatch = useAppDispatch()
    const orderClickHandler = () => {
        setIsSelectProduct(!isSelectProduct)
        if (!isSelectProduct) {
            dispatch(addToTempOrders({ id, attributes, img }));
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

                <div className="relative overflow-hidden cursor-pointer rounded-xl border flex flex-col justify-between w-full min-h-[460px]" onClick={orderClickHandler}>
                    {isNew && (
                        <div className="relative">
                            <div className="text-white text-[13px] py-1 px-6 transform -skew-y-10 absolute -top-0 -left-3 bg-blue-500" style={
                                {
                                    top: '8px',
                                    transform: 'skew(29deg ,318deg)'
                                }
                            }>
                                New!
                            </div>
                        </div>
                    )}
                    {discount && <div className="discount text-white text-[13px] p-2 absolute right-0 bg-red-500 rounded-b-full rounded-ss-lg">
                        - {discount}%
                    </div>}
                    <div className="card-img p-3">
                        <img className="w-full" src={img} alt={title} />
                    </div>
                    <div className="card-head p-3">
                        <Rating starsCount={stars} />
                        <h3 className='my-2 text-lg font-semibold capitalize'>{title}</h3>
                        <div className="flex justify-between items-center">
                            <div>
                                {discount ? (
                                    <div className="flex items-center">
                                        <sub className="text-[--sec-light] font-bold text-sm line-through">
                                            ${price.toFixed(2)}
                                        </sub>
                                        <sup className="-ml-2 mb-2 text-[--sec-color] font-bold text-lg">
                                            ${((price - (price * (discount / 100))).toFixed(2))}
                                        </sup>
                                    </div>
                                ) : (
                                    <p className="text-[--sec-color] font-bold text-lg">${price.toFixed(2)}</p>
                                )}

                            </div>
                            <button className={`border-0 focus:outline-none ${isSelectProduct ? 'bg-[--primary-light]' : 'bg-[--sec-color]'} p-1`}>
                                {isSelectProduct ? <Check color='white' /> : <Plus color='white' />}
                            </button>
                        </div>
                        <p className='text-center my-2 text-[#80808052] font-semibold'>{duration} min</p>
                    </div>
                </div >
            }
        </>
    )
}

export default ProductCard