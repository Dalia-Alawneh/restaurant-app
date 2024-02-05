import { Link } from "react-router-dom";
import { subPagebg } from "../../../../assets";

interface IProps {
    title:string;
    page: string;
}
const PageSubHeadBreadCrumb = ({title, page}: IProps) => {
    return (
        <div className="relative z-20 bg-cover sub-head h-[40vh] flex flex-col gap-4 items-center justify-center text-white" style={{backgroundImage : `url(${subPagebg})`}}>
            <h1 className="capitalize text-[52px] font-[600]">{title}</h1>
            <nav className="flex pb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <Link to='/home' className="inline-flex items-center text-sm font-medium text-white  dark:text-white dark:hover:text-white">
                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Home
                    </Link>
                </li>

                <li aria-current="page">
                    <div className="flex items-center">
                        <svg className="rtl:rotate-180 w-3 h-3 text-white mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="ms-1 text-sm font-medium text-[#ffffffb6] md:ms-2 dark:text-white capitalize">{page}</span>
                    </div>
                </li>
            </ol>
        </nav>
        </div>
    )
}

export default PageSubHeadBreadCrumb