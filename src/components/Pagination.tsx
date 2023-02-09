import ButtonPagination from "./ButtonPagination";

const Pagination: React.FC<{
  previousClick: () => void;
  nextClick: () => void;
  previousBtnDisabled?: boolean;
  nextBtnDisabled?: boolean;
}> = (props) => {
  const previousClickHandler = () => {
    props.previousClick();
  };
  const nextClickHandler = () => {
    props.nextClick();
  };
  return (
    <div>
      <ButtonPagination
        disabled={props.previousBtnDisabled}
        label="Previous"
        onClick={previousClickHandler}
      />
      <ButtonPagination
        className="ml-3"
        disabled={props.nextBtnDisabled}
        label="Next"
        onClick={nextClickHandler}
      />
    </div>
  );
};

export default Pagination;
