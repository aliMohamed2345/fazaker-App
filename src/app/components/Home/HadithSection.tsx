
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
    //مجموعة من الأحاديث النبوية الموثوقة من كتب معروفة مثل صحيح البخاري وصحيح مسلم وموطأ الإمام مالك. الهدف هو توفير مرجع يساعدك في فهم تعاليم النبي ﷺ وتطبيقها في حياتك اليومية، بأسلوب بسيط وواضح.
    <div className="  position-absolute  Hadith-section w-100">
            <h2 className="text-center  fw-bold mb-5">الحديث الشريف</h2>
            <div className="container  Hadith-section  p-3 rounded-3 ">
                <div className="d-flex flex-column-reverse  flex-md-row align-items-center justify-content-between gap-4 ">
                    <div className="azkar-left-section text-center  ">
                        <div className={`container bg-white p-3 rounded-4`}>
                            <p className="text-bold text-black">{HadithSample.content}</p>
                            <p className="text-start text-black-50 ">{HadithSample.source}</p>
                        </div>
                    </div>
                    <div className="azkar-right-section w-50 text-black  text-end text-lg-center ">
                        <p className=" text-center text-lg-end text-md-end">مجموعة من الأحاديث النبوية الموثوقة من كتب معروفة مثل صحيح البخاري وصحيح مسلم وموطأ الإمام مالك. الهدف هو توفير مرجع يساعدك في فهم تعاليم النبي ﷺ وتطبيقها في حياتك اليومية، بأسلوب بسيط وواضح.</p>
                    </div>
                </div>
                <Link href="/Hadith" type="button" className="btn d-block w-25 btn-success mt-5 m-auto">الذهاب</Link>
            </div>
        </div>
    </>)

}
export default HadithSection; 