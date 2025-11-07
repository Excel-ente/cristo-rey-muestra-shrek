# 🐊 Guía de Personajes SVG de Shrek

## 📍 Ubicación de Personajes

### En `index.html`:

#### Personajes Flotantes (Fixed Position):
1. **Shrek** - Esquina superior izquierda
2. **Burro** - Esquina superior derecha  
3. **Fiona** - Lateral izquierdo medio
4. **Gato con Botas** - Lateral derecho medio
5. **Dragón** - Esquina inferior izquierda
6. **Jengibre** - Esquina inferior derecha

#### Widgets en Secciones:
- **Header**: Mini Shrek (arriba izquierda)
- **Intro Section**: Burro sonriente (esquina superior izquierda)
- **Project Section**: Gato con Botas (esquina superior derecha)
- **Text Section**: Fiona (esquina superior izquierda)
- **Footer**: Jengibre (centrado arriba)

### En `feed.html`:

#### Personajes Flotantes:
1. **Burro** - Superior izquierdo
2. **Gato con Botas** - Lateral derecho medio
3. **Jengibre** - Inferior centro

#### Widgets:
- **Header**: Mini Burro

---

## 🎨 Cómo Agregar Más Personajes

### 1. Crear el SVG del Personaje

Ejemplo de plantilla básica:
```html
<div class="character character-NOMBRE" data-character="NOMBRE">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Cuerpo -->
        <circle cx="50" cy="50" r="40" fill="#COLOR"/>
        
        <!-- Ojos -->
        <circle cx="35" cy="45" r="7" fill="#FFF"/>
        <circle cx="35" cy="45" r="3" fill="#000"/>
        <circle cx="65" cy="45" r="7" fill="#FFF"/>
        <circle cx="65" cy="45" r="3" fill="#000"/>
        
        <!-- Boca -->
        <path d="M 35 65 Q 50 72 65 65" stroke="#000" stroke-width="2" fill="none"/>
    </svg>
</div>
```

### 2. Personajes Sugeridos para Agregar

#### **Lord Farquaad** (pequeño)
```html
<div class="character character-farquaad">
    <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="70" rx="30" ry="45" fill="#8B0000"/>
        <circle cx="50" cy="35" r="20" fill="#FFE4C4"/>
        <circle cx="42" cy="32" r="3" fill="#000"/>
        <circle cx="58" cy="32" r="3" fill="#000"/>
        <rect x="35" y="20" width="30" height="12" fill="#654321"/>
    </svg>
</div>
```

#### **Pinocho**
```html
<div class="character character-pinocchio">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="45" r="25" fill="#FFE4C4"/>
        <circle cx="42" cy="42" r="4" fill="#000"/>
        <circle cx="58" cy="42" r="4" fill="#000"/>
        <line x1="50" y1="45" x2="70" y2="45" stroke="#8B4513" stroke-width="3"/>
        <rect x="42" y="25" width="16" height="8" fill="#FF0000"/>
    </svg>
</div>
```

#### **Los Tres Cerditos**
```html
<div class="character character-pig">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="55" r="35" fill="#FFC0CB"/>
        <ellipse cx="35" cy="35" rx="8" ry="12" fill="#FFC0CB"/>
        <ellipse cx="65" cy="35" rx="8" ry="12" fill="#FFC0CB"/>
        <circle cx="42" cy="50" r="5" fill="#000"/>
        <circle cx="58" cy="50" r="5" fill="#000"/>
        <ellipse cx="50" cy="65" rx="12" ry="8" fill="#FFB6C1"/>
        <circle cx="45" cy="63" r="2" fill="#000"/>
        <circle cx="55" cy="63" r="2" fill="#000"/>
    </svg>
</div>
```

---

## 🎯 Posicionamiento en CSS

### Para personajes flotantes (fixed):

```css
.character-NOMBRE {
    position: absolute;
    top: XXpx;      /* o bottom, left, right */
    left: XXpx;
    width: XXpx;
    height: XXpx;
    animation-delay: Xs;
}
```

### Para widgets en secciones:

```html
<!-- Dentro de <section class="section"> -->
<div class="section-character section-character-left">
    <!-- SVG aquí -->
</div>
```

O para la derecha:
```html
<div class="section-character section-character-right">
    <!-- SVG aquí -->
</div>
```

---

## 🎭 Colores de Referencia de Shrek

```css
/* Verdes */
--shrek-green: #7CB342;
--shrek-dark-green: #558B2F;
--swamp-green: #4A7C2E;

/* Dorados */
--shrek-gold: #FFD700;
--shrek-yellow: #FFC107;

/* Marrones */
--shrek-mud: #795548;
--wood-brown: #8B4513;
--dark-brown: #654321;

/* Otros */
--donkey-gray: #8D8D8D;
--fiona-red: #8B0000;
--dragon-pink: #E91E63;
--puss-orange: #FFA500;
--gingerbread-brown: #8B4513;
```

---

## 📦 Dónde Agregar Personajes

### En el HTML:

1. **Flotantes globales**: Dentro de `<div class="shrek-characters">` después de `<body>`
2. **En secciones**: Como primer hijo de `<section class="section">`
3. **En header/footer**: Como primer hijo de `<header>` o `<footer>`

### En el CSS:

1. **Estilos base**: Ya están en `style.css` bajo `/* ========== PERSONAJES SHREK SVG ========== */`
2. **Posicionamiento específico**: Agregar reglas `.character-NOMBRE` con posición

---

## 💡 Tips de Diseño

1. **Simplicidad**: Los SVG deben ser simples y reconocibles
2. **Tamaño**: 60-90px para flotantes, 40-65px para widgets
3. **Animación**: Usa `animation-delay` para escalonar apariciones
4. **Responsive**: Oculta algunos en mobile con media queries
5. **Contraste**: Asegura que se vean sobre el fondo verde

---

## 🎬 Animaciones Disponibles

- `float`: Movimiento suave arriba/abajo
- `bounce`: Rebote vertical
- `wiggle`: Meneo lateral
- Hover: Escala y rotación al pasar el mouse

---

## 📱 Responsive

En mobile (<768px) se ocultan automáticamente:
- Fiona (lateral)
- Dragón (esquina)
- Jengibre del feed

Puedes ajustar esto en las media queries del CSS.

---

¡Diviértete personalizando tu muestra con los personajes de Shrek! 🏰✨
