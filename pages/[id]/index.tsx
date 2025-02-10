import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Product, { Products } from "../../models/Product";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = {
  product: Products;
};

/* Allows you to view product card info and delete product card*/
const ProductPage = ({ product }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const productID = router.query.id;

    try {
      await fetch(`/api/products/${productID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the product.");
    }
  };

  return (
    <div key={product._id}>
      <div className="card">
        <img src={product.image} />
        <h5 className="product-name">{product.name}</h5>
        <div className="main-content">
          <p className="product-name">{product.name}</p>

          <div className="btn-container">
            <Link href={`/${product._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}: GetServerSidePropsContext) => {
  await dbConnect();

  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const product = await Product.findById(params.id).lean();

  if (!product) {
    return {
      notFound: true,
    };
  }

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const serializedProduct = JSON.parse(JSON.stringify(product));

  return {
    props: {
      product: serializedProduct,
    },
  };
};

export default ProductPage;
