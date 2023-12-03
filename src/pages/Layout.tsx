import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <div className="bg-[#fbfbfb] min-h-screen">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout