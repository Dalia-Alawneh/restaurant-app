import { Link } from 'react-router-dom'
import { close, logo, menu, userDefaultImage } from '../assets'
import { navLinks } from '../constants'
import ListItem from './ui/ListItem'
const Navbar = ({setIsToggle, isToggle}:{setIsToggle:(isToggle:boolean)=>void, isToggle:boolean}) => {
    return (
        <nav className="fixed w-full top-0 flex shadow-md justify-between z-40 bg-white">
            <div className="bg-[--primary] px-6 flex items-stretch cursor-pointer" onClick={()=> setIsToggle(!isToggle)}>
                <img src={isToggle? close : menu} className='w-[30px]' alt="" />
            </div>
            <div className='px-2 md:px-10 py-4 flex  items-center justify-between w-full'>
                <Link to='/' className='logo'>
                    <img src={logo} className='w-full' alt="davur logo" />
                </Link>
                <ul className='hidden md:flex gap-8 justify-center'>
                    {navLinks.map(link => (
                        <ListItem key={"nav-link" + link.text} {...link} />
                    ))}
                </ul>
                <div className="user flex gap-3 items-center justify-end">
                    <div className="text-right">
                        <h3 className='font-bold'>{'Dalia AL.'.slice(0,5)}</h3>
                        <span className='font-light text-sm hidden sm:inline'>Super Admin</span>
                    </div>
                    <img src={userDefaultImage} alt="user image" className='w-[60px] h-[60px] rounded-full p-1 border-[3px] border-x-[--link-active-color]' />
                </div>
            </div>


        </nav>
    )
}

export default Navbar