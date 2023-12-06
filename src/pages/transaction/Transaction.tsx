import { MapPin, Search } from "lucide-react"
import { allCategories } from "../../assets"
import withWrapper from "../../components/hoc/withWrapper"
import { Link } from "react-router-dom"
import Dropdown from "../../components/ui/DropDown"
import Input from "../../components/ui/Input"



const Transaction = withWrapper(() => {
    return (
        <div className="mt-24 pt-8 ">
            <div className="mb-8">
            <Input width="w-[23.25rem]" type="search" placeholder="Search here" icon={<Search  color='#ff6d4d' size={18}/>}/>
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
                        <tr className="bg-white border-b border-[--border-color] hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex gap-3">
                                    <img src={allCategories} alt="" className="w-10 rounded-full" />
                                    <div>
                                        <h6>fish Burger</h6>
                                        <span>x1</span>
                                    </div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3">
                                    <MapPin color='#ff6d4d' size={18} />
                                    <span>location</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-[--sec-color] font-bold">
                                $2999
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="block w-fit px-3 py-1 rounded-xl bg-green-200 text-green-800">Completed</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link to='/' className="block w-fit px-3 py-2 rounded-xl border border-[--sec-color] text-[--sec-color] hover:text-[--sec-color]">Order Again</Link>
                            </td>
                            <td className="px-6 py-4 text-right relative">
                                <Dropdown/>
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-[--border-color] hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex gap-3">
                                    <img src={allCategories} alt="" className="w-10 rounded-full" />
                                    <div>
                                        <h6>fish Burger</h6>
                                        <span>x1</span>
                                    </div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3">
                                    <MapPin color='#ff6d4d' size={18} />
                                    <span>location</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-[--sec-color] font-bold">
                                $2999
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="block w-fit px-3 py-1 rounded-xl bg-green-200 text-green-800">Completed</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link to='/' className="block w-fit px-3 py-2 rounded-xl border border-[--sec-color] text-[--sec-color] hover:text-[--sec-color]">Order Again</Link>
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-[--border-color] hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex gap-3">
                                    <img src={allCategories} alt="" className="w-10 rounded-full" />
                                    <div>
                                        <h6>fish Burger</h6>
                                        <span>x1</span>
                                    </div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3">
                                    <MapPin color='#ff6d4d' size={18} />
                                    <span>location</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-[--sec-color] font-bold">
                                $2999
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="block w-fit px-3 py-1 rounded-xl bg-green-200 text-green-800">Completed</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link to='/' className="block w-fit px-3 py-2 rounded-xl border border-[--sec-color] text-[--sec-color] hover:text-[--sec-color]">Order Again</Link>
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-[--border-color] hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex gap-3">
                                    <img src={allCategories} alt="" className="w-10 rounded-full" />
                                    <div>
                                        <h6>fish Burger</h6>
                                        <span>x1</span>
                                    </div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3">
                                    <MapPin color='#ff6d4d' size={18} />
                                    <span>location</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-[--sec-color] font-bold">
                                $2999
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="block w-fit px-3 py-1 rounded-xl bg-green-200 text-green-800">Completed</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link to='/' className="block w-fit px-3 py-2 rounded-xl border border-[--sec-color] text-[--sec-color] hover:text-[--sec-color]">Order Again</Link>
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-[--border-color] hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex gap-3">
                                    <img src={allCategories} alt="" className="w-10 rounded-full" />
                                    <div>
                                        <h6>fish Burger</h6>
                                        <span>x1</span>
                                    </div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3">
                                    <MapPin color='#ff6d4d' size={18} />
                                    <span>location</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-[--sec-color] font-bold">
                                $2999
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="block w-fit px-3 py-1 rounded-xl bg-green-200 text-green-800">Completed</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link to='/' className="block w-fit px-3 py-2 rounded-xl border border-[--sec-color] text-[--sec-color] hover:text-[--sec-color]">Order Again</Link>
                            </td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex gap-3">
                                    <img src={allCategories} alt="" className="w-10 rounded-full" />
                                    <div>
                                        <h6>fish Burger</h6>
                                        <span>x1</span>
                                    </div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3">
                                    <MapPin color='#ff6d4d' size={18} />
                                    <span>location</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-[--sec-color] font-bold">
                                $2999
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="block w-fit px-3 py-1 rounded-xl bg-green-200 text-green-800">Completed</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link to='/' className="block w-fit px-3 py-2 rounded-xl border border-[--sec-color] text-[--sec-color] hover:text-[--sec-color]">Order Again</Link>
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>

            {/* <Paginator products={products} setProducts={setProducts} pageSize={3}/> */}
        </div>
    )
})

export default Transaction