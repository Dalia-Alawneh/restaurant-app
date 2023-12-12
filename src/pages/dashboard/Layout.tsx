
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import SideBarLink from '../../components/ui/SideBarLink'
import { CircleDollarSign, LogOutIcon, Menu, UserRound, Wallet } from 'lucide-react'
import Navbar from '../../components/Navbar'
const DashboardLayout = () => {
    const [isToggle, setIsToggle] = useState<boolean>(false)
    return (
        <div className='bg-[#fbfbfb]'>
            <div className=" min-h-screen">
                <Navbar isToggle={isToggle} setIsToggle={setIsToggle} />
                {
                    isToggle && <>
                        <Sidebar>
                            <>
                                <ul className="flex-col mt-5 max-w-100 gap-16">
                                    <SideBarLink icon={<Menu size={20} color="#1f3786" />} path="/dashboard/menus" text="menus" />
                                    <SideBarLink icon={<UserRound size={20} color="#1f3786" />} path="/transaction" text="orders" />
                                    <SideBarLink icon={<CircleDollarSign size={20} color="#1f3786" />} path="/" text="pos" />
                                    <SideBarLink icon={<Wallet size={20} color="#1f3786" />} path="/wallet" text="wallet" />
                                </ul>
                                <div className="border-t flex px-5 gap-2 hover:bg-[--sec-extra-light] cursor-pointer py-4">
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
            </div>
            <Footer />

        </div>
    )
}

export default DashboardLayout