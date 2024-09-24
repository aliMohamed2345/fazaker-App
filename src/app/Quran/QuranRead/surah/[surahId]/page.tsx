'use client';
import { InitialSurahData, pageContentProps } from '@/app/components/Quran/ReadingQuran/FunctionsAndObjects';
import GoToAyah from '@/app/components/Quran/ReadingQuran/GoToAyah';
import QuranSection from '@/app/components/Quran/ReadingQuran/QuranSection';
import Loading from '@/app/loading';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { surahNamesArabic } from '@/app/components/Quran/AudioPlayer/functions';


const SurahId = () => {
    let currentPage = +useParams().surahId;
    const surahNameArabic = useSearchParams().get('surahNameArabic');
    const SurahNumber = useSearchParams().get('SurahNumber');
    let [SurahData, SetSurahData] = useState(InitialSurahData);
    let [IsLoading, SetIsLoading] = useState<boolean>(true);
    let api = `http://api.alquran.cloud/v1/surah/${SurahNumber}/ar.alafasy`;
    let totalPages =
        SurahData.ayahs.length > 0
            ? SurahData.ayahs[SurahData.ayahs.length - 1]?.page -
            SurahData.ayahs[0]?.page +
            1
            : 0;
    let pages: pageContentProps[] = [];
    console.log(currentPage);
    // Loop through each page between the start and end page
    for (let page = SurahData.ayahs[0]?.page; page <= SurahData.ayahs[SurahData.ayahs.length - 1]?.page; page++) {
        let pageContent: pageContentProps = {
            ayahs: [],
            juz: 0,
            hizbQuarter: 0,
            page: page,
            // numberInSurah: 0
        };
        // Loop through ayahs and collect those that belong to the current page
        for (let ayah of SurahData.ayahs) {
            if (ayah.page === page) {
                pageContent.ayahs.push({ text: ayah.text, numberInSurah: ayah.numberInSurah, audio: ayah.audio, IsSaved: false });
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
    // Check if there is any Sajda in the Surah
    const hasSajda = SurahData.ayahs.some(ayah => typeof ayah.sajda === 'object' || ayah.sajda === true);

    useEffect(() => {
        fetch(api).then(res => res.json()).then(data => {
            SetSurahData(data.data);
            SetIsLoading(false);
        });
    }, [SurahNumber]);
    return (
        <>
            {IsLoading ? < Loading /> :
                <><h1 className='text-center mt-5 mb-3'>سُورَةُ {surahNameArabic} </h1><div className="btns-info d-flex align-items-center justify-content-around gap-5 flex-wrap">
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
                    {/* <TafsirSection IsOpen={true} SurahNumber={+SurahNumber!} /> */}
                    <div className="d-flex gap-3 justify-content-center align-items-center align-items-sm-center align-items-md-start container-lg mt-5 flex-column flex-md-row-reverse">
                        <GoToAyah numberOfAyahs={SurahData.numberOfAyahs} />
                        <QuranSection Pages={pages} SurahNumber={+SurahNumber!} />
                    </div>
                    <div className="navigate-surahs d-flex align-items-center justify-content-around mt-3 mb-5">
                        <Link
                            href={{
                                pathname: `/Quran/QuranRead/surah/${currentPage - 1}`,
                                query: { SurahNumber: currentPage - 1, surahNameArabic: surahNamesArabic[currentPage - 1] }
                            }}
                            title="السوره السابقه"
                            type="button"
                            className={`btn p-3 rounded-circle btn-outline-success ${currentPage - 1 === 0 ? `disabled` : ``}`} ><FaArrowLeft size={25} /></Link>
                        <Link
                            href={{
                                pathname: `/Quran/QuranRead/surah/${currentPage + 1}`,
                                query: { SurahNumber: currentPage + 1, surahNameArabic: surahNamesArabic[currentPage + 1] }
                            }}
                            title="السوره التاليه"
                            type="button"
                            className={`btn p-3 rounded-circle btn-outline-success ${currentPage + 1 === 115 ? `disabled` : ``}`} ><FaArrowRight size={25} /></Link>
                    </div>
                </>
            }
        </>
    );
};

export default SurahId;
