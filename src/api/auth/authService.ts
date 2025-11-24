import { Repository } from "typeorm";
import { Usuario, UsuarioRole } from "./userEntity";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterUserDto } from "./dto/register-user.dto";
import { config } from "../../config/env.config";

export class AuthService {
  constructor(private readonly usuarioRepository: Repository<Usuario>) {}

  async register(data: RegisterUserDto): Promise<Omit<Usuario, "senhaHash">> {
    const { nome, email, senha, telefone } = data;

    const userExists = await this.usuarioRepository.findOneBy({ email });
    if (userExists) {
      throw new Error("Este e-mail já está em uso.");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const newUser = this.usuarioRepository.create({
      nome,
      email,
      senhaHash,
      telefone,
      role: UsuarioRole.CLIENTE,
    });

    await this.usuarioRepository.save(newUser);

    const { senhaHash: savedHash, ...userWithoutPassword } = newUser;

    void savedHash;

    return userWithoutPassword;
  }

  async login(
    email: string,
    senha: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usuarioRepository
      .createQueryBuilder("usuario")
      .where("usuario.email = :email", { email })
      .addSelect("usuario.senhaHash")
      .getOne();

    if (!user) {
      throw new Error("Credenciais inválidas.");
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senhaHash);

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas.");
    }

    return this.generateTokens(user);
  }

  private generateTokens(user: Usuario): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload = { sub: user.id, role: user.role };

    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    } as jwt.SignOptions);

    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn,
    } as jwt.SignOptions);

    return { accessToken, refreshToken };
  }
}
