import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import AddCake from "./pages/addCake.tsx";
import IndividualCake from "./pages/cakeView.tsx";
import EditCake from "./pages/editCake.tsx";
import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onOfflineReady() {
    console.log('PWA is ready to work offline')
  }
})


const router = createBrowserRouter([
  { path: "/", loader: () => redirect("/cakes") }, //default react path, redirects to /cakes
  { path: "/cakes", element: <App /> },
  { path: "/add-cake", element: <AddCake /> },
  { path: "/cakes/:cakeid", element: <IndividualCake /> },
  { path: "/cakes/edit/:cakeid", element: <EditCake /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
