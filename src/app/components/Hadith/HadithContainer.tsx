interface HadithContainerProps {
    KeyVal?: number,
    NumberOfHadith: number,
    HadithContent: string
}

const HadithContainer = ({ KeyVal, NumberOfHadith, HadithContent }: HadithContainerProps) => {
    return (<>
        <div key={KeyVal} className="hadith p-3 rounded-4 d-flex flex-column">
            <p style={{  }} className='text-center hadith-number  text-center d-block p-1  rounded-circle m-auto mb-3'>{NumberOfHadith}</p>
            <p style={{ minHeight: `40px` }} className='text-lg-end text-center'>{HadithContent}</p>
        </div>
    </>);
}

export default HadithContainer;