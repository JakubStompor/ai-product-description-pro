import CheckBox from "../CheckBox";
import { ProductListItem } from "./ProductList.model";
import ProductItem from "./ProductListItem";

const ProductList: React.FC<{
  items: ProductListItem[];
  isLoading?: boolean;
  onProductSelect: (product: ProductListItem) => void;
  onToggleProductSelect: (checked: boolean) => void;
}> = (props) => {
  const shouldCheckToggleAll = props.items.every((product) => product.checked);
  const selectedProductsHandler = (product: ProductListItem) =>
    props.onProductSelect(product);
  const toggleProductSelectHandler = (checked: boolean) =>
    props.onToggleProductSelect(checked);
  return (
    <div className="flex flex-col">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <CheckBox
                  id="select-all"
                  label="Select all"
                  disabled={props.isLoading}
                  checked={shouldCheckToggleAll}
                  onChange={toggleProductSelectHandler}
                />
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {props.items.map((item, index) => {
              return (
                <ProductItem
                  onProductSelect={selectedProductsHandler}
                  disabled={props.isLoading}
                  index={index}
                  item={item}
                  key={item.id}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
