import { ReactNode } from "react";

const ButtonPagination: React.FC<{
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
}> = (props) => {
  const clickHandler = () => props.onClick();
  return (
    <button
      onClick={clickHandler}
      disabled={props.disabled}
      className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
        props.className
      } ${
        props.disabled
          ? "bg-gray-200  hover:bg-gray-200  dark:hover:bg-gray-200  dark:bg-gray-200  cursor-not-allowed"
          : ""
      }`}
    >
      {props.children}
    </button>
  );
};

export default ButtonPagination;
