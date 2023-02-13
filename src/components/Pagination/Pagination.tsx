import ButtonPagination from "./ButtonPagination";

const Pagination: React.FC<{
  previousClick: () => void;
  nextClick: () => void;
  previousBtnDisabled?: boolean;
  nextBtnDisabled?: boolean;
}> = (props) => {
  const previousClickHandler = () => props.previousClick();
  const nextClickHandler = () => props.nextClick();

  return (
    <div>
      <ButtonPagination
        disabled={props.previousBtnDisabled}
        onClick={previousClickHandler}
      >
        Previous
      </ButtonPagination>
      <ButtonPagination
        className="ml-3"
        disabled={props.nextBtnDisabled}
        onClick={nextClickHandler}
      >
        Next
      </ButtonPagination>
    </div>
  );
};

export default Pagination;
