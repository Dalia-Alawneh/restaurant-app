import { ReactNode } from 'react'
interface IProps {
    type: string;
    placeholder: string;
    icon: ReactNode;
}
const Input = ({ type, placeholder, icon }: IProps) => {
    return <div className='flex w-[23.25rem] items-center border border-[--border-color] px-3 py-2 gap-3 rounded-lg mb-8'>
        {icon}
        <input type={type} placeholder={placeholder} className="w-full text-md bg-transparent p-1 placeholder:text-sm border-0 outline-none focus:outline-none focus-visible:outline-none" />
    </div>
}

export default Input