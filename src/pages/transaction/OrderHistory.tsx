import Paginator from "../../components/ui/Paginator"
import { MapPin, Search } from "lucide-react"
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { deleteData, getData } from "../../helpers/api"
import { useNavigate } from "react-router-dom"
import { IOrder } from "../../interfaces"
import toast from "react-hot-toast"
import { emptyCart, userDefaultImage } from "../../assets"
import DropDown from "../../components/ui/DropDown"
import MyModal from "../../components/ui/MyModal"

const OrderHistory = () => {
    const [orders, setOrders] = useState<IOrder[]>()
    const [searchTerm, setSearchTerm] = useState<string>()
    const navigate = useNavigate()
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)
    const navigateToOrderDetails = (id: number) => {
        navigate(`/transaction/order/${id}`)
    }
    const closeDeleteModal = () => {
        setDeleteModalOpen(false)
    }

    const openDeleteModal = (orderId: number) => {
        setDeleteModalOpen(true)
        setSelectedOrderId(orderId)
    }
    const submitDeleteHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            await deleteData(`/orders/${selectedOrderId}`)
            toast.success('Order Item Deleted Successfully! ❤️‍🔥');
            closeDeleteModal()
            setOrders((prevMenus) => prevMenus?.filter((order) => order.id !== selectedOrderId));
        } catch (error) {
            toast.error('Order Item not Deleted. Something Went Wrong!');
        }
    }
    const setData = async () => {
        try {
            const { data } = await getData('/orders?populate=img&pagination[pageSize]=8&sort=createdAt:desc')
            if (data.length) {
                setOrders(data)
            }
        } catch (e) {
            toast.error('Something goes wrong.!🥲')
        }
    }
    const setSearchTermValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchTerm(value)
        handleSearch()
    }
    const handleSearch = useCallback(async () => {
        if (searchTerm !== '') {
            const res = await getData(`/orders?filters[name][$contains]=${searchTerm?.trim()}&sort=createdAt:desc`)
            setOrders(res.data)
        } else {
            const { data } = await getData('/orders?populate=img&pagination[pageSize]=8&sort=createdAt:desc')
            if (data.length) {
                setOrders(data)

            }
        }
    }, [searchTerm])
    useEffect(() => {
        setData()
    }, [])
    return (
        <div>
            <div className="mb-8 w-full sm:w-fit rounded-lg flex items-center border border-[--border-color] ps-2">
                <Search color='#ff6d4d' size={18} />
                <input style={{ border: 'none' }} className="sm:w-[25.25rem] w-full bg-transparent px-4 py-2 placeholder:text-sm border-0 outline-none focus:outline-none focus-visible:outline-none"
                    type="search" placeholder="Search here" value={searchTerm} onChange={setSearchTermValue} />
            </div>

            <div className="relative rounded-lg border border-[--border-color]">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase border-b border-[--border-color]">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Menu
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span>Status</span>
                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                            </tr>
                        </thead>
                        <tbody className="py-5">
                            {
                                orders?.length ?
                                    orders?.map((order, index) => (
                                        <tr key={order.id}
                                            className="bg-white border-b border-[--border-color] hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    {index + 1}
                                                </div>
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <img src={userDefaultImage} alt="" className="w-10 rounded-full" />
                                                    <h6>{order.attributes.name}</h6>

                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {new Date(order.attributes.date).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-3">
                                                    <MapPin color='#ff6d4d' size={18} />
                                                    <span>{order.attributes.address}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-[--sec-color] font-bold">
                                                ${order.attributes.totalPrice}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`block w-fit px-3 py-1 rounded-xl ${order.attributes.status == null ? 'bg-[#f9b5b5] text-[#af2e2e]' : order.attributes.status === 'completed' ? 'bg-green-200 text-green-800' : "bg-amber-200 text-amber-800"} `}>
                                                    {order.attributes.status ?? "Canceled"}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right relative">
                                                <DropDown openDeleteModal={openDeleteModal}
                                                id={order.id}
                                                navigateToOrderDetails={navigateToOrderDetails} />
                                            </td>
                                        </tr>
                                    ))
                                    : <tr className="">
                                        <td colSpan={7} className="text-center">
                                            <div className="flex flex-col items-center justify-center py-10">
                                                <img className="w-[200px]" src={emptyCart} alt="Empty Cart" />
                                                <h4 className="mt-8 text-[25px] font-semibold">No Orders Yet!😯</h4>
                                            </div>
                                        </td>
                                    </tr>
                            }



                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-scroll">
                    {!searchTerm && <Paginator entity="orders" pageSize={15} setItems={setOrders} />}
                </div>
            </div>
            <MyModal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} >
                <div className='space-y-3 px-4'>
                    <h2>Delete Menu Item! 😕</h2>
                    <p>Are you sure you want to delete this product Menue?</p>
                    <span className='font-bold'>You can't retrive it❗</span>
                    <form className="flex space-x-3 pt-3" onSubmit={submitDeleteHandler}>
                        <button className="bg-red-800 hover:bg-red-700 text-white">Yes, Delete it</button>
                        <button className="bg-gray-600 hover:bg-gray-500 text-white" type='button' onClick={closeDeleteModal}>Cancel</button>
                    </form>
                </div>
            </MyModal>
        </div>
    )
}

export default OrderHistory