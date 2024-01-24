import { Link } from "react-router-dom"
import { logoFull, userDefaultImage } from "../../../assets"
import ListItem from "../../../components/ui/ListItem"
import { navLinks } from "../../../constants"
const Navbar = () => {

    return (
        <nav className="flex shadow-md justify-between z-40 bg-white">
            <div className='px-2 md:px-10 flex py-4 items-center justify-between w-full'>
                <Link to='/' className='w-[150px]'>
                    <img src={logoFull} className='w-full' alt="davur logo" />
                </Link>
                <ul className='hidden md:flex gap-8 justify-center'>
                    {navLinks.map(link => (
                        <ListItem key={"nav-link" + link.text} {...link} />
                    ))}
                </ul>
                <div className={`user flex gap-3 items-center justify-end `}>
                    <img src={userDefaultImage} alt="user image" className='w-[60px] h-[60px] rounded-full p-1 border-[3px] border-x-[--link-active-color]' />
                </div>
            </div>


        </nav>
    )
}

export default Navbar