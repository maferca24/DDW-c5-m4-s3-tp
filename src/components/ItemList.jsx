//grilla de resultados
import { ItemCard } from './ItemCard';
//item array de recetas filtradas
//lista array de recetas para verificar si esta agregada o no
//onToggle funcion para agregar/quitar recetas
//buscqueda para mostrar un mensaje en caso de no hallar resultados
export function ItemList({ items, lista, onToggle, busqueda }) {
 
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
     //para renderizar cada ItemCard
     //comprueba si el id de la receta actual existe en el array lista
        const isInList = lista.some((i) => i.id === item.id);

        return (
          <ItemCard
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