import { ReactNode } from "react"
import { logoFull } from "../../../assets"

interface IProps {
    children: ReactNode;
}
const FormWrapper = ({ children }: IProps) => {
    return (
        <div className="w-full shadow-lg m-auto h-full rounded-md bg-white p-12 flex flex-col justify-center items-center gap-4">
            <div className="logo">
                <img src={logoFull} className="w-[168px]" alt="davur logo" />
            </div>
            {children}
        </div>
    )
}

export default FormWrapper