import { useAppSelector } from "../../app/store"
import { pos } from "../../assets"
import Carousel from "../../components/Carousel"
import OrderView from "../../components/OrderView"
import Sidebar from "../../components/Sidebar"
import ListItem from "../../components/ui/ListItem"
import ProductCard from "../../components/ui/ProductCard"
import { posSideBarLinks, products } from "../../constants"

const Pos = () => {
    const isToggle = useAppSelector(state => state.toggleSideBar.value)

    return (
        <div className="container mx-auto flex flex-col justify-center md:flex-row md:justify-between w-full gap-4 items-start mt-24">
            <OrderView />
            {isToggle && <>
                <Sidebar> {/*responsive issue*/ }
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
                {
                    products.map(product =>
                        <ProductCard {...product} />)
                }
                </div>
            </div>
        </div>
    )
}

export default Pos