import { createContext, useState } from "react";

//CREAR EL CONTEXTO
export const FiltersContext = createContext();

//CREAR PROVIDER PARA PROVEER EL CONTEXTO
export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    minPrice: 0,
    category: "all",
  });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}
