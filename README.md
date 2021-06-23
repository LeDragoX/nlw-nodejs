# NLW-NodeJS (06/2021) | NLW Valoriza

## Aula 1 - Node introduction

*Annotations will be added out from code, to keep the code CLEAN.*

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
```zsh
# Curl
sudo apt install -y curl
# NodeJS + NPM
curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
# Yarn
npm install --global yarn
```
- [Insomnia](https://insomnia.rest/download)
- [Beekeepers Studio](https://www.beekeeperstudio.io/)


```zsh
  yarn init -y            # Initialize Project Repository
  yarn add typescript -D  # Install Typescript dependencies | -D to install all dependencies
  yarn tsc --init         # Init Typescript
```

On [`tsconfig.json`](tsconfig.json) change:
```json
  "strict": false,                                 /* Enable all strict type-checking options. */
```

```zsh
  # As node don't understand 'typescript', do this
  # to convert index.ts => index.js
  yarn tsc
  # Add 'express'
  yarn add express -D
  yarn add @types/express -D

  # To automatize .ts => .js conversion
  # Use this library to spend less time and be more productive
  yarn add ts-node-dev -D
```

On [`package.json`](package.json) add after the '"license":' line
```json
  "scripts": {
    "dev": "ts-node-dev src/server.ts"
  },
```

```zsh
  # Use this to run the server (including any updates you made)
  yarn dev
```

## Aula 2 - User Structure

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

*This will use an ORM to ease the integration process,* 
*but we can use native drivers from other DBs too.*
- [TypeORM](https://typeorm.io/)

- For SQLite (This):
```zsh
yarn add typeorm reflect-metadata sqlite3 
```
- For PostgreSQL: 
```zsh
yarn add typeorm reflect-metadata mysql 
```
- For MySQL:
```zsh
yarn add typeorm reflect-metadata mysql 
```

*Migrations are good for a team creating individual tables on the DB.*
*They store the history from the Entities*

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

Add the *uuid* library to yarn:
```zsh
yarn add uuid
yarn add @types/uuid -D
```

Migrations: Entity (User) <-> ORM <-> DB Repositories

Service: Server -> (   ) -> SERVICE (Validation) -> Repositories -> DB

Controller (Request / Response): -> Server -> Controller -> Service -> operations()...

## Aula 3 - Continuing the application

### Regras

- Cadastro de TAG
  - [ x ] Não é permitido cadastrar mais de uma tag com o mesmo nome
  - [ x ] Não é permitido cadastrar tag sem nome
  - [ x ] Não é permitido o cadastro por usuários que não sejam administradores

Server -> routes -> Controller -> Service (throw new Error)

```zsh
# Import async errors detection:
yarn add express-async-errors
# Create new migration for tags
yarn typeorm migration:create -n CreateTags
# Run migration
yarn typeorm migration:run
# Create Tag entity
yarn typeorm entity:create -n Tag
```

## Aula 4 -

### Regras

- Cadastro de elogios
  - [ x ] Não é permitido um usuário cadastrar um elogio para si
  - [ x ] Não é permitido cadastrar elogios para usuários inválidos
  - [ x ] O usuário precisa estar autenticado na aplicação

## Aula 5 -