import { ReactNode } from 'react'
import ItemWrapper from './ItemWrapper';
interface IProps {
    icon: ReactNode;
    title: string;
    value: string;
    bgColor: string;
    textColor: string;
}
const AnalysisItem = ({ icon, title, value, bgColor, textColor }: IProps) => {
    return (
        <ItemWrapper>
            <div className={`w-fit p-2 rounded-lg`} style={{backgroundColor:bgColor, color:textColor}} >
                {icon}
            </div>
            <p className="my-3">{title}</p>
            <p className="text-[35px] font-bold">{value}</p>
        </ItemWrapper>
    )
}

export default AnalysisItem