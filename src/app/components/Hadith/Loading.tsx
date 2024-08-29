interface HadithLoadingProps {
    Number?: number;
  }
  
  const HadithLoading = ({ Number= 1 }: HadithLoadingProps) => {
    return (
      <div className="container gap-3 d-flex flex-column h-50 justify-content-center">
        {Array.from({ length: Number }).map((_, index) => (
          <div
            key={index}
            className="loading-skeleton p-3 bg-secondary rounded-4 d-flex flex-column"
          ></div>
        ))}
      </div>
    );
  };
  
  export default HadithLoading;
  