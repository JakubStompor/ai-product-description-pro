import { Product } from "../api/products/products.model";
import ProductItem from "./ProductItem";

const ProductsList: React.FC<{
  items: Product[];
  onProductSelect: (product: Product, checked: boolean) => void;
}> = (props) => {
  const selectedProductsHandler = (product: Product, checked: boolean) => {
    props.onProductSelect(product, checked);
  };
  return (
    <div className="flex flex-col">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span>Select</span>
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

export default ProductsList;
