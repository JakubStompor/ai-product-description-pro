import { useCallback, useEffect, useState } from "react";
import {
  getGeneratedProductDescription,
  getProducts,
  GetProductsResponse,
  PagingQueryParams,
  updateProduct,
} from "../api/products/products.api";
import ProductList from "../components/ProductList/ProductList";
import { AxiosResponse } from "axios";
import {
  currentDateMinusOneMonth,
  getQueryParamString,
  removeHtmlTags,
} from "../utils/functions";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import ErrorModal from "../components/ErrorModal";
import { ErrorMessage } from "../utils/models";
import { ProductListItem } from "../components/ProductList/ProductList.model";
import { Product } from "../api/products/products.model";

const ProductsPage = () => {
  const pageLimit = 100;
  const [pagingQueryParams, setPagingQueryParams] =
    useState<PagingQueryParams | null>(null);
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductListItem[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const selectedProductHandler = (item: ProductListItem) => {
    setProducts((prevProducts) => [
      ...prevProducts.map((product) => {
        return product.id === item.id
          ? { ...item, body_html: removeHtmlTags(item.body_html) }
          : {
              ...product,
              body_html: removeHtmlTags(product.body_html),
            };
      }),
    ]);
  };

  const toggleProductSelectHandler = (checked: boolean) => {
    setProducts((prevProducts) => [
      ...prevProducts.map((product) => ({ ...product, checked })),
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

  useEffect(() => {
    const query = `limit=${pageLimit}&order=created_at`;
    fetchProductsHandler(query);
  }, []);

  useEffect(() => {
    const selectedProducts: ProductListItem[] = products.filter(
      (product) => product.checked
    );
    setSelectedProducts(selectedProducts);
  }, [products]);

  async function updateProductsHandler() {
    try {
      setError(null);
      setIsLoading(true);
      for (const item of selectedProducts) {
        const description: string = `${item.title}.${item.body_html}`;
        const response: AxiosResponse<string> =
          await getGeneratedProductDescription(description);
        const productResponse: AxiosResponse<Product> = await updateProduct(
          currentDateMinusOneMonth(),
          item.id,
          {
            ...item,
            body_html: response.data,
          }
        );
        const product: Product = productResponse.data;
        const productListItem: ProductListItem = { ...product, checked: false };
        selectedProductHandler(productListItem);
      }
    } catch (error: any) {
      setError({
        text: "Get products with new description: ",
        message: error.message,
      });
    } finally {
      toggleProductSelectHandler(false);
      setIsLoading(false);
    }
  }

  const fetchProductsHandler = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response: AxiosResponse<GetProductsResponse> = await getProducts(
        currentDateMinusOneMonth(),
        query
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }
      const paging = response.data.paging;
      setPagingQueryParams({
        next: getQueryParamString(paging.next),
        previous: getQueryParamString(paging.previous),
      });
      const products = response.data.products.map((product) => ({
        ...product,
        checked: false,
      }));
      setProducts(products);
    } catch (error: any) {
      setError({
        text: "Fetch products: ",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

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
          onProductSelect={selectedProductHandler}
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
            previousBtnDisabled={!pagingQueryParams?.previous}
            nextClick={nextPageHandler}
            nextBtnDisabled={!pagingQueryParams?.next}
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
