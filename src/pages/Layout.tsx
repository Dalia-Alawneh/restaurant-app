import { useAppSelector } from "../app/store"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Outlet } from 'react-router-dom'
import Sidebar from "../components/Sidebar"
import { posSideBarLinks } from "../constants"
import ListItem from "../components/ui/ListItem"
import {useState} from 'react'
const RootLayout = () => {
    // const isToggle = useAppSelector(state => state.toggleSideBar.value)
    const [isToggle, setIsToggle] = useState<boolean>(false)
    return (
        <div className="bg-[#fbfbfb] min-h-screen">
            <Navbar isToggle={isToggle} setIsToggle={setIsToggle} />
            {
            isToggle && <>
                <Sidebar> {/*responsive issue*/}
                    {posSideBarLinks.map(link => (
                        <ListItem key={"nav-link" + link.text} {...link} />
                    ))}
                </Sidebar>
                <div className="overlay fixed inset-0 bg-[#2c2c2f70] z-10 m-0">
                </div>
            </>
            }
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout