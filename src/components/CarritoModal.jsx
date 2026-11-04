import React from 'react';
import { formatearPrecio } from '../utils/formato';
import { useCarritoContext } from '../context/CarritoContext'; // <-- Consumimos el context directamente

export function CarritoModal({ onClose, onIrACheckout }) {
  // Extraemos todo directamente del Context
  const { carrito, total, cambiarCantidad, quitar, vaciar } = useCarritoContext();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <aside className="w-full max-w-md bg-[var(--color-surface)] h-full shadow-2xl flex flex-col p-6 transition-colors">

        {/* Cabecera del Carrito */}
        <div className="flex justify-between items-center pb-4 border-b border-[var(--color-border-card)]">
          <h2 className="text-lg font-bold text-[var(--color-on-surface)]">
            🛒 Mi Carrito de Compras
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] font-bold p-1 text-lg cursor-pointer transition-colors"
          >
            ✖
          </button>
        </div>

        {/* Contenido / Lista de productos */}
        <div className="flex-1 overflow-y-auto py-4">
          {carrito.length === 0 ? (
            <div className="text-center py-12 px-2 text-[var(--color-on-surface-variant)]">
              <p className="text-sm font-medium">Tu carrito está vacío 🛒</p>
              <p className="text-xs mt-1">Explora la tienda y añade deliciosos productos sin TACC para comenzar tu compra.</p>
            </div>
          ) : (
            <>
              {/* Botón para vaciar carrito */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={vaciar}
                  className="text-xs font-semibold text-red-500 hover:text-red-400 dark:hover:bg-red-950/30 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-400/40 cursor-pointer transition-colors"
                >
                  🗑️ Vaciar Carrito
                </button>
              </div>

              {/* Items del Carrito */}
              <ul className="space-y-3">
                {carrito.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-[var(--color-background)] border border-[var(--color-border-card)] rounded-lg transition-colors gap-3"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[var(--color-on-surface)]">
                        {item.nombre}
                      </h4>
                      <span className="text-xs font-bold text-emerald-600">
                        {formatearPrecio(item.precio)}
                      </span>
                    </div>

                    {/* Controles de cantidad (+ y -) */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => cambiarCantidad(item.id, -1)}
                        className="w-7 h-7 bg-gray-200 dark:bg-zinc-700 text-[var(--color-on-surface)] font-bold rounded flex items-center justify-center hover:opacity-85 cursor-pointer"
                        title="Disminuir cantidad"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold text-[var(--color-on-surface)] w-5 text-center">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => cambiarCantidad(item.id, 1)}
                        className="w-7 h-7 bg-gray-200 dark:bg-zinc-700 text-[var(--color-on-surface)] font-bold rounded flex items-center justify-center hover:opacity-85 cursor-pointer"
                        title="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    {/* Botón Quitar por completo */}
                    <button
                      onClick={() => quitar(item.id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-400 hover:bg-red-500/10 px-2 py-1 rounded cursor-pointer transition-colors"
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Pie del Carrito (Subtotal y Total Derivado) */}
        {carrito.length > 0 && (
          <div className="pt-4 border-t border-[var(--color-border-card)] space-y-3">
            <div className="flex justify-between items-center font-bold text-base text-[var(--color-on-surface)]">
              <span>Total:</span>
              <span className="text-emerald-600">{formatearPrecio(total)}</span>
            </div>
            <button
              onClick={onIrACheckout}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold py-2.5 rounded-lg transition-colors text-sm shadow-xs cursor-pointer"
            >
              Iniciar Compra / Checkout
            </button>
          </div>
        )}

      </aside>
    </div>
  );
}