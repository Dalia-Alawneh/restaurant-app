import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'
interface IProps {
    text: string;
    path: string;
    icon: ReactNode;
}
const SideBarLink = ({ text, path, icon }: IProps) => {
    return (
        <NavLink key={"nav-link" + text} className="text-[#333]" to={path}>
            <li className='flex items-center px-5 gap-3 mb-3 hover:bg-[#527aff70] hover:text-[--primary] p-2'>
                {icon}
                {text}
            </li>
        </NavLink>
    )
}

export default SideBarLink