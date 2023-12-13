import withWrapper from "../../../components/hoc/withWrapper"
import BreadCrumb from "../../../components/ui/BreadCrumb"
import Paginator from "../../../components/ui/Paginator"
import { emptyCart } from "../../../assets"
import { Edit, Search, Trash } from "lucide-react"
import { ChangeEvent, LegacyRef, useCallback, useRef, useState } from "react"
import toast from "react-hot-toast"
import { getData } from "../../../utils/helpers"
import { IProduct } from "../../../interfaces"
import { useQuery } from "@tanstack/react-query"
import ErrorHandler from "../../../components/error/ErrorHandler"


const Menus = withWrapper(() => {
    const [menus, setMenus] = useState<IProduct[]>()
    const searchRef:MutableRefObject<undefined>= useRef()
    const setData = async () => {
        try {
            const { data } = await getData('/products?populate=img&populate=categories&pagination[pageSize]=8')
            if (data.length) {
                setMenus(data)
                return data
            }
        } catch (e) {
            console.log(e);

            toast.error('Something goes wrong.!🥲')
        }
    }
    const { data, isError, isLoading } = useQuery({
        queryKey: ['menus'],
        queryFn: setData,
    })
    const handleSearch = async () => {
        const searchTerm = searchRef?.current.value
        console.log(searchTerm);
        
        if (searchTerm !== '') {
            const res = await getData(`/products?populate=img&populate=products.categories&filters[title][$contains]=${searchTerm?.trim()}`)
            setMenus(res.data)
        }
    }

    if (isLoading) {
        return <div role="status" className="mt-24 p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <span className="sr-only">Loading...</span>
        </div>


    }
    if(isError){
        return <ErrorHandler status={403}/>
    }
    return <div className="mt-24">
        <BreadCrumb homePath="/dashboard" page="Menus" />
        <div className="my-8 w-fit rounded-lg flex items-center border border-[--border-color] ps-2">
            <Search color='#ff6d4d' size={18} />
            <input style={{ border: 'none' }} className="mw-[23.25rem] bg-transparent p-1 placeholder:text-sm border-0 outline-none focus:outline-none focus-visible:outline-none"
            type="search" placeholder="Search here" ref={searchRef} />
            <button className="bg-[--primary-light] text-white" onClick={handleSearch}>Search</button>
        </div>

        <div className="relative overflow-x-auto rounded-lg border border-[--border-color]">
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
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Discount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Rating
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sales
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="py-5">
                    {
                        menus?.length ?
                            menus?.map((menu, index) => (
                                <tr key={menu.id} className="bg-white border-b border-[--border-color] hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex items-center gap-3">
                                            {index + 1}
                                        </div>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex items-center gap-3">
                                            <img src={menu.attributes?.img?.data?.attributes?.url} alt="" className="w-10 rounded-full" />
                                            <h6 className="capitalize">{menu.attributes.title}</h6>

                                        </div>
                                    </th>
                                    <td className="px-6 py-4 capitalize">
                                        {(menu.attributes.categories?.data)?.map(category=>category.attributes.title).join(", ")}
                                    </td>
                                    <td className="px-6 py-4 text-[--sec-color] font-bold">
                                        ${menu.attributes.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {menu.attributes.discount || 0}%
                                    </td>
                                    <td className="px-6 py-4">
                                        {menu.attributes.stars || 0} / 5
                                    </td>
                                    <td className="px-6 py-4">
                                    {menu.attributes.sales || 0}
                                    </td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <button className="hover:border-red-300 px-3"><Trash className="" color="#ff4d4d"/></button>
                                        <button className="hover:border-violet-300 px-3"><Edit color="#2f4cdd75"/></button>
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
            <Paginator entity="products" pageSize={8} setItems={setMenus} />
        </div>
    </div>
})

export default Menus