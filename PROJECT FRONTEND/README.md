# Al Haramen Frontend

Angular 18 frontend-only marketplace with a separate admin portal.

Admin demo: `/admin/login` — username `admin`, password `Admin@1234`.

The admin session uses localStorage only. No backend/API is connected.

Run:
```bash
npm install
ng serve
```


## Admin access
- URL: `/admin/login`
- Username: `admin`
- Password: `Admin@1234`
- Dashboard: `/admin` (protected by the frontend admin guard)


## Admin login
The single demo admin uses the normal user Sign In page:
- Username: `admin`
- Password: `Admin@1234`

After a successful admin login, the app navigates to `/admin`.
The old `/admin/login` route redirects to `/sign-in`.
