import { NavLink, Link } from 'react-router-dom'
import { logo, userDefaultImage } from '../assets'

const Navbar = () => {
    return (
        <nav className="flex fixed top-0 start-0 px-4 sm:px-16 py-8 items-center justify-between w-full">
            <Link to='/' className='logo'>
                <img src={logo} className='w-full' alt="davur logo" />
            </Link>
            <ul className='hidden md:flex gap-8 justify-center'>
                <NavLink to='/'>pos</NavLink>
                <NavLink to='transaction'>transaction</NavLink>
                <NavLink to='dashboard'>dashboard</NavLink>
            </ul>
            <div className="user flex gap-3 items-center justify-end">
                <div className="text-right">
                    <h3 className='font-bold'>Dalia AL.</h3>
                    <span className='font-light text-sm'>Super Admin</span>
                </div>
                <img src={userDefaultImage} alt="user image" className='w-[60px] h-[60px] rounded-full p-1 border-[3px] border-x-[--link-active-color]' />
            </div>
        </nav>
    )
}

export default Navbar