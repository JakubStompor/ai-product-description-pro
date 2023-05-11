import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useApi from "./hooks/useApi";
import HomePage from "./pages/Home";
import ProductDetailPage from "./pages/ProductDetail";
import ProductsPage from "./pages/Products/Products";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:productId", element: <ProductDetailPage /> },
    ],
  },
]);

function App() {
  useApi();
  return <RouterProvider router={router} />;
}

export default App;
