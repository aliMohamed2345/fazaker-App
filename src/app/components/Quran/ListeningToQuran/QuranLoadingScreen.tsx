import styles from './ListeningToQuran.module.css'
const ReciterLoadingScreen = ({ Number }: { Number: number }) => {
    return (<>

        <div className="container m-auto d-flex flex-wrap gap-4 justify-content-center ">

            {Array.from({ length: Number }).map((_, index) => (
                <div
                    key={index}
                    className={`loading-skeleton ${styles.quranLoadingScreen} p-3 bg-secondary rounded-3 col-3`}
                ></div>
            ))}
        </div>
    </>);
}

export default ReciterLoadingScreen;