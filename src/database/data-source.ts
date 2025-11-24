import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "../api/auth/userEntity";
import { config } from "../config/env.config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: config.nodeEnv === "development" || config.nodeEnv === "test",
  logging: false,
  entities: [Usuario],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
});
