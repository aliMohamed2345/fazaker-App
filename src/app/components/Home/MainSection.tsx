import Image from "next/image";
import Img from '@/../public/Images/main/hero-img-1.png'


const MainSection = () => {

    return (<>
        <main className="  mw-100 h-100 container main-section text-center ">
            <div className="bg-img">
                <div className="description d-flex align-items-center justify-content-end  gap-4 flex-column text-center  container rounded-5 p-4">
                    <Image
                        src={Img}
                        width={150}
                        height={150}
                        alt="لا اله الا الله محمد رسول الله "
                    />
                    <h1 className=" fw-bold ">فَذْكُر</h1>
                    <p>  موقع متكامل يضم كل ما يحتاجه المسلم من مصادر قيّمة للقرآن الكريم والسنة النبوية الشريفة، بالإضافة إلى معرفة مواقيت الصلاة الدقيقة وأذكار الصباح والمساء وأدعية متنوعة لتعزيز الإيمان والتقرب إلى الله. يقدم الموقع مكتبة غنية بالتفاسير والعلوم الإسلامية، فضلاً عن أدوات تفاعلية لمساعدة المسلمين في حياتهم اليومية .</p>
                </div>
            </div>
        </main>
    </>
    )
}

export default MainSection;