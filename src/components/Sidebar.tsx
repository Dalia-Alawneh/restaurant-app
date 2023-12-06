import { ReactNode } from "react"
interface IProps {
    children: ReactNode;
}
const Sidebar = ({children}: IProps) => {
    return (
        <aside className="max-w-[280px] top-[92px] min-h-screen p-3 shadow-md fixed start-0 w-full bg-white z-20">
            <ul className="flex-col mt-5 max-w-100 space-y-5">
                {children}
            </ul>
        </aside>
    )
}

export default Sidebar