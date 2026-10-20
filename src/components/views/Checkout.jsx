export function Checkout() {
  console.log("checkout"); // Mostrar por consola de que se trtata la vista
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[var(--color-surface)] rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-[var(--color-primary)]">Vista de Checkout</h2>
      <p>Aquí completaras tus datos para finalizar la compra sin TACC.</p>
    </div>
  );
}