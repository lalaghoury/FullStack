import React, { useEffect } from 'react'
import './BlogForm.scss'
import { Button, Flex, Form, Input, Select, Upload } from 'antd'
import { useAddRecipe } from '../../context/AddRecipeContext';
import { useFunctions } from '../../context/FunctionsSupply';

function BlogForm() {
    const {
        onFinishBlog,
        uploadButton,
        beforeUpload,
        handleUpload,
        recipe_imageurl,
        showImage,
        setShowImage,
        form } = useAddRecipe();

    const handleCancel = () => {
        form.resetFields();
        setShowImage(false);
    }

    const { getAllCategories } = useFunctions();
    const [categories, setCategories] = React.useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getAllCategories();
            setCategories(categories);
        };
        fetchCategories();
    }, []);
    return (
        <div>
            <Form
                form={form}
                scrollToFirstError={true}
                // initialValues={{}}
                onFinish={onFinishBlog}
                layout="vertical"
                className="recipe-form"
                style={{
                    maxWidth: 700,
                }}
            >
                {/*Input For BLog Title */}
                <Form.Item
                    label="Blog Title:"
                    name="title"
                    className="recipe-title"
                    rules={[
                        { required: true, message: "Please input the Blog Title!" },
                    ]}
                >
                    <Input
                        placeholder="Enter Your Blog Name"
                        className="antd-form-input"
                    />
                </Form.Item>

                {/*Input For Recipe Image Upload */}
                <Form.Item label="BLog Image" name="image">
                    <Upload
                        beforeUpload={beforeUpload}
                        onChange={handleUpload}
                        showUploadList={false}
                    >
                        {uploadButton}
                    </Upload>
                    {showImage ? (
                        <div>
                            <img
                                src={recipe_imageurl}
                                alt="avatar"
                                style={{
                                    height: "100px",
                                    objectFit: "fill",
                                }}
                            />
                        </div>
                    ) : (
                        null
                    )}
                </Form.Item>

                {/*Input For Blog Slogan */}
                <Form.Item
                    label="Blog Slogan:"
                    name="slogan"
                    className="recipe-title"
                    rules={[
                        { required: true, message: "Please input the Blog Slogan!" },
                    ]}
                >
                    <Input
                        placeholder="Enter Your Blog Slogan"
                        className="antd-form-input"
                    />
                </Form.Item>

                {/* Input For Category */}
                <Form.Item
                    label="Category:"
                    name='category'
                    rules={[{ required: true, message: "Please select the category!" }]}
                >
                    <Select
                        placeholder="Select Category"
                        style={{ width: 200 }}
                        className="antd-form-input"
                    >
                        {categories.map((category) => (
                            <Select.Option key={category._id} value={category._id}>{category.categoryname}</Select.Option>
                        ))}

                    </Select>
                </Form.Item>

                {/*Input For Blog Description */}
                <Form.Item
                    label="Blog Description:"
                    name="description"
                    rules={[
                        { required: true, message: "Please input the Blog Description!" },
                    ]}
                >
                    <Input.TextArea
                        showCount
                        maxLength={100}
                        placeholder="Introduce your Blog"
                        className="antd-form-input"
                    />
                </Form.Item>

                {/* Blog Content */}
                <Form.Item
                    label="Blog Content:"
                    name="content"
                    rules={[
                        { required: true, message: "Please input the Blog Content!" },
                    ]}
                >
                    <Input.TextArea
                        showCount
                        // maxLength={100}
                        placeholder="Introduce your Blog"
                        className="antd-form-input"
                    />
                </Form.Item>

                <Flex style={{ marginTop: "20px", justifyContent: "center" }}>

                    {/* Submit Button */}
                    <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                        <Button className="bg-primary text-white bold disable-hover" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>


                    {/* Cancel Button */}
                    <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                        <Button
                            style={{ marginRight: "50px" }}
                            className="bg-primary text-white bold disable-hover"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Form.Item>

                </Flex>
            </Form>
        </div>
    )
}

export default BlogForm