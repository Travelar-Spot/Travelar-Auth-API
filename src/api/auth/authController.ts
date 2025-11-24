import { Request, Response } from "express";
import { AuthService } from "./authService";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const status =
          error.message === "Este e-mail já está em uso." ? 409 : 400;
        res.status(status).json({ message: error.message });
      } else {
        res
          .status(400)
          .json({ message: "Erro desconhecido ao registrar usuário." });
      }
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, senha } = req.body;
      const tokens = await this.authService.login(email, senha);
      res.status(200).json(tokens);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(401).json({ message: "Erro de autenticação desconhecido." });
      }
    }
  };
}
