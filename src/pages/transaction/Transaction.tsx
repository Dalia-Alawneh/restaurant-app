import { MapPin, Search } from "lucide-react"
import { emptyCart, userDefaultImage } from "../../assets"
import withWrapper from "../../components/hoc/withWrapper"
import { Link } from "react-router-dom"
import Dropdown from "../../components/ui/DropDown"
import { useEffect, useState } from "react"
import { IOrder } from "../../interfaces"
import { toast } from 'react-hot-toast'
import { getData } from "../../utils/helpers"
import Paginator from "../../components/ui/Paginator"
import { ChangeEvent, useCallback } from 'react'

const Transaction = withWrapper(() => {
    const [orders, setOrders] = useState<IOrder[]>()
    const [searchTerm, setSearchTerm] = useState<string>()

    const setData = async () => {
        try {
            const { data } = await getData('/orders?populate=img&pagination[pageSize]=8')
            if (data.length) {
                setOrders(data)

            }
        } catch (e) {
            console.log(e);

            toast.error('Something goes wrong.!🥲')
        }
    }
    const setSearchTermValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchTerm(value)
    }
    const handleSearch = useCallback(async () => {
        if (searchTerm !== '') {
            const res = await getData(`http://localhost:1337/api/orders?filters[name][$contains]=${searchTerm?.trim()}`)
            setOrders(res.data)
        }
    }, [searchTerm])
    useEffect(() => {
        setData()
    }, [])
    return (
        <div className="mt-24 pt-8 ">
            <div className="mb-8 w-fit rounded-lg flex items-center border border-[--border-color] ps-2">
                <Search color='#ff6d4d' size={18} /> 
                <input style={{border:'none'}} className="mw-[23.25rem] p-1 placeholder:text-sm border-0 outline-none focus:outline-none focus-visible:outline-none" type="search" placeholder="Search here" value={searchTerm} onChange={setSearchTermValue}/>
                <button className="bg-[--primary-light] text-white" onClick={handleSearch}>Search</button>
            </div>

            <div className="relative overflow-x-auto rounded-lg border border-[--border-color]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase border-b border-[--border-color]">
                        <tr>
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
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody className="py-5">
                        {
                            orders?.length ?
                                orders?.map(order => (
                                    <tr className="bg-white border-b border-[--border-color] hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                            <span className={`block w-fit px-3 py-1 rounded-xl ${order.attributes.status === 'completed' ? 'bg-green-200 text-green-800' : "bg-amber-200 text-amber-800"} `}>

                                                {order.attributes.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link to='/' className="block w-fit px-3 py-2 rounded-xl border border-[--sec-color] text-[--sec-color] hover:text-[--sec-color]">Order Again</Link>
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <Dropdown />
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
            <Paginator entity="orders" pageSize={8} setItems={setOrders} />
            </div>

            {/* <Paginator products={products} setProducts={setProducts} pageSize={3}/> */}
        </div>
    )
})

export default Transaction