
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import { logo } from '../../assets'
import SideBarLink from '../../components/ui/SideBarLink'
import { CircleDollarSign, LayoutDashboard, LogOutIcon, UserRound, Wallet } from 'lucide-react'
const DashboardLayout = () => {
    const [isToggle, setIsToggle] = useState<boolean>(false)
    return (
        <div className="bg-[#fbfbfb] min-h-screen">
            <Sidebar>
                <>
                    <ul className="flex-col max-w-100 gap-16">
                        <div className='ps-5 pb-16'><img src={logo} className='w-[120px]' alt="" /></div>
                        <SideBarLink icon={<UserRound size={20} color="#1f3786" />} path="/transaction" text="orders" />
                        <SideBarLink icon={<CircleDollarSign size={20} color="#1f3786" />} path="/" text="pos" />
                        <SideBarLink icon={<Wallet size={20} color="#1f3786" />} path="/wallet" text="wallet" />
                        <SideBarLink icon={<LayoutDashboard size={20} color="#1f3786" />} path="/dashboard" text="dashboard" />
                    </ul>
                    <div className="border-t flex px-5 gap-2 hover:bg-[--sec-extra-light] cursor-pointer py-4">
                        <LogOutIcon color="#f77" />
                        <p className="text-[#f77] font-semibold">Logout</p>
                    </div>
                </>
            </Sidebar>
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

export default DashboardLayout