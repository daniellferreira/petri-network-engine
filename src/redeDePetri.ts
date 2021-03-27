import { Conexao } from './conexao'
import { Lugar } from './lugar'
import { Transicao } from './transicao'

export class RedePetri {
  lugares: Array<Lugar> = []
  transicoes: Array<Transicao> = []
  conexoes: Array<Conexao> = []

  // ##### METODOS LUGAR #####
  public criaLugar(id: number) {
    this.lugares.push(new Lugar(id))
  }

  public getLugar(id: number): Lugar {
    const lugar = this.lugares.filter((lugar: Lugar) => lugar.getId() === id)[0]
    if(!lugar) {
      console.log(`getLugar: Lugar com ID = ${id} nao existe`)
      return null
    }
    return lugar
  }

  public removeLugar(id: number) {
    let lugar = this.getLugar(id)
    let index = this.lugares.indexOf(lugar)
    if (index > -1) {
      this.lugares.splice(index, 1)
    } else {
      console.log(`removeLugar: Lugar com ID ${id} nao existe`)
    }
  }

  // ##### METODOS TRANSICAO #####
  public criaTransicao(id: number) {
    this.transicoes.push(new Transicao(id))
    //console.log(this.transicoes[this.transicoes.length -1].toString())
  }

  public getTransicao(id: number): (Transicao) {
    const transicao =  this.transicoes.filter((transicao: Transicao) => transicao.getId() === id)[0]
    if(!transicao){
      console.log(`getTransicao: Transicao com ID = ${id} nao existe`)
      return null
    }
    return transicao
  } 

  public removeTransicao(id: number) {
    let transicao = this.getTransicao(id)
    let index = this.transicoes.indexOf(transicao)
    if (index > -1) {
      this.transicoes.splice(index, 1)
    } else {
      console.log(`removeTransicao: Transicao com ID ${id} nao existe`)
    }
  }

  public getStatusTransicao(id: number): boolean {
    let transicao = this.getTransicao(id)
    return transicao.getStatus()
  }

  public setTransicaoInativa(id: number) {
    let transicao = this.getTransicao(id)
    transicao.setStatus(false)
  }

  public setTransicaoAtiva(id: number) {
    let transicao = this.getTransicao(id)
    transicao.setStatus(true)
  }

  public isTransicaoAtiva(id: number): boolean {
    let transicao = this.getTransicao(id)
    return transicao.getStatus()
  }

  // ##### METODOS CONEXAO #####
  public criaConexao(
    lugar: Lugar,
    transicao: Transicao,
    peso: number,
    ehEntrada: boolean,
    ehConexaoInibidora: boolean,
    ehConexaoReset: boolean
  ) {
    this.conexoes.push(
      new Conexao(
        lugar,
        transicao,
        peso,
        ehEntrada,
        ehConexaoInibidora,
        ehConexaoReset
      )
    )
    console.log(this.conexoes[this.conexoes.length - 1].toString())
  }

  public removeConexao(lugar: Lugar, transicao: Transicao) {
    for (let conexao of this.conexoes) {
      if (
        conexao.getLugar().getId() == lugar.getId() &&
        conexao.getTransicao().getId() == transicao.getId()
      ) {
        let index = this.conexoes.indexOf(conexao)
        if (index > -1) {
          this.conexoes.splice(index, 1)
        } else {
          console.log(`removeConexao: Nao existe lugar com ID ${lugar.getId()} ou 
             transicao com ID ${transicao.getId()}`)
        }
      }
    }
  }

  public getLugarDeConexao(conexao: Conexao): Lugar {
    return conexao.getLugar()
  }

  public getTransicaoDeConexao(conexao: Conexao): Transicao {
    return conexao.getTransicao()
  }

  public getConexoesEntrada(idTransicao: number): Array<Conexao> {
    let conexoesEntrada: Array<Conexao> = []
    for (let conexao of this.conexoes) {
      if (
        conexao.getTransicao().getId() == idTransicao &&
        conexao.getEhEntrada() == true
      ) {
        conexoesEntrada.push(conexao)
      }
    }
    return conexoesEntrada
  }

  public getConexoesSaida(idTransicao: number): Array<Conexao> {
    let conexoesSaida: Array<Conexao> = []
    for (let conexao of this.conexoes) {
      if (
        conexao.getTransicao().getId() == idTransicao &&
        conexao.getEhEntrada() == true
      ) {
        conexoesSaida.push(conexao)
      }
    }
    return conexoesSaida
  }

  // ##### METODOS TOKEN #####
  public insereTokenEmLugar(qtdTokens: number, lugar: Lugar) {
    lugar.insereToken(qtdTokens)
    //console.log(lugar.toString())
  }

  public removeTokenDeLugar(qtdTokens: number, lugar: Lugar) {
    lugar.removeToken(qtdTokens)
  }

  public clearLugar(lugar: Lugar) {
    lugar.clear()
  }

  public getTokens(lugar: Lugar): number {
    return lugar.getTokens()
  }

  public quantosTokens(idLugar: number): number {
    let lugar = this.getLugar(idLugar)
    return lugar.getTokens()
  }

  // ##### METODOS CICLO #####
  public verificaTransicoes() {
    // Verifica se o local tem marcas suficiente para ser executada
    for (let conexao of this.conexoes) {
      // TODO: verificar se eh entrada true ou false que fica o lugar com a marcacao
      if (conexao.getEhEntrada() == true && conexao.getLugar().getTokens() >= conexao.getPeso()) {
        conexao.getTransicao().setStatus(true)
      } else {
        conexao.getTransicao().setStatus(false)
      }
    }
  }
  public executaCiclo() {
    this.verificaTransicoes()
    
  }
}
