export interface IEmail {
  email: string;
  server: string;
  port: number;
  senha: string;
  ssl: boolean;
  conexaoSegura: boolean;
  tipo: number;
}
