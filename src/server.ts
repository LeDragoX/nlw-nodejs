import express, { request, response } from "express";

// @types/express 
const app = express();

/*
- GET     => Busca
- POST    => Inserção/Criação
- PUT     => Alterar dado já existente
- DELETE  => Remover
- PATCH   => Atualizar um dado, de um grupo (tipo uma correção)
*/

app.get("/test", (request, response) => {
  // Request  => Vem do Client (entrada)
  // Response => Vem do Server (saída)
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

// http://localhost:3000
app.listen(3000, () => console.log("Server is running N L W :D"));