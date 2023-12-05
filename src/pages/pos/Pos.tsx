import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/store"
import Carousel from "../../components/Carousel"
import OrderView from "../../components/OrderView"
import Sidebar from "../../components/Sidebar"
import ListItem from "../../components/ui/ListItem"
import ProductCard from "../../components/ui/ProductCard"
import { posSideBarLinks } from "../../constants"
import { getData } from "../../utils/helpers"
import { IProduct } from "../../interfaces"
import Paginator from "../../components/ui/Paginator"
import withWrapper from "../../components/hoc/withWrapper"

const Pos = withWrapper(() => {
    const isToggle = useAppSelector(state => state.toggleSideBar.value)
    const [products, setProducts] = useState<IProduct[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});
    const setData = async () => {
        const data = await getData('/products?populate=categories&populate=img&pagination[pageSize]=5&pagination[page]=1')
        if(data.data.length){
            setIsLoading(false)
            setProducts(data.data)
        }
    }
    useEffect(() => {
        setData()
    }, [])
    return (
        <div className="mx-auto flex flex-col justify-center md:flex-row md:justify-between w-full gap-4 items-start mt-24">
            <OrderView setSelectedProducts={setSelectedProducts} />
            {isToggle && <>
                <Sidebar> {/*responsive issue*/}
                    {posSideBarLinks.map(link => (
                        <ListItem key={"nav-link" + link.text} {...link} />
                    ))}
                </Sidebar>
                <div className="overlay fixed inset-0 bg-[#2c2c2f70] z-10 m-0">
                </div>
            </>
            }
            <div className="w-full md:w-2/3">
                <Carousel />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full justify-start gap-6">

                    {products.map(product => (
                        <ProductCard isLoading={isLoading}
                            key={product.id}
                            isSelectProduct={selectedProducts[product.id] || false}
                            setIsSelectProduct={(value) =>
                                setSelectedProducts((prevSelected) => ({ ...prevSelected, [product.id]: value }))
                            }
                            attributes={product.attributes}
                            id={product.id}
                            img={`http://localhost:1337${product.attributes.img.data.attributes.url}`}
                        />
                    ))}
                </div>
            <Paginator products={products} setProducts={setProducts} pageSize={3}/>

            </div>
        </div>
    )
})

export default Pos