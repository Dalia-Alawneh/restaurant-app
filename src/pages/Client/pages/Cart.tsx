import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import PageSubHeadBreadCrumb from "../components/ui/PageSubHeadBreadCrumb"
import { clearCart, removeFromCart, updateCartItemQuantity } from "../../../features/cart"
import { emptyCart } from "../../../assets"
import MyModal from "../../../components/ui/MyModal"
import { FormEvent, useState } from "react"
import { postData, putData } from "../../../helpers/api"
import toast from "react-hot-toast"
import { getUserFromCookies } from "../../../helpers/getUserFromCookies"
import { IUser } from "../../../interfaces"

const Cart = () => {

  const { items, totalPrice } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isDeleteAllModalOpen, setDeleteAllModalOpen] = useState(false)
  const [isConfirmOrderModalOpen, setIsConfirmOrderModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | string>('');
  const loggedInUser: IUser | null = getUserFromCookies();

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
  }

  const openDeleteModal = (id: number | string) => {
    setSelectedId(id)
    setDeleteModalOpen(true)
  }
  const closeOrderConfirmModal = () => {
    setIsConfirmOrderModalOpen(false)
  }

  const openOrderConfirmModal = () => {
    if (loggedInUser) {
      setIsConfirmOrderModalOpen(true)
    }
    else {
      toast.error("You Are not logged in please login to order")
      return
    }
  }


  const submitOrderHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const productsIds = items.map((item) => item.id);

      const formattedDate = new Date().toISOString();
      const reqData = {
        data: {
          name: loggedInUser?.name,
          address: loggedInUser?.city,
          phone: loggedInUser?.phone,
          status: "delivering",
          date: formattedDate,
          products: productsIds,
          totalPrice: totalPrice,
        },
      };
      await postData('/orders', reqData);
      for (const item of items) {
        await putData(`/products/${item.id}`, {
          data: {
            stock: item.attributes.stock - (item.qty || 0), 
          },
        });
      }
      dispatch(clearCart());

      toast.success('Successfully Order Added!');
      closeOrderConfirmModal();
    } catch (error) {
      toast.error('Something went wrong! 🥲');
    }
  };


  function submitDeleteHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(removeFromCart(selectedId))
    closeDeleteModal()
  }
  const closeDeleteAllModal = () => {
    setDeleteAllModalOpen(false)
  }

  const openDeletAlleModal = () => {
    setDeleteAllModalOpen(true)
  }


  function submitDeleteAllHandler(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    dispatch(clearCart())
    closeDeleteModal()
  }

  return (
    <div className="my-20">
      <PageSubHeadBreadCrumb title='Shop Cart' page="Shop Cart" />
      <div className="container my-10 py-16">
        {items.length > 0 && < div className="flex justify-end my-5">
          <button className="bg-red-300 text-white" onClick={openDeletAlleModal}>Delete All</button>
        </div>}
        <div className="border rounded-lg">
          <div className="overflow-auto py-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-b border-[--border-color]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                  </th>
                </tr>
              </thead>
              <tbody>
                {items?.length > 0 ?
                  items?.map((item, index) => (
                    <tr key={item.id} className="bg-white border-b border-[--border-color] hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="ps-5 align-middle">{index + 1}</td>
                      <td className="align-middle py-4"><img src={item.attributes.img.data.attributes.url} className="w-36" alt="" /></td>
                      <td className="capitalize text-[16px] align-middle">{item.attributes.title}</td>
                      <td className="font-bold align-middle">${item.attributes.price.toFixed(2)}</td>
                      <td className="align-middle">
                        <div className="flex items-center">
                          <button
                            onClick={() => dispatch(updateCartItemQuantity({ id: item.id, quantity: item.qty! + 1 }))}
                            className="px-2"><PlusIcon /></button>

                          <p className="w-[40px] text-center">{item.qty}</p>
                          <button
                            onClick={() => dispatch(updateCartItemQuantity({ id: item.id, quantity: item.qty! - 1 }))}
                            className="px-2"><MinusIcon /></button>
                        </div>
                      </td>
                      <td>${item.qty! * item.attributes.price}</td>
                      <td><button
                        onClick={() => openDeleteModal(item.id)}
                      ><Trash2Icon color="red" /></button></td>
                    </tr>
                  ))

                  : <tr className="">
                    <td colSpan={8} className="text-center">
                      <div className="flex flex-col items-center justify-center py-10">
                        <img className="w-[200px]" src={emptyCart} alt="Empty Cart" />
                        <h4 className="mt-8 text-[25px] font-semibold">Cart Empty!😯</h4>
                      </div>
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="border-b-4 pb-2 w-fit border-[--primary] mt-10">Cart Subtotal</h3>
        <div className="w-full md:w-1/2 py-4 mt-5">
          <div className="border">
            <div className="flex justify-between border-b px-3 py-3">
              <p>Ordrer Subtotal</p>
              <p className="text-[--primary] font-[600]">${totalPrice?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between border-b px-3 py-3">
              <p>Shipping</p>
              <p className="text-[--primary] font-[600]">Free Shipping</p>
            </div>
            <div className="flex justify-between px-3 py-3">
              <p>Total</p>
              <p className="text-[--primary] font-[600]">${totalPrice?.toFixed(2)}</p>
            </div>
          </div>
          {items.length > 0 &&
            <div className="flex justify-end">
              <button className="my-5 bg-[--primary] text-white py-3" onClick={openOrderConfirmModal}>Procceed to checkout</button>
            </div>}
        </div>

        <MyModal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} >
          <div className='space-y-3 px-4'>
            <h2>Delete Menu Item! 😕</h2>
            <p>Are you sure you want to delete this product?</p>
            <span className='font-bold'>You can't retrive it❗</span>
            <form className="flex space-x-3 pt-3" onSubmit={submitDeleteHandler}>
              <button className="bg-red-800 hover:bg-red-700 text-white">Yes, Delete it</button>
              <button className="bg-gray-600 hover:bg-gray-500 text-white" type='button' onClick={closeDeleteModal}>Cancel</button>
            </form>
          </div>
        </MyModal>
        <MyModal isOpen={isDeleteAllModalOpen} closeModal={closeDeleteAllModal} >
          <div className='space-y-3 px-4'>
            <h2>⚠️ Delete All Cart Item!</h2>
            <p>Are you sure you want to delete them all?</p>
            <span className='font-bold'>You can't retrive it❗</span>
            <form className="flex space-x-3 pt-3" onSubmit={submitDeleteAllHandler}>
              <button className="bg-red-800 hover:bg-red-700 text-white">Yes, Delete</button>
              <button className="bg-gray-600 hover:bg-gray-500 text-white" type='button' onClick={closeDeleteAllModal}>Cancel</button>
            </form>
          </div>
        </MyModal>
        <MyModal isOpen={isConfirmOrderModalOpen} closeModal={closeOrderConfirmModal} >
          <div className='space-y-3 px-4'>
            <h2>Confirm Order</h2>
            <span className='font-bold'>Your order will be delivered following a phone call from the restaurant.</span>
            <form className="flex space-x-3 pt-3" onSubmit={submitOrderHandler}>
              <button className="bg-green-800 hover:bg-green-700 text-white">Confirm</button>
              <button className="bg-gray-600 hover:bg-gray-500 text-white" type='button' onClick={closeOrderConfirmModal}>Cancel</button>
            </form>
          </div>
        </MyModal>
      </div>
    </div >
  )
}

export default Cart