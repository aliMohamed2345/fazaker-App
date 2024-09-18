import { useState } from "react";
import { IoMdClose } from "react-icons/io";
interface TafsirSectionProps {
    IsOpen: boolean
}

const TafsirSection = ({ IsOpen }: TafsirSectionProps) => {
    let [IsWindowOpen, setIsWindowOpen] = useState<boolean>(IsOpen)
    return (<>
        <div className={`tafsir-bg ${IsWindowOpen ? `active` : ``}`} >
            <div className={`tafsir-window p-4 rounded-4 ${IsWindowOpen ? `active` : ``}`}>
                <button title="close" type="button" onClick={() => setIsWindowOpen(prev => !prev)} className="btn close-btn rounded-circle p-0"><IoMdClose /> </button>
                <p className="ayah quran mt-5">أَوَكُلَّمَا عَٰهَدُواْ عَهۡدٗا نَّبَذَهُۥ فَرِيقٞ مِّنۡهُمۚ بَلۡ أَكۡثَرُهُمۡ لَا يُؤۡمِنُونَ</p>
                <div className="separator my-4"></div>
                <div className="lang gap-4 d-flex justify-content-end">
                    <button type="button" className="btn p-2 active rounded-pill btn-outline-success">العربيه</button>
                    <button type="button" className="btn p-2 rounded-pill btn-outline-success">English</button>
                </div>
                <p className="tafsir pt-4 ">ما أقبح حال بني إسرائيل في نقضهم للعهود!! فكلما عاهدوا عهدًا طرح ذلك العهد فريق منهم، ونقضوه، فتراهم يُبْرِمون العهد اليوم وينقضونه غدًا، بل أكثرهم لا يصدِّقون بما جاء به نبي الله ورسوله محمد صلى الله عليه وسلم</p>
            </div>
        </div >
    </>);
}

export default TafsirSection;