import { ReactNode } from "react";

const Button: React.FC<{
  disabled?: boolean;
  children?: ReactNode;
  onClick: () => void;
}> = (props) => {
  const clickHandler = () => props.onClick();

  return (
    <button
      type="button"
      onClick={clickHandler}
      disabled={props.disabled}
      className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
        props.disabled
          ? "bg-blue-400 hover:bg-blue-400 dark:hover:bg-blue-500 dark:bg-blue-500 cursor-not-allowed"
          : ""
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
