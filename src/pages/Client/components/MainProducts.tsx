import { ShoppingCart } from "lucide-react"
import { green, prod } from "../../../assets"
import StyledTitle from "./ui/StyledTitle"
import { getData } from "../../../helpers/api"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { IProduct } from "../../../interfaces"


const MainProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const getProducts = async () => {
    try {
      const data = await getData('/products?populate=categories&populate=img&pagination[pageSize]=4&pagination[page]=1')
      if (data.data.length) {
        setProducts(data.data)
      }
    } catch (e) {
      toast.error('Something goes wrong.!🥲')
    }
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className="my-10 relative ">
      <img src={green} alt="" className="absolute right-0 hidden xl:inline" />
      <div className="flex flex-col sm:flex-row items-center gap-8 mx-8 sm:mx-16 lg:mx-0 border-b pb-10 lg:border-0">
        <div className="w-full md:w-1/2 relative">
          <svg className="shap-bg hidden lg:inline" viewBox="0 0 917 588" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M883.652 165.651L-28 0.330566V587.331L854.966 365.127C869.165 361.554 880.277 350.509 883.935 336.332L915.245 215.004C921.053 192.498 906.522 169.798 883.652 165.651Z" fill="var(--primary)"></path>
          </svg>
          <div>
            <img src={prod} alt="" className="rotate-img bg-white w-fit p-3 md:p-10 rounded-full custom-shadow lg:absolute top-12 right-24" />
          </div>
        </div>
        <div className="w-full md:w-1/2 info">
          <StyledTitle subTitle="" align="start"
            title={<h2 className="text-[30px] lg:text-[50px] font-[700] text-[#18214F] mb-4 text-center">
              Veg Sandwich</h2>} />
          <p className="lg:w-2/3">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
          <div className="mt-8 bg-[--primary] rounded p-3 cursor-pointer 
          w-[120px] flex justify-center items-center">
            <ShoppingCart color="white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainProducts