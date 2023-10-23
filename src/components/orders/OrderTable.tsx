import React from "react";

interface Order {
  id: number;
  name_en: string;
  name_ar: string;
  creation_time: string;
  items_count: number;
  cart_total: number;
  total_quantity: number;
}

interface OrderTableProps {
  orders: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  return (
    <div
      className="table-responsive"
      style={{ maxWidth: "100%", overflow: "auto" }}
    >
      <table
        className="table table-bordered  table-hover"
        style={{ minWidth: "900px" }}
      >
        <thead className="table-secondary">
          <tr>
            <th>#</th>
            <th>الاسم بالانجليزية</th>
            <th>الاسم بالعربية</th>
            <th>وقت الإنشاء</th>
            <th>عدد العناصر</th>
            <th>الكمية الإجمالية</th>
            <th>مجموع العربة</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name_en}</td>
              <td>{order.name_ar}</td>
              <td>{new Date(order.creation_time).toLocaleString()}</td>
              <td>{order.items_count}</td>
              <td>{order.cart_total}</td>
              <td>{order.total_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
