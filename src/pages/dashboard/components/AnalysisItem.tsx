import { ReactNode } from 'react'
import ItemWrapper from './ItemWrapper';
interface IProps {
    icon: ReactNode;
    title: string;
    value: string;
}
const AnalysisItem = ({ icon, title, value }: IProps) => {
    return (
        <ItemWrapper>
            <div className="text-[--primary] bg-[--primary-extra-light] w-fit p-2 rounded-lg" >
                {icon}
            </div>
            <p className="my-3">{title}</p>
            <p className="text-[35px] font-bold">{value}</p>
        </ItemWrapper>
    )
}

export default AnalysisItem