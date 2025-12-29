# Sistema de Gestão de Tarefas Colaborativo – Jungle Gaming

# ⚙️ Arquitetura do Sistema

Este projeto adota uma arquitetura de microserviços em monorepo, construída com NestJS, utilizando um modelo de comunicação híbrido baseado em HTTP, RabbitMQ e WebSockets. A solução contempla autenticação centralizada, gerenciamento completo de tarefas e comentários, além de um sistema de notificações em tempo real.

O ecossistema é composto por serviços desacoplados, com persistência em PostgreSQL, mensageria assíncrona via RabbitMQ e comunicação em tempo real por WebSockets. O frontend foi desenvolvido em React.js, e todo o ambiente é orquestrado com Docker Compose, garantindo padronização, escalabilidade e facilidade de deploy.

---

## 🏗️ Diagrama de Arquitetura (ASCII)

```bash
                                   ┌───────────────────────┐                                  ┌────────────────────┐
                                   │       Front-end       │──────────────────────────────────│     Web Socket     │
                                   │  React + Vite (HTTP)  │                                  │  Notificações live │
                                   └───────────┬───────────┘                                  └───────────┬────────┘
                                               │                                                          │
                                               ▼                                                          │
                               ┌─────────────────────────────────┐                                        │
                               │          API Gateway            │                                        │
                               │   NestJS (HTTP / Auth Guard)    │                                        │
                               └───────────────┬─────────────────┘                                        │
                                               │                                                          │
                                               │                                                          │
              ┌────────────────────────────────┴──────────────────────────────────┐                       │
              │                                                                   │                       │
              ▼                                                                   ▼                       │
  ┌─────────────────────────┐                                        ┌──────────────────────────┐         │
  │      Auth Service       │                                        │      Tasks Service       │         │
  │ NestJS (Microservice)   │                                        │   NestJS (Microservice)  │         │
  │ HTTP only (público)     │                                        │   HTTP + RabbitMQ        │         │
  │ - Gera tokens JWT       │─────────────────┬──────────────────────│   - CRUD de tarefas      │         │
  │ - Autentica usuário     │                 │                      │   - CRUD de comentários  │         │
  │ TypeORM + PostgreSQL    │                 │                      │   - Publica mensagens na │         │
  │ Tabela: users           │                 │                      │     fila RabbitMQ        │         │
  └───────────┬─────────────┘                 │                      └────────────┬─────────────┘         │
              │                               │                                   │                       │
              │                               │                                   │                       │
              │                               │                                   ▼                       │
              │                               │                      ┌──────────────────────────┐         │
              │                               │                      │   Notifications Service  │         │
              │                               │                      │   RabbitMQ Consumer      │         │
              │                               │                      │   Persistência no DB     │         │
              │                               │                      │   WebSocket Gateway      │         │
              │                               │                      └────────────┬─────────────┘         │
              │                               │                                   │                       │
              │                               │                                   └───────────────────────
              │                               │
              │                               │
              │                               ▼
              │                   ┌───────────────────────┐
              └───────────────────│ PostgreSQL (DB Único) │
                                  └───────────────────────┘

```

- Front-end:
    - React.js, TanStack Router - Roteamento e UI principal
    - shadcn/ui, Tailwind CSS - Componentes de UI e estilização
    - Context API, TanStack Query - Gerenciamento de estado e cache/sincronização de dados
    - react-hook-form, zod - Gerenciamento e validação de formulários

- Back-end:
    - Nest.js - Framework robusto para back-end escalável e microsserviços.
    - TypeORM, PostgreSQL - ORM e banco de dados relacional.
    - JWT (Passport), bcrypt - Autenticação e hash de senha.

- Mensageria:
    - RabbitMQ - Broker de mensagens para comunicação assíncrona.
    - WebSockets (via Nest) - Comunicação em tempo real para notificações.

- Infra, Orquestração:
    - Monorepo com Turborepo - Organização do projeto, otimização de builds e packages compartilhados.
    - Docker & Docker Compose - Contêineres e orquestração do ambiente de desenvolvimento.

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

### 3. TypeORM + PostgreSQL ( um único banco)

- Acelera desenvolvimento no teste.
- Cada serviço possui suas próprias tabelas:
    - auth-service: users
    - tasks-service: tasks, comments, users-tasks, task-audit-logs
    - notifications-service:
- Trade-off: em produção, o ideal seria banco de dados separados por contexto (DDD).

---

## 🧩 Requisitos implementados

- [x]  Autenticação: Register/Login, JWT access & refresh token com passport, hash de senha com bcrypt
- [x]  CRUD de Tarefas: Título, descrição, prazo, prioridade, status, atribuição múltipla
- [x]  Comentários: Criar/listar por tarefa
- [x]  Audit Logs: Histórico simplificado de criação, alterações e exclusão
- [x]  Notificações: Tarefas (criar, atualizar, alterar status ou prioridade, excluir) e comentários via RabbitMQ + WebSocket
- [x]  Docker Compose: Levanta frontend, API Gateway, microservices, banco e RabbitMQ
- [x]  Swagger: Documentação disponível em /api/docs
- [x]  Validações: class-transformer e class-validator no backend (API Gateway), react-hook-form + zod no frontend
- [x]  UI: 5+ componentes shadcn/ui, skeleton loaders, toast notifications (21 no total)

## ⚠️ Problemas Conhecidos / O que melhoraria

### 1. Banco de dados compartilhado

