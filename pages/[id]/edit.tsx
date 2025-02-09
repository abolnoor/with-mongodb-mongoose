import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(id ? `/api/products/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!product) return null;

  const productForm = {
    name: product.name,
    price: product.price,
    image: product.image,
  };

  return <Form formId="edit-product-form" productForm={productForm} forNewProduct={false} />;
};

export default EditProduct;
