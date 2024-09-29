'use client'
import { useEffect, useState } from "react";
import { BsChevronUp } from "react-icons/bs";

const ScrollToTop = () => {
    const [isIconVisible, setIsIconVisible] = useState(false);

    const handleScroll = () => {
        (window.scrollY >= 200 ? setIsIconVisible(true) : setIsIconVisible(false));
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll,{passive:true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {isIconVisible &&
                <button
                    title="scroll to top"
                    onClick={() => window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })}
                    style={{ bottom: `40px`, right: `40px`, transition: `0.3s` }}
                    className={`rounded-3 btn btn-success p-2 position-fixed d-flex align-items-center  ${isIconVisible ? 'opacity-1' : 'opacity-0'} justify-content-center z-3 `}
                >
                    <BsChevronUp color="white" size={19} />
                </button>
            }
        </>
    );
}

export default ScrollToTop;
