import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
interface TafsirSectionProps {
    IsOpen: boolean,
    AyahNumber: number
}
interface ArabicDataProps {
    arabic_text: string;
    translation: string;
}

interface EnglishDataProps {
    arabic_text: string;
    translation: string;
}

const TafsirSection = ({ IsOpen, AyahNumber }: TafsirSectionProps) => {
    let SurahNumber = useSelector((state: RootState) => state.ReadingQuran.SurahNumber);
    //hooks
    let [ArabicData, SetArabicData] = useState<ArabicDataProps>({ arabic_text: '', translation: '' });
    let [EnglishData, SetEnglishData] = useState<EnglishDataProps>({ arabic_text: '', translation: '' });
    let [IsWindowOpen, setIsWindowOpen] = useState<boolean>(IsOpen);
    let [ArabicOptions, SetArabicOptions] = useState<boolean>(true);
    let [EnglishOptions, SetEnglishOptions] = useState<boolean>(false);
    let [CurrentSurah, SetCurrentSurah] = useState(AyahNumber)
    //Apis
    const TafsirArabicApi = `https://quranenc.com/api/v1/translation/aya/arabic_moyassar/${SurahNumber}/${CurrentSurah}`;
    const TafsirEnglishApi = `https://quranenc.com/api/v1/translation/aya/english_saheeh/${SurahNumber}/${CurrentSurah}`;
    useEffect(() => {
        setIsWindowOpen(IsOpen);
    }, [IsOpen]);

    useEffect(() => {
        if (ArabicOptions) {
            fetch(TafsirArabicApi)
                .then(res => res.json())
                .then(data => {
                    let { arabic_text, translation } = data.result;
                    SetArabicData({ arabic_text, translation });
                })
                .catch(error => console.error("Error fetching Arabic Tafsir:", error));
        }
    }, [ArabicOptions, TafsirArabicApi]);

    useEffect(() => {
        if (EnglishOptions) {
            fetch(TafsirEnglishApi)
                .then(res => res.json())
                .then(data => {
                    let { arabic_text, translation } = data.result;
                    SetEnglishData({ arabic_text, translation });
                })
                .catch(error => console.error("Error fetching English Tafsir:", error));
        }
    }, [EnglishOptions, TafsirEnglishApi]);

    function HandleArabicBtn(e: React.MouseEvent) {
        e.stopPropagation();
        SetArabicOptions(true);
        SetEnglishOptions(false);
    }

    function HandleEnglishBtn(e: React.MouseEvent) {
        e.stopPropagation();
        SetArabicOptions(false);
        SetEnglishOptions(true);
    }

    function handleBackgroundClick() {
        setIsWindowOpen(false);
    }
    return (
        <>
            {IsWindowOpen && (
                <div
                    className={`tafsir-bg ${IsOpen ? `active` : ``} position-fixed d-flex flex-column justify-content-center `}
                    onClick={handleBackgroundClick}
                >
                    <div
                        className={`tafsir-window p-4 rounded-4 ${IsOpen ? `active` : ``}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            title="close"
                            type="button"
                            onClick={() => setIsWindowOpen(false)}
                            className="btn close-btn rounded-circle p-0"
                        >
                            <IoMdClose />
                        </button>
                        <p className="ayah quran mt-5 text-end">{ArabicOptions ? ArabicData.arabic_text : EnglishData.arabic_text}</p>
                        <div className="separator my-4"></div>
                        <div className="lang gap-4 d-flex justify-content-end">
                            <button
                                onClick={HandleArabicBtn}
                                type="button"
                                className={`btn p-2 ${ArabicOptions ? `active` : ``} rounded-pill btn-outline-success`}
                            >
                                العربيه
                            </button>
                            <button
                                onClick={HandleEnglishBtn}
                                type="button"
                                className={`btn p-2 ${EnglishOptions ? `active` : ``} rounded-pill btn-outline-success`}
                            >
                                English
                            </button>
                        </div>
                        {ArabicOptions && (
                            <>
                                <h5 className="text-end mb-4 mt-4 fw-bold">تفسير</h5>
                                <p className="tafsir pt-4 fw-bold">{ArabicData.translation}</p>
                            </>
                        )}

                        {EnglishOptions && (
                            <>
                                <h5 className="text-start mb-4 fw-bold mt-4">Translation</h5>
                                <p className="translation">{EnglishData.translation}</p>
                            </>
                        )}
                        <div className="navigate-ayahs d-flex align-items-center justify-content-around mt-2">
                            <button
                                title="previous"
                                onClick={() => SetCurrentSurah(prev => prev! + 1)}
                                type="button"
                                className={`btn p-3 rounded-circle btn-outline-success`} ><FaArrowRight size={25} /></button>
                            <button
                                title="previous"
                                onClick={() => SetCurrentSurah(prev => prev! - 1)}
                                type="button"
                                className={`btn p-3 rounded-circle btn-outline-success`} ><FaArrowLeft size={25} /></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TafsirSection;
