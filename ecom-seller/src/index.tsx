import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages";
import SignInPage from "./pages/authentication/sign-in";
import SignUpPage from "./pages/authentication/sign-up";
import EcommerceProductsPage from "./pages/e-commerce/products";
import UserListPage from "./pages/users/list";
import OrderListPage from "./pages/orders/list";
import SalesListPage from "./pages/sales/sales";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

window.path = "http://localhost:4040/seller"
const root = createRoot(container);
if(!localStorage.getItem("adminauth")){
  if(!localStorage.getItem("signupform")){
    console.log("hey")
    localStorage.setItem("signupform",1)
  }
} 
root.render(
  <StrictMode>
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
          {
              localStorage.getItem("sellerAuth") ? 
              <>
            <Route path="/" element={<DashboardPage />} index />
            <Route
            path="/e-commerce/products"
            element={<EcommerceProductsPage />}
            />
            <Route path="/sales/list" element={<SalesListPage  />} />
            <Route path="/order/list" element={<OrderListPage  />} />
            <Route path="*" element={<Navigate  replace={true}  to="/e-commerce/products"/>} />
            </>
         :   
         <>
         <Route path="*" element={<Navigate  replace={true}  to="/authentication/sign-in"/>} />
         <Route path="/authentication/sign-in" element={<SignInPage />} />
          <Route path="/authentication/sign-up" element={<SignUpPage />} />
         </>
        }
        </Routes>
      </BrowserRouter>
    </Flowbite>
  </StrictMode>
);
