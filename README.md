# Academy 2024 – Monorepo

- `backend/` – ASP.NET Core 8 Web API (EF Core + SQLite, JWT auth)
- `frontend/` – Angular 17

## Előfeltételek

- .NET 8 SDK
- Node.js + npm

## Indítás

Backend (http://localhost:5115, Swagger: http://localhost:5115/swagger):

```bash
cd backend
dotnet run --project Academy-2024 --launch-profile http
```

Induláskor automatikusan lefutnak a migrációk, az adatbázis a `backend/Academy-2024/academy.db` fájlba kerül.

Frontend (http://localhost:4200):

```bash
cd frontend
npm install
npm start
```

## Használat

1. A login oldalon a **Register** linkkel hozz létre egy felhasználót.
2. Jelentkezz be vele – a JWT token a `localStorage`-ba kerül, minden API hívás ezzel megy.
3. A Users / Badges / Counter oldalak csak bejelentkezve érhetők el.

## API végpontok

| Metódus | Útvonal | Auth |
|---|---|---|
| POST | `/api/account/login` | – |
| POST | `/api/users` (regisztráció) | – |
| GET | `/api/users`, `/api/users/{id}`, `/api/users/me` | JWT |
| PUT / DELETE | `/api/users/{id}` | JWT |
| GET / POST / PUT / DELETE | `/api/course` | JWT |
| GET | `/api/badges`, `/api/badges/{id}` | JWT |

Új migráció készítése (a `dotnet-ef` lokális tool-ként van felvéve):

```bash
cd backend
dotnet tool restore
dotnet ef migrations add <Nev> --project Academy-2024
```
