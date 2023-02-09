import { useCallback, useEffect, useState } from "react";
import { Product } from "../api/products/products.model";
import {
  getGeneratedProductDescription,
  getProducts,
  GetProductsResponse,
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

const ProductsPage = () => {
  const pageLimit = 100;
  const [previousQueryParams, setPreviousQueryParams] = useState<string | null>(
    null
  );
  const [nextQueryParams, setNextQueryParams] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingUpdatedProducts, setIsLoadingUpdatedProducts] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      setIsLoadingUpdatedProducts(true);
      await fetchDescriptionsAndUpdateProducts(selectedProducts);
    } catch (error: any) {
      setError("Get products with new description: " + error.message);
    } finally {
      setIsLoadingUpdatedProducts(false);
    }
  };

  const fetchProductsHandler = useCallback(async (query?: string | null) => {
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
      setPreviousQueryParams(getQueryParamString(paging.previous));
      setNextQueryParams(getQueryParamString(paging.next));
      setProducts(response.data.products);
    } catch (err: any) {
      setError("Fetch products: " + err.message);
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

  const previousPageHandler = () => fetchProductsHandler(previousQueryParams);
  const nextPageHandler = () => fetchProductsHandler(nextQueryParams);

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

  if (error) {
    content = <p>{error}</p>;
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
        rounded-md border-gray-300 z-50 flex flex-wrap items-center justify-between mb-2"
        >
          <Button
            label="Update to AI descriptions"
            disabled={isLoadingUpdatedProducts || !selectedProducts.length}
            indicator={selectedProducts.length}
            onClick={fetchUpdatedProductsHandler}
          />
          <div>
            {error ? <p className="text-red-700">{error}</p> : ""}
            {isLoadingUpdatedProducts && <Spinner />}
          </div>
          <Pagination
            previousClick={previousPageHandler}
            previousBtnDisabled={!previousQueryParams}
            nextClick={nextPageHandler}
            nextBtnDisabled={!nextQueryParams}
          />
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default ProductsPage;
