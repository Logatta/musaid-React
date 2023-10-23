import React, { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "utils/types";
import { useAuth } from "utils/useAuth";
import useUpdateAccountAPI from "utils/useUpdateAccountAPI";
import { Container, Row, Col, Form, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "slices/rootReducer";
import { Input } from "rsuite";
import { useCookies } from "react-cookie";
import { handleProfileUpdate } from "utils/api";

function UpdateAccount() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  if (!isAuthenticated) {
    window.location.href = "/login";
  }
  const [cookies, setCookie, removeCookie] = useCookies(["tokens", "user"]);
  const [formData, setFormData] = useState<UserInterface>({
    id: cookies.user.id,
    name_en: cookies.user.name_en,
    name_ar: cookies.user.name_ar,
    image: null,
    email: cookies.user.email,
    country: cookies.user.country,
    surname: cookies.user.surname,
    city: cookies.user.city,
    mobile_number: cookies.user.mobile_number,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [image, setImage] = useState<string | undefined>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedImage(file);
    if (file) {
      // Read the selected image and generate a data URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewURL(e?.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handelSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    formData.image = selectedImage;
    const res = await handleProfileUpdate(
      selectedImage,
      formData,
      cookies.tokens.access
    );

    if (res?.status === 200) {
      navigate("/my-account");
    }
  };

  return (
    <main
      className="d-flex flex-column flex-grow-1 mt-4 p-3"
      style={{ direction: "rtl" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4> تعديل حسابي </h4>
      </div>
      <div className="products-view">
        {/* {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching User</div>
        ) : ( */}
        <div className="container ">
          <Row>
            <Col xs={12} sm={9}>
              <Form className="form-horizontal" onSubmit={handelSubmit}>
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
                          // cookies.user.image
                          //   ? cookies.user.image
                          //   :
                          previewURL
                            ? previewURL
                            : image
                            ? image
                            : "https://placehold.co/400"
                        }
                        alt="Selected"
                        style={{ maxWidth: "400px", objectFit: "contain" }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        className="form-control"
                        style={{ maxWidth: "400px" }}
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
                            required
                            type="text"
                            className="form-control col-6"
                            name="name_ar"
                            id="name_ar"
                            defaultValue={cookies.user.name_ar}
                            onChange={handleInputChange}
                          />
                        </Col>
                        <Col>
                          <label htmlFor="surname" className="form-label">
                            الأسم بالأنجليزية
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control col-6"
                            name="name_en"
                            id="name_en"
                            defaultValue={cookies.user.name_en} // value={formData.name}
                            onChange={handleInputChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <label htmlFor="country" className="form-label">
                            الدولة
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control col-6"
                            name="country"
                            id="country"
                            defaultValue={cookies.user.country}
                            onChange={handleInputChange}
                          />
                        </Col>
                        <Col>
                          <label htmlFor="city" className="form-label">
                            المدينة
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control col-6"
                            name="city"
                            id="city"
                            defaultValue={cookies.user.city}
                            onChange={handleInputChange}
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
                            required
                            type="text"
                            className="form-control col-6"
                            name="email"
                            id="email"
                            defaultValue={cookies.user.email}
                            onChange={handleInputChange}
                          />
                        </Col>
                        <Col>
                          <label htmlFor="mobile_number" className="form-label">
                            رقم الهاتف
                          </label>
                          <input
                            required
                            type="tel"
                            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            className="form-control col-6"
                            name="mobile_number"
                            id="mobile_number"
                            defaultValue={cookies.user.mobile_number}
                            onChange={handleInputChange}
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

                <div className="form-group mt-4">
                  <div className="col-sm-10 col-sm-offset-2">
                    <Button type="submit" variant="primary">
                      تعديل
                    </Button>
                    <Button type="reset" variant="default">
                      الغاء
                    </Button>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
        {/* )} */}
      </div>
    </main>
  );
}

export default UpdateAccount;
