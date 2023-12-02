import { ReactNode } from "react"

interface IProps {
    children: ReactNode;
}
const Sidebar = ({children}: IProps) => {
    return (
        <aside className="min-w-[280px]">
            <span className="text-blue-200 text-sm ps-3">GET STARTED</span>
            <ul className="flex-col mt-5 max-w-100 gap-5">
                {children}
            </ul>
        </aside>
    )
}

export default Sidebar