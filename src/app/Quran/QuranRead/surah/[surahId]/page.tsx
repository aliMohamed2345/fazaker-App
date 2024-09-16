'use client';
import GoToAyah from '@/app/components/Quran/ReadingQuran/GoToAyah';
import QuranSection from '@/app/components/Quran/ReadingQuran/QuranSection';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface sajdaProps {
    id: number;
    recommended: boolean;
    obligatory: boolean;
}

interface ayahsProps {
    audio: string;
    hizbQuarter: number;
    page: number;
    text: string;
    juz: number;
    sajda: boolean | sajdaProps;
    numberInSurah: number;
    number: number;
}

interface SurahIdProps {
    name: string;
    number: number;
    numberOfAyahs: number;
    revelationType: string;
    ayahs: ayahsProps[];
}
export interface pageContentProps {
    ayahs: { text: string }[]; // Array of AyahProps objects
    juz: number;
    hizbQuarter: number;
    page: number;
}

let InitialSurahData: SurahIdProps = {
    name: '',
    number: 0,
    numberOfAyahs: 0,
    revelationType: '',
    ayahs: []
};

const SurahId = () => {
    let [SurahData, SetSurahData] = useState(InitialSurahData);
    const surahNameArabic = useSearchParams().get('surahNameArabic');
    const SurahNumber = useSearchParams().get('SurahNumber');
    let api = `http://api.alquran.cloud/v1/surah/${SurahNumber}/ar.alafasy`;

    let totalPages =
        SurahData.ayahs.length > 0
            ? SurahData.ayahs[SurahData.ayahs.length - 1]?.page -
            SurahData.ayahs[0]?.page +
            1
            : 0;

    let pages: pageContentProps[] = [];

    // Loop through each page between the start and end page
    for (let page = SurahData.ayahs[0]?.page; page <= SurahData.ayahs[SurahData.ayahs.length - 1]?.page; page++) {
        let pageContent: pageContentProps = {
            ayahs: [],
            juz: 0,
            hizbQuarter: 0,
            page: page
        };

        // Loop through ayahs and collect those that belong to the current page
        for (let ayah of SurahData.ayahs) {
            if (ayah.page === page) {
                pageContent.ayahs.push({ text: ayah.text });
                // Set juz and hizbQuarter for the first ayah in the page
                if (pageContent.juz === 0) {
                    pageContent.juz = ayah.juz;
                    pageContent.hizbQuarter = ayah.hizbQuarter;
                }
            }
        }

        // Only add to pages array if the page has ayahs
        if (pageContent.ayahs.length > 0) {
            pages.push(pageContent);
        }
    }

    console.log(pages);

    // Check if there is any Sajda in the Surah
    const hasSajda = SurahData.ayahs.some(ayah => typeof ayah.sajda === 'object' || ayah.sajda === true);

    useEffect(() => {
        fetch(api).then(res => res.json()).then(data => {
            SetSurahData(data.data);
        });
    }, [SurahNumber]);

    return (
        <>
            <h1 className='text-center mt-5 mb-3'>سُورَةُ {surahNameArabic} </h1>
            <div className="btns-info d-flex align-items-center justify-content-around gap-5 flex-wrap">
                <button type='button' title='عدد الايات' className='btn rounded-pill btn-outline-success p-3 fs-5'>
                    {SurahData.numberOfAyahs} آية
                </button>
                <button type='button' className='btn rounded-pill btn-outline-success p-3 fs-5'>
                    {SurahData.revelationType === "Meccan" ? "مكية" : "مدنية"}
                </button>
                <button type='button' className='btn rounded-pill btn-outline-success p-3 fs-5'>
                    صفحه {totalPages}
                </button>
                <button type='button' className='btn rounded-pill btn-outline-success p-3 fs-5'>
                    {hasSajda ? "سجدة" : "لا توجد سجدة"}
                </button>
            </div>
            <div className="d-flex gap-5 justify-content-center align-items-center align-items-sm-center align-items-md-start container-lg mt-5 flex-column flex-md-row-reverse">
                <GoToAyah numberOfAyahs={SurahData.numberOfAyahs} />
                <QuranSection Pages={pages} />
            </div>
        </>
    );
};

export default SurahId;
