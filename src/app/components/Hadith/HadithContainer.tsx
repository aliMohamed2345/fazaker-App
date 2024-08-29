interface HadithContainerProps {
    KeyVal?: number,
    NumberOfHadith: number,
    HadithContent: string
}

const HadithContainer = ({ KeyVal, NumberOfHadith, HadithContent }: HadithContainerProps) => {
    return (<>
        <div key={KeyVal} className="hadith p-3  bg-secondary rounded-4 d-flex flex-column">
            <p style={{ maxWidth: `70px`, width: `45px` }} className='text-center bg-success fs-5 text-center d-block p-1  rounded-circle m-auto mb-3'>{NumberOfHadith}</p>
            <p style={{ minHeight: `40px` }} className='text-lg-end text-center fs-6'>{HadithContent}</p>
        </div>
    </>);
}

export default HadithContainer;