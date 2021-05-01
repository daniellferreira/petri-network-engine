import Table from 'cli-table'
import prompt from 'prompt-sync'

import { Conexao } from './conexao'
import { Lugar } from './lugar'
import { Transicao } from './transicao'

export class RedePetri {
  lugares: Array<Lugar> = []
  transicoes: Array<Transicao> = []
  conexoes: Array<Conexao> = []
  log: Array<Array<string>> = []
  numCicloExecutados: number = 0
  callbackTokenEntrandoEmLugar: any = {}
  callbackTokenSaindoEmLugar: any = {}
  callbackTransicao: any = {}

  public init() {
    this.atualizaStatusTransicoes()
    this.registrarLogInicial()
  }

  // ##### METODOS LUGAR #####
  public criaLugar(
    id: number,
    label: string = `L${id.toString()}`,
    tokens: number = 0
  ): Lugar {
    const lugar = new Lugar(id, label, tokens)
    this.lugares.push(lugar)
    return lugar
  }

  public getLugar(id: number): Lugar | null {
    const lugar = this.lugares.filter((lugar: Lugar) => lugar.getId() === id)[0]
    if (!lugar) {
      console.log(`getLugar: Lugar com ID = ${id} nao existe`)
      return null
    }
    return lugar
  }

  public removeLugar(id: number) {
    const lugar = this.getLugar(id)
    let index = lugar && this.lugares.indexOf(lugar)
    if (index) {
      this.lugares.splice(index, 1)
    } else {
      console.log(`removeLugar: Lugar com ID ${id} nao existe`)
    }
  }

  // ##### METODOS TRANSICAO #####
  public criaTransicao(
    id: number,
    label: string = `T${id.toString()}`
  ): Transicao {
    const transicao = new Transicao(id, label)
    this.transicoes.push(transicao)
    return transicao
  }

  public getTransicao(id: number): Transicao | null {
    const transicao = this.transicoes.filter(
      (transicao: Transicao) => transicao.getId() === id
    )[0]
    if (!transicao) {
      console.log(`getTransicao: Transicao com ID = ${id} nao existe`)
      return null
    }
    return transicao
  }

  public removeTransicao(id: number) {
    const transicao = this.getTransicao(id)
    const index = transicao && this.transicoes.indexOf(transicao)
    if (index) {
      this.transicoes.splice(index, 1)
    } else {
      console.log(`removeTransicao: Transicao com ID ${id} nao existe`)
    }
  }

  public getStatusTransicao(id: number): boolean {
    const transicao = this.getTransicao(id)
    return transicao ? transicao.getStatus() : false
  }

  public setTransicaoInativa(id: number) {
    const transicao = this.getTransicao(id)
    if (!transicao) {
      console.error('Transição não encontrada')
    }
    transicao?.setStatus(false)
  }

  public setTransicaoAtiva(id: number) {
    const transicao = this.getTransicao(id)
    if (!transicao) {
      console.error('Transição não encontrada')
    }
    transicao?.setStatus(true)
  }

  public isTransicaoAtiva(id: number): boolean {
    const transicao = this.getTransicao(id)
    return transicao?.getStatus() === true
  }

  // ##### METODOS CONEXAO #####
  public criaConexao(
    lugar: Lugar | null,
    transicao: Transicao | null,
    peso: number,
    ehEntrada: boolean,
    ehConexaoInibidora: boolean,
    ehConexaoReset: boolean
  ) {
    if (lugar && transicao) {
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
      if (ehEntrada) {
        transicao.addConexaoEntrada(this.conexoes[this.conexoes.length - 1])
      } else {
        transicao.addConexaoSaida(this.conexoes[this.conexoes.length - 1])
      }
      console.log(this.conexoes[this.conexoes.length - 1].toString())
    }
  }

