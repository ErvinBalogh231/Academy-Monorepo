# Academy 2024 – Monorepo

Egy egyszerű full-stack tanulóprojekt. Az ASP.NET Core backend REST API-t ad felhasználókhoz, kurzusokhoz és badge-ekhez, JWT alapú bejelentkezéssel. Az Angular frontend ezt az API-t használja.

| Rész | Technológia | Port |
|---|---|---|
| `backend/` | ASP.NET Core 8 Web API, EF Core + SQLite, JWT auth, Swagger | 5115 |
| `frontend/` | Angular 17, Bootstrap 5, RxJS | 4200 |

## Projektstruktúra

```
backend/
  Academy-2024/
    Controllers/    API végpontok (Account, Users, Course, Badges)
    Data/           ApplicationDbContext + seed adatok
    Dtos/           A kliens felé küldött / fogadott objektumok
    Migrations/     EF Core migrációk
    Models/         Adatbázis entitások (User, Course, Badge)
    Repositories/   Adatelérés
    Services/       Üzleti logika (felhasználók, login, token, jelszó hash)
frontend/
  src/app/
    pages/          Oldalak (login, users, user-create, user-edit, badges)
    shared/         Közös részek: header, counter, user űrlap,
                    auth service, token service, interceptor, guard
  src/environments/ API URL beállítás
```

## Előfeltételek

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (LTS) + npm

Ellenőrzés:

```bash
dotnet --list-sdks
```

```bash
node -v
```

## Indítás

Először a backendet indítsd el, mert a frontend csak akkor tud bejelentkezni és adatot betölteni, ha az API fut.

### Backend

```bash
cd backend
dotnet run --project Academy-2024 --launch-profile http
```

- API: http://localhost:5115/api
- Swagger UI: http://localhost:5115/swagger

Induláskor automatikusan lefutnak a migrációk, az adatbázis a `backend/Academy-2024/academy.db` fájlba kerül (gitignore-olva). A badge-ek seed adatként jönnek létre, felhasználó induláskor nincs.

### Frontend

```bash
cd frontend
npm install
npm start
```

Ezután nyisd meg: http://localhost:4200

### Claude desktop app

A `.claude/launch.json` mindkét dev szervert tartalmazza (`backend`, `frontend`), így a Claude desktop app előnézetéből egy kattintással indíthatók.

## Használat

1. A login oldalon a **Register** linkkel hozz létre egy felhasználót. Az email és a jelszó kötelező, a jelszó legalább 6 karakter.
2. Jelentkezz be vele. A JWT token 30 percig érvényes, és a `localStorage`-ba kerül, így oldalfrissítés után is bejelentkezve maradsz.
3. A Users, Badges és Counter oldalak csak bejelentkezve érhetők el. Kijelentkezve a guard a login oldalra irányít.
4. Felhasználó szerkesztésekor a jelszó mező üresen hagyható, ilyenkor a régi jelszó marad.
5. Ha a saját fiókodat törlöd, a rendszer automatikusan kijelentkeztet.

### Hogyan működik a bejelentkezés?

1. A frontend elküldi az emailt és a jelszót a `POST /api/account/login` végpontra.
2. A backend összeveti a jelszó hash-ét az adatbázisban tárolttal, és egyezés esetén aláírt JWT tokent ad vissza (`token`, `expires`).
3. A frontend `TokenService` eltárolja a tokent, az `authInterceptor` pedig minden API kéréshez hozzáadja az `Authorization: Bearer <token>` fejlécet.
4. Ha az API `401`-et ad (lejárt vagy érvénytelen token), az interceptor kijelentkeztet.
5. A bejelentkezett felhasználó adatait a `GET /api/users/me` adja vissza, ezt mutatja a fejléc.

## API végpontok

