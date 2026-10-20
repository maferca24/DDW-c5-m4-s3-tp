import { VISTAS } from "./data/vistas.js";

import { Navbar } from "./components/layout/Navbar.jsx";
import { CarritoModal } from "./components/CarritoModal";


import { Tienda } from "./components/views/Tienda.jsx";
import { Checkout } from "./components/views/Checkout.jsx";
import { Confirmacion } from "./components/views/Confirmacion.jsx"

import useToggle from "./hooks/useToogle";
import useProductosList from "./hooks/useProductosList.js";
import { useState } from "react";

export default function App() {
  const { list, total, toggle, clear } = useProductosList();
  const [mostrarPanel, setMostrarPanel] = useToggle(false);//determina si el carrito esta abierto o <cerrado>
  
  //Estado para controlar las vistas
  const [vistaActual, setVistaActual] = useState(VISTAS.TIENDA)
  
  //Renderiza la vista según el estado
  const renderVista = ()=>{
    switch (vistaActual) {
      case VISTAS.CHECKOUT:
        return (
          <Checkout     
          />
        );
      case VISTAS.CONFIRMACION:
        return (
          <Confirmacion/>
        )
      case VISTAS.TIENDA:
        default:
          return <Tienda list={list} toggle={toggle}/>  
    }
  }

    return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-surface)] transition-colors flex flex-col">
      <Navbar
        listCount={total}
        onOpenPanel={setMostrarPanel}
        setVistaActual={setVistaActual}
      />

      <main className="flex-1 py-6">
        {/* Renderizado de la vista elegida */}
        {renderVista()}
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