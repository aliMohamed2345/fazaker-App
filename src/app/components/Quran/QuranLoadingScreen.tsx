interface ReciterLoadingScreenProps {
    Number: number
}

const ReciterLoadingScreen = ({ Number }: ReciterLoadingScreenProps) => {
    return (<>

        <div className="container m-auto d-flex flex-wrap gap-4 justify-content-center ">

            {Array.from({ length: Number }).map((_, index) => (
                <div
                    key={index}
                    className="loading-skeleton quran-loading-screen p-3 bg-secondary rounded-3 col-3"
                ></div>
            ))}
        </div>
    </>);
}

export default ReciterLoadingScreen;