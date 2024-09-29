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
    const surahNameArabic = useSearchParams()?.get('suraghNameArabic');
    const SurahNumber = useSearchParams()?.get('SurahNumber');

    const [SurahData, SetSurahData] = useState(InitialSurahData);
    const [IsLoading, SetIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    const api = useMemo(() => `http://api.alquran.cloud/v1/surah/${SurahNumber}/ar.alafasy`, [SurahNumber]);

    const fetchSurahData = useCallback(async () => {
        try {
            const response = await fetch(api);
            const data = await response.json();
            SetSurahData(data.data);
            SetIsLoading(false);
        } catch (error) {
            console.error('Error fetching surah data:', error);
            SetIsLoading(false);
        }
    }, [api]);

    // Memoize page calculation to avoid recalculating on every render
    const pages = useMemo(() => {
        if (!SurahData.ayahs?.length) return [];

        return SurahData.ayahs.reduce((acc: pageContentProps[], ayah) => {
            const lastPage = acc[acc.length - 1];
            if (!lastPage || lastPage.page !== ayah.page) {
                acc.push({
                    ayahs: [{ text: ayah.text, numberInSurah: ayah.numberInSurah, audio: ayah.audio, IsSaved: false }],
                    juz: ayah.juz,
                    hizbQuarter: ayah.hizbQuarter,
                    page: ayah.page
                });
            } else {
                lastPage.ayahs.push({ text: ayah.text, numberInSurah: ayah.numberInSurah, audio: ayah.audio, IsSaved: false });
            }
            return acc;
        }, []);
    }, [SurahData.ayahs]);

    // Check if there is any Sajda in the Surah
    const hasSajda = useMemo(() => SurahData.ayahs?.some(ayah => ayah.sajda === true || typeof ayah.sajda === 'object'), [SurahData.ayahs]);

    // Fetch Surah data when SurahNumber changes
    useEffect(() => {
        if (SurahNumber) fetchSurahData();
    }, [SurahNumber, fetchSurahData]);

    // Dispatching actions to Redux store (moved inside useEffect to avoid re-dispatching on every render)
    useEffect(() => {
        if (!IsLoading && pages.length > 0) {
            dispatch(SetPages(pages));
            dispatch(SetSurahNumber(+SurahNumber!));
            dispatch(SetSurahName(surahNameArabic!));
        }
    }, [dispatch, pages, SurahNumber, surahNameArabic, IsLoading]);

    // Handlers for previous and next Surah navigation
    const handleNavigation = useCallback((direction: 'next' | 'previous') => {
        const nextSurah = direction === 'next' ? currentPage + 1 : currentPage - 1;
        return {
            pathname: `/Quran/QuranRead/surah/${nextSurah}`,
            query: { SurahNumber: nextSurah, surahNameArabic: surahNamesArabic[nextSurah] }
        };
    }, [currentPage]);

    return (
        <>
            {IsLoading ? (
                <Loading />
            ) : (
                <>
                    <h1 className='text-center mt-5 mb-3'>سُورَةُ {surahNameArabic}</h1>
                    <section className="btns-info d-flex align-items-center justify-content-around gap-5 flex-wrap">
                        <button aria-label="Number of Ayahs" type='button' className='btn rounded-pill btn-outline-success p-3 fs-5'>
                            {SurahData.numberOfAyahs} آية
                        </button>
                        <button aria-label="Revelation Type" type='button' className='btn rounded-pill btn-outline-success p-3 fs-5'>
                            {SurahData.revelationType === "Meccan" ? "مكية" : "مدنية"}
                        </button>
                        <button aria-label="Page Count" type='button' className='btn rounded-pill btn-outline-success p-3 fs-5'>
                            صفحه {pages.length}
                        </button>
                        <button aria-label="Sajda Information" type='button' className='btn rounded-pill btn-outline-success p-3 fs-5'>
                            {hasSajda ? "سجدة" : "لا توجد سجدة"}
                        </button>
                    </section>

                    <main className="container mt-5">
                        <QuranSection />
                    </main>

                    <nav className="navigate-surahs d-flex align-items-center justify-content-around mt-3 mb-5">
                        <Link
                            href={handleNavigation('previous')}
                            title="السوره السابقه"
                            type="button"
                            className={`btn p-3 rounded-circle btn-outline-success ${currentPage === 1 ? 'disabled' : ''}`}
                        >
                            <FaArrowLeft size={25} />
                        </Link>
                        <Link
                            href={handleNavigation('next')}
                            title="السوره التاليه"
                            type="button"
                            className={`btn p-3 rounded-circle btn-outline-success ${currentPage === 114 ? 'disabled' : ''}`}
                        >
                            <FaArrowRight size={25} />
                        </Link>
                    </nav>
                </>
            )}
        </>
    );
};

export default SurahId;
