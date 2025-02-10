import Form from "../components/Form";

const NewProduct = () => {
  const productForm = {
    name: "",
    price: 0,
    image: "",
  };

  return <Form formId="add-product-form" productForm={productForm} />;
};

export default NewProduct;