  public removeConexao(lugar: Lugar, transicao: Transicao) {
    for (let conexao of this.conexoes) {
      if (
        conexao.getLugar().getId() == lugar.getId() &&
        conexao.getTransicao().getId() == transicao.getId()
      ) {
        let index = this.conexoes.indexOf(conexao)
        if (index > -1) {
          if (conexao.getEhEntrada()) {
            conexao.getTransicao().removeConexaoEntrada(conexao)
          } else {
            conexao.getTransicao().removeConexaoSaida(conexao)
          }
          this.conexoes.splice(index, 1)
        } else {
          console.log(`removeConexao: Nao existe lugar com ID ${lugar.getId()} ou 
             transicao com ID ${transicao.getId()}`)
        }
      }
    }
  }

  public getConexoes(): Array<Conexao> {
    return this.conexoes
  }

  public getLugarDeConexao(conexao: Conexao): Lugar {
    return conexao.getLugar()
  }

  public getTransicaoDeConexao(conexao: Conexao): Transicao {
    return conexao.getTransicao()
  }

  public getConexoesEntrada(idTransicao: number): Array<Conexao> {
    const conexoesEntrada: Array<Conexao> = []
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
    const conexoesSaida: Array<Conexao> = []
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
  public insereTokenEmLugar(qtdTokens: number, lugar: Lugar | null) {
    lugar?.insereToken(qtdTokens)
  }

  public removeTokenDeLugar(qtdTokens: number, lugar: Lugar | null) {
    lugar?.removeToken(qtdTokens)
  }

  public clearLugar(lugar: Lugar | null) {
    lugar?.clear()
  }

  public getTokens(lugar: Lugar): number {
    return lugar.getTokens()
  }

  public quantosTokens(idLugar: number): number | undefined {
    let lugar = this.getLugar(idLugar)
    if (!lugar) {
      console.error('Lugar não encontrado')
    }
    return lugar?.getTokens()
  }

  private embaralhaTransicoes(arr: Transicao[]) {
    return arr.sort(() => Math.random() - 0.5)
  }

  // ##### METODOS CICLO #####
  public atualizaStatusTransicoes(transicoes: Transicao[] = this.transicoes) {
    //verificar para cada transicao quais sao os lugares associados e se o token do lugar é suficiente para a conexão
    for (let transicao of transicoes) {
      for (let conexao of transicao.getConexoesEntrada()) {
        if (
          (!conexao.getEhConexaoInibidora() &&
            conexao.getLugar().getTokens() >= conexao.getPeso()) ||
          (conexao.getEhConexaoInibidora() &&
            conexao.getLugar().getTokens() < conexao.getPeso())
        ) {
          conexao.getTransicao().setStatus(true)
        } else {
          conexao.getTransicao().setStatus(false)
          break
        }
      }
    }
  }

  public executaCiclo() {
    const transicoesAtivas = this.transicoes.filter(
      (transicao) => transicao.status
    )

    if (transicoesAtivas.length < 1) {
      console.log(
        'Não é possível executar um ciclo, pois nenhuma transição está ativa'
      )
      return
    }

    const transicoesEmbaralhadas = this.embaralhaTransicoes([
      ...transicoesAtivas,
    ])

    // Move tokens de um lugar para o outro
    for (let transicao of transicoesEmbaralhadas) {
      if (!transicao.getStatus()) {
        continue
      }

      for (let conexao of transicao.getConexoesEntrada()) {
        if (
          conexao.getLugar()?.id &&
          this.callbackTokenSaindoEmLugar[conexao.getLugar().id]
        ) {
          console.log(
            'this.callbackTokenSaindoEmLugar[lugar.id]',
            this.callbackTokenSaindoEmLugar[conexao.getLugar().id]
          )
          this.callbackTokenSaindoEmLugar[conexao.getLugar().id](
            conexao.getLugar().getTokens()
          )
        }
        if (conexao.getEhConexaoReset()) {
          conexao.getLugar().clear()
        } else {
          conexao.getLugar().removeToken(conexao.getPeso())
        }
      }
      for (let conexao of transicao.getConexoesSaida()) {
        conexao.getLugar().insereToken(conexao.getPeso())

        if (
          conexao.getLugar()?.id &&
          this.callbackTokenEntrandoEmLugar[conexao.getLugar().id]
        ) {
          console.log(
            'this.callbackTokenEntrandoEmLugar[lugar.id]',
            this.callbackTokenEntrandoEmLugar[conexao.getLugar().id]
          )
          this.callbackTokenEntrandoEmLugar[conexao.getLugar().id](
            conexao.getLugar().getTokens()
          )
        }
      }

      this.atualizaStatusTransicoes(transicoesEmbaralhadas)
    }

    this.atualizaStatusTransicoes()

    this.registraLog(++this.numCicloExecutados)
  }

  // ##### Callbacks #####
  // insereCallbackTokenEntrandoLugar(L3, gisela())
  // insereCallbackTokenEntrandoLugar(L2, vitor())

  // callbackTokenEntrandoEmLugar = {
  //   L3: gisela
  //   L2: vitor
  // }

  public insereCallbackTokenEntrandoLugar(lugar: Lugar, callback: any) {
    this.callbackTokenEntrandoEmLugar[lugar.id] = callback
  }

  public insereCallbackTokenSaindoLugar(lugar: Lugar, callback: any) {
    this.callbackTokenSaindoEmLugar[lugar.id] = callback
  }

  public insereCallbackTransicao(transicao: Transicao, callback: any) {
    this.callbackTransicao[transicao.id] = callback
  }

  // ##### METODOS DE LOG #####
  private getSituacaoRede() {
    return [
      ...this.lugares.map((lugar) => lugar.getTokens().toString()),
      ...this.transicoes.map(
        (transicao) => `${transicao.getStatus() ? 'S' : 'N'}`
      ),
    ]
  }
  public registrarLogInicial() {
    this.log.push([
      'Núm. do ciclo',
      ...this.lugares.map((lugar) => `${lugar.getLabel()}`),
      ...this.transicoes.map((transicao) => `${transicao.getLabel()}`),
    ])

    this.registraLog('0 (inicial)')
  }
  public registraLog(label: string | number) {
    this.log.push([label.toString(), ...this.getSituacaoRede()])
  }

  // ##### METODOS EXIBIÇÃO #####
  public exibeLugares() {
    const lugares: any[] = ['Lugar']
    const marcacoes: any[] = ['Marcação']

    for (const lugar of this.lugares) {
      lugares.push(lugar.getLabel())
      marcacoes.push(lugar.getTokens())
    }

    const table = new Table()
    table.push(lugares)
    table.push(marcacoes)

    console.log(table.toString())
  }
  public exibeTransicoes() {
    const transicoes: any[] = ['Transição']
    const habilitadas: any[] = ['Habilitada ?']

    for (const transicao of this.transicoes) {
      transicoes.push(transicao.getLabel())
      habilitadas.push(transicao.getStatus() ? 'S' : 'N')
    }

    const table = new Table()
    table.push(transicoes)
    table.push(habilitadas)

    console.log(table.toString())
  }
  public exibeRede() {
    const table = new Table()
    table.push(...this.log)
    console.log(table.toString())
  }

  public exibeMenu() {
    while (true) {
      console.log('\n=== Execução ===')
      console.log('1. Executar ciclo')
      console.log('2. Exibir lugares')
      console.log('3. Exibir transições')
      console.log('4. Exibir rede')
      console.log('9. Sair')
      console.log()

      const option = prompt({ sigint: true })('')

      switch (option) {
        case '1':
          this.executaCiclo()
          break
        case '2':
          this.exibeLugares()
          break
        case '3':
          this.exibeTransicoes()
          break
        case '4':
          this.exibeRede()
          break
        case '9':
          console.log('Parando execução!')
          break
        default:
          console.log('Opção inválida.')
          break
      }

      if (option === '9') {
        break
      }
    }
  }
}
