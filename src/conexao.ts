import { Lugar } from './lugar'
import { Transicao } from './transicao'

export class Conexao {
  lugar: Lugar
  transicao: Transicao
  peso: number
  ehEntrada: boolean
  ehConexaoInibidora: boolean
  ehConexaoReset: boolean

  // TODO: Verificar a necessidade do id.
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

  public set Lugar(Lugar: undefined) {
    this.Lugar = Lugar
  }

  public get Transicao(): undefined {
    return this.Transicao
  }

  public set Transicao(Transicao: undefined) {
    this.Transicao = Transicao
  }

  public get number(): undefined {
    return this.number
  }

  public set number(number: undefined) {
    this.number = number
  }

  public get boolean(): undefined {
    return this.boolean
  }

  public set boolean(boolean: undefined) {
    this.boolean = boolean
  }

  public get boolean(): undefined {
    return this.boolean
  }

  public set boolean(boolean: undefined) {
    this.boolean = boolean
  }

  public get boolean(): undefined {
    return this.boolean
  }

  public set boolean(boolean: undefined) {
    this.boolean = boolean
  }
}
