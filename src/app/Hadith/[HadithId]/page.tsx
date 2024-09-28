'use client';
import { useEffect, useState } from 'react';
import HadithContainer from '@/app/components/Hadith/HadithContainer';
import { SetHadithContent } from '@/app/redux/Slices/HadithContainerSlice';
import SearchHadithComponent from '@/app/components/Hadith/SearchHadith';
import HadithLoading from '@/app/components/Hadith/HadithLoading';
import { useDispatch } from 'react-redux';
import { SetHadith, SetHadithBook, SetNumberOfHadith } from '@/app/redux/Slices/SearchHadithSlice';
import Pagination from '@/app/components/Hadith/Pagination';
import { useParams } from 'next/navigation';
import { SetApi, SetTitle, SetHadithPerPage } from "@/app/redux/Slices/PaginationSlice";

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
    //hooks
    let [Hadiths, SetHadiths] = useState<HadithsProps>({ hadiths: [] });
    let [IsLoading, SetIsLoading] = useState<boolean>(true);
    //var
    let Page: number = Number(useParams().HadithId);
    let HadithPerPage = 20;
    let startingRange = (((Page - 1) * HadithPerPage) + 1);
    let EndingRange = HadithPerPage * Page;
    let Api = `https://api.hadith.gading.dev/books/${searchParams.Hadith}?range=${startingRange}-${EndingRange}`;
    let dispatch = useDispatch();

    // Dispatching to the store
    dispatch(SetHadith(searchParams.Hadith));
    dispatch(SetHadithBook(searchParams.HadithName));
    dispatch(SetNumberOfHadith(searchParams.NumberOfHadith));
    dispatch(SetTitle(searchParams.HadithName));
    dispatch(SetApi(searchParams.Hadith));
    dispatch(SetHadithPerPage(HadithPerPage));
    dispatch(SetHadithContent(Hadiths.hadiths));

    // Fetching data from the API
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
            <h1 className="text-center mt-5">{searchParams.HadithName}</h1>
            <SearchHadithComponent />
            {IsLoading ? <HadithLoading Number={6} /> :
                <div className="hadiths container gap-3 d-flex flex-column justify-content-center">
                    {Hadiths.hadiths.map((_, i) => (
                        <HadithContainer KeyVal={i} />
                    ))}
                </div>
            }
            <Pagination />
        </>
    );
};

export default HadithId;
