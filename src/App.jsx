import { Navbar } from "./components/layout/Navbar.jsx";
import { Tienda } from "./components/views/Tienda.jsx";
import { CarritoModal } from "./components/CarritoModal";

import useToggle from "./hooks/useToogle";
import useProductosList from "./hooks/useProductosList.js";

export default function App() {
  const { list, total, toggle, clear } = useProductosList();
  const [mostrarPanel, setMostrarPanel] = useToggle(false);//determina si el carrito esta abierto o <cerrado>
 
    return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-surface)] transition-colors flex flex-col">
      <Navbar
        listCount={total}
        onOpenPanel={setMostrarPanel}
      />

      <main className="flex-1 py-6">
        <Tienda list={list} toggle={toggle} />
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