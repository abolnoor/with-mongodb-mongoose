import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Product, { Products } from "../models/Product";
import { GetServerSideProps } from "next";

type Props = {
  products: Products[];
};

const Index = ({ products }: Props) => {
  return (
    <>
      {products.map((product) => (
        <div key={product._id}>
          <div className="card">
            <img src={product.image} />
            <h5 className="product-name">{product.name}</h5>
            <div className="main-content">
              <p className="product-name">{product.name}</p>
              <p className="price">Price: {product.price}</p>

              <div className="btn-container">
                <Link href={{ pathname: "/[id]/edit", query: { id: product._id } }}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={{ pathname: "/[id]", query: { id: product._id } }}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

/* Retrieves product(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  /* find all the data in our database */
  const result = await Product.find({});

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const products = result.map((doc) => {
    const product = JSON.parse(JSON.stringify(doc));
    return product;
  });

  return { props: { products: products } };
};

export default Index;
