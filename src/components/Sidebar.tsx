
import {ReactNode} from 'react'
const Sidebar = ({children}:{children:ReactNode}) => {
    return (
        <aside className="flex flex-col justify-between max-w-[280px] min-h-screen pt-[7rem] pb-5 shadow-md  start-0 w-full text-[#f77] bg-white fixed z-30">
            {children}
        </aside>
    )
}

export default Sidebar