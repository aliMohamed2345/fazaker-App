'use client'
import SearchArea from "@/app/components/Quran/SearchArea"

interface SearchIdProps {
    searchParams: {
        q: string
    };
}

const SearchId = ({ searchParams }: SearchIdProps) => {
    return (<>
        <h1>hello world</h1>
        <h1 className="text-center mt-4 mb-4">{searchParams.q}</h1>
        <SearchArea placeholder={'بحث باسم القارئ'} />
    </>);
}

export default SearchId;