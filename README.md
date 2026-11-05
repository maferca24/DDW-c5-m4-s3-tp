# Trabajo Práctico - Sprint 3: La Tienda (C5-M4-S3-TP)

Aplicación web para la gestión de productos Sin TACC (libres de gluten), desarrollada con React, Vite y Tailwind CSS (v4). Incluye estado global con Context API, formularios accesibles con React Hook Form, persistencia en localStorage y modo oscuro/claro mediante variables CSS.

---

## 🌐 Despliegue en Vivo

👉 **[Ver proyecto en Netlify] https://curious-pie-dc137d.netlify.app/**

---

## 🛠️ Tecnologías

- **React** (Vite) & **Tailwind CSS v4**
- **React Hook Form**
- **Context API** & **LocalStorage API**

---

## 🚀 Instalación y Ejecución

```
pnpm install
pnpm run dev
🏛️ Decisiones de Arquitectura
Context API (CarritoContext): Centralización del estado del carrito sin prop drilling.

React Hook Form: Formulario de checkout 

Tema Claro/Oscuro: Controlado dinámicamente con variables en @theme de Tailwind v4 y persistencia local.

Navegación SPA: Basada en estados mediante la constante VISTAS.

🤖 Uso de IA
Utilicé asistencia de IA para:

Refactorización de arquitectura (Context API y prompts para Kiro).

Implementación de reglas y manejo de campos condicionales en React Hook Form.

Depuración de errores JSX y ajuste de la paleta de colores (naranja/gris).

