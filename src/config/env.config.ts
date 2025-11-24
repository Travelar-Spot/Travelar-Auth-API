import dotenv from "dotenv";

if (process.env.NODE_ENV !== "test") {
  dotenv.config();
}

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${key}`);
  }
  return value;
};

export const config = {
  port: parseInt(getEnv("AUTH_API_PORT", "4000"), 10),
  nodeEnv: getEnv("NODE_ENV", "development"),
  corsOrigin: getEnv("CORS_ORIGIN", "http://localhost:5173"),
  database: {
    host: getEnv("DB_HOST", "localhost"),
    port: parseInt(getEnv("DB_PORT", "5432"), 10),
    username: getEnv("DB_USERNAME"),
    password: getEnv("DB_PASSWORD"),
    name: getEnv("DB_DATABASE", "travelar_auth_db"),
  },
  jwt: {
    secret: getEnv("JWT_SECRET"),
    expiresIn: getEnv("JWT_EXPIRES_IN", "1h"),
    refreshSecret: getEnv("REFRESH_TOKEN_SECRET"),
    refreshExpiresIn: getEnv("REFRESH_TOKEN_EXPIRES_IN", "7d"),
  },
};