- É funcional, mas quebra o isolamento ideal de microserviços.
- 💡 Melhoria: separar bancos ou schemas no futuro.

### 2. API Gateway como único ponto de falha

- Se cair, nenhum serviço funciona.
- 💡 Melhoria: adicionar load balancer ou replicar instâncias.

### 3. Falta de uma rota de healthcheck

- Se o serviço não estiver online ele pode crashar a aplicação e cair.
- 💡 Melhoria: adicionar uma rota de healthcheck para verificar a disponibilidade do serviço.

### 4. Notifications-service depende de WebSockets

- Se o front estiver offline, notificação pode ser perdida no tempo real.
- 💡 Melhoria: usar WebPush/FCM ou entregar via polling também e verificar se o usuário recebeu.

### 5. Refresh token sem persistência (Refresh Token Rotativo)

- Refresh token não está totalmente rotativo e protegido, se alguém o conseguir pode gerar quantos access tokens quiser.
💡 Melhoria: persistir o refresh token no banco de dados e só permitir que seja usado somente uma vez para gerar um access token.

### 6. Verificação de usuários

- Não há verificação para saber se o usuário realmente existe.
- 💡 Melhoria: adicionar verificação antes de adicionar uma tarefa ou comentário.

### 7. Melhoria em cargos

- Qualquer usuário pode adicionar novas tarefas e incluir novos usuários em diversas tarefas.
- 💡 Melhoria: adicionar autorização rbac e cargos para controlar melhor o fluxo.

### Pequenas melhorias

- Filtro: busca com requisições direcionadas à API pelo motivo de múltiplos usuários utilizando a aplicação
- Audit log: atualmente registra alterações até mesmo em campos formatados (ex: datas)
- Rate limiting: configurado no API Gateway, mas pode ser refinado por endpoint
- WebSocket: melhorias na reconexão automática e fallback de notificações offline
- Diferenciais não implementados: testes unitários completos, health checks detalhados

---

## 🚀 Instruções para rodar o projeto

- Pré-requisitos
    - Docker e Docker Compose instalados

1. Clone o repositório e acesse o diretório do projeto:

```bash
git clone https://github.com/oliveiradniel/junglegaming-fullstack-challenge.git

cd junglegaming-fullstack-challenge
```

3. Copiar as variáveis:

- Antes de subir a infraestrutura certifique-se de copiar o arquivo `.env.example` para `.env`, pois o Docker Compose irá procurar especificamente neste arquivo.

```bash
cp .env.example .env
```

4. Build do monorepo / pacotes compartilhados

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

5. Iniciar o ambiente:

```bash
docker compose up -d --build
```

Se estiver com uma versão antiga do Docker precisará executar `docker-compose up --build`.

Isso sobe:

- Banco de Dados (PostgreSQL)
- Servidor RabbitMQ
- Front-End
- API Gateway
- Auth Service
- Tasks Service
- Notifications Service

- O front-end ficará disponível em `http://localhost:3000/auth`
- A documentação do Swagger em `http://localhost:3001/docs`

---

## 📄 Variáveis de Ambiente (Docker Compose)

O projeto utiliza um arquivo `.env` com as seguintes variáveis:

| Nome | Descrição | Exemplo |
|------|------------|----------|
| `POSTGRES_PASSWORD` | Senha do usuário do banco de dados PostgreSQL | `root` |
| `POSTGRES_USER` | Nome do usuário do banco de dados PostgreSQL | `root` |
| `POSTGRES_DB` | Nome do banco de dados que será criado e usado pela aplicação | `challenge_db` |
| `POSTGRES_HOST` | Host do servidor PostgreSQL | `pg` |
| `POSTGRES_PORT` | Porta de conexão com o PostgreSQL | `5432` |
| `RABBITMQ_USER` | Usuário para autenticação no RabbitMQ | `admin` |
| `RABBITMQ_PASS` | Senha do usuário do RabbitMQ | `admin` |
| `BROKER_URL` | URL de conexão com o RabbitMQ (protocolo AMQP) | `amqp://rabbitmq:5672` |
| `JWT_ACCESS_SECRET` | Chave secreta para assinar tokens de acesso JWT | `unsecure_jwt_secret` |
| `JWT_REFRESH_SECRET` | Chave secreta para assinar tokens de refresh JWT | `unsecure_jwt_secret` |
| `FRONTEND_ORIGIN` | URL base do frontend, usada em CORS ou redirecionamentos | `http://localhost:3000` |
| `AUTH_SERVICE_BASE_URL` | URL base do serviço de autenticação | `http://auth-service:3002/auth` |
| `USERS_SERVICE_BASE_URL` | URL base do serviço de usuários | `http://auth-service:3002/users` |
| `TASKS_SERVICE_BASE_URL` | URL base do serviço de tarefas | `http://tasks-service:3003/tasks` |
| `TASK_AUDIT_LOGS_SERVICE_BASE_URL` | URL base do serviço de audit logs | `http://tasks-service:3003/task-audit-logs` |
| `VITE_API_URL` | URL base da API | `http://localhost:3001/api` |
| `VITE_NOTIFICATIONS_SERVICE_BASE_URL` | URL base do serviço de notificações | `http://localhost:3004` |


> ⚠️ Lembre-se de usar secrets diferentes para a geração do Access e Refresh token JWT.

---

## 🔗 Links

[![Portfólio](https://img.shields.io/badge/meu_portfólio-00A6F4?style=for-the-badge&logo=google-earth&logoColor=white)](https://jovemprogramador.dev/)
