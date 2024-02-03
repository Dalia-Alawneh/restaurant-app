import { ReactNode } from "react";

interface IProps {
  title: ReactNode;
  subTitle: string;
  align: string;
}
const StyledTitle = ({subTitle,title, align }: IProps) => {
  return (
    <div className={`flex flex-col items-${align} justify-center`}>
      <h3 className="text-[18px] font-[400] text-[--primary]">{subTitle}</h3>
      {title}
    </div>
  )
}

export default StyledTitle