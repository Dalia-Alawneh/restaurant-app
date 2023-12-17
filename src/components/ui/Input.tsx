import { ReactNode, InputHTMLAttributes,ChangeEvent } from 'react'
interface IProps extends InputHTMLAttributes<HTMLInputElement>{
    type: string;
    placeholder: string;
    icon?: ReactNode;
    width?:string;
    name?:string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({ type, placeholder, icon, width = 'w-full', name, onChange }: IProps) => {
    return <div className={`flex items-center ${icon?'px-3 py-2 rounded-lg ': ''} ${width} border border-[--border-color]  gap-3 rounded-lg`}>
        {icon}
        <input type={type} placeholder={placeholder} name={name} onChange={onChange}
        className={`${icon? '' : 'px-3 py-2 rounded-lg '}w-full text-md bg-transparent p-1 placeholder:text-sm border-0 outline-none focus:outline-none focus-visible:outline-none`} />
    </div>
}

export default Input