'use client'
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
interface SearchAreaProps {
    placeholder: string
}
const SearchArea = ({ placeholder }: SearchAreaProps) => {
    const [searchVal, SetSearchVal] = useState<string>('')
    return (<>
        <div style={{ backgroundColor: 'var(--secondary-bg-color)' }} className="p-3 mb-5 rounded-4 mb-4 container w-50">
            <form className="align-items-center justify-content-center gap-2 flex-column flex-sm-row">
                <div className="d-flex gap-4 align-items-center">
                    <Link className={`btn-success btn ${searchVal ? '' : 'disabled'}`} href={{ pathname: `/Quran/${searchVal}`, query: { q: searchVal } }}><IoIosSearch /></Link>
                    <input
                        title="ادخل اسم القارئ"
                        className="bg-transparent rounded-1 border-0 border-bottom border-success text-secondary shadow-none w-100 text-center"
                        type="text"
                        // placeholder='بحث باسم القارئ'
                        placeholder={placeholder}
                        name="text"
                        value={searchVal}
                        onChange={(e) => SetSearchVal(e.currentTarget.value)}
                    />
                </div>
            </form>
        </div>



    </>);
}

export default SearchArea;