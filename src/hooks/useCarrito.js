//const { carrito, cantidadTotal, total, estaEnElCarrito,
       // agregar, cambiarCantidad, quitar, vaciar } = useCarrito();

import { useLocalStorage } from "./useLocalStorage";

export function useCarrito() {
  const [carrito, setCarrito] = useLocalStorage("carrito_compras", []);

  // Verificar si un producto está en el carrito
  const estaEnElCarrito = (id) => {
    return carrito.some((item) => item.id === id);
  };

  // Agregar producto (si ya existe, le suma 1 )
  const agregar = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      
      if (existe) {
        return prev.map((item) => {
          if (item.id === producto.id) {
            const stockDispo = item.stock ?? 99; // Límite de stock 
            const nuevaCantidad = item.cantidad + 1;
            return {
              ...item,
              cantidad: nuevaCantidad <= stockDispo ? nuevaCantidad : item.cantidad,
            };
          }
          return item;
        });
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Cambiar cantidad -botones + -
  // Si baja a 0, se remueve automáticamente con filter
  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const stockDispo = item.stock ?? 99;
            const nuevaCantidad = item.cantidad + delta;
            // Aseguramos que no baje de 1 acá o dejamos que el filter lo saque si es 0
            return { 
              ...item, 
              cantidad: nuevaCantidad > 0 ? (nuevaCantidad <= stockDispo ? nuevaCantidad : stockDispo) : 0 
            };
          }
          return item;
        })
        .filter((item) => item.cantidad > 0); // Saca el item si la cantidad llegó a 0
    });
  };

  // Quitar un item por completo
  const quitar = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // Vaciar carrito
  const vaciar = () => {
    setCarrito([]);
  };

  // --- TOTALES
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return {
    carrito,
    cantidadTotal,
    total,
    estaEnElCarrito,
    agregar,
    cambiarCantidad,
    quitar,
    vaciar,
  };
}