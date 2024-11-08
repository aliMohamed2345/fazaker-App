'use client'

import { useEffect, useState } from "react";
import { HadithProps } from "../page";
import HadithContainer from "@/app/components/Hadith/HadithContainer";
import SearchHadithComponent from "@/app/components/Hadith/SearchHadith";
import HadithLoading from "@/app/components/Hadith/HadithLoading";
import { useDispatch } from "react-redux";
import { SetHadithContent } from "@/app/redux/Slices/HadithContainerSlice";
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
    let dispatch = useDispatch();
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_HADITH_API}/${searchParams.Hadith}/${searchParams.HadithNum}`)
            .then((res) => res.json()).then(data => {
                SetHadith(data.data.contents);
                SetIsLoading(false)
            });
    }, [])
    dispatch(SetHadithContent([Hadith]))
    return (<>
        <div className="container">
            <h1 className="mt-5 mb-5 text-center">{searchParams.HadithBook}</h1>
            <SearchHadithComponent />
            {IsLoading ? <HadithLoading /> : <HadithContainer KeyVal={-1} />
            }
        </div>
    </>
    )
}

export default SearchHadith;