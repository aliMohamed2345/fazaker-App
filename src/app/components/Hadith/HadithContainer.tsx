import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface HadithContainerProps {
    KeyVal: number; // Only KeyVal is passed
}

const HadithContainer = ({ KeyVal }: HadithContainerProps) => {
    // Get the specific Hadith data using the index KeyVal
    const Hadiths = useSelector((state: RootState) => state.HadithContainerSlice.KeyVal[KeyVal]);
    console.log(Hadiths);
    const { number, arab } = Hadiths;
    return (
        <div key={KeyVal} className="hadith p-3 rounded-4 d-flex flex-column">
            <p className="text-center hadith-number text-center d-block p-1 rounded-circle m-auto mb-3">
                {number}
            </p>
            <p className="text-lg-end  text-center">
                {arab}
            </p>
        </div>
    );
};

export default HadithContainer;
