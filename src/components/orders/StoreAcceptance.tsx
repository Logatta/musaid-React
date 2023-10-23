import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AdminArchive } from "utils/types";

import { useAuth } from "utils/useAuth";
import useOrdersAPI from "utils/useOrdersAPI";
import OrderTable from "./OrderTable";

function StoreAcceptance() {
  const isAuthenticated = useAuth();
  if (!isAuthenticated) {
    window.location.href = "/login";
  }

  const fetchOrdersData = async () => {
    const response = await fetchOrders();

    return response?.data?.orders_approved_by_store;
  };

  const { fetchOrders } = useOrdersAPI();
  const {
    data: ordersData,
    isLoading,
    isError,
  } = useQuery<AdminArchive[], Error>({
    queryKey: ["store-acceptance-data"],
    queryFn: fetchOrdersData,
  });

  return (
    <>
      <main className="d-grid justify-content-center align-items-center mt-4 p-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching products</div>
        ) : ordersData && ordersData.length > 0 ? (
          <div key={1}>
            <OrderTable orders={ordersData} />
          </div>
        ) : (
          <div>No items found</div>
        )}
      </main>
    </>
  );
}

export default StoreAcceptance;
