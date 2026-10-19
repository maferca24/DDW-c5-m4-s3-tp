import React from 'react';
import { formatearPrecio } from '../utils/formato';

export function CarritoModal({ lista, onToggle, onVaciar, onClose }) {
  // Calculamos el precio total acumulado del carrito
  const totalPrecio = lista.reduce((acc, item) => acc + item.precio, 0);

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
          {lista.length === 0 ? (
            <div className="text-center py-12 px-2 text-[var(--color-on-surface-variant)]">
              <p className="text-sm">El carrito está vacío. ¡Agrega algunos productos! 🛒</p>
            </div>
          ) : (
            <>
              {/* Botón para vaciar carrito */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={onVaciar}
                  className="text-xs font-semibold text-red-500 hover:text-red-400 dark:hover:bg-red-950/30 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-400/40 cursor-pointer transition-colors"
                >
                  🗑️ Vaciar Carrito
                </button>
              </div>

              {/* Items del Carrito */}
              <ul className="space-y-3">
                {lista.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-[var(--color-background)] border border-[var(--color-border-card)] rounded-lg transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-on-surface)]">
                        {item.nombre}
                      </h4>
                      <span className="text-xs font-bold text-emerald-600">
                        {formatearPrecio(item.precio)}
                      </span>
                    </div>

                    <button
                      onClick={() => onToggle(item)}
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

        {/* Pie del Carrito (Subtotal y Total) */}
        {lista.length > 0 && (
          <div className="pt-4 border-t border-[var(--color-border-card)] space-y-3">
            <div className="flex justify-between items-center font-bold text-base text-[var(--color-on-surface)]">
              <span>Total:</span>
              <span className="text-emerald-600">{formatearPrecio(totalPrecio)}</span>
            </div>
            <button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold py-2.5 rounded-lg transition-colors text-sm shadow-xs">
              Iniciar Compra / Checkout
            </button>
          </div>
        )}

      </aside>
    </div>
  );
}