import { BiClipboard } from "react-icons/bi";

interface ZekrProps {
    index?: number |undefined;
    content: string;
    count: number;
    description: string;
    HandleCounterBtn: (index: number|undefined) => void;
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
                className="container p-5 rounded-3  zekr mb-5 position-relative"
            >
                <div className="text-center d-flex flex-column">
                    <p className="zekr-content  fw-bold">{content}</p>
                </div>
                <p className="zekr-description text-end mt-3  ">
                    {description}
                </p>
                <div className="buttons  d-flex gap-3 p-2 rounded-4 align-items-center">
                    <button
                        title={`count `}
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
