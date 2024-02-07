import { useParams } from "react-router-dom"
import { getData } from "../../helpers/api"
import { useEffect, useState } from "react"
import { IOrder, IProduct } from "../../interfaces";
import { userDefaultImage } from "../../assets";
import { Check, MapPin, Truck } from "lucide-react";
import BreadCrumb from "../../components/ui/BreadCrumb";

const OrderDetails = () => {
    const id = useParams().id;

    const [order, setOrder] = useState<IOrder>()
    const getOrder = async () => {
        const { data } = await getData(`/orders/${id}?populate=products&populate=products.img`)
        setOrder(data)
    }
    useEffect(() => {
        getOrder()
    }, [])
    return (
        <div>
            <BreadCrumb homePath="/transaction" page="Order details" />
            <h1 className="text-[22px] font-semibold capitalize mt-10 mb-4">order detials</h1>
            <div className="border border-[--border-color] p-6 rounded-lg">
                <div className="flex justify-center sm:place-content-between flex-wrap sm:flex-nowrap gap-4 border-b pb-5">
                    <div className="order-info w-full sm:w-50">
                        <p className="text-[18px] capitalize font-semibold">order <span className="text-[--primary-light]">#{id}</span></p>
                        <p className="text-[12px] text-[#777777]">{new Date(order?.attributes.date ?? "").toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        })}</p>
                    </div>
                    <div className="user-info w-full sm:w-50">
                        <div className="flex items-center gap-3 justify-end">
                            <img src={userDefaultImage} alt="" className="w-10 rounded-xl" />
                            <div className="">
                                <h6 className="text-[15px]">{order?.attributes.name}</h6>
                                <span className="text-[12px] text-[#777777]">{order?.attributes.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex place-content-between flex-wrap sm:flex-nowrap gap-4 border-b pb-5 mt-5">
                    <div className="order-info w-full sm:w-50 flex flex-col gap-3">
                        <h3 className="text-[16px] capitalize font-semibold">delivery address</h3>
                        <div className="text-[12px] text-[#777777] "> <div className="flex gap-1">
                            <MapPin color='#ff6d4d' size={16} />
                            <span className="capitalize font-semibold text-[14px]">{order?.attributes.address}</span>
                        </div></div>
                    </div>
                    <div className="user-info w-full sm:w-50">
                        <div className="flex flex-col gap-3 items-end">
                            <h3 className="text-[16px] capitalize font-semibold">order status</h3>
                            <div className="flex items-center gap-1">
                                {order?.attributes.status === 'completed' ? <Check color="green" size={18} /> : <Truck color="orange" size={18} />}
                                <p className="capitalize text-[13px]">{order?.attributes.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex place-content-between flex-wrap sm:flex-nowrap gap-4 border-b pb-5 mt-5">
                    <div className="order-info w-full sm:w-50 flex flex-col gap-3">
                        <h3 className="text-[16px] capitalize font-semibold">order menu</h3>
                        {
                            order?.attributes.products?.data.map((product:IProduct) => (
                                <div className="flex justify-between items-center" key={product.id}>
                                    <div className="flex items-center gap-3">
                                        <img className="w-[5rem] h-[5rem] object-contain rounded-xl border border-[--sec-color]" src={product.attributes.img.data.attributes.url} alt="" />
                                        <div>
                                            <h4 className="capitalize">{product.attributes.title}</h4>
                                            {/* <span>{product.attributes.qty}</span> */}
                                        </div>
                                    </div>
                                    <div className="text-[--sec-color] font-semibold">+ $ {(product.attributes.price).toFixed(2)}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex place-content-between flex-wrap sm:flex-nowrap gap-4 pb-5 mt-5">
                    <h3 className="text-[16px] capitalize font-semibold">total</h3>
                    <span className="text-[--sec-color] font-semibold">$ {(order?.attributes.totalPrice)?.toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails