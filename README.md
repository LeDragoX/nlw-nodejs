# NLW Valoriza - NLW6-NodeJS (06/2021)

## Resumo

6ª NextLevelWeek da RocketSeat - Trilha do NodeJS, ensinando a utilizar os frameworks backend para criação de rotas e gerenciamento de dados, o projeto NWL Valoriza!

## Tecnologias utilizadas:

- NodeJS => TS;
- TypeScript;
- ExpressJS / Express-Async-Errors;
- TS-Node-Dev;
- TypeORM / Reflect-Metadata / SQLite;
- UUID;
- JWT (Json Web Token);
- BCryptsJS;

## Usage

### **Software Requirements:**

```sh
# Curl
sudo apt install -y curl
# NodeJS + NPM
curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
# Yarn
npm install --global yarn
```

### **Dependencies:**

```sh
yarn init -y            # Initialize Project Repository
yarn add typescript -D  # Install Typescript dependencies | -D to install all dependencies
yarn tsc --init         # Init Typescript

# Use this to run the server (including any updates you made)
yarn dev

# As node don't understand 'typescript', do this
# to convert index.ts => index.js
# With ts-node-dev, this is no longer needed
#yarn tsc

# Add 'express'
yarn add express -D
yarn add @types/express -D

# To automatize .ts => .js conversion
# Use this library to spend less time and be more productive
yarn add ts-node-dev -D

# For SQLite (This):
yarn add typeorm reflect-metadata sqlite3
# For PostgreSQL:
#yarn add typeorm reflect-metadata mysql
# For MySQL:
#yarn add typeorm reflect-metadata mysql

# Add the *uuid* library to yarn:
yarn add uuid
yarn add @types/uuid -D

# Import async errors detection:
yarn add express-async-errors

# Install JWT lib
yarn add jsonwebtoken
yarn add @types/jsonwebtoken -D

# Library to Encrypt passwords
yarn add bcryptjs
yarn add @types/bcryptjs -D
```

## Aula 1 - Node introduction

<details>
  <summary>Click to expand</summary>

_Annotations will be added out from code, to keep the code CLEAN._

Annotation [`src/server.ts`](src/server.ts):

```ts
// @types/express

/*
- GET     => Busca
- POST    => Inserção/Criação
- PUT     => Alterar dado já existente
- DELETE  => Remover
- PATCH   => Atualizar um dado, de um grupo (tipo uma correção)
*/

// Request  => Vem do Client (entrada)
// Response => Vem do Server (saída)

app.get("/test", (request, response) => {
  return response.send("|GET| Olá manito!");
});

app.post("/test-post", (request, response) => {
  return response.send("|POST| Olá manito!");
});

app.put("/test-put", (request, response) => {
  return response.send("|PUT| Olá manito!");
});

app.delete("/test-delete", (request, response) => {
  return response.send("|DELETE| Olá manito!");
});

app.patch("/test-patch", (request, response) => {
  return response.send("|PATCH| Olá manito!");
});
```

### Step-by-Step

#### Install:

- Node, NPM, Yarn

