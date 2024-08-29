'use client'
import Toast from '@/app/components/Azkar/Toast'
import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import { BiClipboard } from "react-icons/bi";
interface searchParamsProp {
    searchParams: {
        name: string
    }
}
interface CategoryDataProps {
    count: number,
    description: string,
    content: string
}
const AzkarId = ({ searchParams }: searchParamsProp) => {
    let [IsLoading, SetIsLoading] = useState<boolean>(true);
    let [categoryData, setCategoryData] = useState<CategoryDataProps[]>([]);
    let category: string = searchParams.name;
    let AzkarApi: string = `https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json`
    useEffect(() => {
        fetch(AzkarApi).then(res => res.json()).then(data => {
            setCategoryData(data[category].filter(item => item.category === category)?.flat());
            SetIsLoading(false);
        })
    }, [])
    function HandleCounterBtn(ind: number) {
        setCategoryData(prevData =>
            prevData.map((item, i) =>
                (i === ind && item.count > 0) ? { ...item, count: item.count - 1 } : item)
        );
    }
    function HandleCopyBtn(content: string) {
        navigator.clipboard.writeText(content)
    }
    return (<>
        {IsLoading ? <Loading /> :
            <div className="azkar-window d-flex align-items-center justify-content-center flex-wrap mt-5">
                {categoryData.map((Data, i) => {
                    console.log(categoryData.length)
                    let { content, description, count } = Data;
                    console.log(Data);
                    return (
                        <div key={i} className="container p-5 rounded-3 w-75 zekr mb-5 position-relative">
                            <div className="text-center d-flex flex-column">
                                <p className="zekr-content fs-6 fw-bold">{content}</p>
                            </div>
                            <p className="zekr-description text-end mt-3 text-white-50 fs-6">{description}</p>
                            <div className="buttons bg-secondary d-flex gap-3 p-2 rounded-4 align-items-center">
                                <button
                                    title={`pls don't forget to add the specific count here `}
                                    onClick={() => HandleCounterBtn(i)}
                                    type="button"
                                    className={`btn btn-success ${+count === 0 ? "disabled" : ''} rounded-circle m-auto d-flex align-items-center justify-content-center`}
                                >
                                    {+count}
                                </button>
                                <button
                                    title={`Copy Text`}
                                    onClick={() => HandleCopyBtn(content)}
                                    type="button"
                                    className="btn btn-success rounded-circle m-auto d-flex align-items-center justify-content-center"
                                >
                                    <BiClipboard size={15} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        }
    </>);
}

export default AzkarId;