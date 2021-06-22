# NLW-NodeJS (06/2021) | NLW Valoriza

## Aula 1
### Step-by-Step

#### Install:
- Node, NPM, Yarn
- Insomnia
- Beekeepers Studio

```zsh
  yarn init -y            # Initialize Project Repository
  yarn add typescript -D  # Install Typescript dependencies
  yarn tsc --init         # Init Typescript
```

On `tsconfig.json` change
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

On `package.json` add after the "license" line
```json
  "scripts": {
    "dev": "ts-node-dev src/server.ts"
  },
```

```zsh
  # Use this to run the server (including any updates you made)
  yarn dev
```

## Aula 2