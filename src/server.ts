import app from "./app";
import { AppDataSource } from "./database/data-source";
import { config } from "./config/env.config";

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source inicializado com sucesso!");

    app.listen(config.port, () => {
      console.log(`Servidor de autenticação rodando na porta ${config.port}`);
    });
  } catch (err) {
    console.error("Erro durante a inicialização:", err);
    process.exit(1);
  }
};

startServer();
