import { formatearPrecio } from '../utils/formato';

/**
 * CarritoItem — fila individual de un producto en el carrito.
 * Recibe el item y los handlers del contexto vía props desde CarritoModal.
 */
export function CarritoItem({ item, onCambiarCantidad, onQuitar }) {
  return (
    <li className="flex items-center justify-between p-3 bg-[var(--color-background)] border border-[var(--color-border-card)] rounded-lg transition-colors gap-3">

      {/* Info del producto */}
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-[var(--color-on-surface)]">
          {item.nombre}
        </h4>
        <span className="text-xs font-bold text-emerald-600">
          {formatearPrecio(item.precio)}
        </span>
      </div>

      {/* Controles de cantidad */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onCambiarCantidad(item.id, -1)}
          className="w-7 h-7 bg-[var(--color-primary)] text-white font-bold rounded flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
          title="Disminuir cantidad"
          aria-label={`Disminuir cantidad de ${item.nombre}`}
        >
          -
        </button>
        <span
          className="text-sm font-bold text-[var(--color-on-surface)] w-5 text-center"
          aria-label={`Cantidad: ${item.cantidad}`}
        >
          {item.cantidad}
        </span>
        <button
          onClick={() => onCambiarCantidad(item.id, 1)}
          className="w-7 h-7 bg-[var(--color-primary)] text-white font-bold rounded flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
          title="Aumentar cantidad"
          aria-label={`Aumentar cantidad de ${item.nombre}`}
        >
          +
        </button>
      </div>

      {/* Quitar por completo */}
      <button
        onClick={() => onQuitar(item.id)}
        className="text-xs font-semibold text-red-500 hover:text-red-400 hover:bg-red-500/10 px-2 py-1 rounded cursor-pointer transition-colors"
        aria-label={`Quitar ${item.nombre} del carrito`}
      >
        Quitar
      </button>
    </li>
  );
}
