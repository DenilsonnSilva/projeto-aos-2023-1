//Configuração do projeto
import express, { urlencoded } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
  console.log(`Running server on port ${process.env.PORT}`);
});
