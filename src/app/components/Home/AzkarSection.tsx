'use client'
import { useState } from "react";
import Link from "next/link";
import Zekr from "../Azkar/Zekr";
import { handleCopyBtn } from "@/app/Azkar/[AzkarId]/page";
import { BiClipboard } from "react-icons/bi";
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
    return (<>
        <div className=" green-bg-color position-absolute">
            <h2 className="text-center  fw-bold mb-5">الاذكار</h2>
            <div className="container  azkar-section  p-3 rounded-3 ">
                <div className="d-flex flex-column-reverse  flex-md-row align-items-center justify-content-between gap-4 ">
                    <div className="azkar-left-section text-center position-relative rounded-4 ">
                        <div className={`container  p-3 `}>
                            <p className="fw-bold ">{content}</p>
                            <p className="text-start  ">{description}</p>
                            <div className="buttons d-flex gap-3 p-2 rounded-4 align-items-center">

                                <button
                                    onClick={() => setCounter(prev => prev > 0 ? prev - 1 : prev = 0)}
                                    type="button"
                                    className={`btn btn-success rounded-circle ${counter > 0 ? "" : "disabled"}`}
                                >
                                    {counter}
                                </button>
                                <button
                                    title={`Copy Text`}
                                    onClick={() => handleCopyBtn(content)}
                                    type="button"
                                    className="btn btn-success rounded-circle m-auto d-flex align-items-center justify-content-center"
                                >
                                    <BiClipboard size={15} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <Zekr
                        content={content}
                        count={counter}
                        description={description}
                        HandleCopyBtn={() => handleCopyBtn(content)}
                        HandleCounterBtn={() => setCounter(prev => prev > 0 ? prev - 1 : prev = 0)}
                    /> */}
                    <div className="azkar-right-section w-50 text-black  text-end text-lg-center ">
                        <p className=" text-center text-lg-end text-md-end">قسم الأذكار يقدم لك مجموعة شاملة من الأذكار اليومية  المنظمة بعناية لتمكينك من الاستفادة منها في حياتك اليومية, تم تصميم هذا القسم ليكون مرجعًا سهلاً يمكن الاعتماد عليه لذكر الله في جميع الأوقات</p>
                    </div>
                </div>
                <Link href="/Azkar" type="button" className="btn d-block w-25 btn-success mt-5 m-auto">الذهاب</Link>
            </div>
        </div>
    </>);
}

export default AzkarSection;