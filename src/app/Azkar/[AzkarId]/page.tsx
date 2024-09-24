'use client';
import AzkarLoading from "@/app/components/Azkar/AzkarLoading";
import Zekr from "@/app/components/Azkar/Zekr";
import { useEffect, useState } from "react";
import { copyToClipboard } from "@/app/utils/handleCopyBtn";
interface SearchParamsProp {
    searchParams: {
        name: string;
    };
}

interface CategoryDataProps {
    count: number;
    description: string;
    content: string;
    category?: string; // Add this property if it's used for filtering in the API data.
}

const AzkarId = ({ searchParams }: SearchParamsProp) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categoryData, setCategoryData] = useState<CategoryDataProps[]>([]);
    const category: string = searchParams.name;
    const AzkarApi: string =
        `https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json`;

    useEffect(() => {
        fetch(AzkarApi)
            .then((res) => res.json())
            .then((data) => {
                // Corrected the TypeScript syntax error here
                setCategoryData(
                    data[category].filter((item: CategoryDataProps) => item.category === category) // Removed `?.flat()`
                );
                setIsLoading(false);
            });
    }, [AzkarApi, category]);

    function handleCounterBtn(index: number) {
        setCategoryData((prevData) =>
            prevData.map((item, i) =>
                i === index && item.count > 0
                    ? { ...item, count: item.count - 1 }
                    : item
            )
        );
    }


    return (
        <>
            {isLoading ? (
                <AzkarLoading Number={6} />
            ) : (
                <div className="azkar-window d-flex align-items-center justify-content-center flex-wrap mt-5">
                    {categoryData.map((Data, i) => {
                        console.log(categoryData.length);
                        const { content, description, count } = Data;
                        console.log(Data);
                        return (
                            <Zekr
                                key={i}
                                index={i}
                                content={content}
                                count={count}
                                description={description}
                                HandleCopyBtn={() => copyToClipboard(content)}
                                HandleCounterBtn={() => handleCounterBtn(i)}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default AzkarId;
