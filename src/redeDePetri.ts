import { Conexao } from './conexao'
import { Lugar } from './lugar'
import { Token } from './token'
import { Transicao } from './transicao'

export class RedePetri {
  lugares: Array<Lugar> = []
  transicoes: Array<Transicao> = []
  conexoes: Array<Conexao> = []


  // ##### METODOS LUGAR #####
  public criarLugar(id: number) {
    this.lugares.push(new Lugar(id))
  }

  public getLugar(id: number): Lugar {
    for (let lugar of this.lugares) {
      if (lugar.getId() == id) {
        return lugar
      }
    }
    // ID nao existe
    console.log(`getLugar: Lugar com ID ${id} nao existe`)
    return null as any
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
  public criarTransicao(id: number) {
    this.transicoes.push(new Transicao(id))
  }

  public getTransicao(id: number): Transicao {
    for (let transicao of this.transicoes) {
      if (transicao.getId() == id) {
        return transicao
      }
    }
    // ID nao existe
    console.log(`getTransicao: Transicao com ID ${id} nao existe`)
    return null as any
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
      this.conexoes.push(new Conexao(lugar, transicao, peso, ehEntrada, ehConexaoInibidora, ehConexaoReset))
    }

    public removeConexao(lugar: Lugar, transicao: Transicao) {
      for (let conexao of this.conexoes) {
        if (conexao.getLugar().getId() == lugar.getId() &&
         conexao.getTransicao().getId() == transicao.getId()) {
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
        if (conexao.getTransicao().getId() == idTransicao && conexao.getEhEntrada() == true) {
            conexoesEntrada.push(conexao)
          }
        }
      return conexoesEntrada
    }

    public getConexoesSaida(idTransicao: number): Array<Conexao> {
      let conexoesSaida: Array<Conexao> = []
      for (let conexao of this.conexoes) {  
        if (conexao.getTransicao().getId() == idTransicao && conexao.getEhEntrada() == true) {
          conexoesSaida.push(conexao)
          }
        }
      return conexoesSaida
    }

  // ##### METODOS TOKEN #####
  public insereTokenEmLugar(token: Token, lugar: Lugar) {
    lugar.insereToken(token)
  }

  public removeTokenDeLugar(token: Token, lugar: Lugar) {
    lugar.removeToken(token)
  }

  public clearLugar(lugar: Lugar) {
    lugar.clear()
  }

  public getToken(lugar: Lugar): Array<Token> {
    return lugar.getToken()
  }

  public quantosTokens(idLugar: number): number {
    let lugar = this.getLugar(idLugar)
    return lugar.getQtdTokens()
  }

  

}