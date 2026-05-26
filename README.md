# TitanGymPro

Proyecto full stack para gestión de un gimnasio.

## Estructura inicial

- `backend/`: API ASP.NET Core Web API con C#.
- `frontend/`: App React + TypeScript creada con Vite.
- `docker/docker-compose.yml`: configuración para PostgreSQL y backend.

## Pasos iniciales

1. Instalar dependencias del frontend:

   ```bash
   cd frontend
   npm install
   ```

2. Levantar la base local con Docker:

   ```bash
   cd docker
   docker-compose up -d
   ```

3. Ejecutar backend desde VS Code o con:

   ```bash
   cd backend/TitanGym.Api
   dotnet run
   ```

4. Ejecutar frontend:

   ```bash
   cd frontend
   npm run dev
   ```

## Qué vamos a desarrollar primero

1. Autenticación con roles (`admin`, `trainer`, `socio`).
2. Modelo de datos inicial:
   - Usuario
   - Socio
   - Plan
   - Membresía
   - Pago
   - Rutina
   - Asistencia
3. Endpoints básicos de CRUD para socios y planes.
4. Login y dashboard inicial.

## Nota

Esta es la base inicial. El siguiente paso será configurar la API para que use PostgreSQL y crear el primer endpoint de autenticación.
