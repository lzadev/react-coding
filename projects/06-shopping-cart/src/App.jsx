import { useState } from "react";
import { Products } from "./components/Products";
import { products as initialProducts } from "./mocks/products";
import { Header } from "./components/Header";
import { useFilters } from "./hooks/useFilters";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const { filteredProducts, setFilters } = useFilters({ products });
  return (
    <>
      <Header />
      <Products products={filteredProducts} />
    </>
  );
}

export default App;
