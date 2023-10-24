import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { LoginCredentials } from "utils/types";
import { apiUrl_ } from "utils/useResource";
import logo from "../assets/img/logo.png";
import { makeApiRequest } from "utils/api";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["tokens", "user"]);

  const [tokens, setTokens] = useState();
  const [user, setUser] = useState({
    id: 0,
    name_en: "",
    name_ar: "",
    image: "",
    mobile_number: "",
    email: "",
    country: "",
    surname: "",
    city: "",
  });
  const [loginCred, setLoginCred] = useState<LoginCredentials>({
    mobile_number: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleMobile_numberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginCred((prev) => {
      return { ...prev, mobile_number: event.target.value };
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCred((prev) => {
      return { ...prev, password: event.target.value };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await makeApiRequest({
        route: `${apiUrl_}account/token/`,
        method: "post",
        data: loginCred,
      });
      console.log(response);
      
      setTokens(response.data);
      setUser((prevUser) => ({
        ...prevUser,
        id: 0,
        name_en: "",
        name_ar: "",
        image: "",
        email: "",
        country: "",
        surname: "",
        city: "",
        mobile_number: loginCred.mobile_number,
      }));
      navigate("/");
    } catch (error) {
      setError("Credintials are Invalid");
    }
  };

  useEffect(() => {
    setCookie("tokens", tokens);
    setCookie("user", user);
  }, [tokens, setCookie, user]);

  return (
    <div
      className="d-flex flex-column col-10 col-md-6 col-lg-3 justify-content-center align-items-center form-translate"
      style={{ minWidth: "300px" }}
    >
      <img src={logo} alt="logo" className="login-logo mb-5" />

      <form
        onSubmit={handleSubmit}
        className="shadow-sm p-3 bg-body w-100 rounded "
      >
        <div className="text-center mt-2">
          <h5 className="text-primary">آهلا بكم</h5>
          <p className="text-muted">تسجيل الدخول الى متجر مساعد</p>
        </div>
        <div className="p-2 mt-4 d-flex flex-column">
          <div className="form-group">
            <label className="form-label" htmlFor="mobile_number">
              رقم الهاتف
            </label>
            <input
              type="number"
              id="mobile_number"
              value={loginCred.mobile_number}
              onChange={handleMobile_numberChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              كلمة السر
            </label>
            <input
              type="password"
              id="password"
              value={loginCred.password}
              onChange={handlePasswordChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary loginbtn mt-4">
            تسجيل الدخول
          </button>

          {error && (
            <div className="form-group mt-3">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
