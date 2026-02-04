# Proyecto Nitro Note - Frontend

Este repositorio contiene el proyecto frontend (aplicación móvil) desarrollado para la materia **Elementos de Ingeniería de Software** de la **Universidad Nacional de Quilmes**.

# Descripción

El objetivo principal de este proyecto es aplicar los conceptos aprendidos en la materia, enfocada en las metodologías ágiles. El proyecto fue desarrollado utilizando la metodología **Scrum**, organizando el trabajo en sprints, con definición de objetivos, backlog, y revisión de avances en cada iteración.

La problemática que se busca resolver con este proyecto es ayudar a los usuarios a recordar cuándo se deben realizar los diferentes mantenimientos de sus vehículos.

Esta aplicación móvil actúa como la interfaz de usuario que consume la API REST del backend, permitiendo a los usuarios interactuar con el sistema de manera intuitiva desde sus dispositivos.

### _Documentación_

[Sprints](https://docs.google.com/document/d/1k70KDYzo6DX6L0z7Z2AXrv4sVLccD-E4_hxvVzR54uM/edit?usp=sharing).
[Casos de Prueba](https://docs.google.com/spreadsheets/d/1Olkgt3AHwBafVoAALbDImap_O1SNAiEIKTfIccKsCLo/edit?usp=sharing).

# Funcionalidades

* **Autenticación**: Login y registro de usuarios (Interfaz para JWT).
* **Gestión de Vehículos**: Vistas para registrar, editar y listar vehículos.
* **Mantenimientos**: Pantallas para la creación y seguimiento de los mantenimientos.
* **Notificaciones**: Visualización de alertas y recordatorios de vencimientos.

# Tecnologías Utilizadas

* **React Native**: Framework principal para el desarrollo móvil.
* **Expo**: Plataforma para facilitar la construcción y despliegue de la app.
* **JavaScript (ES6+)**: Lenguaje de programación.
* **React Navigation**: Manejo del flujo y navegación entre pantallas.
* **Axios / Fetch**: Para la comunicación HTTP con el backend.
* **Google Services**: Integración para servicios móviles.

# Arquitectura

El proyecto sigue una estructura organizada por responsabilidades en el frontend:

* **Screens**: Pantallas principales de la aplicación.
* **Components**: Componentes reutilizables de la interfaz (botones, inputs, tarjetas).
* **Navigation**: Configuración de rutas y navegación de la app.
* **Services/API**: Módulos encargados de realizar las peticiones al Backend.
* **Assets**: Recursos estáticos como imágenes y fuentes.

> ⚠️ Este proyecto es el **Frontend** y requiere que el servidor Backend esté en ejecución para funcionar completamente. Repositorio backend: (https://github.com/Fabricio-Camilla/NitroNoteBackend.git)

# Estado del proyecto
📌 Proyecto académico finalizado, abierto a mejoras y refactorizaciones.
