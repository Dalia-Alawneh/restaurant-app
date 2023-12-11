import { FormEvent } from "react"
import { payment } from "../../assets"
import withWrapper from "../../components/hoc/withWrapper"
import BreadCrumb from "../../components/ui/BreadCrumb"
import SelectInput from "../../components/ui/SelectInput"
import { putData } from "../../utils/helpers"
import toast from "react-hot-toast"
import { useAppSelector } from "../../app/store"
const selectOtions = [
    {name:'Cash'},
    {name:'Visa'},
    {name:'By Bank'},
]
const Payment = withWrapper(() => {
    const orderId = useAppSelector(state => state.tempOrders.order.id)
    const handlePayment= async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await putData(`/orders/${orderId}`, { data: { status: "completed" } })
            toast.success('Payment Done Successfully.. 🤑❤️‍🔥')
            console.log(res);
        } catch (e) {
            toast.error('Something goes wrong.!🥲')
            console.log(e);
        }
    }
    return (
        <div className="mt-24 ">
            <BreadCrumb homePath="/" page="Payment" />
            <div className="flex mt-8 gap-10">
                <div className="shadow-lg shadow-[#f8e1e1] w-2/3 p-6">
                    <div className="flex items-center justify-between border-b pb-3">
                        <h2 className="text-[20px] font-semibold">Amount to pay</h2>
                        <span className="text-[25px] text-[--primary] font-bold">$20.00</span>
                    </div>
                    <form className='flex flex-col gap-4 my-10 w-4/5 m-auto' onSubmit={handlePayment} >
                        <div>
                        <label htmlFor="">Payment Method:</label>
                        <SelectInput options={selectOtions} />
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-full">
                                <label htmlFor="">Tendered:</label>
                                <div className="p-3 mt-3 border-2 border-[--primary-light]">
                                    $2000.00
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="">Change:</label>
                                <div className="p-3 mt-3 border border-[#3333]">
                                    $105.00
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-center flex gap-3 justify-center">
                            <button 
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent 
                                bg-[--primary-light] px-4 py-2 text-sm font-medium text-white hover:bg-[--primary-light] hover:text-[--primary] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                                Pay Now
                            </button>
                            
                        </div>
                    </form>
                </div>
                <div className="w-1/3">
                    <img src={payment} className="w-full" alt="" />
                </div>
            </div>
        </div>
    )
}
)
export default Payment