- [Insomnia](https://insomnia.rest/download)
- [Beekeepers Studio](https://www.beekeeperstudio.io/)

On [`tsconfig.json`](tsconfig.json) change:

```json
  "strict": false,                                 /* Enable all strict type-checking options. */
```

On [`package.json`](package.json) add after the '"license":' line

```json
  "scripts": {
    "dev": "ts-node-dev src/server.ts"
  },
```

</details>

## Aula 2 - User Structure

<details>
  <summary>Click to expand</summary>

### Regras

- Cadastro de usuário
  - [ x ] Não é permitido cadastrar mais de um usuário com o mesmo e-mail
  - [ x ] Não é permitido cadastrar usuário sem e-mail

### Working with Database integration - SQLite

Annotation [`src/server.ts`](src/server.ts):

```ts
/*
TIPOS DE PARÂMETROS:
- Route Params  => http://localhost:3000/produtos/47358964378 (id)
- Query Params  => http://localhost:3000/produtos?name=teclado&description=bom&...
- Body Params   => {
  "name": "teclado"
  "description": "bom"
}
  *Body Params are not used with GET methods, only PUT, POST and PATCH
*/
```

_This will use an ORM to ease the integration process,_
_but we can use native drivers from other DBs too._

- [TypeORM](https://typeorm.io/)

_Migrations are good for a team creating individual tables on the DB._
_They store the history from the Entities_

Create [`ormconfig.json`](ormconfig.json):

```json
{
  "type": "sqlite",
  "database": "src/database/database.sqlite",
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}
```

On [`package.json`](package.json) inside '"scripts": {'

```json
  "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
```

Add [migration file](src/database/migrations/1624363435503-CreateUsers.ts) running:

```zsh
yarn typeorm migration:create -n CreateUsers
```

On [`ormconfig.json`](ormconfig.json), add to find all migrations correctly:

```json
  "migrations": ["src/database/migrations/*.ts"],
```

Run this to sync migrations inside the folder:

```zsh
  yarn typeorm migration:run  # migration:revert to cancel
```

On [`ormconfig.json`](ormconfig.json), to find all entities (Tables) correctly:

```json
  "entities": ["src/entities/*.ts"],
  "cli": {
    "entitiesDir": "src/entities"
  }
```

Add [entity file](src/entities/User.ts) running:
Run this to sync migrations inside the folder:

```zsh
  yarn typeorm entity:create -n User
```

On [`tsconfig.json`](tsconfig.json) set:

```json
  "strictPropertyInitialization": false,        /* Enable strict checking of property initialization in classes. */
  "experimentalDecorators": true,              /* Enables experimental support for ES7 decorators. */
  "emitDecoratorMetadata": true,               /* Enables experimental support for emitting type metadata for decorators. */
```

Migrations: Entity (User) <-> ORM <-> DB Repositories

Service: Server -> ( ) -> SERVICE (Validation) -> Repositories -> DB

Controller (Request / Response): -> Server -> Controller -> Service -> operations()...

</details>

## Aula 3 - Continuing the application

<details>
  <summary>Click to expand</summary>

### Regras

- Cadastro de TAG
  - [ x ] Não é permitido cadastrar mais de uma tag com o mesmo nome
  - [ x ] Não é permitido cadastrar tag sem nome
  - [ x ] Não é permitido o cadastro por usuários que não sejam administradores

Server -> routes -> Controller -> Service (throw new Error)

```zsh
# Create new migration for tags
yarn typeorm migration:create -n CreateTags
# Run migration
yarn typeorm migration:run
# Create Tag entity
yarn typeorm entity:create -n Tag
```

</details>

## Aula 4 - Working with JWT

<details>
  <summary>Click to expand</summary>

### Regras

- Cadastro de elogios
  - [ x ] Não é permitido um usuário cadastrar um elogio para si
  - [ x ] Não é permitido cadastrar elogios para usuários inválidos
  - [ x ] O usuário precisa estar autenticado na aplicação

This will use the [JWT](https://jwt.io/) library.

Changes on the Project

```zsh
# Create a migration to Alter the User Table
yarn typeorm migration:create -n AlterUserAddPassword
# After adding the necessary modifications
yarn typeorm migration:run
```

### If you want an external hash code

Use [MD5 Hash Generator](https://www.md5hashgenerator.com/) to transform:
ledragoxnlwvalorizanodejs -> a8a2d0c0f2311a246a45d1a5045c95e6

```zsh
# Compliments migration
yarn typeorm migration:create -n CreateCompliments
# After adding the necessary modifications
yarn typeorm migration:run
```

Registering a new Compliment:

```json
{
  "tag_id": "8d352bfc-1087-4dfe-ac8e-b67ced92286e",
  "user_sender": "1662a6ed-dd0f-4765-916b-d0e097ba2829",
  "user_receiver": "0e93d95e-1431-400e-845b-831047c77ded",
  "message": "Obrigado pelo aulão Dani!"
}
```

</details>

## Aula 5 - Concluding the project

<details>
  <summary>Click to expand</summary>

On [`tsconfig.json`](tsconfig.json) change:

```json
    "typeRoots": [
      "./src/@types"
    ], /* List of folders to include type definitions from. */
```

```zsh
# Add a new library: Class Transformer
yarn add class-transformer
```

</details>
