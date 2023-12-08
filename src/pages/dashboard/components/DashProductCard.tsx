import CardSkeleton from '../../../components/ui/CardSkeleton';
import { IProduct } from '../../../interfaces';
interface IProps extends IProduct {
    isLoading: boolean;
}
const DashProductCard = ({ attributes, isLoading, img }: IProps) => {
    const { price, title } = attributes
    return (

        <>
            {isLoading ?
                <CardSkeleton />
                :
                <div className="cursor-pointer rounded-xl border flex flex-col justify-between w-full min-h-[300px] items-center" >
                    <img className="w-full" src={img} alt={title} />
                    <div className="card-head p-3">
                        <h3 className='my-2 text-lg font-semibold  text-center'>{title}</h3>
                        <p className='text-[--sec-color] font-bold text-lg text-center'>${price.toFixed(2)}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default DashProductCard