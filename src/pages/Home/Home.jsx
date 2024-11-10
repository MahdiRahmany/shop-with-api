import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/products-slice";
import { addItemCart } from "../../store/slices/cart-slice";
import Card from "../Card/Card";
import Header from "../../components/Header/Header";

const Home = () => {
  const dispatch = useDispatch();
  const {
    items: data,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header />
      <h1 className="mt-24 text-3xl font-bold text-center my-8">
        Welcome to the Store Shop
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {data.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
