import { ReactNode } from 'react'
import { Link } from 'react-router-dom';
interface IProps {
    status?: number;
    title?: string;
    children?: ReactNode;
}
const ErrorHandler = ({ status = 500, title = "❌ Server Error", children }: IProps) => {
    return (
        <div className='fixed inset-0 bg-[#fadcd6] flex flex-col items-center gap-4 justify-center z-50'>
            <h1 className='font-extrabold text-[150px]'>{status}</h1>
            <h2 className='font-bold'>{title}</h2>
            {children ?? <Link to='/' className='bg-[--primary-light] text-white py-3 px-4 rounded-lg hover:text-white shadow-lg transition-[1s] hover:shadow-[--primary-light] '>Back To Home</Link>}
        </div>
    )
}

export default ErrorHandler