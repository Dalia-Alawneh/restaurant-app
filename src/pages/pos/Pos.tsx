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

const Pos = () => {
    const isToggle = useAppSelector(state => state.toggleSideBar.value)
    const [products, setProducts] = useState<IProduct[]>([])
    const [isSelectProduct, setIsSelectProduct] = useState(false)

    const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});

    console.log(products);

    const setData = async () => {
        const data = await getData('/products?populate=img')
        setProducts(data)
    }
    useEffect(() => {
        setData()
    }, [])
    return (
        <div className="container mx-auto flex flex-col justify-center md:flex-row md:justify-between w-full gap-4 items-start mt-24">
            <OrderView setSelectedProducts={setSelectedProducts}/>
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
                <div className="flex flex-wrap justify-center gap-4">
                    {products.map(product => (
                        <ProductCard
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
            </div>
        </div>
    )
}

export default Pos