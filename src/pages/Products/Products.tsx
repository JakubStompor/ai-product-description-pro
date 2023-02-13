import { AxiosResponse } from "axios";
import { useState, useCallback, useEffect } from "react";
import {
  PagingQueryParams,
  getGeneratedProductDescription,
  GetProductsResponse,
  getProducts,
  updateProduct,
} from "../../api/products/products.api";
import { Product } from "../../api/products/products.model";
import Button from "../../components/Button";
import ErrorModal from "../../components/ErrorModal";
import Pagination from "../../components/Pagination/Pagination";
import ProductList from "../../components/ProductList/ProductList";
import { ProductListItem } from "../../components/ProductList/ProductList.model";
import Spinner from "../../components/Spinner";
import {
  removeHtmlTags,
  currentDateMinusOneMonth,
  getQueryParamString,
} from "../../utils/functions";
import { ErrorMessage } from "../../utils/models";

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

  const setProductsHandler = (item: ProductListItem) => {
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

  async function updateProductsHandler() {
    try {
      setError(null);
      setIsLoading(true);
      for (const item of selectedProducts) {
        const descriptionResponse: AxiosResponse<string> =
          await getGeneratedProductDescription(
            `${item.title}.${item.body_html}`
          );
        const collectionDate = currentDateMinusOneMonth();
        const productResponse: AxiosResponse<Product> = await updateProduct(
          collectionDate,
          item.id,
          {
            ...item,
            body_html: descriptionResponse.data,
          }
        );
        setProductsHandler({
          ...productResponse.data,
          checked: false,
        });
      }
    } catch (error: any) {
      setError({
        text: "Update products",
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
        text: "Fetch products",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
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
