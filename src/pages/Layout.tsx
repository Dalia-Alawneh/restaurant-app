import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from 'react'
import SideBarLink from "../components/ui/SideBarLink"
import { CircleDollarSign, LayoutDashboard, LogOutIcon, UserRound, Wallet } from "lucide-react"
import { useAppDispatch } from "../app/store"
import { logout } from "../features/user"
const RootLayout = () => {
    const [isToggle, setIsToggle] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout)
        setTimeout(() => navigate('/auth'), 1000)
    }
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
                isToggle && <>
                    <Sidebar>
                        <>
                            <ul className="flex-col mt-5 max-w-100 gap-16">
                                <SideBarLink icon={<UserRound size={20} color="#1f3786" />} path="/transaction" text="orders" />
                                <SideBarLink icon={<CircleDollarSign size={20} color="#1f3786" />} path="/" text="pos" />
                                <SideBarLink icon={<Wallet size={20} color="#1f3786" />} path="/wallet" text="wallet" />
                                <SideBarLink icon={<LayoutDashboard size={20} color="#1f3786" />} path="/dashboard" text="dashboard" />
                            </ul>
                            <div className="border-t flex px-5 gap-2 hover:bg-[--sec-extra-light] cursor-pointer py-4">
                                <LogOutIcon color="#f77" />
                                <p className="text-[#f77] font-semibold cursor-pointer" onClick={handleLogout}>Logout</p>
                            </div>
                        </>
                    </Sidebar>
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