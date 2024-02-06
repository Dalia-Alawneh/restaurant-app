import withWrapper from "../../../components/hoc/withWrapper"
import BreadCrumb from "../../../components/ui/BreadCrumb"
import Paginator from "../../../components/ui/Paginator"
import { emptyCart } from "../../../assets"
import { Edit, Search, Trash } from "lucide-react"
import { FormEvent, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { deleteData, getData } from "../../../helpers/api"
import { IProduct, ISelectOptions } from "../../../interfaces"
import { useQuery } from "@tanstack/react-query"
import ErrorHandler from "../../../components/error/ErrorHandler"
import Button from "../../../components/ui/Button"
import MyModal from "../../../components/ui/MyModal"
import { Dialog } from "@headlessui/react"
import Form from "../components/Form"


const Menus = withWrapper(() => {
    const [menus, setMenus] = useState<IProduct[]>()
    const searchRef = useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
    const [options, setOptions] = useState<ISelectOptions[]>([])
    const [selectedMenuId, setSelectedMenuId] = useState<number | string>('');
    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }
    const closeDeleteModal = () => {
        setDeleteModalOpen(false)
    }

    const openDeleteModal = (menuId: number | string) => {
        setSelectedMenuId(menuId)
        setDeleteModalOpen(true)
    }
    const closeUpdateModal = () => {
        setUpdateModalOpen(false)
    }

    const openUpdateModal = (menuId: number | string) => {
        setSelectedMenuId(menuId)
        setUpdateModalOpen(true)
    }
    const setData = async () => {
        try {
            const { data } = await getData('/products?populate=img&populate=categories&pagination[pageSize]=8')
            if (data.length) {
                setMenus(data)
                return data
            }
        } catch (e) {
            toast.error('Something goes wrong.!🥲')
        }
    }
    const { isError, isLoading, refetch } = useQuery({
        queryKey: ['menus'],
        queryFn: setData,
    })
    const handleSearch = async () => {
        const searchTerm = searchRef?.current?.value

        if (searchTerm !== '') {
            const res = await getData(`/products?populate=img&populate=products.categories&filters[title][$contains]=${searchTerm?.trim()}`)
            setMenus(res.data)
        } else {
            const res = await getData('/products?populate=img&populate=categories&pagination[pageSize]=8')
            setMenus(res.data)
        }
    }

    useEffect(() => {
        async function getCategories() {
            const res = await getData('/categories')
            const options = res.data.map(({ id, attributes: { title } }: { id: number, attributes: { title: string } }) => ({ id, title }));
            setOptions(options)
        }
        getCategories()
    }, [])
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
    if (isError) {
        return <ErrorHandler status={403} />
    }
    const submitDeleteHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            await deleteData(`/products/${selectedMenuId}`)
            toast.success('Menu Item Deleted Successfully! ❤️‍🔥');
            closeDeleteModal()
            setMenus((prevMenus) => prevMenus?.filter((menu) => menu.id !== selectedMenuId));
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Menu Item not Deleted. Something Went Wrong!');
        }
    }

    return <div className="mt-24">
        <BreadCrumb homePath="/dashboard" page="Menus" />
        <div className="flex sm:flex-row flex-col sm:justify-between items-start mb-5 sm:mb-0 sm:items-center">
            <div className="my-8 w-fit rounded-lg flex items-center border border-[--border-color] ps-2">
                <Search color='#ff6d4d' size={18} />
                <input style={{ border: 'none' }} className="w-[25.25rem] bg-transparent px-4 py-2 placeholder:text-sm border-0 outline-none focus:outline-none focus-visible:outline-none"
                    type="search" placeholder="Search here" onChange={handleSearch} ref={searchRef} />
            </div>
            <Button onClick={openModal} text="add menu item" className="capitalize bg-[--sec-light] hover:border-[--sec-color]" />
            <MyModal isOpen={isOpen} closeModal={closeModal}>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Add Mune 😋
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Need Menu Info Please.. <span className='text-lg'>🫣</span>
                    </p>
                </div>
                <Form refetch={refetch} options={options} closeModal={closeModal} />
            </MyModal>
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
            <MyModal isOpen={isUpdateModalOpen} closeModal={closeUpdateModal}>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Update Mune 😋
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Need Menu Info Please.. <span className='text-lg'>🫣</span>
                    </p>
                </div>
                <Form mode="PUT" refetch={refetch} options={options} closeModal={closeUpdateModal}
                    initialValues={menus?.find((menu) => menu.id === selectedMenuId)} />
            </MyModal>
        </div>

        <div className="relative  rounded-lg border border-[--border-color]">
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
                                            {(menu.attributes.categories?.data)?.map(category => category.attributes.title).join(", ")}
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
                                            <button className="hover:border-red-300 px-3" onClick={() => openDeleteModal(menu.id)}><Trash className="" color="#ff4d4d" /></button>
                                            <button className="hover:border-violet-300 px-3" onClick={() => openUpdateModal(menu.id)}><Edit color="#2f4cdd75" /></button>
                                        </td>
                                    </tr>
                                ))
                                : <tr className="">
                                    <td colSpan={8} className="text-center">
                                        <div className="flex flex-col items-center justify-center py-10">
                                            <img className="w-[200px]" src={emptyCart} alt="Empty Cart" />
                                            <h4 className="mt-8 text-[25px] font-semibold">No Menus!😯</h4>
                                        </div>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
            {!searchRef?.current?.value && <Paginator entity="products" pageSize={8} setItems={setMenus} />}
        </div>
    </div>
})

export default Menus