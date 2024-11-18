import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import ProductComponent from "./pages/ProductComponentCopy";
import PostComponent from "./pages/PostComponentCopy";
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
        element: <ProductComponent />,
      },
      {
        path: "/products/:productLine",
        element: <ProductComponent />,
      },
      {
        path: "/posts",
        element: <PostComponent />,
      },
      {
        path: "/posts/:postsStat",
        element: <PostComponent />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
