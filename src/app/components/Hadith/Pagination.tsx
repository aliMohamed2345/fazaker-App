import { PiArrowFatRightThin, PiArrowFatLeftThin } from "react-icons/pi";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const Pagination = () => {
    const { Api, title, HadithPerPage } = useSelector((state: RootState) => state.Pagination)
    const NumberOfHadith = useSelector((state: RootState) => state.SearchHadith.NumberOfHadith)
    const currentPage = Number(useParams().HadithId);
    const totalPages = Math.ceil(NumberOfHadith / HadithPerPage);
    // Calculate previous and next page numbers
    const prevPage = Math.max(currentPage - 1, 1);
    const nextPage = Math.min(currentPage + 1, totalPages);

    // Generate pagination items
    const paginationItems = [];
    const maxButtons = 5; // Number of visible page buttons
    const halfRange = Math.floor(maxButtons / 2);

    let startPage = Math.max(currentPage - halfRange, 1);
    let endPage = Math.min(currentPage + halfRange, totalPages);

    if (endPage - startPage + 1 < maxButtons) {
        startPage = Math.max(endPage - maxButtons + 1, 1);
        endPage = Math.min(startPage + maxButtons - 1, totalPages);
    }

    if (startPage > 2) {
        paginationItems.push(
            <button type="button" key="ellipsis-start" className="btn btn-outline-success disabled">...</button>
        );
    }

    for (let page = startPage; page <= endPage; page++) {
        paginationItems.push(
            <Link
                key={page}
                href={{ pathname: `/Hadith/${page}`, query: { Hadith: Api, HadithName: title, NumberOfHadith: NumberOfHadith } }}
                className={`btn btn-outline-success ${currentPage === page ? 'active' : ''}`}
            >
                {page}
            </Link>
        );
    }

    if (endPage < totalPages - 1) {
        paginationItems.push(
            <button type="button" key="ellipsis-end" className="btn btn-outline-success disabled">...</button>
        );
    }

    return (
        <div className="container d-flex gap-3 justify-content-center pt-5 pb-5 flex-wrap">
            <Link
                href={{ pathname: `/Hadith/${prevPage}`, query: { Hadith: Api, HadithName: title, NumberOfHadith: NumberOfHadith } }}
                className="btn btn-outline-success"
            >
                <PiArrowFatLeftThin />
            </Link>
            {paginationItems}
            <Link
                href={{ pathname: `/Hadith/${nextPage}`, query: { Hadith: Api, HadithName: title, NumberOfHadith: NumberOfHadith } }}
                className="btn btn-outline-success"
            >
                <PiArrowFatRightThin />
            </Link>
        </div>
    );
}

export default Pagination;
