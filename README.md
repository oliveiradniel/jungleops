# 🌐 Sistema de Gestão de Tarefas Colaborativo – JungleOps

O ecossistema é composto por serviços desacoplados, com persistência em PostgreSQL, mensageria assíncrona via RabbitMQ e comunicação em tempo real por WebSockets. O frontend foi desenvolvido em React.js + Vite, e todo o ambiente é orquestrado com Docker Compose, garantindo padronização, escalabilidade e facilidade de deploy.

![Status](https://img.shields.io/badge/status-estável-2ECC71?style=flat-square)

---

## ⚙️ Arquitetura do Sistema

> Este projeto adota uma **arquitetura de microserviços em monorepo**, construída com NestJS, utilizando um **modelo de comunicação híbrido baseado em HTTP, RabbitMQ e WebSockets**. A solução contempla autenticação centralizada com refresh token, gerenciamento completo de tarefas e comentários, além de um sistema de persistência de notificações e exibição em tempo real.

Com ele é possível:

- [x]  Criar, ver detalhes, atualizar e deletar tarefas
- [x]  Adicionar novos participantes à tarefas
- [x]  Adicionar comentários
- [x]  Ver auditoria detalhada de cada ação nas tarefas (criação, atualização e exclusão)
- [x]  Aplicar filtros à exibição de tarefas e auditoria
- [x]  Visualizar todas suas notificações das tarefas à qual participa
- [x]  Visualizar notificações e o que outros usuários fazem em tempo real

---

## 🏗️ Diagrama de Arquitetura


![Diagrama de Arquitetura](https://raw.githubusercontent.com/oliveiradniel/jungleops/refs/heads/main/_assets/diagrama.png)

---

## 🚀 Tecnologias

### Front End

- [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
- [![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
- [![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
- [![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=for-the-badge&logo=tanstack&logoColor=white)](https://tanstack.com/router/latest)
- [![TanStack Table](https://img.shields.io/badge/TanStack_Table-FF4154?style=for-the-badge&logo=tanstack&logoColor=white)](https://tanstack.com/table/latest)
- [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
- [![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
- [![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
- [![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC3C4D?style=for-the-badge&logo=react&logoColor=white)](https://react-hook-form.com/)
- [![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
- [![Radix UI](https://img.shields.io/badge/Radix_UI-000000?style=for-the-badge&logo=radix-ui&logoColor=white)](https://www.radix-ui.com/)
- [![Sonner](https://img.shields.io/badge/Sonner-7B61FF?style=for-the-badge&logo=sonner&logoColor=white)](https://sonner.toast.dev/)

### Back End (Microservices)

- [![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com)
- [![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/pt-br/)
- [![TypeORM](https://img.shields.io/badge/TypeORM-A456BD?style=for-the-badge&logo=typeorm&logoColor=white)](https://typeorm.io/)
- [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
- [![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
- [![Passport JWT](https://img.shields.io/badge/Passport_JWT-D6FF00?style=for-the-badge&logo=passport&logoColor=white)](https://www.passportjs.org/packages/passport-jwt/)
- [![BCrypt](https://img.shields.io/badge/BCrypt-BC3433?style=for-the-badge&logo=bcrypt&logoColor=white)](https://jwt.io/)
- [![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
- [![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
- [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

### Mensageria

- [![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)](https://www.typescriptlang.org/)
- [![Socket.IO](https://img.shields.io/badge/Socket.IO-2D2D33?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)

### Infra, Orquestração

- [![TurboRepo](https://img.shields.io/badge/TurboRepo-2277CF?style=for-the-badge&logo=turborepo&logoColor=white)](https://turborepo.com/)
- [![Docker](https://img.shields.io/badge/Docker-428BFF?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
- [![Docker Compose](https://img.shields.io/badge/Docker_Compose-428BFF?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/)

---

## 🗂️ Divisão de responsabilidades

| Serviço (Microsserviço) | Responsabilidade Principal | Comunicação |
|------|------------|----------|
| `web` | Interface do Usuário (UI) e interação com o Gateway. | `HTTP, WebSocket` |
| `api-gateway` | Ponto de entrada HTTP/WebSocket. Autenticação/Guards, Rate Limiting, Documentação (Swagger). Roteamento para microsserviços. | `HTTP/WebSocket` |
| `auth-service` | Lógica de Autenticação: Cadastro, Login, Refresh de Token (JWT), Hash de Senha (bcrypt). | `HTTP` |
| `tasks-service` | Lógica de Negócio de Tarefas: CRUD, Comentários, Histórico, Atribuições. Publica eventos no RabbitMQ. | `HTTP, RabbitMQ (Produtor)` |
| `notifications-service` | Gerencia Notificações: Consome eventos do RabbitMQ, persiste e entrega via WebSocket. | `RabbitMQ (Consumidor), WebSocket (Gateway)` |

---

## 👷🏻 Decisões técnicas e trade-offs

### 1. Monorepo com múltiplos serviços

- Facilita compartilhamento de tipos e utilitários.
- Trade-off: maior complexidade e atenção para configuração do Docker e build.

### 2. API Gateway como única porta de entrada

- Centraliza autenticação.
- Permite aplicar políticas, guards e throttling em um ponto só.
- Trade-off: se ele cair toda aplicação para, um load balancer com múltiplas instâncias resolveria.

---

## 🧩 Implementações

- [x]  Autenticação: Register/Login, JWT access & refresh token com passport, hash de senha com bcrypt
- [x]  CRUD de Tarefas: Título, descrição, prazo, prioridade, status, atribuição múltipla
- [x]  Comentários: Criar/listar por tarefa
- [x]  Audit Logs: Histórico simplificado de criação, alterações e exclusão
- [x]  Notificações: Tarefas (criar, atualizar, alterar status ou prioridade, excluir) e comentários via RabbitMQ + WebSocket
- [x]  Docker Compose: Levanta frontend, API Gateway, microservices, banco e RabbitMQ
- [x]  Swagger: Documentação disponível em /api/docs
- [x]  Validações: class-transformer e class-validator no backend (API Gateway), react-hook-form + zod no frontend
- [x]  UI: 5+ componentes shadcn/ui, skeleton loaders, toast notifications (21 no total)

---

## 🚀 Instruções para rodar o projeto

1. Clone o repositório e acesse o diretório do projeto:

```bash
git clone https://github.com/oliveiradniel/jungleops.git

cd jungleops
```

2. Copiar as variáveis:

- Antes de subir a infraestrutura certifique-se de copiar o arquivo `.env.example` para `.env`, pois o Docker Compose irá procurar especificamente neste arquivo.

```bash
cp .env.example .env
```

3. Build do monorepo / pacotes compartilhados

- O projeto depende do package shared, que contém tipos, entidades e enums usados por todos os microserviços. Antes de rodar qualquer serviço, é necessário compilá-lo:

```bash
# No root do repositório

npm install
```

- Em seguida gere o build da pasta `shared`:

```bash
cd packages/shared

npm run build
```

4. Iniciar o ambiente:

```bash
docker compose up -d --build
```

⚠️ Se estiver com uma versão antiga do Docker precisará executar `docker-compose up --build`.

Isso sobe:

- Banco de Dados (Usuários, Tarefas e Comentários, Notificações)
- Servidor RabbitMQ
- Front-End
- API Gateway
- Auth Service
- Tasks Service
- Notifications Service

[Frontend](http://localhost:3000/auth) | [Swagger Docs](http://localhost:3001/docs)

---

## 📄 Variáveis de Ambiente (Docker Compose)

O projeto utiliza um arquivo `.env` com as seguintes variáveis:

| Nome | Descrição | Exemplo |
|------|------------|----------|
| `RABBITMQ_USER` | Usuário para autenticação no RabbitMQ | `admin` |
| `RABBITMQ_PASS` | Senha do usuário do RabbitMQ | `admin` |
| `BROKER_URL` | URL de conexão com o RabbitMQ (protocolo AMQP) | `amqp://admin:admin@rabbitmq:5672` |
| `JWT_ACCESS_SECRET` | Chave secreta para assinar tokens de acesso JWT | `unsecure_jwt_secret_access` |
| `JWT_REFRESH_SECRET` | Chave secreta para assinar tokens de refresh JWT | `unsecure_jwt_secret_refresh` |
| `FRONTEND_ORIGIN` | URL base do frontend, usada em CORS ou redirecionamentos | `http://localhost:3000` |
| `AUTH_SERVICE_BASE_URL` | URL base do serviço de autenticação | `http://auth-service:3002/auth` |
| `USERS_SERVICE_BASE_URL` | URL base do serviço de usuários | `http://auth-service:3002/users` |
| `TASKS_SERVICE_BASE_URL` | URL base do serviço de tarefas | `http://tasks-service:3003/tasks` |
| `TASK_AUDIT_LOGS_SERVICE_BASE_URL` | URL base do serviço de audit logs | `http://tasks-service:3003/task-audit-logs` |
| `VITE_API_URL` | URL base da API | `http://localhost:3001/api` |
| `VITE_NOTIFICATIONS_SERVICE_BASE_URL` | URL base do serviço de notificações | `http://localhost:3004` |
**Banco de Usuários**
| `DB_AUTH_SERVICE_PASSWORD` | Senha do usuário do banco de dados PostgreSQL | `authserviceroot` |
| `DB_AUTH_SERVICE_USER` | Nome do usuário do banco de dados PostgreSQL | `authserviceroot` |
| `DB_AUTH_SERVICE_NAME` | Nome do banco de dados que será criado e usado pela aplicação | `auth_service_db` |
| `DB_AUTH_SERVICE_HOST` | Host do servidor PostgreSQL | `auth_service_db` |
| `DB_AUTH_SERVICE_PORT` | Porta de conexão com o PostgreSQL | `5432` |
**Banco de Notificações**
| `DB_NOTIFICATIONS_SERVICE_PASSWORD` | Senha do usuário do banco de dados PostgreSQL | `notificationsserviceroot` |
| `DB_NOTIFICATIONS_SERVICE_USER` | Nome do usuário do banco de dados PostgreSQL | `notificationsserviceroot` |
| `DB_NOTIFICATIONS_SERVICE_NAME` | Nome do banco de dados que será criado e usado pela aplicação | `notifications_service_db` |
| `DB_NOTIFICATIONS_SERVICE_HOST` | Host do servidor PostgreSQL | `notifications_service_db` |
| `DB_NOTIFICATIONS_SERVICE_PORT` | Porta de conexão com o PostgreSQL | `5432` |
**Banco de Tarefas e Comentários**
| `DB_TASKS_SERVICE_PASSWORD` | Senha do usuário do banco de dados PostgreSQL | `tasksserviceroot` |
| `DB_TASKS_SERVICE_USER` | Nome do usuário do banco de dados PostgreSQL | `tasksserviceroot` |
| `DB_TASKS_SERVICE_NAME` | Nome do banco de dados que será criado e usado pela aplicação | `tasks_service_db` |
| `DB_TASKS_SERVICE_HOST` | Host do servidor PostgreSQL | `tasks_service_db` |
| `DB_TASKS_SERVICE_PORT` | Porta de conexão com o PostgreSQL | `5432` |


> ⚠️ Lembre-se de usar secrets diferentes para a geração do Access e Refresh token JWT.

---

## 🔗 Links

[![Portfólio](https://img.shields.io/badge/Portfólio-00A6F4?style=for-the-badge&logo=google-earth&logoColor=white)](https://jovemprogramador.dev/)
