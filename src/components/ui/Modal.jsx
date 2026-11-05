/**
 * Modal — componente genérico de modal con overlay.
 * Acepta cualquier contenido vía children.
 *
 * Props:
 *   onClose  — función para cerrar el modal (click en overlay o en ✖)
 *   title    — título opcional en el encabezado
 *   children — contenido del cuerpo del modal
 */
export function Modal({ onClose, title, children }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Modal"}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[var(--color-surface)] rounded-xl shadow-2xl flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()} // evita que el click interno cierre el modal
      >
        {/* Encabezado */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--color-border-card)]">
          {title && (
            <h2 className="text-base font-bold text-[var(--color-on-surface)]">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] font-bold p-1 text-lg cursor-pointer transition-colors"
            aria-label="Cerrar modal"
          >
            ✖
          </button>
        </div>

        {/* Cuerpo */}
        <div className="px-6 py-4 overflow-y-auto max-h-[70vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
