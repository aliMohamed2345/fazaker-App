import { useState } from "react";
import { IoClose } from "react-icons/io5";
interface ToastProps {
    Text: string
    Show?: boolean 
}

const Toast = ({ Text,Show  }: ToastProps) => {
    let [isVisible, setIsVisible] = useState(Show);
    return (<>
        {isVisible &&
            <div
                className="Toast d-flex align-items-center p-2 justify-content-between position-fixed z-3 bg-danger  rounded-2 ">
                <p className="fw-bold fs-6 m-0 text-white">{Text}</p>
                <button onClick={()=>setIsVisible(false)} className="bg-transparent border-0" title="close">
                    <IoClose color="white" />
                </button>
            </div>
        }

    </>);
}

export default Toast;