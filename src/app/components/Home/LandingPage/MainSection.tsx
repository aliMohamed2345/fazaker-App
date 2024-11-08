import Image from "next/image";
import Img from '@/../public/Images/main/hero-img-1.png'
import HeroImageBg from '@/../public/Images/main/hero-img-back-1.jpg'
import styles from './LandingPage.module.css';
const MainSection = () => {

    return (<>
        <main className={`position-relative ${styles.mainSection}`}>
            <div className={`${styles.bgImg} position-relative`}>
                <Image
                    src={HeroImageBg}
                    alt="hero image"
                    objectFit="cover"
                    loading="lazy"
                />
            </div>
            <div className={`${styles.bgGreen} position-absolute`}>

                <div
                    className={`${styles.description} position-absolute  start-50 top-50 translate-middle d-flex align-items-center justify-content-end  gap-4 flex-column text-center  container rounded-5 p-4`}>
                    <Image
                        src={Img}
                        width={150}
                        height={150}
                        loading="lazy"
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