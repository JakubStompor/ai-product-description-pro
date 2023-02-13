import { useState, useCallback, useEffect } from "react";
import {
  PagingQueryParams,
  GetProductsResponse,
} from "../../api/products/products.api";
import { Product } from "../../api/products/products.model";
import Button from "../../components/Button";
import ErrorModal from "../../components/ErrorModal";
import Pagination from "../../components/Pagination/Pagination";
import ProductList from "../../components/ProductList/ProductList";
import { ProductListItem } from "../../components/ProductList/ProductList.model";
import Spinner from "../../components/Spinner";
import { ErrorMessage } from "../../utils/models";
import {
  getPagingQueryParams,
  getProductDescription,
  getProductListItem,
  getProductListItems,
  getProductsByQuery,
  updateSingleProduct,
} from "./Products.utils";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductListItem[]>(
    []
  );
  const [pagingQueryParams, setPagingQueryParams] =
    useState<PagingQueryParams | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const setProductsHandler = (item: ProductListItem) => {
    setProducts((prevProducts) => [
      ...prevProducts.map((product) => {
        return product.id === item.id
          ? getProductListItem(item, item.checked)
          : getProductListItem(product, product.checked);
      }),
    ]);
  };

  const toggleProductSelectHandler = (checked: boolean) => {
    setProducts((prevProducts) => [
      ...getProductListItems(prevProducts, checked),
    ]);
  };

  const previousPageHandler = () => {
    const previous: string = (pagingQueryParams?.previous as string) || "";
    fetchProductsHandler(previous);
  };

  const nextPageHandler = () => {
    const next: string = (pagingQueryParams?.next as string) || "";
    fetchProductsHandler(next);
  };

  const errorHandler = () => setError(null);

  const initialize = async (query: string) => {
    const response: GetProductsResponse = await getProductsByQuery(query);
    setPagingQueryParams(getPagingQueryParams(response.paging));
    setProducts(getProductListItems(response.products, false));
  };

  const updateProducts = async () => {
    for (const selectedProduct of selectedProducts) {
      const description: string = await getProductDescription(
        `${selectedProduct.title}.${selectedProduct.body_html}`
      );
      const product: Product = await updateSingleProduct(
        selectedProduct,
        description
      );
      setProductsHandler(getProductListItem(product, false));
    }
  };

  const updateProductsHandler = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await updateProducts();
    } catch (error: any) {
      setError({
        text: "Update products",
        message: error.message,
      });
    } finally {
      toggleProductSelectHandler(false);
      setIsLoading(false);
    }
  };

  const fetchProductsHandler = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await initialize(query);
    } catch (error: any) {
      setError({
        text: "Fetch products",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const pageLimit = 100;
    const query = `limit=${pageLimit}&order=created_at`;
    fetchProductsHandler(query);
  }, [fetchProductsHandler]);

  useEffect(() => {
    const selectedProducts: ProductListItem[] = products.filter(
      (product) => product.checked
    );
    setSelectedProducts(selectedProducts);
  }, [products]);

  let content = <p>Products no found.</p>;

  if (isLoading) {
    content = (
      <div className="flex w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (products.length > 0) {
    content = (
      <div className="mx-4 mb-6 mt-4">
        <ProductList
          items={products}
          isLoading={isLoading}
          onProductSelect={setProductsHandler}
          onToggleProductSelect={toggleProductSelectHandler}
        />
        <div
          className="sticky bg-gray-100 mt-4 bottom-0 py-4 px-2 border
        rounded-md border-gray-300 z-10 flex flex-wrap items-center justify-between mb-2"
        >
          <Button
            disabled={isLoading || !selectedProducts.length}
            onClick={updateProductsHandler}
          >
            Update to AI descriptions
            <span className="inline-flex items-center justify-center h-4 px-2 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
              {selectedProducts.length}
            </span>
          </Button>
          <div>{isLoading && <Spinner />}</div>
          <Pagination
            previousClick={previousPageHandler}
            previousBtnDisabled={!pagingQueryParams?.previous || isLoading}
            nextClick={nextPageHandler}
            nextBtnDisabled={!pagingQueryParams?.next || isLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {error && (
        <ErrorModal
          title={error.text}
          message={error.message}
          onConfirm={errorHandler}
        ></ErrorModal>
      )}
      {content}
    </>
  );
};

export default ProductsPage;
