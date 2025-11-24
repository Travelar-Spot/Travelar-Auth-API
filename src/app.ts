import express from "express";
import cors from "cors";
import authRoutes from "./api/auth/authRoutes";
import { config } from "./config/env.config";
import passport from "./config/passport.config";

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(passport.initialize());
app.use(cors({ origin: "*" }));

app.use("/auth", authRoutes);

export default app;
