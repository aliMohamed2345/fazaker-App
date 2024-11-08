import { BiClipboard } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { copyToClipboard } from "@/app/utils/handleCopyBtn";
import { decrementCount } from "@/app/redux/Slices/ZekrSlice";
import styles from './Azkar.module.css'

const Zekr = ({ index }: { index: number }) => {
    let zekr = useSelector((state: RootState) => state.Zekr.azkar[index]);
    let dispatch = useDispatch();
    let { content, count, description } = zekr;
    console.log(styles)
    return (
        <div
            key={index}
            className={`container p-5 rounded-3 ${styles.zekr} mb-5 position-relative`}
        >
            <div className="text-center d-flex flex-column">
                <p className={`${styles.zekrContent} fw-bold`}>{content}</p>
            </div>
            <p className={`${styles.zekrDescription} text-end mt-3`}>{description}</p>
            <div className={`${styles.buttons} d-flex gap-3 p-2 position-absolute rounded-4 align-items-center`}>
                <button
                    title={`count `}
                    onClick={() => dispatch(decrementCount(index))}
                    type="button"
                    className={`btn btn-success ${+count === 0 ? "disabled" : ""}
                        rounded-circle m-auto d-flex align-items-center justify-content-center`}
                >
                    {+count}
                </button>
                <button
                    title={`Copy Text`}
                    onClick={() => copyToClipboard(content)}
                    type="button"
                    className="btn btn-success rounded-circle m-auto d-flex align-items-center justify-content-center"
                >
                    <BiClipboard size={15} />
                </button>
            </div >
        </div >
    );
};

export default Zekr;
