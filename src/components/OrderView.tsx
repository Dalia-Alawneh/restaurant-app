import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/store"
import { pos } from "../assets"
import { calculateTotalPrice, decrementQuantity, incrementQuantity, removeOrderItemById, resetOrder, updateId } from "../features/tempOrder/index.ts"
import MyModal from "./ui/MyModal"
import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { Dialog } from "@headlessui/react"
import Input from "./ui/Input"
import { ICustomer } from "../interfaces"
import { postData, putData } from "../helpers/api.ts"
import toast from "react-hot-toast"
import { XIcon } from "lucide-react"
interface IOrderViewProps {
    setSelectedProducts: (value: Record<string, boolean>) => void;
    selectedProducts: Record<string, boolean>
}
const OrderView = ({ setSelectedProducts, selectedProducts }: IOrderViewProps) => {
    const tempOrders = useAppSelector(state => state.tempOrders.order.products)
    const orderId = useAppSelector(state => state.tempOrders.order.id)
    const totalPrice = useAppSelector(state => state.tempOrders.totalPrice)
    const [customerInfo, setCustomerInfo] = useState<ICustomer>({
        name: '',
        phone: '',
        address: '',
    })
    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [isPayModalOpen, setIsPayModalOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }
    const closePayModal = () => {
        setIsPayModalOpen(false)
    }

    const openPayModal = () => {
        setIsPayModalOpen(true)
    }

    // handlers
    const calculateItemPrice = (price: number, qty: number): number => {
        return price * qty
    }
    const incrementQuantityHandler = (id: number) => {
        dispatch(incrementQuantity(id));
        dispatch(calculateTotalPrice());
    };

    const decrementQuantityHandler = (id: number) => {
        dispatch(decrementQuantity(id));
        dispatch(calculateTotalPrice());
    };
    const handleCancelOrder = () => {
        dispatch(resetOrder())
        const updatedSelectedProducts = Object.keys(selectedProducts).reduce((acc: Record<string, boolean>, key) => {
            acc[key] = false;
            return acc;
        }, {});
        setSelectedProducts(updatedSelectedProducts);
    }

    const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCustomerInfo({
            ...customerInfo,
            [name]: value,
        })
    }
    const submitOrderHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const productsIds = tempOrders.map((order) => order.id);
        const formattedDate = new Date().toISOString();
        const reqData = {
            data: {
                ...customerInfo,
                date: formattedDate,
                products: productsIds,
                totalPrice: totalPrice,
            },
        };

        try {
            const res = await postData('/orders', reqData);
            dispatch(updateId(res.data.id));

            for (const order of tempOrders) {
                await putData(`/products/${order.id}`, {
                    data: {
                        stock: order.attributes.stock - (order.qty || 0), // Update the stock
                    },
                });
            }

            dispatch(resetOrder());
            const updatedSelectedProducts = Object.keys(selectedProducts).reduce((acc: Record<string, boolean>, key) => {
                acc[key] = false;
                return acc;
            }, {});
            setSelectedProducts(updatedSelectedProducts);
            toast.success('Successfully Order Added!');
            closeModal();
            openPayModal();
        } catch (e) {
            toast.error('Something went wrong! 🥲');
        }
    };

    const handleDelivery = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            await putData(`/orders/${orderId}`, { data: { status: "delivering" } })
            toast.success('To Shipping ...🚚')
            closePayModal()
        } catch (e) {
            toast.error('Something goes wrong.!🥲')
        }
    }

    const handleDeleteOrderItem = (id: number) => {
        dispatch(removeOrderItemById(id));
        setSelectedProducts({ ...selectedProducts, [id]: false });
    }
    return (

        <>
            <div className="p-2 md:p-8 w-[100%] max-w-[600px] min-h-[600px] rounded-md bg-white md:w-1/2 lg:w-[70%]">
                {tempOrders.length > 0 ?
                    <div className="flex flex-col justify-between min-h-[600px]">
                        <div className="min-h-[200px] max-h-[350px] overflow-auto">
                            <table className="table text-center">
                                <thead className="border-b-2 border-[--primary] bg-[--primary-light]">
                                    <tr>
                                        <th>#</th>
                                        <th className="py-2">Title</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tempOrders.map((order, index) => (
                                        <tr className="border-b px-4" key={'order#' + order.id}>
                                            <td className=" py-2">{index + 1}</td>
                                            <td className="px-4 py-2 min-w-[100px]">{order.attributes.title.slice(0, 7)}...</td>
                                            <td className="flex items-center py-4 px-4">
                                                <button onClick={() => incrementQuantityHandler(order.id)}
                                                    className="py-0 px-2 bg-[--primary-light] text-white text-lg">+</button>
                                                <span className="w-[30px]">{order.qty}</span>
                                                <button onClick={() => decrementQuantityHandler(order.id)}
                                                    className="py-0 px-2 bg-[--primary-light] text-white text-lg">-</button>
                                            </td>
                                            <td className="font-semibold text-[--sec-color] py-2 px-4" style={{ width: '110px', overflow: 'hidden' }}>${calculateItemPrice(order.attributes.price, (order.qty || 0)).toFixed(2)}</td>
                                            <td className="py-4"><button onClick={() => handleDeleteOrderItem(order.id)}
                                                className="py-1 px-2 border border-red-500 text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white bg-transparent text-lg"><XIcon /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div className="flex justify-between total rounded p-5 px-8 bg-[--primary-light] mt-10 ">
                                <h4 className="font-bold">Total Price:</h4>
                                <p>${totalPrice.toFixed(2)}</p>
                            </div>
                            <button onClick={openModal} className="w-full text-white mt-10 mb-5 bg-[--sec-color] hover:bg-[--sec-light] 
                        hover:text-black hover:border-none border-none">Processed Order</button>
                            <button onClick={handleCancelOrder} className="w-full">Cancel</button>
                        </div>
                    </div>

                    :
                    <div className="flex min-h-[600px] flex-col justify-between">
                        <div className="pt-8">
                            <img src={pos} alt="" className="mb-6" />
                            <h2 className="mb-3 text-center">Your Order in Progress Check Order</h2>
                            <p className="mb-6 text-center">Just click on any item to create order</p>
                        </div>
                        <div className="flex mt-14 mb-8">
                            <Link to='transaction' className="bg-[#ffeae6] text-center w-full border-0 rounded-3xl py-3 px-6 text-md text-[--sec-color]
                        hover:bg-[--sec-color] hover:text-white transition" >Orders Status</Link>
                        </div>
                    </div>
                }
                <MyModal isOpen={isOpen} closeModal={closeModal}>
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        Add Order 🤑
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Need Customer Info Please.. <span className='text-lg'>🫣</span>
                        </p>
                    </div>
                    <form className='flex flex-col gap-4 my-5' onSubmit={submitOrderHandler}>
                        <div>
                            <Input type='text' placeholder='Name' value={customerInfo.name} name="name" onChange={handleInfoChange} />
                        </div>
                        <div>
                            <Input type='text' placeholder='Phone' value={customerInfo.phone} name="phone" onChange={handleInfoChange} />
                        </div>
                        <div>
                            <Input type='text' placeholder='Address' value={customerInfo.address} name="address" onChange={handleInfoChange} />
                        </div>
                        <div className="mt-4 text-center flex gap-3 justify-center">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-[--sec-light] px-4 py-2 text-sm font-medium hover:text-white hover:bg-[--sec-color] focus:outline-none"
                            >
                                Submit Order
                            </button>
                        </div>
                    </form>
                </MyModal>
                <MyModal isOpen={isPayModalOpen} closeModal={closePayModal}>
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        How to take Your order? 🫣
                    </Dialog.Title>
                    <p className="text-sm text-gray-500">
                        Hello, cashier🫡! Please assist the customer in selecting their preferred payment method or delivery option.
                        This step is essential to complete their transaction and ensure a satisfactory shopping experience. Kindly guide the
                        customer through the available choices and provide any necessary information to help them make an informed decision
                    </p>
                    <form className='flex flex-col gap-4 my-5'>

                        <div className="mt-4 text-center flex gap-3 justify-center">
                            <Link to={`payment/${orderId}`}
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-[--primary-light] px-4 py-2 text-sm font-medium text-white hover:bg-[--primary-light] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                                Pay Now 🤑
                            </Link>
                            <button
                                onClick={handleDelivery}
                                className="inline-flex justify-center rounded-md border border-transparent bg-[--sec-light] px-4 py-2 text-sm font-medium hover:text-white hover:bg-[--sec-color] focus:outline-none"
                            >
                                Delivery 🚚
                            </button>
                        </div>
                    </form>
                </MyModal>
            </div>
        </>
    )
}

export default OrderView