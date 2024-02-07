import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import PageSubHeadBreadCrumb from "../components/ui/PageSubHeadBreadCrumb"
import { removeFromCart, updateCartItemQuantity } from "../../../features/cart"
import { emptyCart } from "../../../assets"

const Cart = () => {

  const { items, totalPrice } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  return (
    <div>
      <PageSubHeadBreadCrumb title='Shop Cart' page="Shop Cart" />
      <div className="container my-10 py-16">
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
                  <tr className="bg-white border-b border-[--border-color] hover:bg-gray-50 dark:hover:bg-gray-600">
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
                      onClick={() => dispatch(removeFromCart(item.id))}
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
        <div className="border w-full md:w-1/2 py-4 mt-5">
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
      </div>
    </div>
  )
}

export default Cart