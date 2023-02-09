import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { Product } from "../api/products/products.model";
import CheckBox from "./CheckBox";

const ProductItem: React.FC<{
  item: Product;
  index: number;
  onProductSelect: (product: Product, checked: boolean) => void;
}> = (props) => {
  const selectProductHandler = (checked: boolean) => {
    props.onProductSelect(props.item, checked);
  };
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 px-6 py-4">
        <div className="flex items-center">
          <CheckBox
            checked={false}
            id={props.index}
            label="Select product"
            onChange={selectProductHandler}
          />
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {props.item.title}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {format(parseISO(props.item.created_at), "dd/MM/yyyy")}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {props.item.id}
      </td>
      <td className="px-6 py-4">
        <Link
          to={`/products/${props.item.id}`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};
export default ProductItem;
