import { Token } from './token'

export class Lugar {
  id: number
  tokens: Array<Token>

  constructor(id: number) {
    this.id = id
    this.tokens = []
  }

  public insereToken(token: Token) {
    this.tokens.push(token)
  }

  public removeToken(token: Token) {
    let index = this.tokens.indexOf(token)
    if (index > -1) {
      this.tokens.splice(index, 1)
    } else {
      console.log(`removeToken: Token nao existe, no lugar com ID ${this.getId()}`)
    }
  }

  public clear() {
    this.tokens = []
  }

  public getToken(): Array<Token> {
    return this.tokens
  }

  public getId(): number {
    return this.id
  }

  public getQtdTokens(): number {
    return this.tokens.length
  }

}