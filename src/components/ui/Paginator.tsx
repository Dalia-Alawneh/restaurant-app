import { ChevronLeft, ChevronRight } from "lucide-react";
import { getData } from "../../utils/helpers";
import { useState, useEffect } from 'react'
interface IProps {
    pageSize: number;
    setItems: (Items: []) => void;
    entity:string;
}
const Paginator = ({ pageSize,setItems, entity }: IProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const fetchData = async () => {
        try {
            const data = await getData(
                `/${entity}?populate=categories&populate=img&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}`
            );
            setItems(data.data || []);
            setTotalPages(data.meta.pagination?.pageCount || 1)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div>
            <div className="pagination flex gap-3 my-8 justify-end">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft />
            </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button className={`bg-[#f0f0f0] ${currentPage === page ? "active" : ""}`} key={page} onClick={() => handlePageChange(page)}>
                        {page}
                    </button>
                ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <ChevronRight />
            </button>
            </div>
        </div>
    );
};

export default Paginator;