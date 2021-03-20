import { Conexao } from './conexao'
import { Lugar } from './lugar'

export class RedePetri {
  lugares: Array<Lugar> = []
  conexoes: Array<Conexao> = []

  public criarLugar(id: number) {
    this.lugares.push(new Lugar(id))
  }

  public getLugar(id: number): Lugar {
    this.lugares.forEach((element) => {
      if (element.getId() == id) {
        return element
      }
    })

    // ID nao existe
    return null as any
  }

  //  public insereTokenEmLugar(id: number, token: Token): void {

  //    this.lugares.forEach(element => {

  //        if (element.g)

  //    })

  //  }
}
