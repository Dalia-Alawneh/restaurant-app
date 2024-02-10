import { useEffect, useState } from "react"
import Carousel from "../../components/Carousel"
import OrderView from "../../components/OrderView"
import ProductCard from "../../components/ui/ProductCard"
import { getData } from "../../helpers/api"
import { IProduct } from "../../interfaces"
import Paginator from "../../components/ui/Paginator"
import withWrapper from "../../components/hoc/withWrapper"
import toast from "react-hot-toast/headless"
import { allCategories } from "../../assets"

const Pos = withWrapper(() => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});
    const [isAll, setIsAll] = useState<boolean>(true)
    const setData = async () => {
        try {
            const data = await getData('/products?populate=categories&populate=img&pagination[pageSize]=4&pagination[page]=1')
            if (data.data.length) {
                setIsLoading(false)
                setProducts(data.data)
            }
        } catch (e) {
            toast.error('Something goes wrong.!🥲')
        }
    }
    useEffect(() => {
        setData()
    }, [])
    return (
        <>
            <div className="mx-auto flex flex-col justify-center items-center md:flex-row md:justify-between w-full gap-4 md:items-start mt-24">

                <OrderView setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts} />
                <div className="w-full md:w-2/3">
                    <div className="flex gap-4 w-full">
                        <div className={`${isAll? 'bg-[--sec-color]' :'bg-white'} p-3 rounded-md w-[300px] border cursor-pointer shadow-[0px_2px_7px_2px_var(--sec-extra-light)]`}
                            onClick={() => {
                                setData()
                                setIsAll(true)
                            }}
                        >
                            <div className="card py-3 flex flex-col items-center">
                                <img className='w-16 mb-2 rounded-full' src={allCategories} alt="" />
                                <h3 className="text-center">All Categories</h3>
                            </div>
                        </div>
                        <Carousel isAll={isAll} setIsAll={setIsAll} setProducts={setProducts} />
                    </div>
                    {
                        products.length > 0 ?
                            <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full justify-start gap-6">
                                {
                                    products.map(product => (
                                        <ProductCard isLoading={isLoading}
                                            key={product.id}
                                            isSelectProduct={selectedProducts[product.id] || false}
                                            setIsSelectProduct={(value) =>
                                                setSelectedProducts((prevSelected) => ({ ...prevSelected, [product.id]: value }))
                                            }
                                            attributes={product.attributes}
                                            id={product.id}
                                            img={product.attributes.img?.data.attributes.url}
                                        />
                                    ))
                                }
                            </div>
                            : <div className="w-full flex justify-center mt-8">No Items Found</div>
                    }
                    {isAll && !isLoading && <Paginator setItems={setProducts} pageSize={6} entity="products" />}
                </div>


            </div>
        </>
    )
})

export default Pos