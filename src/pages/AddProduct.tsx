import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Form,
  Button,
  SelectPicker,
  PanelGroup,
  Panel,
  Input,
  IconButton,
  Toggle,
  InputNumber,
} from "rsuite";

import { useAuth } from "utils/useAuth";
import {
  Category,
  Feature,
  FeatureOption,
  Product,
  SubCategory,
} from "utils/types";
import useProductAPI from "utils/useProductAPI";
import useCategoryAPI from "utils/useCategoryAPI";
import { useCookies } from "react-cookie";
import { handleImageUpload } from "utils/api";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { MdCheck } from "@react-icons/all-files/md/MdCheck";
import { MdClose } from "@react-icons/all-files/md/MdClose";

const AddProduct: React.FC = () => {
  const isAuthenticated = useAuth();
  if (!isAuthenticated) {
    window.location.href = "/login";
  }

  const [cookies] = useCookies(["tokens"]);
  const [categories, setCategories] = useState<
    {
      id: number;
      name: string;
      name_en: string;
      parent_id: number;
      parent_name: string;
      parent_name_en: string;
    }[]
  >([]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const [features, setFeatures] = useState<Feature[]>([]);
  const [subCat, setSubCat] = useState<number | null>();
  const [formData, setFormData] = useState<Product>({
    is_available: false,
    name: "",
    name_en: "",
    sub_category: -1,
    price: 0,
    description: "",
    features: [],
  });
  // const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Read the selected image and generate a data URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewURL(e?.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { createProduct } = useProductAPI();
  const { fetchCategory } = useCategoryAPI();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubCategory = (value: number | null) => {
    setSubCat(value);

    // setFormData({ ...formData, [name]: value });
  };

  const handelSubmit = async () => {
    // event.preventDefault();
    // TO-DO add validations
    const submission = { ...formData, features, sub_category: subCat };

    const data = await createProduct(submission);

    if (data && selectedImage) {
      await handleImageUpload(
        selectedImage,
        data.item_id,
        cookies.tokens.access
      );
    }
    if (data.status != false) {
      alert("Added successfully !");
    }
    setSelectedImage(null);
    setPreviewURL(null);
    setFeatures([]);
    setSubCat(null);
    setFormData({
      is_available: false,
      name: "",
      name_en: "",
      sub_category: -1,
      price: 0,
      description: "",
      features: [],
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCategory();
        const reformattedData: {
          label: string;
          value: number;
          id: number;
          name: string;
          name_en: string;
          parent_id: number;
          parent_name: string;
          parent_name_en: string;
        }[] = [];

        response.data.map((category: Category) => {
          category.subcat.forEach((subcategory: SubCategory) => {
            reformattedData.push({
              label: subcategory.name,
              value: subcategory.id,
              id: subcategory.id,
              name: subcategory.name,
              name_en: subcategory.name_en,
              parent_id: category.id,
              parent_name: category.name,
              parent_name_en: category.name_en,
            });
          });
        });

        setCategories(reformattedData);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const addFeature = () => {
    const newF: Feature = {
      id: -1,
      name: "",
      name_en: "",
      options: [],
    };
    setFeatures((prev) => {
      return [...prev, newF];
    });
  };

  const handleChangeAvilabile = (value: boolean) => {
    setFormData({ ...formData, is_available: value });
  };

  const addOption = (idx: number) => {
    // Create a new array with the updated object at the specified index
    const newO: FeatureOption = {
      id: -1,
      name: "",
      name_en: "",
      price: 0,
      available: false,
    };

    const updatedItems = [...features];
    const options = [...updatedItems[idx].options, newO];
    updatedItems[idx] = {
      ...updatedItems[idx], // Copy the existing object properties
      options, // Add the new properties
    };

    // Update the state with the new array
    setFeatures(updatedItems);
  };

  const updateFeatureName = (idx: number, value: string) => {
    const updatedItems = [...features];
    updatedItems[idx].name = value;
    setFeatures(updatedItems);
  };

  const updateFeatureEnName = (idx: number, value: string) => {
    const updatedItems = [...features];
    updatedItems[idx].name_en = value;
    setFeatures(updatedItems);
  };

  const updateOptionName = (idx: number, idx_o: number, value: string) => {
    const updatedItems = [...features];
    updatedItems[idx].options[idx_o].name = value;
    setFeatures(updatedItems);
  };

  const updateOptionEnName = (idx: number, idx_o: number, value: string) => {
    const updatedItems = [...features];
    updatedItems[idx].options[idx_o].name_en = value;
    setFeatures(updatedItems);
  };

  const updateOptionPrice = (idx: number, idx_o: number, value: number) => {
    const updatedItems = [...features];
    updatedItems[idx].options[idx_o].price = value;
    setFeatures(updatedItems);
  };

  const deleteOption = (idx: number, idx_o: number) => {
    const updatedItems = [...features];
    updatedItems[idx].options = updatedItems[idx].options.filter(
      (item, i) => i !== idx_o
    );
    setFeatures(updatedItems);
  };

  const deleteFeature = (idx: number) => {
    const updatedItems = features.filter((item, i) => i !== idx);
    setFeatures(updatedItems);
  };

  // const toast = (idx: number) => {
  //   return (
  //     <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
  //       <div
  //         id="liveToast"
  //         className="toast hide"
  //         role="alert"
  //         aria-live="assertive"
  //         aria-atomic="true"
  //       >
  //         <div className="toast-header">
  //           <strong className="me-auto">Bootstrap</strong>
  //           <small>11 mins ago</small>
  //           <button
  //             type="button"
  //             className="btn-close"
  //             data-bs-dismiss="toast"
  //             aria-label="Close"
  //           ></button>
  //         </div>
  //         <div className="toast-body">
  //           Hello, world! This is a toast message.
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <>
      <main
        className="d-flex flex-column flex-grow-1 mt-4 p-3"
        style={{ direction: "rtl" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4> اضافة منتج</h4>
          <p></p>
        </div>
        <Form className="row m-0 justify-content-center custom-card">
          <div className="col-lg-4 mb-4" style={{ width: "fit-content" }}>
            <Form.Group
              controlId="upload"
              className="d-flex flex-column justify-content-center align-items-center gap-3"
            >
              <img
                className="rounded border w-100"
                src={previewURL ? previewURL : "https://placehold.co/400"}
                alt="Selected"
                style={{ maxWidth: "400px", objectFit: "contain" }}
              />
              <input
                required
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control"
                style={{ maxWidth: "400px" }}
              />
            </Form.Group>

            <button
              type="submit"
              onClick={handelSubmit}
              className="btn btn-primary w-100 mt-3 d-lg-block d-none"
            >
              إضافة المنتج
            </button>
          </div>
          <div className="col-12 col-lg-auto flex-grow-1">
            <Form.Group className="mx-auto">
              <Form.Group>
                <label htmlFor="name" className="form-label">
                  إسم المنتج بالعربية
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder=" إسم المنتج بالعربية"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <label htmlFor="name_en" className="form-label">
                  إسم المنتج بالأنجليزية
                </label>

                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="إسم المنتج بالأنجليزية"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <label htmlFor="categories" className="form-label">
                  التصنيف
                </label>
                <div className="form-control position-relative p-0 border-0">
                  <SelectPicker
                    name="categories"
                    data={categories}
                    groupBy="parent_name"
                    cleanable={false}
                    value={subCat}
                    // style={{ width: "100%" }}
                    onChange={(value) => {
                      handleSubCategory(value);
                    }}
                    className="w-100"
                  />
                </div>
              </Form.Group>

              <Form.Group>
                <label htmlFor="price" className="form-label">
                  السعر
                </label>

                <input
                  required
                  type="number"
                  min={0}
                  className="form-control"
                  placeholder="السعر"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Toggle
                  onChange={handleChangeAvilabile}
                  checked={formData.is_available}
                  checkedChildren={<MdCheck />}
                  unCheckedChildren={<MdClose />}
                />
                <label htmlFor="price" className="form-label mx-3">
                  متاح
                </label>
              </Form.Group>
              <Form.Group>
                <label htmlFor="description" className="form-label">
                  وصف المنتج
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="وصف المنتج"
                  name="description"
                  value={formData.description}
                  onChange={handleTextareaChange}
                />
              </Form.Group>

              {features.length > 0 && (
                <PanelGroup
                  accordion
                  bordered
                  className="mb-3"
                  style={{
                    // width: "100%",
                    // maxWidth: "2000px",
                    position: "relative",
                  }}
                >
                  {features.map((feature, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        <IconButton
                          onClick={() => {
                            deleteFeature(idx);
                          }}
                          className="deleteBtn"
                          icon={<MdDelete />}
                        />
                        <Panel header={`${idx + 1} الميزة `} defaultExpanded>
                          <label
                            htmlFor={`feature-name-${idx}`}
                            className="ml-2 mb-1"
                          >
                            اسم الميزة بالعربية
                          </label>
                          <Input
                            required
                            name={`feature-name-${idx}`}
                            id={`feature-name-${idx}`}
                            value={feature.name}
                            placeholder="اسم الميزة بالعربية"
                            onChange={(value) => updateFeatureName(idx, value)}
                            className="ml-2 mb-2"
                          />
                          <label
                            htmlFor={`feature-name_en-${idx}`}
                            className="ml-2 mb-1"
                          >
                            اسم الميزة بالإنجليزية
                          </label>
                          <Input
                            required
                            name={`feature-name_en-${idx}`}
                            id={`feature-name_en-${idx}`}
                            value={feature.name_en}
                            placeholder="اسم الميزة بالإنجليزية"
                            onChange={(value) =>
                              updateFeatureEnName(idx, value)
                            }
                            className="ml-2 mb-2"
                          />
                          {feature.options.length > 0 && (
                            <PanelGroup
                              accordion
                              bordered
                              className="my-3"
                              style={{
                                position: "relative",
                              }}
                            >
                              {feature.options.map((option, idx_o) => {
                                return (
                                  <>
                                    <IconButton
                                      onClick={() => {
                                        deleteOption(idx, idx_o);
                                      }}
                                      className="deleteBtn"
                                      icon={<MdDelete />}
                                    />

                                    <Panel
                                      key={`${idx}-${idx_o}`}
                                      header={` ${idx_o + 1}الخيار`}
                                      defaultExpanded
                                    >
                                      <label
                                        htmlFor={`option-name-${idx_o}`}
                                        className="ml-2 mb-1"
                                      >
                                        اسم الخيار بالعربية
                                      </label>
                                      <Input
                                        required
                                        name={`option-name-${idx_o}`}
                                        id={`option-name-${idx_o}`}
                                        value={option.name}
                                        placeholder="اسم الخيار بالعربية"
                                        onChange={(value) =>
                                          updateOptionName(idx, idx_o, value)
                                        }
                                        className="ml-2 mb-2"
                                      />
                                      <label
                                        htmlFor={`option-name_en-${idx_o}`}
                                        className="ml-2 mb-1"
                                      >
                                        اسم الخيار بالإنجليزية{" "}
                                      </label>
                                      <Input
                                        required
                                        name={`option-name_en-${idx_o}`}
                                        id={`option-name_en-${idx_o}`}
                                        value={option.name_en}
                                        placeholder="اسم الخيار بالإنجليزية"
                                        onChange={(value) =>
                                          updateOptionEnName(idx, idx_o, value)
                                        }
                                        className="ml-2 mb-2"
                                      />
                                      <label
                                        htmlFor={`option-price-${idx_o}`}
                                        className="ml-2 mb-1"
                                      >
                                        السعر
                                      </label>
                                      <InputNumber
                                        required
                                        name={`option-price-${idx_o}`}
                                        id={`option-price-${idx_o}`}
                                        value={option.price}
                                        max={999}
                                        min={0}
                                        maxLength={3}
                                        type="number"
                                        placeholder="Default Input"
                                        onChange={(value) => {
                                          const temp = Number(value);
                                          updateOptionPrice(idx, idx_o, temp);
                                        }}
                                        className="ml-2 mb-2"
                                      />
                                    </Panel>
                                  </>
                                );
                              })}
                            </PanelGroup>
                          )}
                          <Button onClick={() => addOption(idx)}>
                            إضافة خيار
                          </Button>
                        </Panel>
                      </React.Fragment>
                    );
                  })}
                </PanelGroup>
              )}
              <Button onClick={addFeature}>إضافة ميزة</Button>
            </Form.Group>
          </div>
          <button
            type="submit"
            onClick={handelSubmit}
            className="btn btn-primary w-100 mt-3 d-lg-none"
          >
            إضافة المنتج
          </button>
        </Form>
      </main>
    </>
  );
};

export default AddProduct;
