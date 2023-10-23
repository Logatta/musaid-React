import axios from "axios";
import { ApiRequest, UserInterface } from "./types";
import { apiUrl_ } from "./useResource";

export const makeApiRequest = async <T,>({
  route,
  method,
  data,
  headers,
}: ApiRequest<T> & { headers?: Record<string, string> }) => {
  try {
    const response = await axios({ url: route, method, data, headers });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Invalid response");
    }
  } catch (error) {
    console.log("An error occurred", error);

    throw new Error("An error occurred");
  }
};

export const handleImageUpload = async (
  selectedImage: File | null,
  id: number,
  token: string
) => {
  if (selectedImage) {
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios({
        url: `${apiUrl_}stores/upload_image/${id}/`,
        method: "post",
        data: { image: selectedImage },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.status;
    } catch (error) {
      console.log("An error occurred", error);
      throw new Error("An error occurred");
    }
  }
};

export const handleProfileUpdate = async (
  selectedImage: File | null,
  profileData: UserInterface,
  token: string
) => {
  if (selectedImage) {
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios({
        url: `${apiUrl_}account/update_info/`,
        method: "put",
        data: { ...profileData, image: selectedImage },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      console.log("An error occurred", error);
      throw new Error("An error occurred");
    }
  }
};
