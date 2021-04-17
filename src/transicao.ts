import { Conexao } from "./conexao"

export class Transicao {
  id: number
  status: boolean = false
  conexoesEntrada: Array<Conexao> = []
  conexoesSaida: Array<Conexao> = []

  constructor(id: number) {
    this.id = id
  }

  public getId(): number {
    return this.id
  }

  public getStatus(): boolean {
    return this.status
  }

  public getConexoesEntrada(): Array<Conexao> {
    return this.conexoesEntrada
  }

  public getConexoesSaida(): Array<Conexao> {
    return this.conexoesSaida
  }

  public setStatus(status: boolean) {
    this.status = status
  }

  public addConexaoEntrada(conexao: Conexao): void {
    this.conexoesEntrada.push(conexao)
  }

  public removeConexaoEntrada(conexao: Conexao): void {
    let index = this.conexoesEntrada.indexOf(conexao)
        if (index > -1) {
          this.conexoesEntrada.splice(index, 1)
        } else {
          console.log(`removeConexaoDaTransicao: Nao existe conexao solicitada na 
             transicao com ID ${this.getId()}`)
        }
  }

  public addConexaoSaida(conexao: Conexao): void {
    this.conexoesSaida.push(conexao)
  }

  public removeConexaoSaida(conexao: Conexao): void {
    let index = this.conexoesSaida.indexOf(conexao)
        if (index > -1) {
          this.conexoesSaida.splice(index, 1)
        } else {
          console.log(`removeConexaoDaTransicao: Nao existe conexao solicitada na 
             transicao com ID ${this.getId()}`)
        }
  }
   
  public toString(): string {
    return 'Transição ' + this.getId() + ' possui o status ' + this.getStatus()
  }
}
