import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useShopData from "./hooks/useShopData";
import Home from "./Home/Home";
import ProductPage from "./ProductPage/ProductPage";

const App = () => {
  const { data } = useShopData();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage data={data} />} />
      </Routes>
    </Router>
  );
};

export default App;
