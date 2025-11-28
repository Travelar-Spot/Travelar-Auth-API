# **Travelar – API de Autenticação**

A **Travelar Auth API** é um microserviço independente responsável por todo o fluxo de autenticação e segurança do ecossistema Travelar. Ela centraliza o gerenciamento de identidades, garantindo escalabilidade, modularidade e segurança ao isolar este domínio dos demais serviços.

---

## **1. Visão Geral**

A **API de Autenticação** é responsável pelos seguintes processos críticos:

### **Funções Primárias**

* Registro e autenticação de usuários
* Emissão, assinatura e validação de **JSON Web Tokens (JWT)**
* Proteção de rotas via middleware com Passport.js
* Hashing seguro de credenciais usando **bcrypt**

Este serviço é utilizado pelo Backend e pelo Frontend para garantir que apenas usuários autenticados acessem recursos protegidos.

[Link da documentação do projeto Travelar](https://travelar-spot.github.io/Travelar-docs/)

---

## **2. Tecnologias Utilizadas**

A stack foi projetada para garantir segurança, performance e tipagem estática.

| Tecnologia            | Função / Uso                                |
| --------------------- | ------------------------------------------- |
| **Node.js**           | Ambiente de execução server-side            |
| **Express**           | Framework HTTP rápido e minimalista         |
| **TypeScript**        | Tipagem estática e segurança de código      |
| **TypeORM**           | ORM para modelagem de entidades e migrações |
| **PostgreSQL**        | Banco de usuários                           |
| **Passport.js (JWT)** | Autenticação e proteção de rotas            |
| **bcrypt**            | Hashing e comparação de senhas              |
| **class-validator**   | DTOs com validação automática               |

---

## **3. Arquitetura e Estrutura de Pastas**

A API segue arquitetura em camadas, organizando separadamente domínio, infraestrutura e interface de acesso.

```
src/
├── api/
│   └── auth/                  
│       ├── dto/               # DTOs com validação
│       ├── authController.ts  # Entrada de requisições (HTTP)
│       ├── authRoutes.ts      # Rotas /auth
│       ├── authService.ts     # Regras de autenticação
│       └── userEntity.ts      # Entidade User (TypeORM)
│
├── config/
│   ├── env.config.ts          # Carregamento de variáveis de ambiente
│   └── passport.config.ts     # Estratégia JWT
│
├── database/
│   └── data-source.ts         # Conexão PostgreSQL + TypeORM
│
├── middlewares/
│   └── validation.middleware.ts # Validação automática de DTOs
│
├── app.ts                     # Instância Express + Middlewares
└── server.ts                  # Inicialização do servidor
```

---

## **4. Endpoints da API**

Abaixo estão os principais endpoints do microserviço de autenticação.

---

### **4.1. Registro de Usuário**

**POST /auth/register**

Cria um novo usuário com validação completa e hashing da senha.

**Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "senhaForte123"
}
```

**Resposta (201):**

* ID do usuário
* Dados públicos cadastrais

---

### **4.2. Login**

**POST /auth/login**

Valida credenciais e retorna um JWT assinado.

**Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "senhaForte123"
}
```

**Resposta (200):**

```json
{
  "token": "eyJh...jwt..."
}
```

---

### **4.3. Perfil do Usuário**

**GET /auth/profile**

Protegido via JWT. Retorna informações do usuário autenticado.

**Headers necessários:**

```
Authorization: Bearer <token>
```

---

## **5. Segurança e Boas Práticas**

* **Senhas jamais são armazenadas em texto puro.**
  O serviço usa **bcrypt** com salt para hashing seguro.

* **JWTs** contêm apenas:

  * ID do usuário
  * Timestamp de expiração
    E são assinados usando `JWT_SECRET`.

* **Campo email** possui índice único no PostgreSQL através da entidade `User`.

---

## **6. Variáveis de Ambiente**

Crie um arquivo **.env** com:

| Variável      | Descrição               |
| ------------- | ----------------------- |
| `PORT`        | Porta da API            |
| `DB_HOST`     | Host do banco           |
| `DB_PORT`     | Porta (5432)            |
| `DB_USERNAME` | Usuário                 |
| `DB_PASSWORD` | Senha                   |
| `DB_DATABASE` | Nome do banco           |
| `JWT_SECRET`  | Chave de assinatura JWT |

### Exemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=senha
DB_DATABASE=travelar_auth_db

JWT_SECRET=sua_chave_segura
```

---

## **7. Instalação e Execução**

Este serviço cobre:

* Autenticação
* Autorização (JWT)
* Persistência de usuários

---

### **7.1. Pré-requisitos**

* Node.js 18+
* NPM ou Yarn
* Git
* PostgreSQL
* (Opcional) Docker

---

### **7.2. Instalação**

#### **7.2.1. Clonar o repositório**

```bash
git clone https://github.com/Travelar-Spot/Travelar-Auth-API.git
cd travelar-auth-api
```

#### **7.2.2. Instalar dependências**

```bash
npm install
# ou
yarn install
```

---

### **7.3. Configuração**

Crie o arquivo `.env` manualmente usando o exemplo acima.

---

### **7.4. Executando**

#### **7.4.1. Modo Desenvolvimento**

```bash
npm run dev
```

#### **7.4.2. Modo Produção**

```bash
npm run build
npm start
```

---

### **7.5. Scripts Úteis**

| Script                      | Função                             |
| --------------------------- | ---------------------------------- |
| `npm run dev`               | Modo desenvolvimento (ts-node-dev) |
| `npm run build`             | Compila TS → JS                    |
| `npm start`                 | Executa build em produção          |
| `npm test`                  | Roda testes configurados           |
| `npm run lint` / `lint:fix` | Verificação e correção de lint     |
| `npm run format`            | Prettier                           |

---