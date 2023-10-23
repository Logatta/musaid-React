import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminArchive } from "utils/types";

import { useAuth } from "utils/useAuth";
import useOrdersAPI from "utils/useOrdersAPI";
import OrderTable from "./OrderTable";


function OrdersWaiting() {
  const isAuthenticated = useAuth();
  if (!isAuthenticated) {
    window.location.href = "/login";
  }

  const fetchOrdersData = async () => {
    const response = await fetchOrders();

    return response?.data?.pending_orders;
  };

  const { fetchOrders } = useOrdersAPI();
  const {
    data: ordersData,
    isLoading,
    isError,
  } = useQuery<AdminArchive[], Error>({
    queryKey: ["order-waiting-data"],
    queryFn: fetchOrdersData,
  });

  return (
    <>
      <div className="justify-content-center align-items-center mt-4 p-3 d-grid">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching products</div>
        ) : ordersData && ordersData.length > 0 ? (
          <OrderTable orders={ordersData} />
        ) : (
          <div>No items found</div>
        )}
      </div>
    </>
  );
}

export default OrdersWaiting;
