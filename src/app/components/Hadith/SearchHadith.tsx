import Link from "next/link";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import styles from './Hadith.module.css'

const SearchHadithComponent = () => {
    const Hadith = useSelector((state: RootState) => state.SearchHadith.Hadith);
    const NumberOfHadith = useSelector((state: RootState) => state.SearchHadith.NumberOfHadith);
    const HadithBook = useSelector((state: RootState) => state.SearchHadith.HadithBook);
    const [searchVal, SetSearchVal] = useState<number | null>(null);

    return (
        <div className={`${styles.hadithSearchBar} p-2 rounded-4 mb-4 container `}>
            <form className="d-flex align-items-center justify-content-between  ">
                <Link
                    href={{
                        pathname: `/Hadith/${encodeURIComponent(Hadith)}/${searchVal}`,
                        query: { HadithNum: searchVal, Hadith, HadithBook }
                    }}
                    className={`btn-success btn rounded-pill ${searchVal && searchVal > 0 && searchVal <= NumberOfHadith ? '' : 'disabled'}`}
                >
                    <IoIosSearch size={20} />
                </Link>
                <div className="d-flex gap-4 align-items-center">
                    <input
                        onChange={(e) => SetSearchVal(+e.currentTarget.value)}
                        title="ادخل رقم الحديث"
                        placeholder="ادخل رقم الحديث"
                        type="number"
                        name="number"
                        min={1}
                        className="bg-transparent rounded-1 border-0 border-bottom border-success text-secondary shadow-none text-center"
                    />
                </div>
            </form>
        </div>
    );
}

export default SearchHadithComponent;
