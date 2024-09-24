
import Link from "next/link"
interface HadithSampleProps {
    content: string
    source: string
}

let HadithSample: HadithSampleProps = {
    content: "حَدَّثَنَا مُحَمَّدُ بْنُ عُبَيْدٍ الْغُبَرِيُّ حَدَّثَنَا أَبُو عَوَانَةَ عَنْ أَبِي حَصِينٍ عَنْ أَبِي صَالِحٍ عَنْ أَبِي هُرَيْرَةَ قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مَنْ كَذَبَ عَلَيَّ مُتَعَمِّدًا فَلْيَتَبَوَّأْ مَقْعَدَهُ مِنْ النَّارِ"
    , source: `صَحِيحُ مُسْلِمٍ، الْحَدِيثُ رَقَمُ 3`
}




function HadithSection() {

    return (<>
    <div className="Hadith-section">
            <h2 className="text-center  fw-bold mb-5 pt-5">الحديث الشريف</h2>
            <div className="container  Hadith-content  p-3 rounded-5 pb-3 ">
                <div className="d-flex flex-column-reverse  flex-md-row align-items-center justify-content-between gap-4 ">
                    <div className="Hadith-left-section text-center p-2 rounded-5  ">
                        <div className={`container  p-3 rounded-4`}>
                            <p className="text-bold">{HadithSample.content}</p>
                            <p className="text-start  ">{HadithSample.source}</p>
                        </div>
                    </div>
                    <div className="Hadith-right-section text-end text-lg-center ">
                        <p className=" text-center text-lg-end text-md-end">مجموعة من الأحاديث النبوية الموثوقة من كتب معروفة مثل صحيح البخاري وصحيح مسلم وموطأ الإمام مالك. الهدف هو توفير مرجع يساعدك في فهم تعاليم النبي ﷺ وتطبيقها في حياتك اليومية، بأسلوب بسيط وواضح.</p>
                    </div>
                </div>
                <Link href="/Hadith" type="button" className="btn d-block btn-success mt-5 m-auto">الذهاب</Link>
            </div>
        </div>
    </>)

}
export default HadithSection; 