import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import MainPage from "pages/MainPage";
import Layout from "components/Layout";
import Profits from "pages/Profits";
import Login from "pages/Login";
import AddProduct from "pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import MyAccount from "pages/MyAccount";
import Orders from "pages/Orders";
import StoreAcceptance from "components/orders/StoreAcceptance";
import OrdersWaiting from "components/orders/OrdersWaiting";
import ClientAcceptance from "components/orders/ClientAcceptance";
import Preparing from "components/orders/Preparing";
import Delivering from "components/orders/Delivering";
import CompletedOrders from "components/orders/CompletedOrders";
import CanceledOrders from "components/orders/CanceledOrders";
import NotFoundPage from "pages/NotFoundPage";

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/my-account" element={<MyAccount />} />
              {/* <Route path="/edit-account" element={<UpdateAccount />} /> */}
              <Route path="/add-product" element={<AddProduct />} />
              <Route element={<Orders />}>
                <Route
                  path="/Orders/orders-waiting"
                  element={<OrdersWaiting />}
                />
                <Route
                  path="/Orders/store-acceptance"
                  element={<StoreAcceptance />}
                />
                <Route
                  path="/Orders/client-acceptance"
                  element={<ClientAcceptance />}
                />
                <Route
                  path="/Orders/completed-orders"
                  element={<CompletedOrders />}
                />
                <Route
                  path="/Orders/canceled-orders"
                  element={<CanceledOrders />}
                />
                <Route path="/Orders/preparing" element={<Preparing />} />
                <Route path="/Orders/delivering" element={<Delivering />} />
              </Route>
              <Route path="/product/:id" element={<EditProduct />} />
              <Route path="/Profits" element={<Profits />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
};
export default App;
