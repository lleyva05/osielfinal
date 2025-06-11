# creación del cerver

## paso 1 

por terminar se usa la instrucción:
para la carpeta del backend 
``
mkdir backend 
cd backend
npm init -y
``
## paso 2
intalar dependencias necesarias 

``
npm install express mongoose dotenv 
cors bcryptjs jsonwebtoken

npm install --save-dev nodemon

``
## paso 3

Configuracion a MongDB
``
const mongoose = require('mongoose')

`
# configuraciion del frontend 

## 2**intalacion de librerias necesarias**

```
npm install axios react-router-dom
```
opcional si usas diseño con componentes:

```
npm intall bootstrap react-icons
```
## ✅ 3. **Estructura de carpetas y archivos**

```plaintext
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── api.js               # Configuración de conexión a backend
│   ├── assets/                  # Imágenes, logos, íconos
│   ├── components/              # Componentes reutilizables
│   │   ├── Navbar.js
│   │   ├── ClienteCard.js
│   │   └── ClienteForm.js
│   ├── context/
│   │   └── AuthContext.js       # Manejo de autenticación (opcional)
│   ├── pages/                   # Vistas principales
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   └── Clientes.js
│   ├── routes/
│   │   └── AppRoutes.js         # Rutas protegidas y navegación
│   ├── styles/
│   │   └── main.css
│   ├── App.js
│   ├── index.js
│   └── .env                     # Variables de entorno




















































