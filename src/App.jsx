import { useState, useEffect } from "react";
import { productos } from "./data/productos.js";

import { Navbar } from "./components/layout/Navbar.jsx";
import { SearchBar } from "./components/SearchBar";
import { ProductoList } from "./components/ProductoList";
import { CarritoModal } from "./components/CarritoModal";

import useToggle from "./hooks/useToogle";
import useProductosList from "./hooks/useProductosList.js";

export default function App() {
  const { list, total, toggle, clear } = useProductosList();
  const [mostrarPanel, setMostrarPanel] = useToggle(false);//determina si el carrito esta abierto o <cerrado>
  const [busqueda, setBusqueda] = useState("");// guarda la busqueda y actualiza

  const productosFiltrados = productos.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase().trim())
  );

  //useEffect para título de la ventana
  useEffect(() => {
    const nombreApp = "Productos Sin TACC";
    document.title = total > 0 ? `Mi lista (${total}) | ${nombreApp}` : nombreApp;
  }, [total]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-surface)] transition-colors flex flex-col">
      <Navbar
        listCount={total}
        onOpenPanel={setMostrarPanel}
      />

      <main className="flex-1 py-6">
        <SearchBar
          searchTerm={busqueda}
          setSearchTerm={setBusqueda}
        />

        <ProductoList
          items={productosFiltrados}
          lista={list}
          onToggle={toggle}
          busqueda={busqueda}
        />
      </main>

      {/* Renderizado condicional del modal */}
      {mostrarPanel && (
        <CarritoModal
          lista={list}
          onToggle={toggle}
          onVaciar={clear}
          onClose={() => setMostrarPanel(false)}
        />
      )}
    </div>
  );
}