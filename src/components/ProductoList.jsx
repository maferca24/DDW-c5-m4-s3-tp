// grilla de resultados
import { ProductoCard } from './ProductoCard';

// items: array de productos filtrados
// lista: array de productos seleccionados para verificar si está agregado o no
// onToggle: función para agregar/quitar productos
// busqueda: texto de búsqueda para mostrar un mensaje en caso de no hallar resultados
export function ProductoList({ items, lista, onToggle, busqueda }) {
  
  if (items.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-gray-500 text-base font-medium">
          No encontramos nada para "{busqueda}"
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 max-w-6xl mx-auto pb-12">
      {items.map((item) => {
        // Para renderizar cada ProductoCard
        // Comprueba si el id del producto actual existe en el array lista
        const isInList = lista.some((i) => i.id === item.id);

        return (
          <ProductoCard
            key={item.id}
            item={item}
            onToggle={onToggle}
            isInList={isInList}
          />
        );
      })}
    </div>
  );
}