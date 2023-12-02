import { ReactNode } from 'react'
interface IProps {
    status: number;
    title: string;
    children?: ReactNode;
}
const ErrorHandler = ({ status = 500, title = "Server Error", children }: IProps) => {
    return (
        <div>
            {status}
            <p>{title}</p>
            {children}
        </div>
    )
}

export default ErrorHandler