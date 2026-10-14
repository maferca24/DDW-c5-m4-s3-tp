import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CLAVE_TEMA = "recetasSinTacc:tema";

const ThemeSwitcher = () => {
  const [modoOscuro, setModoOscuro] = useLocalStorage(CLAVE_TEMA, false);

  useEffect(() => {
    localStorage.setItem(CLAVE_TEMA, modoOscuro ? "oscuro" : "claro");
    document.documentElement.classList.toggle("dark", modoOscuro);
  }, [modoOscuro]);

  return (
    <button
      type="button"
      onClick={() => setModoOscuro((prev) => !prev)}
      className="rounded-lg bg-tarjeta px-3 py-1 text-texto"
    >
      {modoOscuro ? "🌞 Modo Claro" : "🌙 Modo Oscuro"}
    </button>
  );
};

export default ThemeSwitcher;


