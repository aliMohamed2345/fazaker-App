'use client'
import { useState } from "react";
import Link from "next/link";
import { copyToClipboard } from "@/app/utils/handleCopyBtn";
import { BiClipboard } from "react-icons/bi";
import styles from './LandingPage.module.css'
interface SampleZekrProps {
    content: string;
    count: number;
    description: string;
}

const sampleZekr: SampleZekrProps = {
    content: "اللّهُـمَّ ما أَمسى بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر.",
    count: 3,
    description: "من قالها حين يمسى أدى شكر يومه."
}

const AzkarSection = () => {
    let { content, count, description } = sampleZekr;
    let [counter, setCounter] = useState<number>(count);
    console.log(styles)
    return (
        <>
            <div className={`${styles.azkarArea} pt-4 pb-5`}>
                <h2 className="text-center mb-5">الاذكار</h2>
                <div className={`${styles.azkarSection} p-3 rounded-5`}>
                    <div className="d-flex flex-column-reverse flex-md-row align-items-center justify-content-between gap-4">
                        <div className={`${styles.azkarLeftSection} text-center position-relative rounded-4`}>
                            <div className="container p-3">
                                <p className="fw-bold">{content}</p>
                                <p>{description}</p>
                                <div className={`${styles.buttons} d-flex gap-3 p-2 rounded-4 align-items-center`}>
                                    <button
                                        onClick={() => setCounter(prev => prev > 0 ? prev - 1 : prev = 0)}
                                        type="button"
                                        className={`btn btn-success rounded-circle ${counter > 0 ? "" : "disabled"}`}
                                    >
                                        {counter}
                                    </button>
                                    <button
                                        title="Copy Text"
                                        onClick={() => copyToClipboard(content)}
                                        type="button"
                                        className="btn btn-success rounded-circle m-auto d-flex align-items-center justify-content-center"
                                    >
                                        <BiClipboard size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.azkarRightSection} text-end text-lg-center`}>
                            <p>قسم الأذكار يقدم لك مجموعة شاملة من الأذكار اليومية المنظمة بعناية لتمكينك من الاستفادة منها في حياتك اليومية, تم تصميم هذا القسم ليكون مرجعًا سهلاً يمكن الاعتماد عليه لذكر الله في جميع الأوقات</p>
                        </div>
                    </div>
                    <Link href="/Azkar" className="btn btn-success mt-5 w-100">الذهاب</Link>
                </div>
            </div>
        </>
    );
}

export default AzkarSection;
