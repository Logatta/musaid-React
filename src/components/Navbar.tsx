import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sideNavExpanded } from "../slices/sideNavSlice";

import { Navbar, Nav, Dropdown } from "rsuite";
import GridIcon from "@rsuite/icons/Grid";
import MenuIcon from "@rsuite/icons/Menu";
import { FaRegUserCircle } from "@react-icons/all-files/fa/FaRegUserCircle";
import { BiLogOutCircle } from "@react-icons/all-files/bi/BiLogOutCircle";

import Flag from "react-country-flag";

import "../assets/styles/navbar.scss";
import { useCookies } from "react-cookie";

interface NavbarProps {
  onSelect: (eventKey: string) => void;
  activeKey: string;
}

const CustomNavbar: React.FC<NavbarProps> = ({
  onSelect,
  activeKey,
  ...props
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["tokens", "user"]);

  const handleLogout = () => {
    removeCookie("tokens");
    removeCookie("user");
    window.location.href = "/login";
  };
  return (
    <Navbar {...props} className="nav">
      <Nav
        onClick={() => dispatch(sideNavExpanded())}
        className="d-none d-md-block"
      >
        <Nav.Item style={{ padding: "21px" }}>
          <MenuIcon />
        </Nav.Item>
      </Nav>

      <Nav onSelect={onSelect} activeKey={activeKey} pullRight>
        <Nav.Menu
          title={
            cookies?.user?.mobile_number ? cookies?.user?.mobile_number : ""
          }
          icon={<FaRegUserCircle />}
        >
          <Nav.Item
            icon={<FaRegUserCircle />}
            eventKey="4"
            onClick={() => navigate("/my-account")}
          >
            حسابي
          </Nav.Item>

          <Nav.Item
            onClick={handleLogout}
            icon={<BiLogOutCircle />}
            eventKey="6"
          >
            تسجيل الخروج
          </Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight className="d-md-none">
        <Dropdown icon={<GridIcon />} noCaret>
          <Dropdown.Item onClick={() => navigate("/")}>
            الصفحة الرئيسية
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/profits")}>
            الأرباح
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/orders/orders-waiting")}>
            الطلبات
          </Dropdown.Item>
        </Dropdown>
      </Nav>

      <Nav pullRight>
        <Dropdown
          icon={<Flag countryCode="SA" svg className="lang-icon" />}
          noCaret
        >
          <Dropdown.Item>
            <Flag countryCode="US" svg className="lang-icon" /> الإنكليزية
          </Dropdown.Item>
          <Dropdown.Item>
            <Flag countryCode="SA" svg className="lang-icon" /> العربية
          </Dropdown.Item>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;