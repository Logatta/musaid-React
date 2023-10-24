import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../slices/rootReducer";

import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import BarChartIcon from "@rsuite/icons/BarChart";
// import UserInfoIcon from "@rsuite/icons/UserInfo";
import { useNavigate } from "react-router-dom";

function SidNav() {
  const [activeKey, setActiveKey] = React.useState("1");
  const expand = useSelector((state: RootState) => state.sideNav.value);
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "max-content",
        minHeight: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
      }}
      className="sidebar"
    >
      <Sidenav
        className="flex-grow-1 sidebar"
        expanded={expand}
        defaultOpenKeys={["3", "4"]}
      >
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item
              onClick={() => navigate("/")}
              eventKey="1"
              icon={<DashboardIcon />}
            >
              <p>الصفحة الرئيسية</p>
            </Nav.Item>
            <Nav.Item
              onClick={() => navigate("/profits")}
              eventKey="2"
              icon={<BarChartIcon />}
            >
              <p>الأرباح</p>
            </Nav.Item>
            <Nav.Item
              onClick={() => navigate("/orders/orders-waiting")}
              eventKey="3"
              icon={<DashboardIcon />}
            >
              <p>الطلبات</p>
            </Nav.Item>
            {/* <Nav.Item
              onClick={() => navigate("/my-account")}
              eventKey="4"
              icon={<UserInfoIcon />}
            >
              <p>حسابي</p>
            </Nav.Item> */}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
}

export default SidNav;
