import { pageContentProps } from "@/app/Quran/QuranRead/surah/[surahId]/page";

interface QuranSectionProps {
    Pages: pageContentProps[];
}

const QuranSection = ({ Pages }: QuranSectionProps) => {
    return (
        <>
            <div className="d-flex flex-column">
                {Pages.map((page) => {
                    console.log(page);
                    return (
                        <>
                            <div className="page-info border-success border-3 w-100 h-25 d-flex align-items-center justify-content-between p-2 rounded-3">
                                <p className="m-0">جزء: {page.juz}</p>
                                <p className="m-0">حزب: {page.hizbQuarter}</p>
                                <p className="m-0">صفحه: {page.page}</p>
                            </div>
                            <div className="quran text-center pb-4">
                                {/* Iterate over the ayahs array and display the text */}
                                {page.ayahs.map((ayah, index) => (
                                    <span key={index}>{ayah.text} </span>
                                ))}
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default QuranSection;
