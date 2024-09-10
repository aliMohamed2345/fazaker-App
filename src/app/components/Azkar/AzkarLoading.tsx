interface AzkarLoadingProps {
    Number?: number;
}

const AzkarLoading = ({ Number = 1 }: AzkarLoadingProps) => {
    return (
        <div className="container gap-3 d-flex flex-column h-50 justify-content-center pt-5">
            {Array.from({ length: Number }).map((_, index) => (
                <div
                    key={index}
                    className="loading-skeleton p-3 bg-secondary rounded-4 d-flex flex-column"
                ></div>
            ))}
        </div>
    );
};

export default AzkarLoading ;
