interface SignLoadingScreenProps {
    Number: number
}

const SignLoadingScreen = ({ Number }: SignLoadingScreenProps) => {

    return (<>

        <div className="d-flex container gap-3 mt-5 flex-column mb-5 ">

            {Array.from({ length: Number }).map((_, index) => (
                <div
                style={{height:`120px`}}
                    key={index}
                    className="loading-skeleton  flex-column p-3 rounded-2 d-flex align-items-start justify-content-center"
                ></div>
            ))}
        </div>
    </>);
}


export default SignLoadingScreen;