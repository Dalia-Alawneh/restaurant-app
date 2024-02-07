import { Link, NavLink } from "react-router-dom"
import { close, logoFull, menu, userDefaultImage } from "../../../assets"
import { clientNavLinks } from "../../../constants"
import { LogOutIcon, PhoneCallIcon, ShoppingBagIcon, User2Icon } from "lucide-react"
import { useState } from "react"
import { useAppSelector } from "../../../app/store"
import { getUserFromCookies } from "../../../helpers/getUserFromCookies"
import { IUser } from "../../../interfaces"
import UserDropDown from "../../../components/ui/UserDropDown"
import useLogout from "../../../hooks/useLogout"
const Navbar = () => {
    const { items } = useAppSelector((state) => state.cart)
    const [isToggle, setIsToggle] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false)
    const loggedInUser: IUser | null = getUserFromCookies();
    const handleLogout = useLogout()
    return (
        <nav className="flex fixed w-full top-0 shadow-md justify-between z-40 bg-white">
            <div className='container md:px-10 flex py-5 items-center justify-between w-full'>
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
                        <a href="tel:+9705984758500"><span>(+970) 5984758500</span></a>
                    </div>
                    <Link to='/home/cart' className="cart relative">
                        <ShoppingBagIcon width={22} color="#2f4cdd" />
                        <div className="absolute top-[-10px] left-[10px] badg rounded-full bg-[--primary] text-white text-[12px] font-bold flex text-center items-center justify-center w-[20px] h-[20px]">
                            <span>{items.length}</span>
                        </div>
                    </Link>
                    <div className="ps-4">
                        {
                            loggedInUser ? <>
                                <img src={userDefaultImage}
                                    onClick={() => setIsOpen(!isOpen)}
                                    alt="user image"
                                    className='cursor-pointer w-[40px] h-[40px] rounded-full p-1 border-[3px] border-x-[--link-active-color]' />
                                <UserDropDown isOpen={isOpen} redirectRoute="/home">
                                    <Link to='/home/profile' className="py-3 flex gap-4 px-4 items-center hover:bg-[#4b4bed57] hover:text-[#4b4bed]">
                                        <User2Icon color="#4b4bed" size={20} />
                                        <p className="capitalize text-[#333333e9]" style={{ letterSpacing: '1px' }}>{loggedInUser?.username}</p>
                                    </Link>
                                </UserDropDown>
                            </>
                                : <Link to='/auth' className="bg-[--primary] text-white font-[600] py-2 px-2 rounded-lg uppercase hover:text-white">Login</Link>
                        }
                    </div>
                </div>
                <div className="lg:hidden bg-[--primary] p-3 rounded-lg cursor-pointer" onClick={() => setIsToggle(!isToggle)}>
                    <img src={isToggle ? close : menu} className='relative z-20 w-[20px] h-[20px]' alt="" />
                </div>
                {isToggle &&
                    <>
                        <div className="flex flex-col justify-between lg:hidden left-0 top-0 px-4 pt-4 min-w-[260px] fixed z-20 h-screen bg-white">
                            <div>
                                <Link to='/' className='w-[150px]'>
                                    <img src={logoFull} className='w-[150px]' alt="davur logo" />
                                </Link>
                                {
                                    loggedInUser ? <>
                                        <Link to='/home/profile' className="my-5 py-3 flex gap-4 items-centertext-[#4b4bed]">
                                            <User2Icon color="#4b4bed" size={20} />
                                            <p className="capitalize text-[#333333e9]" style={{ letterSpacing: '1px' }}>{loggedInUser?.username}</p>
                                        </Link>
                                    </>
                                        : <Link to='/auth' className="bg-[--primary] text-white font-[600] py-2 px-2 rounded-lg uppercase hover:text-white">Login</Link>
                                }
                                <ul className='mt-10 flex flex-col gap-4 justify-start'>
                                    {clientNavLinks.map(link => (
                                        <li className="mt-1 border-b border-[#CFDBED] pb-2" key={"nav-link" + link.text}>
                                            <NavLink className="capitalize" to={link.path}>{link.text}</NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p onClick={() => handleLogout('/home')} className="cursor-pointer flex py-3 gap-4 my-20 items-center text-[#923030]"><LogOutIcon size={20} color="red" />Logout</p>
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