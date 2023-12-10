import { useEffect, useState } from "react"
import Carousel from "../../components/Carousel"
import OrderView from "../../components/OrderView"
import ProductCard from "../../components/ui/ProductCard"
import { getData } from "../../utils/helpers"
import { IProduct } from "../../interfaces"
import Paginator from "../../components/ui/Paginator"
import withWrapper from "../../components/hoc/withWrapper"
import toast from "react-hot-toast/headless"

const Pos = withWrapper(() => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});

    const setData = async () => {
        try {
            const data = await getData('/products?populate=categories&populate=img&pagination[pageSize]=3&pagination[page]=1')
            if (data.data.length) {
                setIsLoading(false)
                setProducts(data.data)
            }
        } catch (e) {
            toast.error('Something goes wrong.!🥲')
        }
    }
    useEffect(() => {
        toast.success('Successfully toasted!')
        setData()
    }, [])
    return (
        <>
        <div className="mx-auto flex flex-col justify-center md:flex-row md:justify-between w-full gap-4 items-start mt-24">
            
            <OrderView setSelectedProducts={setSelectedProducts} />
            <div className="w-full md:w-2/3">
                <Carousel setProducts={setProducts} />
                <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full justify-start gap-6">

                    {products.map(product => (
                        <ProductCard isLoading={isLoading}
                            key={product.id}
                            isSelectProduct={selectedProducts[product.id] || false}
                            setIsSelectProduct={(value) =>
                                setSelectedProducts((prevSelected) => ({ ...prevSelected, [product.id]: value }))
                            }
                            attributes={product.attributes}
                            id={product.id}
                            img={`http://localhost:1337${product.attributes.img?.data.attributes.url}`}
                        />
                    ))}
                </div>
                <Paginator setItems={setProducts} pageSize={3} entity="products" />
            </div>


        </div>
        </>
    )
})

export default Pos