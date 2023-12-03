import {ButtonHTMLAttributes} from 'react'
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text:string;
}
const Button = ({text, ...rest}: IProps) => {
    return (
        <button {...rest}>{text}</button>
    )
}

export default Button