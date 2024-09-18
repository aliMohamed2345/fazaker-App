import { useState } from "react";

interface GoToAyahProps {
    numberOfAyahs: number
}

const GoToAyah = ({ numberOfAyahs }: GoToAyahProps) => {
    let [InputVal, SetInputVal] = useState<string>('');
    function RenderAllAyahs(numberOfAyahs: number) {
        let ayahList = [];
        if (!InputVal) {
            for (let ayah = 1; ayah <= numberOfAyahs; ayah++) {
                ayahList.push(<li key={ayah}><a href={`#ayah-${ayah-1}`}>{ayah}</a></li>);
            }
        }
        else {
            ayahList.push(<li key={InputVal}><a href={`#ayah-${InputVal}`}>{InputVal}</a></li>);
        }
        return ayahList;
    }
    return (<>
        <div className=" p-3 rounded-3 go-to-ayah-container  d-flex flex-column justify-content-center align-items-center">
            <div className="search-area w-100 mw-100 flex-grow-1">
                <input type="number"
                    value={InputVal}
                    onChange={e => SetInputVal(e.target.value)}
                    min={1}
                    max={numberOfAyahs}
                    className="bg-transparent  rounded-3 border-0 border-bottom border-success  text-center mw-100 w-100 "
                    placeholder="بحث" />
            </div>
            <div className="all-ayahs  mt-4 pt-1 pb-1 rounded-3">
                <ul className="border-success  border-5 p-0  text-center gap-1  m-0 d-flex flex-wrap  justify-content-center ">
                    {RenderAllAyahs(numberOfAyahs)}
                </ul>
            </div>
        </div>
    </>
    );
}

export default GoToAyah;