import { createContext, useContext, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, message } from "antd";
import axios from "axios";

const AddRecipeContext = createContext();

export const AddRecipeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [recipe_imageurl, setRecipe_imageurl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const [form] = Form.useForm();

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setRecipe_imageurl(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    setSelectedImage(file);
    return false; // Prevent automatic upload
  };

  const handleUpload = async (info) => {
    handleImageChange(info);
    setLoading(true);
    if (!selectedImage) {
      message.error("No image selected");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "http://localhost:5000/image",
        formData
      );
      console.log(response.data.url);
      setLoading(false);
      setShowImage(true);

      setRecipe_imageurl(response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onFinish = async (values) => {
    const userId = localStorage.getItem("userId");
    console.log(values.category)
    try {
      const response = await axios.post(
        "http://localhost:5000/recipe", { ...values, recipe_imageurl, user: [userId] });
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onFinishBlog = async (values) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID is not available");
      return;
    }
    if (!recipe_imageurl) {
      console.error("Image URL is not set");
      return;
    }
    if (!category) {
      console.error("Category is not set");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/blog", { ...values, user: [userId], image: recipe_imageurl }
      );
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  const uploadButton = (
    <div style={{ textAlign: "center" }}>
      {loading ? <LoadingOutlined /> : null}
      <div>
        <PlusOutlined /> Upload
      </div>
    </div>
  );

  return (
    <AddRecipeContext.Provider
      value={{ uploadButton, onFinishBlog, handleImageChange, beforeUpload, handleUpload, showImage, setRecipe_imageurl, recipe_imageurl, setShowImage, onFinish, form }}
    >
      {children}
    </AddRecipeContext.Provider>
  );
};

export const useAddRecipe = () => {
  const context = useContext(AddRecipeContext);
  if (!context) {
    throw new Error("useAddRecipe must be used within a AddRecipeProvider");
  }
  return context;
};
