# Sistema de Gestão de Tarefas Colaborativo – Jungle Gaming

Projeto desenvolvido como teste técnico para vaga de Full-stack Developer Júnior na Jungle Gaming.
Monorepo com arquitetura de microserviços NestJS, com autenticação, CRUD de tarefas, comentários e notificações em tempo real utilizando React.js, RabbitMQ, WebSockets, PostgreSQL e Docker Compose.

> 📌 Observação: Este repositório possui uma branch dedicada a melhorias pós-entrega técnica. Para visualizar as funcionalidades mais recentes, recomendo mudar para:

```bash
improvements/post-delivery
```

Nesta branch estou implementando:

- Rota de fallback para lidar com paths inexistentes (404 Not Found)
- Página de auditoria (Audit Log) listando criações, alterações e exclusões de tarefas
- Página “Minhas tarefas”, exibindo apenas as tarefas que o usuário participa
- Correção e estabilização do fluxo de refresh token, incluindo ajustes nos cookies

# ⚙️ Arquitetura do Sistema

Este projeto implementa uma arquitetura baseada em microserviços, com comunicação híbrida entre HTTP, RabbitMQ e WebSockets. O objetivo é oferecer autenticação, gerenciamento de tarefas/comentários e notificações em tempo real.

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

## ⏱️ Tempo gasto

- Dia 1 (8 de novembro)
    - Estudo sobre monorepo e turbo
    - Configuração do monorepo
    - Configuração das configurações globais (eslint, prettier e tsconfig)

- Dia 2, Dia 3 (9 e 10 de novembro)
    - Início dos microservices
    - Configuração do TypeORM, autenticação e CRUD das tarefas

- Dia 4, Dia 5 (11 e 12 de novembro)
    - Estudo sobre API Gateway no NestJS
    - Implementação do API Gateway
    - Estudo sobre passport e proteção das rotas

- Dia 6 (13 de novembro)
    - Finalização da documentação com Swagger
    - Estudo sobre refresh token no back-end
    - Implementar rota de refresh token

- Dia  (14 de novembro)
    - Estudo sobre domínio, microservices e comunicação com RabbitMQ

- Dia 8 (15 de novembro)
    - Implementação de mensageria com RabbitMQ
    - Criação do notifications-service
    - Estudo sobre WebSocket
    - Emitir mensagens para os ouvintes no WebSocket

- Dia 9 (16 de novembro)
    - Início do front-end
    - Configuração do TanStack Router e Query
    - Criação da Service Layer

- Dia 10 (17 de novembro)
    - Estudo sobre funcionamento do Shadcn e escolha da paleta de cores
    - Iniciar construção do front-end

- Dia 11 (18 de novembro)
    - Criação da página de autenticação (login/register)
    - Proteção das rotas com Context API e TanStack Router

- Dia 12 (19 de novembro)
    - Estudo sobre refresh token no front-end
    - Implementar refresh token no interceptor do Axios
    - Criação da página de listagem de tarefas, paginação e o CRUD da mesma
    - Criação da página para informações adicionais da tarefa com listagem para comentários

- Dia 13 (20 de novembro)
    - Finalização de ajustes para experiência do usuários com loading Skeleton
    - Estudo sobre WebSocket no front-end
    - Implementar conexão com WebSocket

- Dia 14 (21 de novembro)
    - Refinar invalidações em queries através do WebSocket
    - Melhorar notifições aos usuários
    - Criar tabela para audit log e cadastrar na criação, alteração e exclusão de tarefas.

- Dia 15 (22 de novembro)
    - Ajustes para as imagens funcionarem corretamente.
    - Criar script para rodar as migrations do banco de dados.
    - Fazer testes finais e subir para o repostório.

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

## Componentes do Shadcn utilizados (21)

- Button
- Calendar
- Card
- Checkbox
- Date Picker
- Dialog
- Form Group
- Input Group
- Input
- Label
- Pagination
- Popover
- Radio Group
- Separator
- Sheet
- Sidebar
- Skeleton
- Sonner
- Textarea
- Tooltip
- Spinner

## 🔗 Links

[![Portfólio](https://img.shields.io/badge/meu_portfólio-00A6F4?style=for-the-badge&logo=google-earth&logoColor=white)](https://jovemprogramador.dev/)
