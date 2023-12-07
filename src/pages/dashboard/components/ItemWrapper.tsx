import { ReactNode } from 'react'
interface IProps {
    children: ReactNode;
}
const ItemWrapper = ({ children }: IProps) => {
    return (
        <div className="bg-white rounded-lg p-8 my-5">
            {children}
        </div>
    )
}

export default ItemWrapper