//Configuração do projeto
import express, { urlencoded } from "express";
import cors from "cors";
import "dotenv/config";

import sequelize from "./services/database";

import usersRoutes from "./routes/usersRoutes";
import moviesRoutes from "./routes/moviesRoutes";

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/", usersRoutes);
app.use("/", moviesRoutes);

app.get("/healthz", (req, res) => {
  res.status(200).json({ message: "Tudo funcionando!" });
});

sequelize.sync({ force: eraseDatabaseOnSync });

app.listen(process.env.PORT, () => {
  console.log(`Running server on port ${process.env.PORT}`);
});
