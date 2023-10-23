import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "rsuite";
import { OrdersData } from "utils/types";

import { useAuth } from "utils/useAuth";
import useProfitsAPI from "utils/useProfitsAPI";

const { Column, HeaderCell, Cell } = Table;
interface ProfitData {
  total_profit: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactions: any[];
}
function Profits() {
  const isAuthenticated = useAuth();
  if (!isAuthenticated) {
    window.location.href = "/login";
  }

  const fetchOrdersData = async () => {
    const response = await fetchProfits();
    return response?.data?.transactions;
  };

  const fetchProfitData = async () => {
    const response = await fetchProfits();
    return response?.data;
  };

  const { fetchProfits } = useProfitsAPI();
  const {
    data: ordersData,
    isLoading,
    isError,
  } = useQuery<OrdersData[], Error>({
    queryKey: ["order-data"],
    queryFn: fetchOrdersData,
  });

  const {
    data: profit,
  } = useQuery<ProfitData, Error>({
    queryKey: ["profit-data"],
    queryFn: fetchProfitData,
  });

  return (
    <>
      <main className="d-flex flex-column flex-grow-1 mt-4 p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4> الارباح</h4>
          <p></p>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <h4>اجمالي الربح :{profit ? profit.total_profit : null}</h4>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-3">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error fetching products</div>
          ) : (
            <div key={1}>
              <Table
                loading={false}
                hover={true}
                width={650}
                data={ordersData ? ordersData : []}
              >
                <Column width={250} align="center" resizable>
                  <HeaderCell>التاريخ </HeaderCell>
                  <Cell dataKey="date" />
                </Column>

                <Column width={100} resizable>
                  <HeaderCell>الكمية</HeaderCell>
                  <Cell dataKey="amount" />
                </Column>

                <Column width={100} resizable>
                  <HeaderCell>ملاحظات</HeaderCell>
                  <Cell dataKey="note" />
                </Column>
              </Table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Profits;
