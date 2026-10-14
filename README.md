# Recetas sin TACC (C5-M4-S2-TP)

Trabajo Práctico - Sprint 2: Aplicación web interactiva para la gestión de recetas libres de gluten, desarrollada con React, Vite y Tailwind CSS, implementando persistencia local y soporte para modo oscuro mediante variables CSS personalizadas.


## Cómo correrlo
Asegúrate de tener Node.js instalado y ejecuta los siguientes comandos en tu terminal:

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm run dev

## Decisiones de Estado y Arquitectura

**Custom Hooks para Separación de Responsabilidades:**
   - Se implementó un hook `useLocalStorage` para sincronizar el estado directamente con el almacenamiento del navegador (`localStorage`).
   - Se encapsuló la lógica de negocio de la lista de recetas en el hook específico `useRecetasList`, evitando sobrecargar el componente principal (`App.jsx`) con funciones de agregado, filtrado, conteo y limpieza (`clear`).
   - Se utilizó un hook utilitario `useToggle` para gestionar la visibilidad del panel lateral (`ListPanel`).

2. **Sistema de Temas (Modo Oscuro / Claro):**
   - Se configuró un componente dedicado (`ThemeSwitcher`) que manipula la clase `.dark` en el elemento raíz (`<html>`) del DOM, permitiendo cambiar los colores de fondo, tarjetas y textos sin necesidad de recargar la página y respetando la preferencia del usuario.

3. **Sincronización del Título de la Ventana:**
   - Se integró un `useEffect` en el componente principal para actualizar dinámicamente el título de la pestaña del navegador (`document.title`), reflejando en tiempo real la cantidad de elementos seleccionados en la lista.


## Uso de IA
- Se utilizó Gemini como asistente de desarrollo para la resolución de errores de compilación, estructuración de variables en Tailwind v4, armado de documento readme :) 
## Lo que me costó
- Lograr la sincronización correcta entre las clases de Tailwind v4, las variables CSS personalizadas y la clase `.dark` del documento para que todos los componentes (tarjetas, buscador y paneles) respondieran de forma limpia al cambio de tema sin perder contraste ni visibilidad en los textos.


