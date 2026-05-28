# Snake Coliseum

Snake Coliseum es una versión moderna del clásico juego Snake desarrollada con React y Vite.  
El objetivo principal del proyecto es aplicar el uso de componentes, props, estado y efectos en React, manteniendo una estructura clara y reutilizable.

El juego tiene una estética inspirada en un coliseo moderno, usando tonos blancos, grises y dorados para crear una interfaz limpia, elegante y visualmente agradable con efectos de Glassmorphism (diseño de vidrio templado).

## Tecnologías utilizadas

- **React** (v19) - Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite** (v8) - Herramienta de compilación rápida para desarrollo moderno.
- **JSX** - Sintaxis de extensión de JavaScript.
- **CSS3** - Estilos personalizados con variables, gradientes modernos y animaciones fluidas.
- **JavaScript (ES6+)** - Lógica estructurada e interactiva.

## Instalación del proyecto

Para ejecutar el proyecto localmente, primero se debe clonar el repositorio o descargar los archivos del proyecto.

Luego, dentro de la carpeta del proyecto, ejecutar:

```bash
cd snake-game
```

Instalar las dependencias necesarias:

```bash
npm install
```

## Scripts Disponibles

En el directorio del proyecto `snake-game`, puedes ejecutar los siguientes comandos:

* **Iniciar servidor de desarrollo**:
  ```bash
  npm run dev
  ```
  El proyecto normalmente se ejecutará en: `http://localhost:5173`.
  
* **Compilar para producción**:
  ```bash
  npm run build
  ```
  Compila la aplicación para producción en la carpeta `dist`.

* **Ejecutar Linter**:
  ```bash
  npm run lint
  ```
  Analiza el código en busca de advertencias y errores de formato según la configuración de ESLint.

* **Previsualizar compilación**:
  ```bash
  npm run preview
  ```
  Sirve localmente la carpeta construida para producción.

## Cómo jugar

1. Presionar el botón **Iniciar juego**.
2. Elegir una dificultad: **Fácil**, **Normal** o **Difícil**.
3. Usar las flechas del teclado o las teclas **W A S D** para mover la serpiente.
4. Comer la comida dorada para aumentar el puntaje.
5. Evitar chocar contra los bordes del tablero.
6. Evitar chocar contra el cuerpo de la serpiente.
7. Al perder, se muestra la pantalla de **Game Over** y se puede reiniciar la partida.

## Niveles de Dificultad

El juego cuenta con tres niveles de dificultad que ajustan la velocidad inicial, la velocidad máxima soportada y la aceleración progresiva por cada punto obtenido:

| Dificultad | Velocidad Inicial | Velocidad Máxima (Límite) | Reducción de Intervalo por Comida |
|------------|-------------------|---------------------------|----------------------------------|
| **Fácil**  | 155 ms            | 95 ms                     | -1 ms                            |
| **Normal** | 130 ms            | 75 ms                     | -1 ms                            |
| **Difícil**| 105 ms            | 60 ms                     | -2 ms                            |

## Diseño y Estética Visual

El diseño se enfoca en una experiencia premium y moderna:
* **Paleta de Colores**: Utiliza gradientes dorados (`#d4af37`, `#9f7411`, `#fff1a8`), grises suaves (`#d9d9d9`, `#8f8f8f`) y fondo radial claro.
* **Glassmorphism**: Tarjetas y contenedores con bordes translúcidos, fondos semi-transparentes con `rgba` y `backdrop-filter: blur(18px)`.
* **Animaciones**: La comida dorada incluye una animación de pulso infinito en CSS, y la serpiente posee una transición fluida al desplazarse.
* **Responsividad**: Un diseño de cuadrícula flexible (`grid`) con Media Queries que adapta los controles y la escala del tablero en pantallas de tabletas y móviles.

## Estructura del proyecto

```txt
snake/
├─ snake-game/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  │  ├─ Board.jsx
│  │  │  ├─ Food.jsx
│  │  │  ├─ Score.jsx
│  │  │  ├─ Snake.jsx
│  │  │  └─ StartOverlay.jsx
│  │  ├─ App.css (archivo por defecto, sin uso)
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ main.jsx
│  ├─ index.html
│  ├─ package.json
│  ├─ vite.config.js
│  └─ .gitignore
├─ README.md
```

## Autor

Proyecto desarrollado como parte de una tarea de laboratorio usando React + Vite.