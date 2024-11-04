import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../ProductList/ProductList";

const ProductPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(error.message);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا: {error.message}</p>;
  if (!data) return <p>هیچ داده‌ای موجود نیست.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ProductList product={data} />
    </div>
  );
};

export default ProductPage;
