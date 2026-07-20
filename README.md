# APIs Node / NestJS — Demo

Demo para recrutadores técnicos e empresas: **CRUD REST completo**, **JWT**, **Swagger (OpenAPI)** e **Redoc**.

## Verbos HTTP

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Health check |
| `POST` | `/auth/login` | Emite JWT |
| `GET` | `/users` | Lista usuários |
| `GET` | `/users/:id` | Busca por id |
| `POST` | `/users` | Cria usuário |
| `PUT` | `/users/:id` | Substitui usuário |
| `PATCH` | `/users/:id` | Atualiza parcial |
| `DELETE` | `/users/:id` | Remove usuário |

## Documentação (grátis)

- **Swagger UI** (interativo): `/docs` (Nest local) ou [swagger.html](./web/swagger.html)
- **Redoc** (leitura): [redoc.html](./web/redoc.html)
- **OpenAPI JSON**: [openapi.json](./web/openapi.json)

## Persistência

- **NestJS local:** memória (ideal para demo; troque por PostgreSQL em produção)
- **GitHub Pages:** `localStorage` no browser (boa prática em site estático, sem backend)

## Rodar local

```bash
npm install
npm run start:dev
```

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/docs`
- Redoc: `http://localhost:3000/static/redoc.html`
- Demo UI: `http://localhost:3000/static/`

## Demo pública

https://reinaldobarreto.github.io/portfolio-reinaldo-react/demos/apis-nestjs/
