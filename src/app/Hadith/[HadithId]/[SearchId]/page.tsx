'use client'

import { useEffect, useState } from "react";
import { HadithProps } from "../page";
import HadithContainer from "@/app/components/Hadith/HadithContainer";
import SearchHadithComponent from "@/app/components/Hadith/SearchHadith";
import HadithLoading from "@/app/components/Hadith/HadithLoading";

interface searchParamsProps {
    searchParams: {
        HadithNum: number;
        Hadith: string;
        HadithBook: string
    };
}

let InitialHadith: HadithProps = {
    number: 0,
    arab: '',
    HadithBook: ''
}
const SearchHadith = ({ searchParams }: searchParamsProps) => {
    let [Hadith, SetHadith] = useState<HadithProps>(InitialHadith);
    let [IsLoading, SetIsLoading] = useState<boolean>(true)
    let Api = `https://api.hadith.gading.dev/books/${searchParams.Hadith}/${searchParams.HadithNum}`
    useEffect(() => {
        fetch(Api)
            .then((res) => res.json()).then(data => {
                SetHadith(data.data.contents);
                SetIsLoading(false)
            });
    }, [])
    let { number, arab } = Hadith;
    return (<>
        <div className="container">
            <h1 className="mt-5 mb-5 text-center">{searchParams.HadithBook}</h1>
            <SearchHadithComponent />
            {IsLoading ? <HadithLoading /> :
                <HadithContainer NumberOfHadith={number} HadithContent={arab} />
            }
        </div>
    </>
    )
}

export default SearchHadith;