'use client'

import { useEffect, useState } from "react";
import SurahNJuzOptions from "@/app/components/Quran/ReadingQuran/SurahNJuzOptions";
import { FaBookmark } from "react-icons/fa";
import { surahNamesArabic } from "@/app/components/Quran/AudioPlayer/functions";
import Link from "next/link";
import NotFound from "@/app/components/Quran/ListeningToQuran/NotFound";
import SignLoadingScreen from "@/app/components/Quran/ReadingQuran/SignLoadingScreen";
import styles from '../../../components/Quran/ReadingQuran/ReadingQuran.module.css'
const Surah = () => {
    let [IsLoading, SetIsLoading] = useState<boolean>(true)
    const [savedAyahs, setSavedAyahs] = useState<any[]>([]);

    // Fetch saved ayahs from localStorage after the component mounts
    useEffect(() => {
        const savedAyahs = localStorage.getItem('savedAyahs');
        if (savedAyahs) {
            setSavedAyahs(JSON.parse(savedAyahs));
        }
        SetIsLoading(false)
    }, []);

    // Function to handle ayah removal
    const handleRemoveAyah = (ayahIndex: number) => {
        const updatedAyahs = savedAyahs.filter((_, index) => index !== ayahIndex); // Remove the selected ayah
        setSavedAyahs(updatedAyahs);
        localStorage.setItem('savedAyahs', JSON.stringify(updatedAyahs)); // Update localStorage
    };

    return (
        <>
            <h1 className="pt-5 text-center pb-3">قرائه القران</h1>
            <SurahNJuzOptions activeNumber={3} />
            <div className="container d-flex flex-column gap-3 mt-5">
                {IsLoading ? <SignLoadingScreen Number={10} /> : savedAyahs.length > 0 ? (
                    savedAyahs.map((ayah, index) => (
                        <Link
                            key={index}
                            className={`${styles.sign} p-3 rounded-2 d-flex align-items-center justify-content-between`}
                            href={{
                                pathname: `/Quran/QuranRead/surah/${ayah.surahNumber}`,
                                query: {
                                    SurahNumber: ayah.surahNumber,
                                    surahNameArabic: surahNamesArabic[ayah.surahNumber],
                                },
                                hash: `ayah-${ayah.ayahNumber}` // Adding the anchor (hash)
                            }}
                        >
                            <button
                                title="الغاء الحفظ"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent the link from navigating when the button is clicked
                                    handleRemoveAyah(index); // Remove the ayah from the list
                                }}
                                className="btn btn-secondary p-1"
                            >
                                <FaBookmark size={50} />
                            </button>
                            <div className={`${styles.ayahInfo} text-start`}>
                                <p className=" text-end">{ayah.ayahText}</p>
                                <div className=" d-flex justify-content-end mt-2">
                                    <p >سوره {surahNamesArabic[ayah.surahNumber]}</p>
                                    <p>, {ayah.ayahNumber}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <NotFound text="لا توجد ايات محفوظه" />
                )}
            </div >
        </>
    );
}

export default Surah;
