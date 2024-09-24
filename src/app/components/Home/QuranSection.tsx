import Link from "next/link";
import { FaQuran, FaMicrophone, FaSearch } from "react-icons/fa";

interface QuranSectionProps {

}

const QuranSection = () => {
    return (<>
        <div className="quran-section container d-flex flex-column justify-content-center align-items-center ">
            <h1 className="text-center mb-5 mt-5">القران الكريم</h1>
            <p className="quran-description text-center mb-5">تجربة بسيطة وسهلة لتصفح السور والآيات, تم تصميم الواجهة لتكون مريحة ومتوافقة مع جميع الأجهزة، لتسهيل الوصول إلى القرآن في أي وقت وأي مكان.</p>
            <div className="quran-sections  d-flex flex-wrap align-items-center gap-3 justify-content-center">
                <div className="card section rounded-5 p-4 d-flex flex-column text-center align-items-center gap-4 mb-5">
                    <FaQuran className="card-img-top" size={70} />
                    <div className="card-body p-0">
                        <h6>قراءه القران</h6>
                        <p className="">تجربة قراءة القرآن الكريم مع توفير تفسير واضح لكل آية، مما يساعدك على فهم معاني الآيات بعمق أكبر. يمكن تصفح السور والآيات بسهولة والاطلاع على التفسير المرفق بأسلوب مبسط وميسر</p>
                    </div>
                    <Link href={`/Quran/QuranRead/surah`} className="btn btn-success">الذهاب</Link>
                </div>
                <div className="card section rounded-5 p-4 d-flex flex-column text-center align-items-center gap-4 mb-5">
                    <FaSearch size={70} />
                    <div className="card-body p-0">
                        <h6>البحث</h6>
                        <p className="">يمكنك البحث عن أي آية بسهولة باستخدام الكلمات أو جزء من النص القرآني. بمجرد العثور على الآية المطلوبة، يمكنك الانتقال مباشرةً إلى الصفحة التي تحتوي عليها في القرآن الكريم</p>
                    </div>
                    <Link href={`/Quran/QuranSearch`} className="btn btn-success">الذهاب</Link>
                </div>
                <div className="card section rounded-5 p-4 d-flex flex-column text-center align-items-center gap-4 mb-5">
                    <FaMicrophone size={70} />
                    <div className="card-body p-0">
                        <h6>الاستماع للقران</h6>
                        <p className="">يتيح هذا القسم نخبه من القراء للقران الكريم بروايه حفظ عن عاصم,في هذا القسم يمكنك البحث عن القارئ المفضل لديك ثم الاستماع لتلاواته ,كما يمكنك تحميل تلاوته لسماعها بلاانترنت</p>
                    </div>
                    <Link href={`/Quran/QuranRecite`} className="btn btn-success">الذهاب</Link>
                </div>
            </div>
        </div>
    </>
    );
}

export default QuranSection;