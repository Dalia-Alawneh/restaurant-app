import Sidebar from "../../components/Sidebar"
import ListItem from "../../components/ui/ListItem"
import { posSideBarLinks } from "../../constants"

interface IProps {
    
}
const Pos = ({}: IProps) => {
    return (
        <div>
            <Sidebar>
                {posSideBarLinks.map(link => (
                    <ListItem key={"nav-link"+link.text} {...link}/>
                ))}
            </Sidebar>
        </div>
    )
}

export default Pos