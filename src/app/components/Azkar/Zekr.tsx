import { BiClipboard } from "react-icons/bi";

interface ZekrProps {
    index: number;
    content: string;
    count: number;
    description: string;
    HandleCounterBtn: (index: number) => void;
    HandleCopyBtn: (content: string) => void;
}

const Zekr = ({
    index,
    content,
    count,
    description,
    HandleCounterBtn,
    HandleCopyBtn,
}: ZekrProps) => {
    return (
        <>
            <div
                key={index}
                className="container p-5 rounded-3 w-75 zekr mb-5 position-relative"
            >
                <div className="text-center d-flex flex-column">
                    <p className="zekr-content fs-6 fw-bold">{content}</p>
                </div>
                <p className="zekr-description text-end mt-3 text-white-50 fs-6">
                    {description}
                </p>
                <div className="buttons bg-secondary d-flex gap-3 p-2 rounded-4 align-items-center">
                    <button
                        title={`pls don't forget to add the specific count here `}
                        onClick={() => HandleCounterBtn(index)}  
                        type="button"
                        className={`btn btn-success ${+count === 0 ? "disabled" : ""} rounded-circle m-auto d-flex align-items-center justify-content-center`}
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
        </>
    );
};

export default Zekr;
