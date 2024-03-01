import { useState, useId, useContext } from "react";
import "./Filters.css";
import { FiltersContext } from "../context/filters";

export function Filters() {
  const [minPrice, setMinPrice] = useState(0);
  const { setFilters } = useContext(FiltersContext);

  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  console.log(minPriceFilterId, categoryFilterId);

  const handleOnchangeMinPrice = (event) => {
    setMinPrice(event.target.value);
    setFilters((prev) => ({
      ...prev,
      minPrice: event.target.value,
    }));
  };

  const handleOnCategoryChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      category: event.target.value,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor="price">Pricio a partir de:</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max="1000"
          onChange={handleOnchangeMinPrice}
        />
        <span>${minPrice}</span>
      </div>

      <div>
        <label htmlFor="category">Categoría</label>
        <select id={categoryFilterId} onChange={handleOnCategoryChange}>
          <option value="all">Todas</option>
          <option value="laptops">Pórtatiles</option>
          <option value="smartphones">Celulares</option>
        </select>
      </div>
    </section>
  );
}
