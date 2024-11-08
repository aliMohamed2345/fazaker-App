import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import styles from './Hadith.module.css'
interface HadithContainerProps {
    KeyVal: number; // Only KeyVal is passed
}

const HadithContainer = ({ KeyVal = -1 }: HadithContainerProps) => {
    // Get the specific Hadith data using the index KeyVal
    const { number, arab } = useSelector((state: RootState) => state.HadithContainerSlice.KeyVal[KeyVal === -1 ? 0 : KeyVal])
    return (
        <div key={KeyVal} className={`${styles.hadith} p-3 rounded-4 d-flex flex-column`}>
            <p className={`text-center ${styles.hadithNumber} text-center d-block p-1 rounded-circle m-auto mb-3`}>
                {number}
            </p>
            <p className="text-lg-end  text-center">
                {arab}
            </p>
        </div>
    );
};

export default HadithContainer;
