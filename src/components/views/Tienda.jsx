import { useState } from "react";
import { productos } from "../../data/productos.js"; // El catálogo se importa, no es state
import { ProductoCard } from "../ProductoCard.jsx";
import { useCarritoContext } from "../../context/CarritoContext"; // <-- Importamos el context

export function Tienda() {
  // Extraemos las funciones y estados directamente del Context 
  const { agregar, estaEnElCarrito } = useCarritoContext();

  // El buscador vive localmente acá
  const [busqueda, setBusqueda] = useState("");

  // Filtrado del catálogo en tiempo real
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  console.log("Productos cargados:", productos);
  console.log("Productos filtrados:", productosFiltrados);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Input de búsqueda local */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Buscar productos sin TACC..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-xs bg-[var(--color-surface)] text-[var(--color-on-surface)] border-[var(--color-border-card)]"
        />
      </div>

      {/* Listado de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productosFiltrados.map((producto) => (
          <ProductoCard
            key={producto.id}
            item={producto}
            onToggle={agregar}
            isInList={estaEnElCarrito(producto.id)}
          />
        ))}
      </div>
    </div>
  );
}