# 🚀 Rails 8 API Backend

This is the backend for the project, built with **Ruby on Rails 8.0.2** in API-only mode. It exposes RESTful endpoints for the frontend, which consumes the data via HTTP.

---

## ⚙️ Environment

- **Ruby**: 3.3.1 (managed with `rbenv`)
- **Rails**: 8.0.2 (API mode)
- **Database**: PostgreSQL
- **API Format**: JSON
- **CORS**: Enabled for local frontend development

---

## 🛠️ Setup Instructions

### 1. Install dependencies

Ensure you have `rbenv` set to Ruby 3.3.1, then run:

```bash
gem install bundler
bundle install
```

### 2. Set up the database

```rb
rails db:create
rails db:migrate
rails db:seed
```

### 3. Run the server

```rb
rails server -p 3001
```

Server will be accessible at:
📡 `http://localhost:3001`
