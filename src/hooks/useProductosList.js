import useLocalStorage from "./useLocalStorage";

const CLAVE_LISTA = "productos:lista";

export function useProductosList() {
  const [lista, setLista] = useLocalStorage(CLAVE_LISTA, []);

  const total = lista.length;

  const estaEnLista = (id) => lista.some((item) => item.id === id);

  const toggle = (producto) => {
    setLista((prev) => {
      const yaEsta = prev.some((item) => item.id === producto.id);
      return yaEsta
        ? prev.filter((item) => item.id !== producto.id)
        : [...prev, producto];
    });
  };

  const remove = (id) => {
    setLista((prev) => prev.filter((item) => item.id !== id));
  };

  const clear = () => {
    if (lista.length === 0) return;
    
    if (window.confirm("¿Vaciar carrito?")) {
      setLista([]);
    }
  };

  return {
    list: lista,
    total,
    isInList: estaEnLista,
    toggle,
    remove,
    clear,
  };
}

export default useProductosList;