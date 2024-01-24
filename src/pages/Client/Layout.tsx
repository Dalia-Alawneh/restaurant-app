import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

interface IProps {

}
const ClientLayout = ({ }: IProps) => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default ClientLayout