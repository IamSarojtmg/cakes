import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import AddCake from "./components/addCake.tsx";
import IndividualCake from "./components/cakeView.tsx";

const router = createBrowserRouter([
  {path:"/", loader:()=> redirect("/cakes")}, //default react path, redirects to /cakes
  { path: "/cakes", element: <App /> },
  { path: "/add-cake", element: <AddCake /> },
  {path:"/cakes/:cakeid", element:<IndividualCake/>}
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
