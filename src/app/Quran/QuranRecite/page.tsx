'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import NotFound from '@/app/components/Quran/ListeningToQuran/NotFound';
import ReciterLoadingScreen from '@/app/components/Quran/ListeningToQuran/QuranLoadingScreen';
import RecitersSearchArea from '@/app/components/Quran/ListeningToQuran/RecitersSearchArea';
import styles from '../../components/Quran/ListeningToQuran/ListeningToQuran.module.css'
export interface MoshafProps {
    name?: string;
    server: string;
    id?: number;
    surah_total: number;
    surah_list: string;
}

export interface ReciterDataProps {
    id: number;
    name: string;
    letter: string;
    moshaf: MoshafProps[];
}

export interface RecitersDataProps {
    reciters: ReciterDataProps[];
}

const QuranRecite = () => {
    const [ReciterData, setReciterData] = useState<ReciterDataProps[]>([]);
    const [IsLoading, SetIsLoading] = useState<boolean>(true);
    const [searchVal, SetSearchVal] = useState<string>(''); // Search value state

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_QURAN_RECITE}`)
            .then(res => res.json())
            .then((data: RecitersDataProps) => {
                setReciterData(data.reciters);
                SetIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching reciter data:", error);
            });
    }, []);

    // Sort reciters alphabetically by name
    ReciterData.sort((a, b) => a.name.localeCompare(b.name));

    // Filter reciters based on search value and specific rewayah
    const filteredReciters = ReciterData
        .filter(reciter => reciter.name.includes(searchVal)) // Filter based on search value
        .filter(reciter => reciter.moshaf.some(moshaf => moshaf.name?.includes('حفص عن عاصم')));

    return (
        <>
            <h2 className="text-center pt-5">الاستماع للقران</h2>
            <p className='text-center pt-3 pb-3'>تشكيله منوعه وكبيره من كبار القراء للقران الكريم بروايه حفص عن عاصم</p>
            {/* Pass searchVal and SetSearchVal to RecitersSearchArea */}
            <RecitersSearchArea searchVal={searchVal} SetSearchVal={SetSearchVal} />
            <div className=" d-flex flex-wrap gap-3 container mt-5 justify-content-center">
                {!filteredReciters.length && !IsLoading && <NotFound text='لا يوجد قارئ بهذا الاسم' />}
                {IsLoading ? (
                    <ReciterLoadingScreen Number={30} />
                ) : (
                    filteredReciters.map((reciter) => {
                        const { id, name, moshaf } = reciter;
                        const selectedRewayh = moshaf.filter(moshaf =>
                            moshaf.name?.includes('حفص عن عاصم - مرتل')
                        );
                        const { server, surah_list, surah_total }: MoshafProps = selectedRewayh[0] || {};
                        return (
                            <Link
                                key={id}
                                href={{
                                    pathname: `/Quran/QuranRecite/${name}`,
                                    query: {
                                        SurahLink: server,
                                        TotalSurah: surah_total,
                                        SurahList: surah_list,
                                        ReciterName: name,
                                    },
                                }}
                                className={` ${styles.reciter} p-2 p-sm-3 rounded-3 col-4 col-sm-3 text-center`}
                            >
                                <p className='m-0'>{name}</p>
                            </Link>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default QuranRecite;
