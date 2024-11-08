

import Image from "next/image";
import PrayerTimeImg from '@/../public/Images/main/prayerTime.jpg'
import Link from "next/link";
import styles from './LandingPage.module.css'
const PrayerTimingSection = () => {
    return (<>
        <div className={`${styles.prayerTimeSection} pt-5 pb-5  `}>
            <h2 className="text-center fw-bold mb-5">مواقيت الصلاه </h2>
            <div className="d-flex justify-content-center ">
                <div className={`container ${styles.prayerTimeArea} p-5 rounded-5 `}>
                    <Image
                        className="rounded-3 mb-3 m-auto d-block"
                        src={PrayerTimeImg}
                        objectFit="cover"
                        alt="مواقيت الصلاه "
                        loading="lazy"
                    />
                    <p className="text-center">في هذا القسم المخصص لمواقيت
                        الصلاة، نقدم لك دليلاً شاملاً لأوقات الصلوات الخمس
                        وفقًا للتوقيت المحلي لمدينتك. تم تصميم هذا القسم بعناية ليكون مرجعك اليومي للالتزام بأداء الصلوات في
                        أوقاتها المحددة، متيحًا لك الاستفادة من الأدوات الدقيقة والمحدثة باستمرار،
                        يمكنك الاعتماد على مواقيت الصلاة لضبط عباداتك بكل سهولة ويسر،
                        وتحقيق التوازن بين واجباتك الدينية والدنيوية.</p>
                    <Link href="/PrayerTiming" className="btn btn-success m-auto  p-2 w-100">الذهاب</Link>
                </div>
            </div>
        </div>

    </>);
}

export default PrayerTimingSection;