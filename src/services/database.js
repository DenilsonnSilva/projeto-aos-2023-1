import Sequelize from "sequelize";

// Conexão com o banco de dados
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

export default sequelize;
