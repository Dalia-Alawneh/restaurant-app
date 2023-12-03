import { pos } from "../assets"
import Button from "./ui/Button"

const OrderView = () => {
    return (
        <div className="my-8 p-6 max-w-[500px] rounded-md bg-white">
                <img src={pos} alt="" className="mb-6" />
                <h2 className="mb-4">Your Order in Progress Check Order</h2>
                <p className="mb-6">Click on any item or Add Order Button to create order</p>
                <div className="flex gap-5">
                    <Button text="Add Order" className="bg-[--sec-color] border-0 rounded-3xl py-3 px-6 text-md text-white
        hover:bg-[#ffeae6] hover:text-black transition" />
                    <Button text="Order Status" className="bg-[#ffeae6] border-0 rounded-3xl py-3 px-6 text-md text-[--sec-color]
        hover:bg-[--sec-color] hover:text-white transition" />
                </div>
            </div>
    )
}

export default OrderView