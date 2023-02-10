import { useCallback, useEffect, useState } from "react";
import { Product } from "../api/products/products.model";
import {
  getGeneratedProductDescription,
  getProducts,
  GetProductsResponse,
  PagingQueryParams,
  updateProduct,
} from "../api/products/products.api";
import ProductsList from "../components/ProductsList";
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

const ProductsPage = () => {
  const pageLimit = 100;
  const [pagingQueryParams, setPagingQueryParams] =
    useState<PagingQueryParams | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const selectedProductsHandler = (product: Product, checked: boolean) => {
    if (checked) {
      setSelectedProducts((prevProducts) => [
        ...prevProducts,
        {
          ...product,
          body_html: removeHtmlTags(product.body_html),
        },
      ]);
    } else {
      setSelectedProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== product.id)
      );
    }
  };

  const fetchUpdatedProductsHandler = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await fetchDescriptionsAndUpdateProducts(selectedProducts);
    } catch (error: any) {
      setError({
        text: "Get products with new description: ",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      setProducts(response.data.products);
    } catch (error: any) {
      setError({
        text: "Fetch products: ",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchDescriptionsAndUpdateProducts = async (
    products: Product[]
  ): Promise<void> => {
    for (const product of products) {
      const description: string = `${product.title}.${product.body_html}`;
      const response: AxiosResponse<string> =
        await getGeneratedProductDescription(description);
      await updateProduct(currentDateMinusOneMonth(), product.id, {
        ...product,
        body_html: response.data,
      });
    }
  };

  const previousPageHandler = () => {
    const previous: string = (pagingQueryParams?.previous as string) || "";
    fetchProductsHandler(previous);
  };

  const nextPageHandler = () => {
    const next: string = (pagingQueryParams?.next as string) || "";
    fetchProductsHandler(next);
  };

  const errorHandler = () => {
    setError(null);
  };

  useEffect(() => {
    const query = `limit=${pageLimit}&order=created_at`;
    fetchProductsHandler(query);
  }, [fetchProductsHandler]);

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
        <ProductsList
          items={products}
          onProductSelect={selectedProductsHandler}
        />
        <div
          className="sticky bg-gray-100 mt-4 bottom-0 py-4 px-2 border
        rounded-md border-gray-300 z-10 flex flex-wrap items-center justify-between mb-2"
        >
          <Button
            disabled={isLoading || !selectedProducts.length}
            onClick={fetchUpdatedProductsHandler}
          >
            Update to AI descriptions
            <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
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
