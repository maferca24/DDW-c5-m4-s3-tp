import { createContext, useContext } from "react";
import { useCarrito } from "../hooks/useCarrito";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const carritoLogica = useCarrito();

  return (
    <CarritoContext.Provider value={carritoLogica}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarritoContext() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarritoContext debe usarse dentro de un CarritoProvider");
  }
  return context;
}