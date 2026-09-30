# CAMZON

CAMZON is a bathware and faucet storefront. The frontend is a React and TypeScript single-page app built with Vite; a Django REST Framework backend serves the product catalog and stores customer inquiries.

## Features

- Product catalog with category, search, sorting, and product-detail views
- Wishlist saved in the browser's local storage
- Contact and product-order inquiry forms
- Django admin pages for managing products and reviewing inquiries
- SQLite database with demo products loaded by a data migration

## Requirements

- Python 3.12 or newer
- Node.js 20.19+ or 22.12+
- npm

## Run locally

Start the backend and frontend in separate terminals from the repository root.

### 1. Set up the backend

On Windows PowerShell:

```powershell
py -m venv backend/.venv
.\backend\.venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
$env:DJANGO_DEBUG = "true"
$env:DJANGO_SECRET_KEY = "local-development-only"
Set-Location backend/camzon
python manage.py migrate
python manage.py runserver
```

On macOS or Linux:

```bash
python3 -m venv backend/.venv
source backend/.venv/bin/activate
python -m pip install -r backend/requirements.txt
export DJANGO_DEBUG=true
export DJANGO_SECRET_KEY=local-development-only
cd backend/camzon
python manage.py migrate
python manage.py runserver
```

The API is available at `http://127.0.0.1:8000/`. The Vite development server proxies `/api` requests to this address by default.

### 2. Set up the frontend

In a second terminal:

```bash
cd frontend
npm ci
npm run dev
```

Open `http://localhost:3000/`.

To use an API hosted at a different origin, set `VITE_API_BASE_URL` in `frontend/.env.local`. Leave it empty to use the Vite development proxy. Backend environment variables are read from the shell; Django does not load `.env` files automatically. See `backend/.env.example` and `frontend/.env.example` for the available values.

## Backend commands

Run these from `backend/camzon` with the backend virtual environment active and `DJANGO_DEBUG=true` set:

```bash
python manage.py test app.tests
python manage.py createsuperuser
```

The test module must be named explicitly: the bare `python manage.py test` command currently reports zero tests. After creating a superuser, open `http://127.0.0.1:8000/admin/` to manage products and inspect submitted inquiries.

## Frontend commands

Run these from `frontend`:

```bash
npm run lint
npm run build
npm run preview
```

`lint` runs the TypeScript compiler without emitting files. `build` creates the production bundle in `frontend/dist`; `preview` serves that bundle locally.

## API overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/products/` | List products; supports `category`, `search`, and `sort` query parameters |
| `GET` | `/api/products/<slug>/` | Retrieve one product by slug |
| `POST` | `/api/inquiries/` | Save a contact or order inquiry |

Supported `sort` values are `featured`, `price-low`, `price-high`, and `rating`. Contact inquiries require an email; order inquiries require a phone number. Inquiries are stored in the database and can be reviewed in Django admin; no email delivery integration is currently implemented.

## Project layout

```text
backend/
  app/                 Django models, API, admin, migrations, and tests
  camzon/              Django project and manage.py
  requirements.txt
frontend/
  src/                 React application, components, API client, and assets
  package.json
```

## Production notes

Local development uses SQLite and the Django development server. Before deployment, configure a strong `DJANGO_SECRET_KEY`, set `DJANGO_DEBUG=false`, provide the correct `DJANGO_ALLOWED_HOSTS` and `DJANGO_CORS_ALLOWED_ORIGINS`, and use a production-ready database and application server. Do not use the local development secret in production.
