import { useState, useEffect } from "react";
import recetasSintacc from "./data/recetasSintacc.json";

import { Navbar } from "./components/Navbar";
import { SearchBar } from "./components/SearchBar";
import { ItemList } from "./components/ItemList";
import { ListPanel } from "./components/ListPanel";

import useToggle from "./hooks/useToogle";
import useRecetasList from "./hooks/useRecetasList";

export default function App() {
const { list, total, toggle, clear } = useRecetasList();
const [mostrarPanel, setMostrarPanel] = useToggle(false);//determina si el panel de recetas esta abierto o <cerrado>
const [busqueda, setBusqueda] = useState("");// guarda la busqueda y actualiza

const recetasFiltradas = recetasSintacc.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase().trim())
  );

//useEffect para título de la ventana
useEffect(() => {
    const nombreApp = "Recetas Sin TACC";
    document.title= total >0?  `Mi lista (${total}) | ${nombreApp}` : nombreApp;
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

        <ItemList
          items={recetasFiltradas}
          lista={list}
          onToggle={toggle}
          busqueda={busqueda}
        />
      </main>

      {/* Renderizado condicional del modal */}
      {mostrarPanel && (
        <ListPanel
          lista={list}
          onToggle={toggle}
          onVaciar={clear} // Le pasamos la función al panel
          onClose={setMostrarPanel}
        />
      )}
    </div>
  );
}