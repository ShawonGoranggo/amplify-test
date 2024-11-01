type AppProps = {
  pages: number;
  handleNext: () => void;
  handleBack: () => void;
};
const NextAndBackButton = ({ pages, handleNext, handleBack }: AppProps) => {
  return (
    <>
      {pages < 6 && (
        <div>
          <span className="text-[#666565] lg:text-[20px] text-[18px] font-semibold ">{`Step ${pages} of 5`}</span>
        </div>
      )}
      {pages < 6 && (
        <div className="text-right">
          {pages > 1 && (
            <button
              type="button"
              className="min-h-10 min-w-28 mr-3 bg-button-clr-700 text-white rounded"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          <button
            type="button"
            className="min-h-10 min-w-28 bg-button-clr-700 text-white rounded"
            onClick={handleNext} // Placeholder for validation
          >
            {pages === 6 ? "Submit" : "Next"}
          </button>
        </div>
      )}
    </>
  );
};

export default NextAndBackButton;
