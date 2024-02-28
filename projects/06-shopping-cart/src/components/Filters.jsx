import { useState } from "react";
import "./Filters.css";

export function Filters({ onChange }) {
  const [minPrice, setMinPrice] = useState(0);

  const handleOnchangeMinPrice = (event) => {
    setMinPrice(event.target.value);
    onChange((prev) => ({
      ...prev,
      minPrice: event.target.value,
    }));
  };

  const handleOnCategoryChange = (event) => {
    onChange((prev) => ({
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
          id="price"
          min="0"
          max="1000"
          onChange={handleOnchangeMinPrice}
        />
        <span>${minPrice}</span>
      </div>

      <div>
        <label htmlFor="category">Categoría</label>
        <select id="category" onChange={handleOnCategoryChange}>
          <option value="all">Todas</option>
          <option value="laptops">Pórtatiles</option>
          <option value="smartphones">Celulares</option>
        </select>
      </div>
    </section>
  );
}
