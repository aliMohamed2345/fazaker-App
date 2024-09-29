'use client';

import { InitialSurahData, pageContentProps } from '@/app/components/Quran/ReadingQuran/FunctionsAndObjects';
import QuranSection from '@/app/components/Quran/ReadingQuran/QuranSection';
import Loading from '@/app/loading';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { surahNamesArabic } from '@/app/components/Quran/AudioPlayer/functions';
import { useDispatch } from 'react-redux';
import { SetSurahName, SetSurahNumber, SetPages } from '@/app/redux/Slices/ReadingQuranSlice';

const SurahId = () => {
    const currentPage = +useParams().surahId;
    const surahNameArabic = useSearchParams().get('surahNameArabic');
    const SurahNumber = useSearchParams().get('SurahNumber');

    const [SurahData, SetSurahData] = useState(InitialSurahData);
    const [IsLoading, SetIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    const api = `http://api.alquran.cloud/v1/surah/${SurahNumber}/ar.alafasy`;

    // Memoize page calculation to avoid recalculating on every render
    const pages = useMemo(() => {
        let pagesArray: pageContentProps[] = [];

        if (SurahData.ayahs.length > 0) {
            for (let page = SurahData.ayahs[0]?.page; page <= SurahData.ayahs[SurahData.ayahs.length - 1]?.page; page++) {
                let pageContent: pageContentProps = {
                    ayahs: [],
                    juz: 0,
                    hizbQuarter: 0,
                    page: page,
                };

                // Loop through ayahs and collect those that belong to the current page
                for (let ayah of SurahData.ayahs) {
                    if (ayah.page === page) {
                        pageContent.ayahs.push({
                            text: ayah.text,
                            numberInSurah: ayah.numberInSurah,
                            audio: ayah.audio,
                            IsSaved: false
                        });

                        // Set juz and hizbQuarter for the first ayah in the page
                        if (pageContent.juz === 0) {
                            pageContent.juz = ayah.juz;
                            pageContent.hizbQuarter = ayah.hizbQuarter;
                        }
                    }
                }

                // Only add to pages array if the page has ayahs
                if (pageContent.ayahs.length > 0) {
                    pagesArray.push(pageContent);
                }
            }
        }
        return pagesArray;
    }, [SurahData.ayahs]);

    // Check if there is any Sajda in the Surah (memoized to avoid recalculation)
    const hasSajda = useMemo(() => {
        return SurahData.ayahs.some(ayah => typeof ayah.sajda === 'object' || ayah.sajda === true);
    }, [SurahData.ayahs]);

    // Fetch Surah data when SurahNumber changes
    useEffect(() => {
        const fetchSurahData = async () => {
            const response = await fetch(api);
            const data = await response.json();
            SetSurahData(data.data);
            SetIsLoading(false);
        };

        fetchSurahData();
    }, [SurahNumber, api]);

    // Dispatching actions to Redux store (moved inside useEffect to avoid re-dispatching on every render)
    useEffect(() => {
        if (!IsLoading) {
            dispatch(SetPages(pages));
            dispatch(SetSurahNumber(+SurahNumber!));
            dispatch(SetSurahName(surahNameArabic!));
        }
    }, [dispatch, pages, SurahNumber, surahNameArabic, IsLoading]);

    // Handlers for previous and next Surah navigation (memoized using useCallback)
    const handlePreviousSurah = useCallback(() => {
        return {
            pathname: `/Quran/QuranRead/surah/${currentPage - 1}`,
            query: { SurahNumber: currentPage - 1, surahNameArabic: surahNamesArabic[currentPage - 1] }
        };
    }, [currentPage]);

    const handleNextSurah = useCallback(() => {
        return {
            pathname: `/Quran/QuranRead/surah/${currentPage + 1}`,
            query: { SurahNumber: currentPage + 1, surahNameArabic: surahNamesArabic[currentPage + 1] }
        };
    }, [currentPage]);

    return (
        <>
            {IsLoading ? (
                <Loading />
            ) : (
                <>
                    <h1 className='text-center mt-5 mb-3'>سُورَةُ {surahNameArabic} </h1>
                    <div className="btns-info d-flex align-items-center justify-content-around gap-5 flex-wrap">
                        <button type='button' className='btn rounded-pill btn-outline-success p-3 fs-5'>
                            {SurahData.numberOfAyahs} آية
                        </button>
                        <button type='button' className='btn rounded-pill btn-outline-success p-3 fs-5'>
                            {SurahData.revelationType === "Meccan" ? "مكية" : "مدنية"}
                        </button>
                        <button type='button' className='btn rounded-pill btn-outline-success p-3 fs-5'>
                            صفحه {pages.length}
                        </button>
                        <button type='button' className='btn rounded-pill btn-outline-success p-3 fs-5'>
                            {hasSajda ? "سجدة" : "لا توجد سجدة"}
                        </button>
                    </div>
                    <div className="container mt-5">
                        <QuranSection />
                    </div>
                    <div className="navigate-surahs d-flex align-items-center justify-content-around mt-3 mb-5">
                        <Link href={handlePreviousSurah()} title="السوره السابقه" type="button" className={`btn p-3 rounded-circle btn-outline-success ${currentPage - 1 === 0 ? 'disabled' : ''}`}>
                            <FaArrowLeft size={25} />
                        </Link>
                        <Link href={handleNextSurah()} title="السوره التاليه" type="button" className={`btn p-3 rounded-circle btn-outline-success ${currentPage + 1 === 115 ? 'disabled' : ''}`}>
                            <FaArrowRight size={25} />
                        </Link>
                    </div>
                </>
            )}
        </>
    );
};

export default SurahId;
