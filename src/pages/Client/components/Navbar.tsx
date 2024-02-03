import { Link, NavLink } from "react-router-dom"
import { close, logoFull, menu } from "../../../assets"
import { clientNavLinks } from "../../../constants"
import { PhoneCallIcon, ShoppingBagIcon } from "lucide-react"
import { useState } from "react"
const Navbar = () => {

    const [isToggle, setIsToggle] = useState<boolean>(false)
    return (
        <nav className="flex fixed w-full top-0 shadow-md justify-between z-40 bg-white">
            <div className='container md:px-10 flex py-4 items-center justify-between w-full'>
                <div className="flex items-center gap-20">
                    <Link to='/' className='w-[150px]'>
                        <img src={logoFull} className='w-full' alt="davur logo" />
                    </Link>
                    <ul className='hidden lg:flex gap-8 justify-start'>
                        {clientNavLinks.map(link => (
                            <li className="mt-1" key={"nav-link" + link.text}>
                                <NavLink className="capitalize" to={link.path}>{link.text}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`user hidden lg:flex gap-3 items-center justify-end `}>
                    <div className="phone flex gap-3">
                        <PhoneCallIcon className="move-animation" width={20} color="#2f4cdd" />
                        <a href="tel:+9705984758500">(+970) 5984758500</a>
                    </div>
                    <Link to='/cart' className="cart relative">
                        <ShoppingBagIcon width={22} color="#2f4cdd" />
                        <div className="absolute top-[-10px] left-[10px] badg rounded-full bg-[--primary] text-white text-[12px] font-bold flex items-center justify-center w-[20px] h-[20px]">
                            1
                        </div>
                    </Link>
                </div>
                <div className="lg:hidden bg-[--primary] p-3 rounded-lg cursor-pointer" onClick={() => setIsToggle(!isToggle)}>
                    <img src={isToggle ? close : menu} className='relative z-20 w-[20px] h-[20px]' alt="" />
                </div>
                {isToggle &&
                    <>
                        <div className="lg:hidden left-0 top-0 px-4 pt-4 min-w-[260px] fixed z-20 h-screen bg-white">
                            <Link to='/' className='w-[150px]'>
                                <img src={logoFull} className='w-[150px]' alt="davur logo" />
                            </Link>
                            <ul className='mt-10 flex flex-col gap-4 justify-start'>
                                {clientNavLinks.map(link => (
                                    <li className="mt-1 border-b border-[#CFDBED] pb-2" key={"nav-link" + link.text}>
                                        <NavLink className="capitalize" to={link.path}>{link.text}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div onClick={() => setIsToggle(false)} className="lg:hidden overlay fixed inset-0 bg-[#2c2c2f53] backdrop-blur-sm z-10 m-0">
                        </div>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar