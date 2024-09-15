'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface sajdaProps {
    id: number,
    recommended: boolean,
    obligatory: boolean
}
interface ayahsProps {
    audio: string,
    hizbQuarter: number,
    page: number,
    text: string,
    juz: number,
    sajda: boolean | sajdaProps,
    numberInSurah: number,
    number: number
}
interface SurahIdProps {
    name: string,
    number: number,
    numberOfAyahs: number,
    revelationType: string,
    ayahs: ayahsProps[]
}
let InitialSurahData: SurahIdProps = {
    name: '',
    number: 0,
    numberOfAyahs: 0,
    revelationType: '',
    ayahs: []
}

const SurahId = () => {
    let [SurahData, SetSurahData] = useState(InitialSurahData);
    const surahNameArabic = useSearchParams().get('surahNameArabic');
    const SurahNumber = useSearchParams().get('SurahNumber');
    let api = `http://api.alquran.cloud/v1/surah/${SurahNumber}/ar.alafasy`;

    // this variable will give the total page per surah 
    let totalPages = SurahData.ayahs.length > 0 ? (SurahData.ayahs[SurahData.ayahs.length - 1]?.page) - (SurahData.ayahs[0]?.page) + 1 : 0;

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
        </>
    );
};

export default SurahId;
