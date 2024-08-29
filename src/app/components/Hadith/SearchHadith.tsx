import Link from "next/link";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchHadithProps {
    Hadith: string,
    HadithBook?: string,
    NumberOfHadith: number
}

const SearchHadithComponent = ({ Hadith, HadithBook, NumberOfHadith }: SearchHadithProps) => {
    let [searchVal, SetSearchVal] = useState<number | null>(null)
    return (
        <div className="hadith-search-bar p-2 rounded-4 mb-4 container w-75  ">
            <form className="d-flex align-items-center justify-content-center gap-3 flex-column flex-sm-row">
                <label htmlFor="number">ابحث عن الحديث</label>
                <div className="d-flex gap-4 align-items-center">
                    <input
                        onChange={(e) => SetSearchVal(+e.currentTarget.value)}
                        title="ادخل رقم الحديث"
                        type="number"
                        name="number"
                        min={1}
                        className="bg-transparent rounded-1 border-0  border-bottom border-success text-secondary shadow-none text-center"
                    />
                    <Link
                        href={{
                            pathname: `/Hadith/${encodeURIComponent(Hadith)}/${searchVal}`,
                            query: { HadithNum: searchVal, Hadith: Hadith, HadithBook: HadithBook }
                        }}
                        className={`btn-success btn ${searchVal && searchVal < NumberOfHadith ? '' : 'disabled'}`}
                    >
                        <IoIosSearch size={20} />
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SearchHadithComponent;
