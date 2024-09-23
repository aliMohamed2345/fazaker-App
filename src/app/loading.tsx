interface LoadingProps {
    Width?: string;
    Height?: string;
    Color?: string;
    MarginTop?: string;
}

function Loading({ Width = "80px", Height = Width, Color = "text-success", MarginTop = '0px' }: LoadingProps) {
    return (
        <div
            className="d-flex justify-content-center align-items-center fs-1"
            style={{ height: '100vh', marginTop: MarginTop }}
        >
            <div
                className={`spinner-border ${Color}`}
                role="status"
                style={{ width: Width, height: Height }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Loading;
