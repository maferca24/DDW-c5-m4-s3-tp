import useLocalStorage from "./useLocalStorage";

const CLAVE_LISTA = "recetasSinTacc:lista";

export function useRecetasList() {
  const [lista, setLista] = useLocalStorage(CLAVE_LISTA, []);

  const total = lista.length;

  const estaEnLista = (id) => lista.some((item) => item.id === id);

  const toggle = (receta) => {
    setLista((prev) => {
      const yaEsta = prev.some((item) => item.id === receta.id);
      return yaEsta
        ? prev.filter((item) => item.id !== receta.id)
        : [...prev, receta];
    });
  };

  const remove = (id) => {
    setLista((prev) => prev.filter((item) => item.id !== id));
  };

  const clear = () => {
    if (lista.length === 0) return;
    
    if (window.confirm("¿Vaciar la lista de recetas?")) {
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

export default useRecetasList;