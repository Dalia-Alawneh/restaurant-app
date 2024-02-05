import { useParams } from "react-router-dom"
import PageSubHeadBreadCrumb from "../components/ui/PageSubHeadBreadCrumb"
import { useEffect, useState } from "react"
import { getData } from "../../../helpers/api"
import toast from "react-hot-toast"
import { ICategory } from "../../../interfaces"
import { Search, ShoppingCart } from "lucide-react"
import Rating from "../../../components/ui/Rating"

const Category = () => {
  const [category, setCategory] = useState<ICategory>()
  const { id } = useParams()
  const getCategory = async () => {
    try {
      const data = await getData(`/categories/${id}?populate=products&populate=products.img`);
      if (data.data) {
        setCategory(data.data)
      }
    } catch (e) {
      toast.error('Something goes wrong.!🥲')
    }
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <div className="mt-20">
      {category && (
        <PageSubHeadBreadCrumb title={category.attributes?.title} page="category" />
      )}
      <div className="container py-10">
        <div className="my-8 w-full rounded-lg flex items-center justify-between border border-[--border-color] ps-2">
          <div className="flex items-center w-full">
            <Search color='#ff6d4d' size={18} />
            <input style={{ border: 'none' }} className="mw-[23.25rem] w-full bg-transparent p-1 placeholder:text-sm border-0 outline-none focus:outline-none focus-visible:outline-none"
              type="search" placeholder="Search Any Food ..." />
          </div>
          <button className="bg-[--primary-light] text-white">Search</button>
        </div>

        <div className="grid grid-cols-2 gap-6 py-16">
          {category?.attributes.products.data.map(product => (
            <div className="relative flex items-center justify-between border h-[170px] px-4 rounded-lg gap-5">
              {product.attributes.isNew && <div className="absolute right-0 top-0 bg-[--primary-light] text-white px-3 rounded-se-lg text-sm py-1">New !!</div>}
              {product.attributes.discount && <div className="absolute left-0 top-0 bg-red-500 text-white px-3 rounded-ss-lg text-sm py-1">-{product.attributes.discount}%</div>}
              <div className="flex gap-4 items-center">
                <img src={product.attributes.img.data.attributes.url} className="w-[120px] rounded" alt="" />
                <div className="">
                  <h4 className="mb-2 capitalize text-[20px]">{product.attributes.title}</h4>
                  {product.attributes.discount ? (
                    <p className="text-[--primary] font-[600]">
                      <span className="text-[#2f4cdd8a] text-[14px] font-[600] line-through">${product.attributes.price.toFixed(2)}</span> ${(product.attributes.price - (product.attributes.price * product.attributes.discount / 100)).toFixed(2)}
                    </p>
                  ) : (
                    <span className="text-[--primary] font-[600]">${product.attributes.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <Rating starsCount={product.attributes.stars} />
                <div className="bg-[--primary] rounded p-2 cursor-pointer">
                  <ShoppingCart color="white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Category