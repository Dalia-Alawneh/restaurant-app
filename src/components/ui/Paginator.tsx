import { ChevronLeft, ChevronRight } from "lucide-react";
import { IProduct } from "../../interfaces";
import { getData } from "../../utils/helpers";
import { useState, useEffect } from 'react'
interface IProps {
    pageSize: number;
    products: IProduct[];
    setProducts: (products: IProduct[]) => void;
}
const Paginator = ({ pageSize, products, setProducts }: IProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    console.log(totalPages);

    const fetchData = async () => {
        console.log('Fetching data for page:', currentPage);
        try {
            const data = await getData(
                `/products?populate=categories&populate=img&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}`
            );
            console.log('data is ');

            console.log(data.data)

            setProducts(data.data || []);
            setTotalPages(data.meta.pagination?.pageCount || 1)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        console.log('Current page:', page);
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