import { Router } from "express";
import { AuthController } from "./authController";
import { AuthService } from "./authService";
import { AppDataSource } from "../../database/data-source";
import { Usuario } from "./userEntity";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { RegisterUserDto } from "./dto/register-user.dto";

const router = Router();

const usuarioRepository = AppDataSource.getRepository(Usuario);
const authService = new AuthService(usuarioRepository);
const authController = new AuthController(authService);

router.post(
  "/register",
  validationMiddleware(RegisterUserDto),
  authController.register,
);

router.post("/login", authController.login);

export default router;