| Metódus | Útvonal | Leírás | Auth |
|---|---|---|---|
| POST | `/api/account/login` | Bejelentkezés, JWT tokent ad vissza | – |
| POST | `/api/users` | Regisztráció / felhasználó létrehozása | – |
| GET | `/api/users` | Összes felhasználó | JWT |
| GET | `/api/users/{id}` | Egy felhasználó | JWT |
| GET | `/api/users/me` | A bejelentkezett felhasználó | JWT |
| PUT | `/api/users/{id}` | Felhasználó módosítása | JWT |
| DELETE | `/api/users/{id}` | Felhasználó törlése | JWT |
| GET / POST | `/api/course` | Kurzusok listázása / létrehozása | JWT |
| GET / PUT / DELETE | `/api/course/{id}` | Egy kurzus lekérése / módosítása / törlése | JWT |
| GET | `/api/badges`, `/api/badges/{id}` | Badge-ek | JWT |

Hibakódok: `400` hiányzó vagy hibás mező, `401` nincs vagy érvénytelen token / rossz jelszó, `404` nem létező elem, `409` már foglalt email.

A jelszó (hash) soha nem kerül vissza a válaszokba.

### API kipróbálása

- **Swagger:** a http://localhost:5115/swagger oldalon a login válaszából másold ki a tokent, kattints az **Authorize** gombra, és írd be: `Bearer <token>`.
- **`.http` fájl:** a [backend/Academy-2024/Academy-2024.http](backend/Academy-2024/Academy-2024.http) Visual Studióból vagy a VS Code REST Client bővítményével futtatható. A regisztrációt és a logint is tartalmazza, a token automatikusan átkerül a többi kérésbe.

## Konfiguráció

A backend beállításai a `backend/Academy-2024/appsettings.Development.json` fájlban vannak:

| Kulcs | Jelentés |
|---|---|
| `ConnectionStrings:ApplicationDbContext` | SQLite adatbázis helye (alapból `academy.db`) |
| `Jwt:Key` | A token aláírókulcsa (legalább 32 karakter) |
| `Jwt:Issuer` | A token kiadója |
| `Cors:AllowedOrigins` | Opcionális. A frontend címe(i); ha nincs megadva, `http://localhost:4200` |

A frontend az API címét a `frontend/src/environments/environment.ts` fájlból veszi (`apiUrl`). Production buildnél az `environment.prod.ts` lép a helyére.

## Fejlesztés

Új migráció készítése modellváltozás után (a `dotnet-ef` lokális tool-ként van felvéve):

```bash
cd backend
dotnet tool restore
dotnet ef migrations add <Nev> --project Academy-2024
```

A migrációt nem kell kézzel alkalmazni, a backend a következő induláskor lefuttatja.

Frontend production build:

```bash
cd frontend
npm run build
```

## Hibaelhárítás

- **„Could not reach the server.” a login oldalon:** nem fut a backend, vagy nem a 5115-ös porton fut. Indítsd el a `http` profillal.
- **A port már foglalt:** egy korábbi példány még fut. Állítsd le, vagy a `backend/Academy-2024/Properties/launchSettings.json` és a frontend `environment.ts` fájlban írd át a portot.
- **CORS hiba a böngésző konzolban:** a frontend nem a `http://localhost:4200` címről fut. Add hozzá a címét a `Cors:AllowedOrigins` beállításhoz.
- **Tiszta adatbázis kell:** állítsd le a backendet, töröld a `backend/Academy-2024/academy.db` fájlt, majd indítsd újra.
- **`dotnet` parancs nem található:** a .NET SDK telepítése után nyiss új terminált, hogy frissüljön a `PATH`.

## Ismert korlátok

- A jelszavak só nélküli SHA256 hash-sel vannak tárolva. Tanuláshoz megfelel, éles használatra nem; ott pl. az ASP.NET `PasswordHasher<T>` javasolt.
- A JWT kulcs a konfigurációs fájlban van. Élesben környezeti változóból vagy secret store-ból kellene jönnie.
- Szerepkörök nincsenek: bármely bejelentkezett felhasználó szerkesztheti és törölheti a többieket.
