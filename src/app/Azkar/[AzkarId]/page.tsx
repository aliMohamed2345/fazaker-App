'use client'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setAzkar } from "@/app/redux/Slices/ZekrSlice";
import AzkarLoading from "@/app/components/Azkar/AzkarLoading";
import Zekr from "@/app/components/Azkar/Zekr";
import styles from '@/app/components/Azkar/Azkar.module.css'
interface SearchParamsProp {
    searchParams: {
        name: string;
    };
}

const AzkarId = ({ searchParams }: SearchParamsProp) => {
    const dispatch = useDispatch();
    const azkar = useSelector((state: RootState) => state.Zekr.azkar);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const category: string = searchParams.name;
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_AZKAR_API}`)
            .then((res) => res.json())
            .then((data) => {
                // Check if the first element is an array and flatten it if needed
                if (Array.isArray(data[category]) && Array.isArray(data[category][0])) {
                    // Concatenate the first array with the rest of the items
                    const flattenedData = [].concat(...data[category]);
                    dispatch(setAzkar(flattenedData));
                } else {
                    // If it's not a nested array, just set it directly
                    dispatch(setAzkar(data[category]));
                }
                setIsLoading(false);
            }).catch((error) => { console.log(`فشل عمليه الجلب :${error}`); setIsLoading(false) }).finally(() => setIsLoading(false));
    }, [process.env.NEXT_PUBLIC_AZKAR_API, category, dispatch]);

    return (
        <>
            {isLoading ? (
                <AzkarLoading Number={8} />
            ) : (
                <div className={`${styles.azkarWindow} d-flex align-items-center justify-content-center flex-wrap mt-5`}>
                    {azkar.map((_, i) => {
                        return (
                            <Zekr index={i} />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default AzkarId;
