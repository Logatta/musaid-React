import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserInterface } from "utils/types";
import { useAuth } from "utils/useAuth";
import useGetAccountAPI from "utils/useGetAccountAPI";
import { Row, Col, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";

function MyAccount() {
  const isAuthenticated = useAuth();
  if (!isAuthenticated) {
    window.location.href = "/login";
  }
  // const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(["tokens", "user"]);
  const fetchUserData = async () => {
    const response = await fetchUser(); // Assuming that fetchMainPage returns a promise
    return response?.data;
  };
  // eslint-disable-next-line
  const [user, setUser] = useState({
    id: 0,
    name_en: "",
    name_ar: "",
    image: "",
    mobile_number: cookies.user.mobile_number,
    email: "",
    country: "",
    surname: "",
    city: "",
  });
  const { fetchUser } = useGetAccountAPI();
  const {
    // eslint-disable-next-line
    data: userData,
    isLoading,
    isError,
  } = useQuery<UserInterface, Error>({
    queryKey: ["user-data"],
    queryFn: fetchUserData,
  });

  // const handleNavigateToUpdateUser = async () => {
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     id: userData?.id || prevUser.id,
  //     name_en: userData?.name_en || prevUser.name_en,
  //     name_ar: userData?.name_ar || prevUser.name_ar,
  //     image:
  //       typeof userData?.image === "string" ? userData.image : prevUser.image,
  //     email: userData?.email || prevUser.email,
  //     country: userData?.country || prevUser.country,
  //     surname: userData?.surname || prevUser.surname,
  //     city:
  //       typeof userData?.city === "number"
  //         ? userData.city.toString()
  //         : userData?.city || prevUser.city,
  //   }));
  //   navigate("/edit-account");
  // };

  useEffect(() => {
    setCookie("user", user);
  }, [setCookie, user]);

  return (
    <main
      className="d-flex flex-column flex-grow-1 mt-4 p-3"
      style={{ direction: "rtl" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4> حسابي</h4>
      </div>
      <div className="products-view">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching User</div>
        ) : (
          <section className="" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="container ">
              <Row>
                <Col xs={12} sm={9}>
                  <Form className="form-horizontal">
                    {/* User Image */}
                    <div className="panel panel-default">
                      <div className="panel-body text-center">
                        <Form.Group
                          controlId="upload"
                          className="d-flex flex-column justify-content-center align-items-center gap-3"
                        >
                          <img
                            className="rounded border w-100"
                            src={
                              cookies.user.image
                                ? cookies.user.image
                                : "https://placehold.co/400"
                            }
                            alt="Selected"
                            style={{ maxWidth: "400px", objectFit: "contain" }}
                          />
                        </Form.Group>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">معلومات العميل</h4>
                      </div>
                      <div className="panel-body">
                        <Form.Group>
                          <Row>
                            <Col>
                              <label htmlFor="name_ar" className="form-label">
                                الأسم بالعربية
                              </label>
                              <input
                                disabled
                                type="text"
                                className="form-control col-6"
                                name="name_ar"
                                id="name_ar"
                                defaultValue={cookies.user.long}
                              />
                            </Col>
                            <Col>
                              <label htmlFor="surname" className="form-label">
                                الأسم بالأنجليزية
                              </label>
                              <input
                                disabled
                                type="text"
                                className="form-control col-6"
                                name="name_en"
                                id="name_en"
                                defaultValue={cookies.user.name_en} // value={formData.name}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <label htmlFor="country" className="form-label">
                                الدولة
                              </label>
                              <input
                                disabled
                                type="text"
                                className="form-control col-6"
                                name="country"
                                id="country"
                                defaultValue={cookies.user.country}
                              />
                            </Col>
                            <Col>
                              <label htmlFor="city" className="form-label">
                                المدينة
                              </label>
                              <input
                                disabled
                                type="text"
                                className="form-control col-6"
                                name="city"
                                id="city"
                                defaultValue={cookies.user.city}
                              />
                            </Col>
                          </Row>
                        </Form.Group>

                        {/* Add more Form Groups here */}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">معلومات التواصل </h4>
                      </div>
                      <div className="panel-body">
                        <Form.Group>
                          <Row>
                            <Col>
                              <label htmlFor="email" className="form-label">
                                البريد الألكتروني
                              </label>
                              <input
                                disabled
                                type="text"
                                className="form-control col-6"
                                name="email"
                                id="email"
                                defaultValue={cookies.user.email}
                              />
                            </Col>
                            <Col>
                              <label
                                htmlFor="mobile_number"
                                className="form-label"
                              >
                                رقم الهاتف
                              </label>
                              <input
                                disabled
                                type="tel"
                                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                className="form-control col-6"
                                name="mobile_number"
                                id="mobile_number"
                                defaultValue={cookies.user.mobile_number}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                      </div>
                    </div>

                    {/* Security */}
                    {/* <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">Security</h4>
                  </div>
                  <div className="panel-body">
                  </div>
                </div> */}

                    {/* <div className="form-group mt-4">
                      <div className="col-sm-10 col-sm-offset-2">
                        <Button
                          variant="primary"
                          onClick={handleNavigateToUpdateUser}
                        >
                          تعديل
                        </Button>
                      </div>
                    </div> */}
                  </Form>
                </Col>
              </Row>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default MyAccount;
