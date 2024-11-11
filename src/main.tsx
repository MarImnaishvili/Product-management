import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import ProductsGrid from "./pages/ProductsGrid";
import PostsGrid from "./pages/PostsGrid";
import HomeGrid from "./pages/HomeGrid";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <HomeGrid />,
      },
      {
        path: "/products",
        element: <ProductsGrid />,
      },
      {
        path: "/products/:productLine",
        element: <ProductsGrid />,
      },
      {
        path: "/posts",
        element: <PostsGrid />,
      },
      {
        path: "/posts/:postsStat",
        element: <PostsGrid />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
