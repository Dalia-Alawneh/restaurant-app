import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/store"
import { pos } from "../assets"
import { calculateTotalPrice, cancelOrder, decrementQuantity, incrementQuantity } from "../features/tempOrder/TempOrder"
import Button from "./ui/Button"

const OrderView = () => {
    const tempOrders = useAppSelector(state => state.tempOrders.orders)
    const totalPrice = useAppSelector(state => state.tempOrders.totalPrice)
    console.log(totalPrice);

    const dispatch = useAppDispatch()


    // handlers
    const calculateItemPrice = (price: number, qty: number): number => {
        return price * qty
    }
    const incrementQuantityHandler = (id: number) => {
        dispatch(incrementQuantity(id));
        dispatch(calculateTotalPrice());
    };

    const decrementQuantityHandler = (id:number) => {
        dispatch(decrementQuantity(id));
        dispatch(calculateTotalPrice());
    };
    const handleCancelOrder = () => {
        dispatch(cancelOrder()) 
    }
    return (

        <>
            <div className="my-8 p-8 max-w-[500px] rounded-md bg-white w-full md:w-1/2 lg:w-1/3">
                {tempOrders.length > 0 ?
                    <>
                        <table className="table text-center">
                            <thead className="border-b-2 border-[--primary] bg-[--primary-light]">
                                <tr>
                                    <th>#</th>
                                    <th className="py-2">Title</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tempOrders.map((order, index) => (
                                    <tr className="border-b" key={'order#' + order.id}>
                                        <td className="py-3">{index + 1}</td>
                                        <td className="py-3">{order.title}</td>
                                        <td>
                                            <button onClick={() => incrementQuantityHandler(order.id)}
                                                className="py-0 px-2 bg-[--primary-light] text-white text-lg">+</button>
                                            <span className="px-3">{order.qty}</span>
                                            <button onClick={() => decrementQuantityHandler(order.id)}
                                                className="py-0 px-2 bg-[--primary-light] text-white text-lg">-</button>
                                        </td>
                                        <td className="font-semibold text-[--sec-color]">${calculateItemPrice(order.price, order.qty).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between total rounded p-5 px-8 bg-[--primary-light] mt-10 ">
                            <h4 className="font-bold">Total Price:</h4>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <button className="w-full text-white mt-10 mb-5 bg-[--sec-color] hover:bg-[--sec-light] hover:text-black hover:border-none border-none">Processed Order</button>
                        <button onClick={handleCancelOrder} className="w-full">Cancel</button>
                    </>

                    :
                    <div>
                        <img src={pos} alt="" className="mb-6" />
                        <h2 className="mb-3 text-center">Your Order in Progress Check Order</h2>
                        <p className="mb-6 text-center">Just click on any item to create order</p>
                        <div className="flex gap-5 mt-14 mb-8">
                            <Link to='transaction' className="bg-[#ffeae6] text-center w-full border-0 rounded-3xl py-3 px-6 text-md text-[--sec-color]
                        hover:bg-[--sec-color] hover:text-white transition" >Orders Status</Link>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default OrderView