# 🎮 RPG Creature Search App - Low Poly Edition

Una aplicación web de búsqueda de criaturas RPG con diseño **Low Poly** completamente implementado, utilizando HTML, CSS y JavaScript puro.

## ✨ Características Implementadas

### 🔍 Búsqueda de Criaturas
- Búsqueda por nombre o ID (1-20)
- API de freeCodeCamp para datos de criaturas
- Validación y manejo de errores robusto
- Estados de carga claros

### 🎨 Diseño Low Poly
- **Paleta de colores vibrante y cálida**
  - Verde Bosque (#718854)
  - Azul Océano (#2A5F85)
  - Naranja Quemado (#D27F3A)
  - Lavanda (#8B7DBD)
  - Coral (#E0747A)
  
- **Tipografía Fantástica**
  - Títulos: **Cinzel** (serif elegante)
  - Texto: **MedievalSharp** (cursiva temática)
  
- **Efectos Visuales Low Poly**
  - Clip-paths poligonales en todos los elementos
  - Animaciones flotantes (lowPolyFloat)
  - Efectos shimmer en bordes
  - Hover slick en botones

### 🖼️ Criaturas SVG Low Poly
- Generación dinámica de criaturas Low Poly basadas en tipo
- Colores específicos por tipo de criatura
- Formas poligonales facetadas
- Gradientes adaptativos

### ⭐ Sistema de Favoritos
- Guardado local con LocalStorage
- Sidebar lateral con lista de favoritos
- Animación de heartbeat al favoritear
- Click para buscar criaturas favoritas
- Eliminación rápida de favoritos

### ⚔️ Comparador de Criaturas
- Comparación side-by-side de hasta 3 criaturas
- Modal poligonal Low Poly
- Visualización de estadísticas totales
- Comparación de tipos, peso y altura

### ✨ Efectos de Partículas
- Canvas con partículas decorativas flotantes
- Color lavanda suave
- Animación continua y fluida
- Fondo sutil no intrusivo

### 📱 Diseño Responsivo
- Adaptativo a móviles (<600px)
- Grillas flexibles
- Sidebar colapsable
- Navegación táctil optimizada

## 🚀 Uso

### Ejecución Local
1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. ¡Disfruta buscando criaturas!

### Búsqueda de Criaturas
- Ingresa un nombre (ej: "Pyrolynx") o ID (ej: "1")
- Haz click en "Search" o presiona Enter
- Observa la criatura Low Poly generada dinámicamente

### Gestión de Favoritos
- Haz click en "🤍 Favorite" en cualquier criatura
- El corazón se llenará ❤️
- Consulta tus favoritos en el sidebar derecho
- Click en cualquier favorito para buscarla
- Click en ✕ para eliminar

### Comparación
- Haz click en "⚖️ Compare" para añadir a comparación
- Máximo 3 criaturas simultáneas
- El modal mostrará estadísticas lado a lado
- "Clear All" para limpiar

## 📊 Criaturas Disponibles

| ID | Nombre | Tipo(s) |
|----|--------|---------|
| 1 | Pyrolynx | Fire |
| 2 | Aquoroc | Water, Rock |
| 3 | Voltadon | Electric |
| 4 | Floraspine | Grass |
| 5 | Cryostag | Ice |
| 6 | Terradon | Ground |
| 7 | Emberapod | Fire, Bug |
| 8 | Lunaclaw | Dark, Fairy |
| 9 | Quillquake | Ground |
| 10 | Mystifin | Psychic, Water |
| 11-20 | ... | Ver API |

## 🎯 Características Técnicas

### HTML5
- Estructura semántica
- ARIA labels para accesibilidad
- Meta tags responsive
- SVG inline para criaturas

### CSS3
- Variables CSS para consistencia
- Clip-paths poligonales
- Animaciones keyframes
- Gradientes lineales
- Flexbox y Grid
- Media queries

### JavaScript ES6+
- Async/await para API calls
- LocalStorage para persistencia
- Canvas API para partículas
- SVG API para generación dinámica
- Event listeners modernos

## 🔧 Estructura de Archivos

```
RPG Creature Search App/
├── index.html           # Estructura principal
├── styles.css           # Estilos Low Poly completos
├── script.js            # Lógica y funcionalidades
├── README.md            # Esta documentación
├── LOW_POLY_DESIGN_GUIDE.md  # Guía de diseño detallada
└── IMPLEMENTACION_LOW_POLY.md # Resumen de implementación
```

## 🎨 Características Visuales Low Poly

### Clip-Paths Implementados
1. **Botón de búsqueda**: 16 vértices, forma facetada
2. **Tarjetas de stats**: Octágono facetado
3. **Badges de tipos**: Hexadecágono facetado
4. **Tarjeta principal**: 40 vértices para borde animado
5. **Modal**: Borde poligonal complejo
6. **Sidebar**: Clip-path simple

### Animaciones
- **fadeIn**: Aparición suave de contenedor
- **slideUp**: Deslizamiento de resultados
- **lowPolyFloat**: Flotación angular de elementos
- **shimmer**: Brillos reflejados en bordes
- **heartbeat**: Pulso del corazón en favoritos

## 🌐 API Utilizada

**Endpoint**: https://rpg-creature-api.freecodecamp.rocks/api

- `GET /api/creatures` - Lista todas las criaturas
- `GET /api/creature/{name-or-id}` - Datos de una criatura específica

## 🎮 Controles

### Teclado
- `Enter`: Buscar criatura
- `Escape`: Cerrar modal (si está abierto)

### Mouse/Touch
- **Click izquierdo**: Interacciones generales
- **Hover**: Efectos visuales Low Poly
- **Drag**: (No implementado)

## 📋 Checklist de Funcionalidades

- ✅ Búsqueda por nombre o ID
- ✅ Validación de entrada
- ✅ Manejo de errores
- ✅ Estados de carga
- ✅ Criaturas SVG Low Poly dinámicas
- ✅ Sistema de favoritos con LocalStorage
- ✅ Comparador de hasta 3 criaturas
- ✅ Sidebar de favoritos colapsable
- ✅ Efectos de partículas
- ✅ Animaciones Low Poly
- ✅ Diseño responsive
- ✅ Accesibilidad ARIA
- ✅ Paleta de colores consistente
- ✅ Tipografía temática de fantasía
- ✅ Clip-paths poligonales
- ✅ Efectos hover y click
- ✅ Prevención de race conditions

## 🐛 Solución de Problemas

### Las partículas no aparecen
- Verifica que el canvas esté en el DOM
- Revisa la consola del navegador
- Asegúrate de que JavaScript esté habilitado

### Los favoritos no se guardan
- Verifica que LocalStorage esté habilitado
- Revisa permisos del navegador
- Prueba en modo incógnito

### El SVG no se renderiza
- Verifica compatibilidad con SVG del navegador
- Revisa la consola por errores
- Asegúrate de tener conexión a internet

### La sidebar no funciona
- Verifica que el HTML esté completo
- Revisa la consola por errores de JavaScript
- Asegúrate de que los event listeners estén cargados

## 📈 Mejoras Futuras Posibles

- [ ] Sonidos ambientales RPG
- [ ] Tema oscuro/claro
- [ ] Exportar comparaciones a imagen
- [ ] Gráficos de radar para stats
- [ ] Búsqueda avanzada con filtros
- [ ] Modo oscuridad automático
- [ ] Compartir criaturas favoritas

## 🏆 Créditos

- **API**: freeCodeCamp RPG Creature API
- **Fuentes**: Google Fonts (Cinzel, MedievalSharp)
- **Inspiración**: Estilo Low Poly de arte digital
- **Implementación**: HTML, CSS, JavaScript puro

## 📄 Licencia

Proyecto educativo - Uso libre para aprendizaje

---

**Versión**: 2.0.0 LOW POLY EDITION  
**Estado**: ✅ PRODUCCIÓN READY  
**Última actualización**: Implementación completa de características avanzadas

🎮 **¡Explora el mundo de las criaturas RPG con estilo Low Poly!** 🔮✨

