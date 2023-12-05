import { MapPin } from "lucide-react"
import { allCategories } from "../../assets"
import withWrapper from "../../components/hoc/withWrapper"
import { Link } from "react-router-dom"


const Transaction = withWrapper(() => {
    return (
        <div className="mt-24 pt-8 ">


            <div className="relative overflow-x-auto rounded-lg border border-[#72727281]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase border-b border-[#72727281]">
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
                        <tr className="bg-white border-b border-[#72727281] hover:bg-gray-50 dark:hover:bg-gray-600">
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
                            <td className="px-6 py-4 text-right">
                                <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                    </svg>
                                </button>

                                <div id="dropdownDotsHorizontal" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                        </li>
                                    </ul>
                                    <div className="py-2">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Separated link</a>
                                    </div>
                                </div>

                            </td>
                        </tr>
                        <tr className="bg-white border-b border-[#72727281] hover:bg-gray-50 dark:hover:bg-gray-600">
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
                        <tr className="bg-white border-b border-[#72727281] hover:bg-gray-50 dark:hover:bg-gray-600">
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
                        <tr className="bg-white border-b border-[#72727281] hover:bg-gray-50 dark:hover:bg-gray-600">
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
                        <tr className="bg-white border-b border-[#72727281] hover:bg-gray-50 dark:hover:bg-gray-600">
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