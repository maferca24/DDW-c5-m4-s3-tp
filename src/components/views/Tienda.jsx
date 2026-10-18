// src/components/views/Tienda.jsx
import { useState, useEffect } from "react";
import { productos } from "../../data/productos.js";
import { SearchBar } from "../SearchBar";
import { ProductoList } from "../ProductoList";

export function Tienda({ list, toggle }) {
  const [busqueda, setBusqueda] = useState("");

  //Catalogo de Productos en Tienda (vista)
  const productosFiltrados = productos.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase().trim())
  );

  // titulo de la pestaña y busqueda
  useEffect(() => {
    const nombreApp = "Productos Sin TACC";
    document.title = busqueda 
      ? `Buscando: ${busqueda} | ${nombreApp}` 
      : nombreApp;
  }, [busqueda]);

  return (
    <div>
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
    </div>
  );
}