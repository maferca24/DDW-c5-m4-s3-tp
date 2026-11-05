import { useState } from "react";
import { VISTAS } from "./data/vistas.js";
import { Navbar } from "./components/layout/Navbar.jsx";
import { CarritoModal } from "./components/CarritoModal";
import { Tienda } from "./components/views/Tienda.jsx";
import { Checkout } from "./components/views/Checkout.jsx";
import { Confirmacion } from "./components/views/Confirmacion.jsx";
import useToggle from "./hooks/useToggle";

export default function App() {
  // Determina si el panel del carrito está abierto o cerrado
  const [mostrarPanel, setMostrarPanel] = useToggle(false);

  // Estado para controlar la vista activa
  const [vistaActual, setVistaActual] = useState(VISTAS.TIENDA);

  // Nombre del comprador confirmado, se obtiene al finalizar el checkout
  const [nombreComprador, setNombreComprador] = useState("");

  const renderVista = () => {
    switch (vistaActual) {
      case VISTAS.CHECKOUT:
        return (
          <Checkout
            setVistaActual={setVistaActual}
            setNombreComprador={setNombreComprador}
          />
        );
      case VISTAS.CONFIRMACION:
        return (
          <Confirmacion
            nombreComprador={nombreComprador}
            setVistaActual={setVistaActual}
          />
        );
      case VISTAS.TIENDA:
      default:
        return <Tienda />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-surface)] transition-colors flex flex-col">
      <Navbar
        onOpenPanel={setMostrarPanel}
        setVistaActual={setVistaActual}
      />

      <main className="flex-1 py-6">
        {renderVista()}
      </main>

      {mostrarPanel && (
        <CarritoModal
          onClose={() => setMostrarPanel(false)}
          onIrACheckout={() => {
            setMostrarPanel(false);
            setVistaActual(VISTAS.CHECKOUT);
          }}
        />
      )}
    </div>
  );
}
