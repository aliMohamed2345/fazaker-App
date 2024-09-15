'use client';
import { useEffect, useState } from 'react';
import HadithContainer from '@/app/components/Hadith/HadithContainer';
import SearchHadithComponent from '@/app/components/Hadith/SearchHadith';
import HadithLoading from '@/app/components/Hadith/HadithLoading';

import Pagination from '@/app/components/Hadith/Pagination';
import { useParams } from 'next/navigation';
interface searchParamsProps {
    searchParams: {
        pageNum: number;
        Hadith: string;
        HadithName: string;
        NumberOfHadith: number
    };
}
export interface HadithProps {
    number: number;
    arab: string;
    HadithBook?: string;
}
export interface HadithsProps {
    hadiths: HadithProps[];
}
const HadithId = ({ searchParams }: searchParamsProps) => {
    let Page: number = Number(useParams().HadithId);
    let HadithPerPage = 30;
    let startingRange = (((Page - 1) * HadithPerPage) + 1)
    let EndingRange = HadithPerPage * Page;
    let [Hadiths, SetHadiths] = useState<HadithsProps>({ hadiths: [] });
    let [IsLoading, SetIsLoading] = useState<boolean>(true);
    let Api = `https://api.hadith.gading.dev/books/${searchParams.Hadith}?range=${startingRange}-${EndingRange}`;
    useEffect(() => {
        fetch(Api)
            .then((res) => res.json())
            .then((data) => {
                SetHadiths(data.data);
                SetIsLoading(false);
            });
    }, []);
  
    return (
        <>
            <p className="mb-5">hello</p>
            <h1 className="text-center mb-3">{searchParams.HadithName}</h1>
            <SearchHadithComponent Hadith={searchParams.Hadith} HadithBook={searchParams.HadithName} NumberOfHadith={searchParams.NumberOfHadith} />
            {IsLoading ? <HadithLoading Number={6} /> :
                <div className="hadiths container gap-3 d-flex flex-column justify-content-center ">
                    {Hadiths.hadiths.map((hadith, i) => {
                        let { number, arab } = hadith;
                        return (
                            <HadithContainer KeyVal={i} NumberOfHadith={number} HadithContent={arab} />
                        )
                    })}
                </div>
            }
            <Pagination Api={searchParams.Hadith}title={searchParams.HadithName}NumberOfHadith={searchParams.NumberOfHadith} HadithPerPage={HadithPerPage} />
        </>
    );
};

export default HadithId;
