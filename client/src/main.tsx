import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddCake from "./components/addCake.tsx";

const router = createBrowserRouter([
  
  { path: "/", element: <App /> },
  {path:"/add-cake", element:<AddCake/>}



]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
