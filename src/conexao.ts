import { Lugar } from './lugar'
import { Transicao } from './transicao'

export class Conexao {
  lugar: Lugar
  transicao: Transicao
  peso: number
  ehEntrada: boolean
  ehConexaoInibidora: boolean
  ehConexaoReset: boolean

  constructor(
    lugar: Lugar,
    transicao: Transicao,
    peso: number,
    ehEntrada: boolean,
    ehConexaoInibidora: boolean,
    ehConexaoReset: boolean
  ) {
    this.lugar = lugar
    this.peso = peso
    this.transicao = transicao
    this.ehEntrada = ehEntrada
    this.ehConexaoInibidora = ehConexaoInibidora
    this.ehConexaoReset = ehConexaoReset
  }

  public getLugar(): Lugar {
    return this.lugar
  }

  public getTransicao(): Transicao {
    return this.transicao
  }

  public validaEhEntrada(): boolean {
    return this.ehEntrada
  }
  public validaEhConexaoInibidora(): boolean {
    return this.ehConexaoInibidora
  }

  public validaEhConexaoReset(): boolean {
    return this.ehConexaoReset
  }
}
