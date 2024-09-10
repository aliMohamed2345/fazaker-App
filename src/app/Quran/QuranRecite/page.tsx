'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ReciterLoadingScreen from '@/app/components/Quran/QuranLoadingScreen';
import SearchArea from '@/app/components/Quran/SearchArea';
export interface MoshafProps {
    name?: string;
    server: string
    id?: number;
    surah_total: number;
    surah_list: string;
}

export interface ReciterDataProps {
    id: number;
    name: string; // Assuming there is a 'name' field in the API response
    letter: string;
    moshaf: MoshafProps[];
}

export interface RecitersDataProps {
    reciters: ReciterDataProps[];
}

const QuranRecite = () => {
    let [ReciterData, setReciterData] = useState<ReciterDataProps[]>([]); // Correct type
    let [IsLoading, SetIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const api: string = `https://www.mp3quran.net/api/v3/reciters?language=ar`;
        fetch(api)
            .then(res => res.json())
            .then((data: RecitersDataProps) => {
                setReciterData(data.reciters)
                SetIsLoading(false)
            })
            .catch(error => {
                console.error("Error fetching reciter data:", error);
            });
    }, []);
    //this code for sorting the all the reciterData name from أ to ى
    (ReciterData.sort((a, b) => a.name.localeCompare(b.name)))
    //at this code it will give me only the reciters have a روايه حفص عن عاصم 
    let filteredReciters = ReciterData.filter(reciter => reciter.moshaf.some(moshaf => moshaf.name?.includes(`حفص عن عاصم`)))
    return (
        <>
            <h2 className="text-center pt-5">تلاوه القران</h2>
            <p className='text-center pt-3 pb-3'>تشكيله منوعه وكبيره من كبار القراء للقران الكريم</p>
            <SearchArea placeholder={'بحث باسم القارئ'} />
            <div className="reciters d-flex flex-wrap gap-3 container mt-5 justify-content-center ">
                {IsLoading ? <ReciterLoadingScreen Number={18} />
                    :
                    filteredReciters.sort().map((reciter, i) => {
                        let { id, name, moshaf } = reciter;
                        let selectedRewayh = moshaf.filter(moshaf => moshaf.name?.includes(`حفص عن عاصم - مرتل`))
                        let { server, surah_list, surah_total }: MoshafProps = selectedRewayh[0] || [];
                        return (
                            <Link key={id}
                                href={{ pathname: `/Quran/QuranRecite/${name}`, query: { SurahLink: server, TotalSurah: surah_total, SurahList: surah_list, ReciterName: name } }}
                                className='bg-secondary reciter p-3 rounded-3 col-3 text-center'>
                                <p className='m-0'>{name}</p>
                            </Link>
                        )
                    })}
            </div>
        </>
    );
}

export default QuranRecite;
