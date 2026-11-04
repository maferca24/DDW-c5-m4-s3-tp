import { useForm } from "react-hook-form";
import { useCarritoContext } from "../../context/CarritoContext";
import { formatearPrecio } from "../../utils/formato";
import { VISTAS } from "../../data/vistas";

export function Checkout({ setVistaActual, setNombreComprador }) {
  const { carrito, total, vaciar } = useCarritoContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      metodoEnvio: "retiro",
    },
  });

  // Observamos el método de envío para mostrar/ocultar el campo dirección
  const metodoEnvio = watch("metodoEnvio");

  const onSubmit = (datos) => {
    // Armamos el objeto del pedido 
    const pedido = {
      nombreCompleto: datos.nombreCompleto,
      email: datos.email,
      telefono: datos.telefono,
      metodoEnvio: datos.metodoEnvio,
      direccion: datos.metodoEnvio === "domicilio" ? datos.direccion : null,
      notas: datos.notas || null,
      items: carrito.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
        subtotal: item.precio * item.cantidad,
      })),
      total,
    };

    console.log("📦 Pedido confirmado:", pedido);

    // Guardamos el nombre para la vista de confirmación
    setNombreComprador(datos.nombreCompleto);

    // Vaciamos el carrito
    vaciar();

    // Navegamos a la confirmación
    setVistaActual(VISTAS.CONFIRMACION);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-2">
        Finalizar compra
      </h1>
      <p className="text-sm text-[var(--color-on-surface-variant)] mb-8">
        Completá tus datos para confirmar tu pedido sin TACC.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ─── Formulario ────────────────────────────────────── */}
        <section className="lg:col-span-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="bg-[var(--color-surface)] border-2 border-[var(--color-border-card)] rounded-xl p-6 space-y-6"
          >
            {/* Nombre completo */}
            <div>
              <label
                htmlFor="nombreCompleto"
                className="block text-sm font-semibold text-[var(--color-on-surface)] mb-1"
              >
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                id="nombreCompleto"
                type="text"
                placeholder="Ej.: María González"
                aria-invalid={errors.nombreCompleto ? "true" : "false"}
                aria-describedby={
                  errors.nombreCompleto ? "error-nombreCompleto" : undefined
                }
                {...register("nombreCompleto", {
                  required: "El nombre completo es obligatorio.",
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres.",
                  },
                })}
                className={`w-full px-3 py-2 rounded-lg border bg-[var(--color-background)] text-[var(--color-on-surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors ${
                  errors.nombreCompleto
                    ? "border-red-400"
                    : "border-[var(--color-border-card)]"
                }`}
              />
              {errors.nombreCompleto && (
                <p
                  id="error-nombreCompleto"
                  role="alert"
                  className="mt-1 text-xs text-red-500"
                >
                  {errors.nombreCompleto.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[var(--color-on-surface)] mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Ej.: maria@ejemplo.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "error-email" : undefined}
                {...register("email", {
                  required: "El email es obligatorio.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresá un email válido (ej.: nombre@dominio.com).",
                  },
                })}
                className={`w-full px-3 py-2 rounded-lg border bg-[var(--color-background)] text-[var(--color-on-surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors ${
                  errors.email
                    ? "border-red-400"
                    : "border-[var(--color-border-card)]"
                }`}
              />
              {errors.email && (
                <p
                  id="error-email"
                  role="alert"
                  className="mt-1 text-xs text-red-500"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-semibold text-[var(--color-on-surface)] mb-1"
              >
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                id="telefono"
                type="text"
                placeholder="Ej.: 1122334455"
                {...register("telefono", {
                  required: "El teléfono es obligatorio.",
                  pattern: {
                    value: /^\d+$/,
                    message: "El teléfono solo puede contener números.",
                  },
                  minLength: {
                    value: 8,
                    message: "El teléfono debe tener al menos 8 dígitos.",
                  },
                })}
                className={`w-full px-3 py-2 rounded-lg border bg-[var(--color-background)] text-[var(--color-on-surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors ${
                  errors.telefono
                    ? "border-red-400"
                    : "border-[var(--color-border-card)]"
                }`}
              />
              {errors.telefono && (
                <p role="alert" className="mt-1 text-xs text-red-500">
                  {errors.telefono.message}
                </p>
              )}
            </div>

            {/* Método de envío */}
            <fieldset>
              <legend className="text-sm font-semibold text-[var(--color-on-surface)] mb-2">
                Método de envío <span className="text-red-500">*</span>
              </legend>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Opción: Retiro en local */}
                <label
                  htmlFor="retiro"
                  className={`flex items-center gap-3 flex-1 border-2 rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                    metodoEnvio === "retiro"
                      ? "border-[var(--color-primary)] bg-orange-50 dark:bg-orange-950/20"
                      : "border-[var(--color-border-card)] bg-[var(--color-background)]"
                  }`}
                >
                  <input
                    id="retiro"
                    type="radio"
                    value="retiro"
                    {...register("metodoEnvio", {
                      required: "Seleccioná un método de envío.",
                    })}
                    className="accent-[var(--color-primary)]"
                  />
                  <span className="text-sm text-[var(--color-on-surface)]">
                    🏪 Retiro en local
                  </span>
                </label>

                {/* Opción: Envío a domicilio */}
                <label
                  htmlFor="domicilio"
                  className={`flex items-center gap-3 flex-1 border-2 rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                    metodoEnvio === "domicilio"
                      ? "border-[var(--color-primary)] bg-orange-50 dark:bg-orange-950/20"
                      : "border-[var(--color-border-card)] bg-[var(--color-background)]"
                  }`}
                >
                  <input
                    id="domicilio"
                    type="radio"
                    value="domicilio"
                    {...register("metodoEnvio", {
                      required: "Seleccioná un método de envío.",
                    })}
                    className="accent-[var(--color-primary)]"
                  />
                  <span className="text-sm text-[var(--color-on-surface)]">
                    🚚 Envío a domicilio
                  </span>
                </label>
              </div>
              {errors.metodoEnvio && (
                <p role="alert" className="mt-1 text-xs text-red-500">
                  {errors.metodoEnvio.message}
                </p>
              )}
            </fieldset>

            {/* Dirección — solo visible si el método es domicilio */}
            {metodoEnvio === "domicilio" && (
              <div>
                <label
                  htmlFor="direccion"
                  className="block text-sm font-semibold text-[var(--color-on-surface)] mb-1"
                >
                  Dirección de entrega <span className="text-red-500">*</span>
                </label>
                <input
                  id="direccion"
                  type="text"
                  placeholder="Ej.: Av. Corrientes 1234, CABA"
                  {...register("direccion", {
                    required: "La dirección es obligatoria para el envío a domicilio.",
                    minLength: {
                      value: 5,
                      message: "Ingresá una dirección más completa.",
                    },
                  })}
                  className={`w-full px-3 py-2 rounded-lg border bg-[var(--color-background)] text-[var(--color-on-surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors ${
                    errors.direccion
                      ? "border-red-400"
                      : "border-[var(--color-border-card)]"
                  }`}
                />
                {errors.direccion && (
                  <p role="alert" className="mt-1 text-xs text-red-500">
                    {errors.direccion.message}
                  </p>
                )}
              </div>
            )}

            {/* Notas */}
            <div>
              <label
                htmlFor="notas"
                className="block text-sm font-semibold text-[var(--color-on-surface)] mb-1"
              >
                Notas adicionales{" "}
                <span className="text-[var(--color-on-surface-variant)] font-normal">
                  (opcional)
                </span>
              </label>
              <textarea
                id="notas"
                rows={3}
                placeholder="Ej.: Sin maní, dejar en portería…"
                {...register("notas", {
                  maxLength: {
                    value: 200,
                    message: "Las notas no pueden superar los 200 caracteres.",
                  },
                })}
                className={`w-full px-3 py-2 rounded-lg border bg-[var(--color-background)] text-[var(--color-on-surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors resize-none ${
                  errors.notas
                    ? "border-red-400"
                    : "border-[var(--color-border-card)]"
                }`}
              />
              {errors.notas && (
                <p role="alert" className="mt-1 text-xs text-red-500">
                  {errors.notas.message}
                </p>
              )}
            </div>

            {/* Acepto los términos */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  id="terminos"
                  type="checkbox"
                  {...register("terminos", {
                    required:
                      "Debés aceptar los términos y condiciones para continuar.",
                  })}
                  className="mt-0.5 h-4 w-4 accent-[var(--color-primary)] cursor-pointer"
                />
                <label
                  htmlFor="terminos"
                  className="text-sm text-[var(--color-on-surface)] cursor-pointer leading-snug"
                >
                  Acepto los{" "}
                  <span className="text-[var(--color-primary)] font-semibold underline underline-offset-2">
                    términos y condiciones
                  </span>{" "}
                  de compra.
                </label>
              </div>
              {errors.terminos && (
                <p role="alert" className="mt-1 text-xs text-red-500">
                  {errors.terminos.message}
                </p>
              )}
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setVistaActual(VISTAS.TIENDA)}
                className="flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg border-2 border-[var(--color-border-card)] text-[var(--color-on-surface)] hover:bg-[var(--color-background)] transition-colors cursor-pointer"
              >
                ← Volver a la tienda
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition-colors cursor-pointer shadow-xs"
              >
                Confirmar pedido →
              </button>
            </div>
          </form>
        </section>

        {/* ─── Resumen del pedido ────────────────────────────── */}
        <aside className="lg:col-span-1">
          <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border-card)] rounded-xl p-6 sticky top-6">
            <h2 className="text-base font-bold text-[var(--color-on-surface)] mb-4 pb-3 border-b border-[var(--color-border-card)]">
              🛒 Resumen del pedido
            </h2>

            {carrito.length === 0 ? (
              <p className="text-sm text-[var(--color-on-surface-variant)]">
                Tu carrito está vacío.
              </p>
            ) : (
              <>
                <ul className="space-y-3 mb-4">
                  {carrito.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-start gap-2 text-sm"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-[var(--color-on-surface)] leading-tight">
                          {item.nombre}
                        </p>
                        <p className="text-xs text-[var(--color-on-surface-variant)]">
                          {item.cantidad} × {formatearPrecio(item.precio)}
                        </p>
                      </div>
                      <span className="font-bold text-emerald-600 whitespace-nowrap">
                        {formatearPrecio(item.precio * item.cantidad)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[var(--color-border-card)] pt-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-[var(--color-on-surface)]">
                    Total
                  </span>
                  <span className="text-lg font-bold text-[var(--color-primary)]">
                    {formatearPrecio(total)}
                  </span>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
