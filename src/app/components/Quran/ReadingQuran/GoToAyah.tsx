interface GoToAyahProps {
    numberOfAyahs: number
}

const GoToAyah = ({ numberOfAyahs }: GoToAyahProps) => {
    function RenderAllAyahs(numberOfAyahs: number) {
        let ayahList = [];
        for (let ayah = 1; ayah <= numberOfAyahs; ayah++) {
            ayahList.push(<li key={ayah}>{ayah}</li>);
        }
        return ayahList;
    }
    return (<>
        <div className=" p-3 rounded-3 go-to-ayah-container  d-flex flex-column justify-content-center align-items-center">
            <div className="search-area w-25 mw-100 flex-grow-1">
                <input type="number"
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