import { useAppSelector } from "../../app/store"
import { pos } from "../../assets"
import Carousel from "../../components/Carousel"
import OrderView from "../../components/OrderView"
import Sidebar from "../../components/Sidebar"
import ListItem from "../../components/ui/ListItem"
import { posSideBarLinks } from "../../constants"

const Pos = () => {
    const isToggle = useAppSelector(state => state.toggleSideBar.value)

    return (
        <div className="flex justify-between w-full gap-4 items-start mt-24">
            <OrderView />
            {isToggle && <>
                <Sidebar>
                    {posSideBarLinks.map(link => (
                        <ListItem key={"nav-link" + link.text} {...link} />
                    ))}
                </Sidebar>
                <div className="overlay fixed inset-0 bg-[#2c2c2f70] z-10 m-0">
                </div>
            </>
            }

            <Carousel />
        </div>
    )
}

export default Pos