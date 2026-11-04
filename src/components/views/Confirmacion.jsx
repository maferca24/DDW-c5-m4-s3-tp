import { VISTAS } from "../../data/vistas";

export function Confirmacion({ nombreComprador, setVistaActual }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border-card)] rounded-xl p-10 shadow-xs">
        {/* Ícono de éxito */}
        <div className="flex justify-center mb-6">
          <span className="text-6xl">🎉</span>
        </div>

        <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-3">
          ¡Pedido confirmado!
        </h1>

        <p className="text-[var(--color-on-surface)] text-base mb-2">
          Gracias por tu compra,{" "}
          <span className="font-semibold">{nombreComprador}</span>.
        </p>

        <p className="text-sm text-[var(--color-on-surface-variant)] mb-8 leading-relaxed">
          Recibimos tu pedido y te vamos a contactar a la brevedad para
          coordinar la entrega. Recordá que todos nuestros productos son{" "}
          <span className="font-semibold text-[var(--color-primary)]">
            100% sin TACC
          </span>
          .
        </p>

        <button
          onClick={() => setVistaActual(VISTAS.TIENDA)}
          className="py-2.5 px-8 text-sm font-semibold rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition-colors cursor-pointer shadow-xs"
        >
          ← Volver a la tienda
        </button>
      </div>
    </div>
  );
}
