import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Outlet } from 'react-router-dom'
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from 'react'
import SideBarLink from "../components/ui/SideBarLink"
import { CircleDollarSign, LogOutIcon, Menu, UserRound, Wallet } from "lucide-react"
import useLogout from "../hooks/useLogout"
import { getUserFromCookies } from "../helpers/getUserFromCookies"
import { IUser } from "../interfaces"
const RootLayout = () => {
    const [isToggle, setIsToggle] = useState<boolean>(false)
    const handleLogout = useLogout()
    const loggedInUser: IUser | null = getUserFromCookies();
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsToggle(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (
        <div className="bg-[#fbfbfb] min-h-screen">
            <Navbar isToggle={isToggle} setIsToggle={setIsToggle} />
            {
                    isToggle && loggedInUser && <>
                        <Sidebar>
                            <>
                                <ul className="flex-col mt-5 max-w-100 gap-16">
                                    <SideBarLink icon={<Menu size={20} color="#1f3786" />} path="/dashboard/menus" text="menus" />
                                    <SideBarLink icon={<UserRound size={20} color="#1f3786" />} path="/transaction" text="orders" />
                                    <SideBarLink icon={<CircleDollarSign size={20} color="#1f3786" />} path="/" text="pos" />
                                    <SideBarLink icon={<Wallet size={20} color="#1f3786" />} path="/wallet" text="wallet" />
                                </ul>
                                <div onClick={() => handleLogout('/')} className="border-t flex px-5 gap-2 hover:bg-[--sec-extra-light] cursor-pointer py-4">
                                    <LogOutIcon color="#f77" />
                                    <p className="text-[#f77] font-semibold">Logout</p>
                                </div>
                            </>
                        </Sidebar>
                        <div onClick={() => setIsToggle(false)} className="overlay fixed inset-0 bg-[#2c2c2f53] backdrop-blur-sm z-10 m-0">
                        </div>
                    </>
                }
                {
                    isToggle && <>
                        <div onClick={() => setIsToggle(false)} className="overlay fixed inset-0 bg-[#2c2c2f53] backdrop-blur-sm z-10 m-0">
                        </div>
                    </>
                }
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout