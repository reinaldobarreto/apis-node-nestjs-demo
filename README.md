# APIs Node / NestJS — Demo

Demo simples de backend NestJS para o portfólio **CoreLabs Dev Nexus**.

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Health check |
| `POST` | `/auth/login` | Emite JWT demo |
| `GET` | `/users` | Lista usuários (exige `Authorization: Bearer <token>`) |

## Rodar local

```bash
npm install
npm run start:dev
```

API em: `http://localhost:3000`

## Demo no navegador (GitHub Pages)

https://reinaldobarreto.github.io/portfolio-reinaldo-react/demos/apis-nestjs/

A tela no Pages usa a mesma lógica dos endpoints (mock no browser). O código NestJS deste repositório é a versão real para rodar localmente.
