export function ListPanel({ lista, onToggle, onVaciar, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <aside className="w-full max-w-md bg-[var(--color-surface)] h-full shadow-2xl flex flex-col p-6 transition-colors">
        
        {/* Cabecera del Panel */}
        <div className="flex justify-between items-center pb-4 border-b border-[var(--color-border-card)]">
          <h2 className="text-lg font-bold text-[var(--color-on-surface)]">
            Mi Lista Seleccionada
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] font-bold p-1 text-lg cursor-pointer transition-colors"
          >
            ✖
          </button>
        </div>

        {/* Contenido / Lista */}
        <div className="flex-1 overflow-y-auto py-4">
          {lista.length === 0 ? (
            <div className="text-center py-12 px-2 text-[var(--color-on-surface-variant)]">
              <p className="text-sm">Todavía no agregaste nada, buscá algo arriba 👆</p>
            </div>
          ) : (
            <>
              {/* Botón para vaciar lista */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={onVaciar}
                  className="text-xs font-semibold text-red-500 hover:text-red-400 dark:hover:bg-red-950/30 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-400/40 cursor-pointer transition-colors"
                >
                  🗑️ Vaciar mi lista de Recetas
                </button>
              </div>

              {/* Items de la Lista */}
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
                      <span className="text-xs text-[var(--color-on-surface-variant)]">
                        {item.categoria}
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

      </aside>
    </div>
  );
}