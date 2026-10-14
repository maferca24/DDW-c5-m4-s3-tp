import { useState } from "react";

function useToggle(valorInicial = false) {
  const [valor, setValor] = useState(valorInicial);
  const alterar = () => setValor((prev) => !prev);
  return [valor, alterar];
}

export default useToggle;