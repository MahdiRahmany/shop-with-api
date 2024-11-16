import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/products-slice";
import Card from "../Card/Card";
import Header from "../../components/Header/Header";
import CategorySearch from "../../components/CategorySearch/CategorySearch";

const Home = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (searchResults) => {
    setFilteredProducts(searchResults);
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="xl:max-w-7xl lg:max-w-7xl md:w-screen sm:w-screen mx-auto ">
      <Header />
      <h1 className="text-3xl font-bold text-center my-8">
        Welcome to the Store Shop
      </h1>
      <CategorySearch products={products} onSearch={handleSearch} />
      <h1 className="mt-8 text-3xl font-bold text-center">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
