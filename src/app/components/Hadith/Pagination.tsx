import { PiArrowFatRightThin, PiArrowFatLeftThin } from "react-icons/pi";
import Link from "next/link";
interface PaginationProps {

}

const Pagination = ({ }) => {
    return (<>
        <div className="container d-flex gap-3 justify-content-center pt-5 pb-5">

            <Link href='#' className="btn btn-outline-success"><PiArrowFatLeftThin /></Link>
            <Link href='#' className="btn btn-outline-success active">1</Link>
            <Link href='#' className="btn btn-outline-success">2</Link>
            <Link href='#' className="btn btn-outline-success">3</Link>
            <Link href='#' className="btn btn-outline-success">4</Link>
            <Link href='#' className="btn btn-outline-success">5</Link>
            <Link href='#' className="btn btn-outline-success "><PiArrowFatRightThin /></Link>

        </div>
    </>);
}

export default Pagination;