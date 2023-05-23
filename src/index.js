//Configuração do projeto
import express, { urlencoded } from "express";
import cors from "cors";
import "dotenv/config";

import sequelize from "./services/database";

import usersRoutes from "./routes/usersRoutes";
import moviesRoutes from "./routes/moviesRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/", usersRoutes);
app.use("/", moviesRoutes);

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync });

app.listen(process.env.PORT, () => {
  console.log(`Running server on port ${process.env.PORT}`);
});
