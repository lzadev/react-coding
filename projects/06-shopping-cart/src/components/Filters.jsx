import { useId } from "react";
import { useFilters } from "../hooks/useFilters";
import "./Filters.css";

export function Filters() {
  const { filters, setFilters } = useFilters();

  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleOnchangeMinPrice = (event) => {
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
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
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
