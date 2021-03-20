import { Token } from './token'

export class Lugar {
  id: number
  tokens: Array<Token>

  constructor(id: number) {
    this.id = id
    this.tokens = []
  }

  public adicionaToken(token: Token): void {
    this.tokens.push(token)
  }

  // TODO: Find the solution to get the object.
  public getId(): number {
    return this.id
  }

  public getQtdTokens(): number {
    return this.tokens.length
  }
}
