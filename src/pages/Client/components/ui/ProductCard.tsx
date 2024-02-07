import { ShoppingCart } from "lucide-react";
import { IProduct } from "../../../../interfaces"
import { useAppDispatch } from "../../../../app/store";
import { addToCart } from "../../../../features/cart";

interface IProps {
    product: IProduct;
}
const ProductCard = ({ product }: IProps) => {
    const dispatch = useAppDispatch()
    return (
        <div>
            <div className="product relative overflow-hidden rounded-xl justify-center border flex flex-col w-full h-[360px]" >
                {product?.attributes?.isNew && (
                    <div className="text-white text-[13px] py-1 px-6 transform -skew-y-10 z-10 absolute  -left-3 bg-blue-500" style={
                        {
                            top: '8px',
                            transform: 'skew(29deg ,318deg)'
                        }
                    }>
                        New!
                    </div>
                )}
                {product?.attributes?.discount ? product?.attributes?.discount > 0 && <div className="discount text-white text-[13px] p-2 absolute top-0 right-0  bg-red-500 rounded-b-full rounded-ss-lg">
                    - {product?.attributes?.discount}%
                </div> : <></>}
                <div className="card-img p-2">
                    <img className="w-full rounded-md object-contain" src={product?.attributes?.img?.data?.attributes?.url} alt={product?.attributes?.title} />
                </div>
                <div className="card-head -bottom-20 p-4 absolute opacity-0 w-full bg-white">
                    <h3 className='my-2 text-lg font-semibold capitalize'>{product?.attributes?.title}</h3>
                    <div className="flex justify-between items-center">
                        <div>
                            {product?.attributes?.discount ? (
                                <div className="flex flex-col items-center">
                                    <p className="text-[--sec-color] ml-2 mb-0 font-bold text-lg">
                                        ${((product?.attributes?.price - (product?.attributes?.price * (product?.attributes?.discount / 100))).toFixed(2))}
                                    </p>
                                    <span className="text-[--sec-light] font-bold text-sm line-through">
                                        ${product?.attributes?.price.toFixed(2)}
                                    </span>
                                </div>
                            ) : (
                                <p className="text-[--sec-color] font-bold text-lg">${product?.attributes?.price.toFixed(2)}</p>
                            )}

                        </div>

                    <div className="bg-[--primary] w-fit rounded p-2 cursor-pointer" onClick={()=>dispatch(addToCart(product))}>
                        <ShoppingCart color="white" />
                    </div>
                    </div>
                </div>
                <div className="overlay absolute inset-0 rounded-xl opacity-0 bg-[#3333335f]"></div>
            </div >
        </div>
    )
}

export default ProductCard