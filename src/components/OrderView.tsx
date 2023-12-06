import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/store"
import { pos } from "../assets"
import { calculateTotalPrice, decrementQuantity, incrementQuantity, resetOrder } from "../features/tempOrder/TempOrder"
import MyModal from "./ui/MyModal"
import { useState, ChangeEvent, FormEvent } from 'react'
import { Dialog } from "@headlessui/react"
import Input from "./ui/Input"
import SelectInput from "./ui/SelectInput"
import { ICustomer } from "../interfaces"
import { postData } from "../utils/helpers"
import toast from "react-hot-toast"
const options = [
    { name: 'Wade Cooper' },
    { name: 'Arlene Mccoy' },
    { name: 'Devon Webb' },
    { name: 'Tom Cook' },
    { name: 'Tanya Fox' },
    { name: 'Hellen Schmidt' },
]
const OrderView = ({ setSelectedProducts }:
    { setSelectedProducts: (value: Record<string, boolean>) => void; }) => {
    const tempOrders = useAppSelector(state => state.tempOrders.order.products)
    const totalPrice = useAppSelector(state => state.tempOrders.totalPrice)
    const [customerInfo, setCustomerInfo] = useState<ICustomer>({
        name: '',
        phone: '',
    })
    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
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
        setSelectedProducts(false)
    }

    const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(customerInfo);
        const { name, value } = e.target
        setCustomerInfo({
            ...customerInfo,
            [name]: value,
        })
    }
    const submitOrderHandler = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const productsIds = tempOrders.map((order) => order.id);
        const formattedDate = new Date().toISOString();
        const reqData = {
            data: {
                ...customerInfo,
                date: formattedDate,
                products: productsIds,
                totalPrice:totalPrice,
            },
        };
        try {
            const res = await postData('/orders', reqData)
            console.log(res);
            closeModal()
            dispatch(resetOrder())
            setSelectedProducts(false)
            toast.success('Successfully Order Added!')
        } catch (e) {
            console.log(e);
        }

    }
    return (

        <>
            <div className="p-8 max-w-[500px] min-h-[600px] rounded-md bg-white w-full md:w-1/2 lg:w-1/3">
                {tempOrders.length > 0 ?
                    <div className="flex flex-col justify-between min-h-[600px]">
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
                                        <td className="py-3">{order.attributes.title}</td>
                                        <td>
                                            <button onClick={() => incrementQuantityHandler(order.id)}
                                                className="py-0 px-2 bg-[--primary-light] text-white text-lg">+</button>
                                            <span className="px-3">{order.qty}</span>
                                            <button onClick={() => decrementQuantityHandler(order.id)}
                                                className="py-0 px-2 bg-[--primary-light] text-white text-lg">-</button>
                                        </td>
                                        <td className="font-semibold text-[--sec-color]">${calculateItemPrice(order.attributes.price, order.qty).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                        <SelectInput options={options} />
                        <div className="mt-4 text-center flex gap-3 justify-center">
                            <Link to='payment'
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-[--primary-light] px-4 py-2 text-sm font-medium text-white hover:bg-[--primary-light] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                                To Pay
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-[--sec-light] px-4 py-2 text-sm font-medium hover:text-white hover:bg-[--sec-color] focus:outline-none"
                            >
                                To Delivery
                            </button>
                        </div>
                    </form>
                </MyModal>
            </div>
        </>
    )
}

export default OrderView