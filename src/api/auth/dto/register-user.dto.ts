import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty({ message: "O nome não pode estar vazio." })
  @IsString()
  nome!: string;

  @IsEmail({}, { message: "Formato de e-mail inválido." })
  @IsNotEmpty({ message: "O e-mail não pode estar vazio." })
  email!: string;

  @IsNotEmpty({ message: "A senha não pode estar vazia." })
  @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres." })
  senha!: string;

  @IsString()
  telefone!: string;
}
