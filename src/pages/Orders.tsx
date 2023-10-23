import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Nav } from "rsuite";
import { NavbarProps } from "utils/types";

import { useAuth } from "utils/useAuth";

const Tabs: React.FC<NavbarProps> = ({
  active,
  onSelect,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  appearance,
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <Nav
      className="d-flex flex-wrap"
      {...props}
      activeKey={active}
      onSelect={onSelect}
      style={{ marginBottom: 50 }}
    >
      <Nav.Item
        eventKey="OrdersWaiting"
        onClick={() => navigate("/orders/orders-waiting")}
      >
        قيد الانتظار
      </Nav.Item>

      <Nav.Item
        eventKey="storeAcceptance"
        onClick={() => navigate("/orders/store-acceptance")}
      >
        موافقة التاجر{" "}
      </Nav.Item>

      <Nav.Item
        eventKey="clientAcceptance"
        onClick={() => navigate("/orders/client-acceptance")}
      >
        موافقة العميل{" "}
      </Nav.Item>

      <Nav.Item
        eventKey="preparing"
        onClick={() => navigate("/orders/preparing")}
      >
        قيد التجهيز{" "}
      </Nav.Item>
      <Nav.Item
        eventKey="delivering"
        onClick={() => navigate("/orders/delivering")}
      >
        قيد النوصيل{" "}
      </Nav.Item>
      <Nav.Item
        eventKey="completed"
        onClick={() => navigate("/orders/completed-orders")}
      >
        الطلبات المنجزة
      </Nav.Item>
      <Nav.Item
        eventKey="canceled"
        onClick={() => navigate("/orders/canceled-orders")}
      >
        الطلبات الملغاة{" "}
      </Nav.Item>
    </Nav>
  );
};

function Orders() {
  const [active, setActive] = useState<string>("OrdersWaiting");
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    window.location.href = "/login";
  }

  return (
    <>
      <main
        className=" flex-grow-1 mt-4 p-3"
        style={{ direction: "rtl", display: "grid" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5> الطلبات</h5>
          <p> </p>
        </div>
        <div className="d-flex  justify-content-around">
          <Tabs appearance="subtle" active={active} onSelect={setActive} />
        </div>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Orders;
