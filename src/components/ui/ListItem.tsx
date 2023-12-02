import {NavLink} from 'react-router-dom'
interface IProps {
    text: string;
    path: string;
}
const ListItem = ({ text, path }: IProps) => {
    return (
        <li>
            <NavLink key={"nav-link" + text} to={path}>{text}</NavLink>
        </li>
    )
}

export default ListItem