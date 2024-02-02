import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

const ClientLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default ClientLayout