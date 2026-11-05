import logoSingluten from '../../assets/trigo.png';
import { VISTAS } from '../../data/vistas';
import { useCarritoContext } from '../../context/CarritoContext';
import { useThemeContext } from '../../context/ThemeContext';

export function Navbar({ onOpenPanel, setVistaActual }) {
  const { carrito } = useCarritoContext();
  const { isDarkMode, toggleTheme } = useThemeContext();

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header className="sticky top-0 z-10 bg-[var(--color-surface)] border-b border-[var(--color-border-card)] transition-colors shadow-xs">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Marca / Logo */}
        <div
          onClick={() => setVistaActual(VISTAS.TIENDA)}
          className="flex items-center gap-3 cursor-pointer group"
          title="Ir al inicio"
        >
          <img
            src={logoSingluten}
            alt="Logo Sin TACC"
            className="w-10 h-auto"
          />
          <span className="font-display font-bold text-[var(--color-primary)] text-base leading-tight hidden sm:block">
            Productos sin TACC
          </span>
        </div>

        {/* Acciones del Header */}
        <div className="flex items-center gap-3">

          {/* Botón de cambio de tema */}
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-[var(--color-border-card)] bg-[var(--color-surface)] hover:bg-[var(--color-background)] px-3 py-1.5 text-sm text-[var(--color-on-surface)] transition-colors cursor-pointer"
            title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {isDarkMode ? "🌞 Modo Claro" : "🌙 Modo Oscuro"}
          </button>

          {/* Botón Carrito */}
          <button
            onClick={onOpenPanel}
            className="relative px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            📋 Mi Carrito
            {cantidadTotal > 0 && (
              <span className="bg-[var(--color-surface)] text-[var(--color-primary)] text-xs font-bold px-2 py-0.5 rounded-full">
                {cantidadTotal}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
