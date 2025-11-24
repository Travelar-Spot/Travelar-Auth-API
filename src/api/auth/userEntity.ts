import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

export enum UsuarioRole {
  CLIENTE = "CLIENTE",
  PROPRIETARIO = "PROPRIETARIO",
  AMBOS = "AMBOS",
}

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  senhaHash!: string;

  @Column({ nullable: true })
  telefone!: string;

  @Column({
    type: "enum",
    enum: UsuarioRole,
  })
  role!: UsuarioRole;

  @CreateDateColumn()
  criadoEm!: Date;
}
