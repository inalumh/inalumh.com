# Inalumh S.A.S. - Soluciones Integrales para la Construcción

Este es el repositorio oficial del sitio web de **Inalumh S.A.S.**, una empresa líder en soluciones de construcción, renovación y mantenimiento en Bogotá, Colombia.

El sitio ofrece una plataforma informativa sobre los servicios de la empresa, incluyendo áreas de vidrio, aluminio, obra civil, acabados e instalaciones técnicas, además de un portafolio dinámico de proyectos destacados.

## 🚀 Tecnologías Utilizadas (Modernización 2026)

Este proyecto ha sido refactorizado desde una arquitectura heredada PHP a una moderna **Single Page Application (SPA)**, garantizando un rendimiento óptimo, seguridad de nivel de producción y bajos costos de infraestructura gracias a soluciones Serverless.

- **Frontend**: 
  - [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
  - [Tailwind CSS 4](https://tailwindcss.com/)
  - Componentes de UI con [Radix UI](https://www.radix-ui.com/) y [Lucide React](https://lucide.dev/)
  - Animaciones con [Framer Motion](https://www.framer.com/motion/)
  - Enrutamiento con React Router
- **BaaS (Backend as a Service)**: 
  - [Supabase](https://supabase.com/) (PostgreSQL) para la persistencia del portafolio y contactos.
- **Microservicios**:
  - [EmailJS](https://www.emailjs.com/) para el envío de correos desde el lado del cliente sin requerir backend propio.

## 📂 Estructura del Proyecto

```text
inalumh.com/
├── public/                 # Archivos estáticos especiales
│   └── .htaccess           # Reglas de Apache importantes para routing SPA
├── src/                    # Código fuente principal de React
│   ├── app/                # Lógica principal de vistas
│   │   ├── components/     # Componentes de UI (Header, Footer, Projects, Contact, etc.)
│   │   └── pages/          # Páginas (Home, HabitatIQ, etc.)
│   ├── lib/                # Utilidades e integraciones 
│   │   └── supabase.ts     # Cliente de inicialización de Base de Datos
│   └── main.tsx            # Punto de entrada de React
├── images/                 # Activos visuales (logos, fotografías locales de proyectos)
├── .env                    # (No versionado) Archivo de variables secretas 
├── package.json            # Dependencias del proyecto NPM
└── vite.config.ts          # Configuración del empaquetador
```

## 🛠️ Requisitos Previos (Desarrollo)

Para ejecutar este proyecto localmente en modo desarrollo, necesitarás:

1.  **Node.js**: Versión 18 o superior.
2.  **Gestor de paquetes**: NPM (incluido con Node), Yarn o PNPM.
3.  **Proyectos de la nube**: 
    - Una cuenta en Supabase con el esquema de base de datos cargado.
    - Una cuenta en EmailJS configurada con plantilla de contacto.

## ⚙️ Configuración e Instalación

### 1. Clonar el Proyecto e Instalar Dependencias
Desde la terminal en la raíz del proyecto:
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo llamado `.env` en la raíz o duplica un archivo de ejemplo y agrega tus credenciales:

```env
VITE_SUPABASE_URL=tu-url-de-supabase
VITE_SUPABASE_KEY=tu-anon-key-de-supabase
VITE_EMAILJS_SERVICE_ID=tu-service-id
VITE_EMAILJS_TEMPLATE_ID=tu-template-id
VITE_EMAILJS_PUBLIC_KEY=tu-public-key
```

### 3. Configurar la Base de Datos (Supabase)
Ejecuta el siguiente script de SQL en el panel "*SQL Editor*" de tu proyecto Supabase para inicializar las tablas necesarias:
```sql
CREATE TABLE proyectos (
  id SERIAL PRIMARY KEY,
  nombre_proyecto VARCHAR(255) NOT NULL,
  descripcion_proyecto TEXT
);

CREATE TABLE imagenes (
  id SERIAL PRIMARY KEY,
  proyecto_id INTEGER REFERENCES proyectos(id) ON DELETE CASCADE,
  imagen VARCHAR(255) NOT NULL
);

CREATE TABLE mensajes_contacto (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mensaje TEXT NOT NULL,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```

### 4. Levantar el Servidor de Desarrollo
```bash
npm run dev
```
Luego visita la URL que te muestre la terminal web de Vite (usualmente `http://localhost:5173`).

## 🌐 Producción (Deployment)

Dado que la aplicación ha dejado de requerir componentes PHP (`mail()` o `mysqli`), todo el proyecto se ha convertido en código **estático y agnóstico al servidor**, ideal para hostings compartidos, VPS, Vercel, o Netlify.

### Para Hostings Compartidos o Cpanel (Apache):
1.  En tu computadora o canal de despliegue, ejecuta el compilador:
    ```bash
    npm run build
    ```
2.  Vite empaquetará el código minificado, rápido y optimizado para producción en una nueva carpeta `/dist`.
3. Sube el **contenido** de la carpeta `/dist` junto a tu carpeta estática `/images` hacia la ruta pública de tu servidor de alojamiento web (ej. dentro de `public_html/`).
4. **Nota de seguridad:** Al finalizar el build, el archivo `/dist/.htaccess` ya va adjunto e incluido con las reescrituras pertinentes. Estas son críticas para asegurar que los hosts manejen correctamente tú aplicación web de página única (SPA), de lo contrario experimentarás errores 404 al navegar directamente a rutas internas (Ej: `/habitat-iq`).

---
© 2026 Inalumh S.A.S. - Todos los derechos reservados.
