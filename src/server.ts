import express from "express";
import "reflect-metadata";

import "./database";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

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

app.listen(3000, () => console.log("Server is running N L W :D"));