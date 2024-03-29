import { ReactNode, useEffect, useState } from "react";

const CheckBox: React.FC<{
  id: string | number;
  checked: boolean;
  children?: ReactNode;
  label: string;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}> = (props) => {
  const defaultChecked = props.checked ? props.checked : false;
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
    props.onChange(!checked);
  };

  useEffect(() => setChecked(props.checked), [props.checked]);

  return (
    <>
      <input
        id={`checkbox-table-choose-${props.id}`}
        type="checkbox"
        disabled={props.disabled}
        checked={checked}
        onChange={handleChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      >
        {props.children}
      </input>
      <label htmlFor={`checkbox-table-choose-${props.id}`} className="sr-only">
        {props.label}
      </label>
    </>
  );
};

export default CheckBox;
